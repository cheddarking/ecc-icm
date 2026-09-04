# Baseline

Measured 2026-09-04. Tokens are chars divided by four unless a row says otherwise.

## Static context per turn

`node scripts/icm/context-budget.js <root>` over both checkouts.

| Surface | ECC `e04ea0b9` | ecc-icm 0.1.0 |
|---|---:|---:|
| Registered skill descriptions | 286 skills, 21,617 | 1 skill, 59 |
| Registered agent descriptions | 68 agents, 3,870 | 0 |
| Registered command descriptions | 94 commands, 2,781 | 0 |
| rules/common, always on when installed | 10 files, 4,438 | 0 (library, loaded by section) |
| SessionStart injection | up to 8,000 chars of instincts and prior session | 975 (Layer 0 plus run status) |
| Total | 32,706 | 1,034 |

Reduction: 97% of the harness's own static overhead. The ECC figure excludes its CLAUDE.md and AGENTS.md, which only load when working inside the ECC checkout.

## Hooks

| Measure | ECC | ecc-icm |
|---|---:|---:|
| Hook entries in hooks.json | 23 over 7 events | 5 over 3 events |
| Hook scripts shipped | 53 | 5 |
| Sub-invocations per tool call, standard profile | 15 for an Edit, about 13 for a Bash call | 1 |
| Sub-invocations per tool call, minimal profile | about 7 | 1 |
| Hooks that spawn a model | 2 (pre-compact, session-end) | 0 |

## Headless smoke test

Scratch repository, `claude -p "status" --plugin-dir /home/elvis/Projects/ecc-icm --model haiku`, MCP servers disabled.

| Measure | Value |
|---|---:|
| Turns | 2 |
| Wall time | 11 s |
| Cache creation tokens | 24,920 |
| Cache read tokens | 24,539 |
| Output tokens | 392 |
| Cost (haiku, API rates) | $0.054 |

The model ran `status.js` and answered from the injected Layer 0, which is the behaviour the SessionStart hook exists to produce. The 25k cached tokens are Claude Code's own system prompt plus this machine's global `~/.claude/CLAUDE.md` and its 112 personal skills; ecc-icm's share is about 1k. That global surface is the next thing a harness-ops audit should measure.

## Dynamic benchmark

Not run. Protocol in `benchmarks/README.md`. Fill in when the three tasks have been run on the same repository with both harnesses.

| Task | Harness | Total tokens | Agent tool uses | Wall time | Validate passed |
|---|---|---:|---:|---:|---|
| trivial | ECC developer | | | | |
| trivial | ecc-icm | | | | |
| standard | ECC developer | | | | |
| standard | ecc-icm | | | | |
| review | ECC developer | | | | |
| review | ecc-icm | | | | |
