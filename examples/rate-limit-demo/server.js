import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createRateLimiter, rateLimitFromEnv } from './rateLimiter.js';

const MAX_CLIENT_ID_LENGTH = 128;

// x-client-id is a demo identity, not authentication. Anything that is not a
// single non-blank string of at most 128 characters falls back to the address.
function clientKey(req) {
  const header = req.headers['x-client-id'];
  const id = typeof header === 'string' ? header.trim() : '';
  if (id.length > 0 && id.length <= MAX_CLIENT_ID_LENGTH) return `id:${id}`;
  return `ip:${req.socket.remoteAddress ?? 'unknown'}`;
}

export function createApi({ rateLimit, now } = {}) {
  const limiter = createRateLimiter({ ...rateLimit, now });
  return http.createServer(async (req, res) => {
    if (req.method === 'GET' && req.url === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok' }));
      return;
    }
    if (req.method === 'GET' && req.url === '/api/ping') {
      const { allowed, retryAfterSeconds } = limiter.check(clientKey(req));
      if (!allowed) {
        res.writeHead(429, { 'Content-Type': 'application/json', 'Retry-After': String(retryAfterSeconds) });
        res.end(JSON.stringify({ error: 'rate limit exceeded', retryAfterSeconds }));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'pong' }));
      return;
    }
    if (req.method === 'GET' && req.url === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(await readFile(new URL('./index.html', import.meta.url), 'utf8'));
      return;
    }
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'not found' }));
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 4381);
  createApi({ rateLimit: rateLimitFromEnv(process.env) }).listen(port, '127.0.0.1', () => console.log(`Demo listening at http://127.0.0.1:${port}`));
}
