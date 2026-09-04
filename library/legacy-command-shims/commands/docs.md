---
description: Legacy slash-entry shim for the documentation-lookup skill. Prefer the skill directly.
---

# Docs Command (Legacy Shim)

Use this only if you still reach for `docs` procedure. The maintained workflow lives in `$PLUGIN/library/skills/documentation-lookup/SKILL.md`.

## Canonical Surface

- Prefer the `documentation-lookup` skill directly.
- Keep this file only as a compatibility entry point.

## Arguments

`$ARGUMENTS`

## Delegation

Apply the `documentation-lookup` skill.
- If the library or the question is missing, ask for the missing part.
- Use live documentation through Context7 instead of training data.
- Return only the current answer and the minimum code/example surface needed.

---
<!-- ecc-icm-notes -->
ECC-ICM notes: Procedures named above are files, not slash commands: `$PLUGIN/library/procedures/<name>.md`; `$PLUGIN/library/procedures/INDEX.md` says which ecc-icm stage or workspace each maps to. Legacy shims (tdd, verify, e2e, eval, orchestrate, claw and the rest) live under `$PLUGIN/library/legacy-command-shims/commands/`.
