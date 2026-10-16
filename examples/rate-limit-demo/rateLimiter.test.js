import test from 'node:test';
import assert from 'node:assert/strict';
import { createRateLimiter, rateLimitFromEnv } from './rateLimiter.js';

function setup(options = {}) {
  const clock = { time: 0 };
  const limiter = createRateLimiter({ ...options, now: () => clock.time });
  return { clock, limiter };
}

test('allows five requests per key by default and blocks the sixth', () => {
  const { limiter } = setup();
  for (let i = 0; i < 5; i += 1) {
    assert.equal(limiter.check('id:a').allowed, true);
  }
  assert.equal(limiter.check('id:a').allowed, false);
});

test('blocked result reports whole seconds left in the window, never below one', () => {
  const { clock, limiter } = setup();
  for (let i = 0; i < 5; i += 1) limiter.check('id:a');
  assert.equal(limiter.check('id:a').retryAfterSeconds, 60);
  clock.time = 30500;
  assert.equal(limiter.check('id:a').retryAfterSeconds, 30);
  clock.time = 59999;
  assert.equal(limiter.check('id:a').retryAfterSeconds, 1);
});

test('keys are counted independently', () => {
  const { limiter } = setup();
  for (let i = 0; i < 5; i += 1) limiter.check('id:a');
  assert.equal(limiter.check('id:a').allowed, false);
  assert.equal(limiter.check('id:b').allowed, true);
});

test('a key is allowed again once the window has elapsed', () => {
  const { clock, limiter } = setup();
  for (let i = 0; i < 5; i += 1) limiter.check('id:a');
  clock.time = 59999;
  assert.equal(limiter.check('id:a').allowed, false);
  clock.time = 60000;
  assert.equal(limiter.check('id:a').allowed, true);
  for (let i = 0; i < 4; i += 1) assert.equal(limiter.check('id:a').allowed, true);
  assert.equal(limiter.check('id:a').allowed, false);
});

test('blocked requests do not extend the window', () => {
  const { clock, limiter } = setup({ limit: 1, windowMs: 1000 });
  assert.equal(limiter.check('id:a').allowed, true);
  clock.time = 900;
  assert.equal(limiter.check('id:a').allowed, false);
  clock.time = 1000;
  assert.equal(limiter.check('id:a').allowed, true);
});

test('custom limit and window are honoured', () => {
  const { limiter } = setup({ limit: 2, windowMs: 1000 });
  assert.equal(limiter.check('id:a').allowed, true);
  assert.equal(limiter.check('id:a').allowed, true);
  assert.equal(limiter.check('id:a').allowed, false);
});

test('invalid limit or window throws RangeError', () => {
  for (const bad of [0, -1, 1.5, NaN, '5', null]) {
    assert.throws(() => createRateLimiter({ limit: bad }), RangeError);
    assert.throws(() => createRateLimiter({ windowMs: bad }), RangeError);
  }
  assert.throws(() => createRateLimiter({ maxClients: 0 }), RangeError);
});

test('tracked keys never exceed maxClients and expired keys are swept', () => {
  const { clock, limiter } = setup({ maxClients: 3, windowMs: 1000 });
  for (const key of ['a', 'b', 'c', 'd', 'e']) limiter.check(key);
  assert.equal(limiter.size(), 3);
  clock.time = 1000;
  limiter.check('f');
  assert.equal(limiter.size(), 1);
});

test('rateLimitFromEnv falls back to defaults for unset or invalid values', () => {
  assert.deepEqual(rateLimitFromEnv({}), { limit: 5, windowMs: 60000 });
  assert.deepEqual(
    rateLimitFromEnv({ RATE_LIMIT_MAX: 'abc', RATE_LIMIT_WINDOW_SECONDS: '0' }),
    { limit: 5, windowMs: 60000 }
  );
  assert.deepEqual(
    rateLimitFromEnv({ RATE_LIMIT_MAX: '1.5', RATE_LIMIT_WINDOW_SECONDS: '-3' }),
    { limit: 5, windowMs: 60000 }
  );
});

test('rateLimitFromEnv parses numbers and converts seconds to milliseconds', () => {
  assert.deepEqual(
    rateLimitFromEnv({ RATE_LIMIT_MAX: '2', RATE_LIMIT_WINDOW_SECONDS: '10' }),
    { limit: 2, windowMs: 10000 }
  );
});
