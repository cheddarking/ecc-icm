# Task: standard

Add a rate limit of 60 requests per minute per API key to the HTTP handlers. Return 429 with a Retry-After header. Configurable through an environment variable with a sane default. Tests for the limit, the reset, and the header.

Expected: two to five files changed, new tests, a plan approved before code, a review with a plan trace, one or two commits.
