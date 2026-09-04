---
description: Sync epic issue bodies, labels, and local coordination snapshots from GitHub.
---

# /epic-sync

Run a deterministic sync for epic issues.

```bash
node $PLUGIN/library/scripts/github-coordination.js sync --repo <owner/repo>
```

What this does:

1. Reads issue bodies as the canonical epic state.
2. Reconciles the coordination block with labels.
3. Writes a fresh local snapshot for each epic issue.
4. Keeps the SQLite cache aligned with GitHub.

Compatibility aliases:

- `projects` procedure
- `/work-items sync-github`

---
<!-- ecc-icm-notes -->
ECC-ICM notes: Procedures named above are files, not slash commands: `$PLUGIN/library/procedures/<name>.md`; `$PLUGIN/library/procedures/INDEX.md` says which ecc-icm stage or workspace each maps to.
