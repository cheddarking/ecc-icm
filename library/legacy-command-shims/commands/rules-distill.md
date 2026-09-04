---
description: Legacy slash-entry shim for the rules-distill skill. Prefer the skill directly.
---

# Rules Distill (Legacy Shim)

Use this only if you still invoke `rules-distill` procedure. The maintained workflow lives in `$PLUGIN/library/skills/rules-distill/SKILL.md`.

## Canonical Surface

- Prefer the `rules-distill` skill directly.
- Keep this file only as a compatibility entry point.

## Arguments

`$ARGUMENTS`

## Delegation

Apply the `rules-distill` skill and follow its inventory, cross-read, and verdict workflow instead of duplicating that logic here.

---
<!-- ecc-icm-notes -->
ECC-ICM notes: Procedures named above are files, not slash commands: `$PLUGIN/library/procedures/<name>.md`; `$PLUGIN/library/procedures/INDEX.md` says which ecc-icm stage or workspace each maps to. Legacy shims (tdd, verify, e2e, eval, orchestrate, claw and the rest) live under `$PLUGIN/library/legacy-command-shims/commands/`.
