# Security Workspace

Security review as a pipeline with proof at every finding and a gate before any code changes.

## Task Routing

| Task Type | Go To | Description |
|---|---|---|
| Review a repo, a diff, a feature, or a dependency set for security | `stages/01-scope/CONTEXT.md` | Target, threat areas, rules of engagement |
| Run scanners and the checklists | `stages/02-scan/CONTEXT.md` | Raw findings, tool output kept verbatim |
| Decide what is real | `stages/03-triage/CONTEXT.md` | Dedupe, proof, severity, false positives removed |
| Fix or plan fixes | `stages/04-remediate/CONTEXT.md` | Gated; fixes carry tests |
| Deliver | `stages/05-report/CONTEXT.md` | Report with residual risk |

## Shared Resources

| Resource | Location | Contains |
|---|---|---|
| Checklist map | `references/checklist-map.md` | Threat area to library checklist section |
| Output formats | `references/formats/` | scope, scan, triage, remediation, report |
| Library skills | `$PLUGIN/library/skills/INDEX-security.md` | security-review, security-scan, gateguard, framework-specific security and compliance skills |
| Library role | `$PLUGIN/library/roles/security-reviewer.md` | The reviewer method |
