# Stage 01: Audit

Measure the harness. Every number has a command beside it.

## Inputs

| Source | File/Location | Section/Scope | Why |
|--------|--------------|---------------|-----|
| Reference | `../../references/audit-sources.md` | Full file | The command behind each number |
| Reference | `../../references/budget-targets.md` | Full file | What to compare against |
| Cost log | `$PROJECT/.claude/runs/_cost.jsonl` | Full file, if present | Tokens and Agent tool uses per run |
| Edit log | `$PROJECT/.claude/runs/_edits.jsonl` | Full file, if present | Human edits per stage |
| Reference | `../../references/formats/audit.md` | Full file | The exact output shape |

## Process

1. `node $PLUGIN/scripts/icm/new.js <slug> --workspace harness-ops` if no run exists, then `node $PLUGIN/scripts/icm/run.js <slug> 01-audit`.
2. Run `context-budget.js` on this plugin. Run `claude plugin list` and `claude plugin details` for each other enabled plugin. Count the CLAUDE.md chain and rules files by chars divided by four.
3. Inventory hooks from the plugin and from the user and project settings. Note any that call a model.
4. Summarise `_cost.jsonl` by run and stage: tokens, Agent tool uses. Summarise `_edits.jsonl` by workspace and stage.
5. Fill the "Against targets" table. Write observations, one line each, each with its number.
6. Write `audit.md`. Run `node $PLUGIN/scripts/icm/verify.js <slug> 01-audit`. Present the targets table and pause.

## Checkpoints

| After Step | Agent Presents | Human Decides |
|------------|---------------|---------------|
| 6 | The targets table | Which measures to tune first, or stop here |

## Audit

| Check | Pass Condition |
|-------|---------------|
| Provenance | Every number has a command or file beside it |
| Targets | Every measure in `budget-targets.md` has an actual value or "not measurable here" with a reason |
| No changes | Nothing was modified by this stage |

## Outputs

| Artifact | Location | Format |
|----------|----------|--------|
| Audit | `$RUN/01-audit/audit.md` | `../../references/formats/audit.md` |

Delegate: no
