# Stage 03: Apply

Apply the approved proposals one at a time, validate after each, re-measure at the end.

## Inputs

| Source | File/Location | Section/Scope | Why |
|--------|--------------|---------------|-----|
| Previous stage | `$RUN/02-tune/proposals.md` | The rows the human approved | What to change |
| Earlier stage | `$RUN/01-audit/audit.md` | "Against targets" | The before numbers |
| Reference | `../../references/formats/applied.md` | Full file | The exact output shape |

## Process

1. `node $PLUGIN/scripts/icm/run.js <slug> 03-apply`.
2. For each approved row in order: open only the file it names, make the change, run `node $PLUGIN/scripts/icm/validate-workspace.js --all` when a workspace file changed, and `npm test` in `$PLUGIN` when a script or hook changed.
3. If a validation fails, revert that change and record it under "Rolled back".
4. Re-run the audit commands for every measure a proposal targeted. Fill "Re-measured".
5. Write `applied.md`. Run `node $PLUGIN/scripts/icm/verify.js <slug> 03-apply`. Close the run with `node $PLUGIN/scripts/icm/run.js <slug> --done`.

## Audit

| Check | Pass Condition |
|-------|---------------|
| Scope | Only files named by approved proposals changed |
| Validation | `validate-workspace.js --all` reports 0 errors; `npm test` passes when scripts changed |
| Re-measured | Every targeted measure has a before and an after |

## Outputs

| Artifact | Location | Format |
|----------|----------|--------|
| Applied | `$RUN/03-apply/applied.md` | `../../references/formats/applied.md` |

Delegate: no
