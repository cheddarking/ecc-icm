# Format: report.md (security)

```markdown
# Security review: <target>

Date: <date>
Scope: <one paragraph from scope.md>
Method: <scanners run, checklist areas covered>

## Summary
<counts by severity; the single most important finding in one sentence>

## Findings
| # | Severity | Location | Finding | Status (fixed, deferred, accepted) |
|---|---|---|---|---|

## Residual risk
- <what remains and why>

## Not covered
- <areas out of scope or not checked>

## Appendix
- Scanner output: $RUN/02-scan/scan.md
- Triage decisions: $RUN/03-triage/triage.md
```
