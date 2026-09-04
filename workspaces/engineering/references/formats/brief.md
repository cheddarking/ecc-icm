# Format: brief.md

Written by 01-intake. `verify.js` requires the `Tier:`, `Stages:` and `Security lens:` lines exactly as shown.

```markdown
# Brief: <slug>

Request: <one or two sentences in the user's words, cleaned up>

Tier: <trivial|small|standard|large>
Stages: <comma-separated stage folders that will run>
Security lens: <yes|no>
Languages: <from .claude/icm.json, or detected>

## Scope
- In: <what will change>
- Out: <what will not change, even if tempting>

## Acceptance
- <observable fact that is true when done>
- <another>

## Open questions
- <question for the human, or "none">

## Per-run details
<anything the user said that later stages need: constraints, deadlines, related tickets>
```
