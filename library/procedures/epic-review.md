---
description: Mark epic review requested, approved, or changes requested.
---

# /epic-review

Coordinate review state for an epic issue.

```bash
node $PLUGIN/library/scripts/github-coordination.js review <issue-number> --repo <owner/repo> --review approved
```

What this does:

1. Updates the review state in the coordination block.
2. Syncs review labels to GitHub.
3. Records the review outcome in an audit comment.
4. Keeps the local cache aligned with the issue body.

Compatibility aliases:

- `review-pr` procedure
- `code-review` procedure

---
<!-- ecc-icm-notes -->
ECC-ICM notes: Procedures named above are files, not slash commands: `$PLUGIN/library/procedures/<name>.md`; `$PLUGIN/library/procedures/INDEX.md` says which ecc-icm stage or workspace each maps to.
