---
description: Legacy slash-entry shim for the verification-loop skill. Prefer the skill directly.
---

# Verification Command (Legacy Shim)

Use this only if you still invoke `verify` procedure. The maintained workflow lives in `$PLUGIN/library/skills/verification-loop/SKILL.md`.

## Canonical Surface

- Prefer the `verification-loop` skill directly.
- Keep this file only as a compatibility entry point.

## Arguments

`$ARGUMENTS`

## Delegation

Apply the `verification-loop` skill.
- Choose the right verification depth for the user's requested mode.
- Run build, types, lint, tests, security/log checks, and diff review in the right order for the current repo.
- Report only the verdicts and blockers instead of maintaining a second verification checklist here.

---
<!-- ecc-icm-notes -->
ECC-ICM notes: Procedures named above are files, not slash commands: `$PLUGIN/library/procedures/<name>.md`; `$PLUGIN/library/procedures/INDEX.md` says which ecc-icm stage or workspace each maps to. Legacy shims (tdd, verify, e2e, eval, orchestrate, claw and the rest) live under `$PLUGIN/library/legacy-command-shims/commands/`.
