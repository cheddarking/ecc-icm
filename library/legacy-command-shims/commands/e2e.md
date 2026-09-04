---
description: Legacy slash-entry shim for the e2e-testing skill. Prefer the skill directly.
---

# E2E Command (Legacy Shim)

Use this only if you still invoke `e2e` procedure. The maintained workflow lives in `$PLUGIN/library/skills/e2e-testing/SKILL.md`.

## Canonical Surface

- Prefer the `e2e-testing` skill directly.
- Keep this file only as a compatibility entry point.

## Arguments

`$ARGUMENTS`

## Delegation

Apply the `e2e-testing` skill.
- Generate or update Playwright coverage for the requested user flow.
- Run only the relevant tests unless the user explicitly asked for the entire suite.
- Capture the usual artifacts and report failures, flake risk, and next fixes without duplicating the full skill body here.

---
<!-- ecc-icm-notes -->
ECC-ICM notes: Procedures named above are files, not slash commands: `$PLUGIN/library/procedures/<name>.md`; `$PLUGIN/library/procedures/INDEX.md` says which ecc-icm stage or workspace each maps to. Legacy shims (tdd, verify, e2e, eval, orchestrate, claw and the rest) live under `$PLUGIN/library/legacy-command-shims/commands/`.
