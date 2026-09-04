# Format: scope.md

```markdown
# Security scope: <slug>

Target: <repo path | diff base..head | feature or module list>
Engagement: <read only | run scanners | run scanners and change code after the gate>
Compliance: <regimes or none>
Severity floor: <level>

## Threat areas in scope
| Area | Why it applies here | Entry points (path:line) |
|---|---|---|

## Out of scope
- <areas or paths deliberately excluded>

## Scanners to run
| Command | Purpose |
|---|---|

## Rules
- Nothing is changed during scan and triage.
- Secrets found are reported, never printed in full, never committed.
```
