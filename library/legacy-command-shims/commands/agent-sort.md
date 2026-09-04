---
description: Legacy slash-entry shim for the agent-sort skill. Prefer the skill directly.
---

# Agent Sort (Legacy Shim)

Use this only if you still invoke `agent-sort` procedure. The maintained workflow lives in `$PLUGIN/library/skills/agent-sort/SKILL.md`.

## Canonical Surface

- Prefer the `agent-sort` skill directly.
- Keep this file only as a compatibility entry point.

## Arguments

`$ARGUMENTS`

## Delegation

Apply the `agent-sort` skill.
- Classify ECC surfaces with concrete repo evidence.
- Keep the result to DAILY vs LIBRARY.
- If an install change is needed afterward, hand off to `configure-ecc` instead of re-implementing install logic here.

---
<!-- ecc-icm-notes -->
ECC-ICM notes: Procedures named above are files, not slash commands: `$PLUGIN/library/procedures/<name>.md`; `$PLUGIN/library/procedures/INDEX.md` says which ecc-icm stage or workspace each maps to. Legacy shims (tdd, verify, e2e, eval, orchestrate, claw and the rest) live under `$PLUGIN/library/legacy-command-shims/commands/`. Install and configuration steps above describe ECC itself. In ecc-icm nothing is installed beyond the plugin; per-project setup is the `setup` trigger, which writes `.claude/icm.json`.
