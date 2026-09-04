# Stage 02: Scan

Run the scanners and walk the checklists for the areas in scope. Record observations verbatim; judge nothing.

## Inputs

| Source | File/Location | Section/Scope | Why |
|--------|--------------|---------------|-----|
| Previous stage | `$RUN/01-scope/scope.md` | Full file | Target, areas, scanners, rules |
| Reference | `../../references/checklist-map.md` | The rows for the areas in scope, one at a time, then "Method" | Which checklist section to load per area |
| Reference | `../../references/formats/scan.md` | Full file | The exact output shape |

## Process

1. `node $PLUGIN/scripts/icm/run.js <slug> 02-scan`.
2. Run each scanner from the scope, if the engagement allows. Keep the last forty lines of output per command, mask any secret values.
3. For each threat area, load only its checklist section and walk the target's entry points against it. Record every observation with `path:line`, without a severity.
4. Record what was not checked and why.
5. Write `scan.md`. Run `node $PLUGIN/scripts/icm/verify.js <slug> 02-scan`.
6. Confirm `git status` shows no change made by this stage.

## Audit

| Check | Pass Condition |
|-------|---------------|
| Coverage | Every threat area in scope has at least one checklist row or a "Not checked" line |
| Verbatim | Scanner sections are unedited apart from masking |
| No changes | The working tree is unchanged by this stage |
| Secrets | No secret value appears in full anywhere in the file |

## Outputs

| Artifact | Location | Format |
|----------|----------|--------|
| Scan | `$RUN/02-scan/scan.md` | `../../references/formats/scan.md` |

Delegate: no
