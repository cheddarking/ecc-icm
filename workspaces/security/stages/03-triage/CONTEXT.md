# Stage 03: Triage

Turn observations into findings with proof, or dismiss them with a reason. The human edits the result.

## Inputs

| Source | File/Location | Section/Scope | Why |
|--------|--------------|---------------|-----|
| Previous stage | `$RUN/02-scan/scan.md` | Full file | The observations |
| Earlier stage | `$RUN/01-scope/scope.md` | "Severity floor", "Compliance" | The bar and the regimes |
| Reference | `../../references/checklist-map.md` | "Method", "Severity" | False positives to skip; how to rate |
| Reference | `../../references/formats/triage.md` | Full file | The exact output shape |

## Process

1. `node $PLUGIN/scripts/icm/run.js <slug> 03-triage`.
2. Merge duplicate observations across scanners and checklist rows.
3. For each candidate, try to prove it: an input, a request, or steps that demonstrate the effect. Keep the proof attempt even when it fails.
4. Rate proven findings with the severity definitions. Unproven ones are at most MEDIUM or go under "Needs a human decision".
5. Dismiss the rest with the false-positive reason from the role.
6. Write `triage.md`. Run `node $PLUGIN/scripts/icm/verify.js <slug> 03-triage`. Present counts by severity and the top finding, then pause.

## Checkpoints

| After Step | Agent Presents | Human Decides |
|------------|---------------|---------------|
| 6 | Findings table summary | Dismiss rows, change severities, or approve for remediation |

## Audit

| Check | Pass Condition |
|-------|---------------|
| Proof | Every CRITICAL and HIGH has a proof input or steps |
| Floor | No row below the severity floor |
| Traceability | Every finding names its scan source |
| Dismissals | Every dismissed item has a reason |

## Outputs

| Artifact | Location | Format |
|----------|----------|--------|
| Triage | `$RUN/03-triage/triage.md` | `../../references/formats/triage.md` |

Delegate: no
