# Format: review.md

Written by 05-review. `verify.js` requires `## Findings` and `## Trace`. The human edits this file: delete a row to dismiss a finding, add a note to accept a risk.

```markdown
# Review: <slug>

Diff: <base>..<head>, <n> files, +<a> -<b>
Lenses run: correctness, <language>, <security|none>
Verdict: <APPROVE|CHANGES_REQUESTED>

## Findings
| # | Severity | Lens | File:line | Finding | Proof (input that fails) | Fix |
|---|---|---|---|---|---|---|

Zero rows is a valid table.

## Trace
| Plan task | Status | Evidence |
|---|---|---|
| Task 1: <name> | implemented / partial / missing | <file:line or test> |

## Unplanned changes
| File:line | What | Justified in log.md? |
|---|---|---|

## Notes
<anything below review_min_severity worth a sentence, or "none">
```

Loop rule: any open CRITICAL or HIGH sends the run back to 04-implement with this file as input. The reviewer does not fix code.
