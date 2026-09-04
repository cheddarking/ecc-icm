# Format: learnings.md

Written by 07-learn. Each proposal is a concrete change to one source file, never to an output.

```markdown
# Learnings: <slug or "across runs">

Runs examined: <list>
Edits examined: <n> from _edits.jsonl and from diffs of stage outputs

## Recurring edits
| Stage | Kind of edit | Seen in runs | Example |
|---|---|---|---|

## Proposed source changes
### 1. <stage or reference file>
- File: `$PLUGIN/workspaces/engineering/<path>`
- Change: <the exact line or table row to add, remove, or reword>
- Why: <which recurring edit it removes>
- Risk: <what could get worse>

## Not proposed
- <edits that were one-offs, with a sentence on why>
```

The human applies proposals by editing the named file. The agent does not edit contracts on its own.
