---
paths:
  - "**/*.py"
  - "**/*.pyi"
---
# Python Hooks

> This file extends [common/hooks.md](../common/hooks.md) with Python specific content.

## PostToolUse Hooks

Configure in `~/.claude/settings.json`:

- **black/ruff**: Auto-format `.py` files after edit
- **mypy/pyright**: Run type checking after editing `.py` files

## Warnings

- Warn about `print()` statements in edited files (use `logging` module instead)

---
<!-- ecc-icm-notes -->
ECC-ICM notes: ECC's hooks are not installed by ecc-icm. Their scripts ship under `$PLUGIN/library/scripts/hooks/` with `$PLUGIN/library/hooks/hooks.json` for opt-in use; they expect ECC's layout and npm dependencies (`$PLUGIN/library/package.json`). ecc-icm's own hooks are the five in its README.
