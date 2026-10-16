# Benchmarks

The dynamic half of the baseline. The static half (`context-budget.js`) is in `docs/baseline.md`. These runs cost real tokens, so they are a protocol, not a test.

## Protocol

Same repository, same three prompts, two harnesses. Record from `.claude/runs/_cost.jsonl` (ecc-icm) and from ECC's cost tracker output or `/cost` (ECC).

| Task | Prompt file | Tier |
|---|---|---|
| One-file bug fix | `tasks/trivial.md` | trivial |
| Feature across two to five files with tests | `tasks/standard.md` | standard |
| Review a 300-line diff | `tasks/review.md` | review only |

For each task and harness record:

| Measure | How |
|---|---|
| Total tokens (input, output, cache read) | cost log |
| Agent tool uses | cost log `agentToolUses`, or count `tool_use` blocks named Agent in the transcript |
| Wall time | start and end timestamps |
| Stage outputs present | `status.js --json` (ecc-icm only) |
| Result quality | did the task pass its own Validate command |

## Running ECC

Install ECC with its `developer` profile into the scratch repository and run each prompt in a fresh session.

## Running ecc-icm

```bash
cd <scratch repo>
claude --plugin-dir /absolute/path/to/ecc-icm
# then: setup, new <slug>, next ... through the gates
```

Fill the table in `docs/baseline.md` when done. A 50% reduction in total tokens on the standard task with zero Agent tool uses is the target the plan set.
