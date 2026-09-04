---
description: Legacy slash-entry shim for the context-budget skill. Prefer the skill directly.
---

# Context Budget Optimizer (Legacy Shim)

Use this only if you still invoke `context-budget` procedure. The maintained workflow lives in `$PLUGIN/library/skills/context-budget/SKILL.md`.

## Canonical Surface

- Prefer the `context-budget` skill directly.
- Keep this file only as a compatibility entry point.

## Arguments

$ARGUMENTS

## Delegation

Apply the `context-budget` skill.
- Pass through `--verbose` if the user supplied it.
- Assume a 200K context window unless the user specified otherwise.
- Return the skill's inventory, issue detection, and prioritized savings report without re-implementing the scan here.

---
<!-- ecc-icm-notes -->
ECC-ICM notes: Procedures named above are files, not slash commands: `$PLUGIN/library/procedures/<name>.md`; `$PLUGIN/library/procedures/INDEX.md` says which ecc-icm stage or workspace each maps to. Legacy shims (tdd, verify, e2e, eval, orchestrate, claw and the rest) live under `$PLUGIN/library/legacy-command-shims/commands/`.
