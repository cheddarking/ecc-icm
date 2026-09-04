# Stage 04: Learn

The edit-source loop across every workspace: recurring human edits of any stage output become proposed changes to the contract or reference that produced them.

## Inputs

| Source | File/Location | Section/Scope | Why |
|--------|--------------|---------------|-----|
| Edit log | `$PROJECT/.claude/runs/_edits.jsonl` | Full file | Recorded human edits, with the diff |
| Runs | `$PROJECT/.claude/runs/*/` | Artifacts and `.agent/` copies where the log is missing | Fallback diffs |
| Sources | `$PLUGIN/workspaces/*/stages/*/CONTEXT.md`, `$PLUGIN/workspaces/*/references/`, `$PLUGIN/workspaces/*/shared/` | The file a proposal targets | The only files a proposal may change |
| Reference | `../../references/formats/learnings.md` | Full file | The exact output shape |

## Process

1. `node $PLUGIN/scripts/icm/run.js <slug> 04-learn`.
2. Group edits by workspace, stage and kind. Keep kinds seen in three or more runs, or that the human asked about.
3. For each kept kind, find the source line that would have produced the edited version had it been different.
4. Write each proposal as the exact change to one file, with the recurring edit it removes and the risk.
5. Write `learnings.md`. Run `node $PLUGIN/scripts/icm/verify.js <slug> 04-learn`. Present the proposals. Do not apply them; the human applies what they accept, or runs 02-tune and 03-apply with them.

## Checkpoints

| After Step | Agent Presents | Human Decides |
|------------|---------------|---------------|
| 5 | Proposed source changes | Apply, edit, or reject each |

## Audit

| Check | Pass Condition |
|-------|---------------|
| One file per proposal | Every proposal names exactly one source file and an exact change |
| Sources only | No proposal changes a run artifact or the library |
| Recurrence stated | Every proposal lists the runs where the edit recurred |
| Nothing applied | No workspace file changed in this stage |

## Outputs

| Artifact | Location | Format |
|----------|----------|--------|
| Learnings | `$RUN/04-learn/learnings.md` | `../../references/formats/learnings.md` |

Delegate: no
