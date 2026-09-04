# Security Workspace

Scoped security review of a repository, a diff, or a feature: scope, scan, triage, remediate, report. One agent; findings need proof; code changes are gated.

## Folder Map

```
security/
  CLAUDE.md          (you are here)
  CONTEXT.md         (task routing)
  setup/             (questionnaire: rules of engagement, scanners, compliance regimes)
  stages/
    01-scope/        (target, threat areas, what may be touched)
    02-scan/         (mechanical scanners plus checklist pass; raw findings)
    03-triage/       (dedupe, prove, rate)
    04-remediate/    (fix plan; fixes with tests only after the gate)
    05-report/       (the deliverable)
  references/        (checklist map, output formats)
```

## Triggers

| Keyword | Action |
|---|---|
| `setup` | Ask `setup/questionnaire.md` in one pass, write the security keys into `$PROJECT/.claude/icm.json` |
| `new <slug>` | `node $PLUGIN/scripts/icm/new.js <slug> --workspace security` then read `stages/01-scope/CONTEXT.md` |
| `status` | `node $PLUGIN/scripts/icm/status.js` |

## Routing

| Task | Go To |
|---|---|
| Any security review request | `stages/01-scope/CONTEXT.md` |
| Scope agreed | `stages/02-scan/CONTEXT.md` |
| Raw findings exist | `stages/03-triage/CONTEXT.md` |
| Triaged findings approved | `stages/04-remediate/CONTEXT.md` |
| Remediation done or deferred | `stages/05-report/CONTEXT.md` |

## What to Load

| Task | Load These | Do NOT Load |
|---|---|---|
| Scope | `references/checklist-map.md` "Threat areas" | the checklists themselves |
| Scan | the checklist sections the scope names, one at a time | triage or report formats |
| Triage | `references/formats/triage.md` | scanners |
| Remediate | the engineering role card `$PLUGIN/workspaces/engineering/references/roles/tdd.md` | anything else |
| Report | `references/formats/report.md` | the library |

## Stage Handoffs

Each stage writes to `$RUN/<stage>/`. The next stage reads from there. Delete a row in `triage.md` to dismiss a finding; the remediation stage will not see it.
