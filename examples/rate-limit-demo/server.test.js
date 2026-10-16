import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createApi } from './server.js';

test('health and ping routes respond', async () => {
  const server = createApi();
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  try {
    const base = `http://127.0.0.1:${server.address().port}`;
    assert.deepEqual(await (await fetch(`${base}/health`)).json(), { status: 'ok' });
    assert.deepEqual(await (await fetch(`${base}/api/ping`)).json(), { message: 'pong' });
    assert.equal((await fetch(`${base}/missing`)).status, 404);
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
});

async function withApi(options, run) {
  const server = createApi(options);
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  try {
    await run(`http://127.0.0.1:${server.address().port}`);
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
}

const ping = (base, clientId) =>
  fetch(`${base}/api/ping`, clientId === undefined ? {} : { headers: { 'x-client-id': clientId } });

function manualClock() {
  const clock = { time: 0 };
  clock.now = () => clock.time;
  return clock;
}

test('first five pings per client succeed with the unchanged body', async () => {
  const clock = manualClock();
  await withApi({ now: clock.now }, async base => {
    for (let i = 0; i < 5; i += 1) {
      const response = await ping(base, 'a');
      assert.equal(response.status, 200);
      assert.deepEqual(await response.json(), { message: 'pong' });
      assert.equal(response.headers.get('retry-after'), null);
    }
  });
});

test('sixth ping returns 429 with error, Retry-After and a matching positive retryAfterSeconds', async () => {
  const clock = manualClock();
  await withApi({ now: clock.now }, async base => {
    for (let i = 0; i < 5; i += 1) await ping(base, 'a');
    clock.time = 12500;
    const response = await ping(base, 'a');
    const body = await response.json();
    const header = response.headers.get('retry-after');
    assert.equal(response.status, 429);
    assert.match(response.headers.get('content-type'), /^application\/json/);
    assert.equal(body.error, 'rate limit exceeded');
    assert.deepEqual(Object.keys(body).sort(), ['error', 'retryAfterSeconds']);
    assert.ok(Number.isInteger(body.retryAfterSeconds));
    assert.ok(body.retryAfterSeconds > 0);
    assert.match(header, /^[1-9][0-9]*$/);
    assert.equal(body.retryAfterSeconds, Number(header));
    assert.equal(body.retryAfterSeconds, 48);
  });
});

test('retryAfterSeconds equals Retry-After at the window start and just before it ends', async () => {
  const clock = manualClock();
  await withApi({ now: clock.now }, async base => {
    for (let i = 0; i < 5; i += 1) await ping(base, 'a');
    for (const [time, expected] of [[0, 60], [59999, 1]]) {
      clock.time = time;
      const response = await ping(base, 'a');
      const body = await response.json();
      assert.equal(response.status, 429);
      assert.equal(body.retryAfterSeconds, expected);
      assert.equal(response.headers.get('retry-after'), String(expected));
    }
  });
});

test('a second client is unaffected by the first client being blocked', async () => {
  const clock = manualClock();
  await withApi({ now: clock.now }, async base => {
    for (let i = 0; i < 5; i += 1) await ping(base, 'a');
    assert.equal((await ping(base, 'a')).status, 429);
    const other = await ping(base, 'b');
    assert.equal(other.status, 200);
    assert.deepEqual(await other.json(), { message: 'pong' });
  });
});

test('requests without x-client-id share the remoteAddress bucket and do not affect header clients', async () => {
  const clock = manualClock();
  await withApi({ now: clock.now }, async base => {
    for (let i = 0; i < 5; i += 1) assert.equal((await ping(base)).status, 200);
    assert.equal((await ping(base)).status, 429);
    assert.equal((await ping(base, 'a')).status, 200);
  });
});

test('a blank or oversized x-client-id falls back to the remoteAddress bucket', async () => {
  const clock = manualClock();
  await withApi({ now: clock.now }, async base => {
    for (let i = 0; i < 5; i += 1) assert.equal((await ping(base)).status, 200);
    assert.equal((await ping(base, '   ')).status, 429);
    assert.equal((await ping(base, 'x'.repeat(129))).status, 429);
    assert.equal((await ping(base, 'x'.repeat(128))).status, 200);
  });
});

test('a client is allowed again after the window elapses on the supplied clock', async () => {
  const clock = manualClock();
  await withApi({ now: clock.now }, async base => {
    for (let i = 0; i < 5; i += 1) await ping(base, 'a');
    assert.equal((await ping(base, 'a')).status, 429);
    clock.time = 60000;
    const response = await ping(base, 'a');
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { message: 'pong' });
  });
});

test('health and the demo page stay reachable while a client is blocked', async () => {
  const clock = manualClock();
  await withApi({ now: clock.now }, async base => {
    for (let i = 0; i < 6; i += 1) await ping(base, 'a');
    const health = await fetch(`${base}/health`, { headers: { 'x-client-id': 'a' } });
    assert.equal(health.status, 200);
    assert.deepEqual(await health.json(), { status: 'ok' });
    const page = await fetch(`${base}/`, { headers: { 'x-client-id': 'a' } });
    assert.equal(page.status, 200);
    assert.match(page.headers.get('content-type'), /^text\/html/);
  });
});

test('limit and window are configurable through createApi options', async () => {
  const clock = manualClock();
  await withApi({ rateLimit: { limit: 2, windowMs: 1000 }, now: clock.now }, async base => {
    assert.equal((await ping(base, 'a')).status, 200);
    assert.equal((await ping(base, 'a')).status, 200);
    const blocked = await ping(base, 'a');
    assert.equal(blocked.status, 429);
    assert.equal((await blocked.json()).retryAfterSeconds, 1);
    clock.time = 1000;
    assert.equal((await ping(base, 'a')).status, 200);
  });
});

test('createApi rejects an invalid rate limit configuration', () => {
  assert.throws(() => createApi({ rateLimit: { limit: 0 } }), RangeError);
});
