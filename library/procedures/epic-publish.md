---
description: Publish a validated epic update back to the issue and local cache.
---

# /epic-publish

Publish a validated coordination update to GitHub.

```bash
node $PLUGIN/library/scripts/github-coordination.js publish <issue-number> --repo <owner/repo>
```

What this does:

1. Re-validates the epic before publishing.
2. Updates the coordination block in the issue body.
3. Appends a concise publish comment.
4. Records the final local snapshot.

Compatibility aliases:

- `pr` procedure
- `prp-pr` procedure

---
<!-- ecc-icm-notes -->
ECC-ICM notes: Procedures named above are files, not slash commands: `$PLUGIN/library/procedures/<name>.md`; `$PLUGIN/library/procedures/INDEX.md` says which ecc-icm stage or workspace each maps to.
