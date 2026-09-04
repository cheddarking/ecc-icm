# Stage 05: Report

Write the deliverable from the triage and remediation files. No new findings here.

## Inputs

| Source | File/Location | Section/Scope | Why |
|--------|--------------|---------------|-----|
| Previous stage | `$RUN/04-remediate/remediation.md` | Full file | Status per finding |
| Earlier stage | `$RUN/03-triage/triage.md` | "Findings" | The findings |
| Earlier stage | `$RUN/01-scope/scope.md` | Full file | Scope and method paragraph |
| Project config | `$PROJECT/.claude/icm.json` | `security.report_dir` | Where a copy goes, if anywhere |
| Reference | `../../references/formats/report.md` | Full file | The exact output shape |

## Process

1. `node $PLUGIN/scripts/icm/run.js <slug> 05-report`.
2. Write the summary: counts by severity and the one finding that matters most.
3. Fill the findings table with status from remediation. Write residual risk from deferred and accepted items.
4. Write "Not covered" from the scope exclusions and the scan's "Not checked".
5. Write `report.md`. Copy it to `security.report_dir` if configured. Run `node $PLUGIN/scripts/icm/verify.js <slug> 05-report`. Close the run with `node $PLUGIN/scripts/icm/run.js <slug> --done`.

## Audit

| Check | Pass Condition |
|-------|---------------|
| Consistency | Every finding in the report exists in triage with the same severity |
| Status | Every finding has a status from remediation |
| Secrets | No secret value appears in the report |

## Outputs

| Artifact | Location | Format |
|----------|----------|--------|
| Report | `$RUN/05-report/report.md` | `../../references/formats/report.md` |

Delegate: no
