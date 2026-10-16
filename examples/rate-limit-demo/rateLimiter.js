const DEFAULT_LIMIT = 5;
const DEFAULT_WINDOW_MS = 60000;
const DEFAULT_MAX_CLIENTS = 10000;

function assertPositiveInteger(name, value) {
  if (!Number.isInteger(value) || value < 1) {
    throw new RangeError(`${name} must be a positive integer`);
  }
}

// In-memory fixed-window limiter. Each key gets its own window, which starts at
// that key's first request. A fixed window can let through up to twice the limit
// across a window boundary, and a caller who rotates keys is never limited:
// keys are demo identities, not authentication.
export function createRateLimiter({
  limit = DEFAULT_LIMIT,
  windowMs = DEFAULT_WINDOW_MS,
  now = Date.now,
  maxClients = DEFAULT_MAX_CLIENTS
} = {}) {
  assertPositiveInteger('limit', limit);
  assertPositiveInteger('windowMs', windowMs);
  assertPositiveInteger('maxClients', maxClients);

  const windows = new Map();
  let nextSweepAt = 0;

  function sweep(time) {
    for (const [key, entry] of windows) {
      if (time >= entry.start + windowMs) windows.delete(key);
    }
    nextSweepAt = time + windowMs;
  }

  function check(key) {
    const time = now();
    if (time >= nextSweepAt) sweep(time);

    let entry = windows.get(key);
    if (!entry || time >= entry.start + windowMs) {
      if (!entry && windows.size >= maxClients) {
        windows.delete(windows.keys().next().value);
      }
      entry = { start: time, count: 0 };
      windows.set(key, entry);
    }
    if (entry.count >= limit) {
      const retryAfterSeconds = Math.max(1, Math.ceil((entry.start + windowMs - time) / 1000));
      return { allowed: false, retryAfterSeconds };
    }
    entry.count += 1;
    return { allowed: true };
  }

  return { check, size: () => windows.size };
}

function positiveIntegerOrDefault(value, fallback) {
  const parsed = Number(value);
  return value !== undefined && Number.isInteger(parsed) && parsed >= 1 ? parsed : fallback;
}

export function rateLimitFromEnv(env) {
  return {
    limit: positiveIntegerOrDefault(env.RATE_LIMIT_MAX, DEFAULT_LIMIT),
    windowMs: positiveIntegerOrDefault(env.RATE_LIMIT_WINDOW_SECONDS, DEFAULT_WINDOW_MS / 1000) * 1000
  };
}
