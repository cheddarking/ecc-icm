# A small feature built through ecc-icm

This dependency-free Node API is the completed example used in the revised The Augmented Expert walkthrough. Claude Code followed ecc-icm engineering stages from intake through review. The operator edited the plan to require a retryAfterSeconds JSON field matching the Retry-After header; the implementation and integration tests include that change.

Requires Node 20 or later. From this directory:

```sh
npm test
npm start
```

Open http://127.0.0.1:4381 and send requests. The first five requests per demo client succeed; the sixth receives HTTP 429. Change the client name to try a separate counter. The health endpoint and page remain available.

Configuration: RATE_LIMIT_MAX and RATE_LIMIT_WINDOW_SECONDS. Tests inject a clock to check resets without waiting a minute. The completed example has 21 passing tests.

The client header is a local demonstration identity, not authentication. This example demonstrates the workflow and result; it is not a comparative token-cost benchmark.
