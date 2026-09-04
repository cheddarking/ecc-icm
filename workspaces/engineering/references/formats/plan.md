# Format: plan.md

Written by 03-plan. `verify.js` requires a `## Tasks` heading and at least one `Validate:` line. Derived from ECC's `/plan` PRD artifact.

```markdown
# Plan: <slug>

Source brief: $RUN/01-intake/brief.md
Tier: <tier>
Complexity: <Small|Medium|Large>

## Summary
<two or three sentences>

## Patterns to mirror
| Category | Source | Pattern |
|---|---|---|

## Files to change
| File | Action | Why |
|---|---|---|
| `path` | CREATE / UPDATE / DELETE | |

## Tasks
### Task 1: <name>
- Action: <what to do>
- Mirror: <pattern from research.md>
- Test first: <the test that fails before this task>
- Validate: `<command that proves it>`

### Task 2: ...

## Risks
| Risk | Likelihood | Mitigation |
|---|---|---|

## Acceptance
- [ ] all tasks complete
- [ ] every Validate command passes
- [ ] patterns mirrored, not reinvented

GATE 1: waiting for approval. Edit this file and say "approved", or say what to change.
```
