# Stage 07: Learn

Turn recurring human edits of stage outputs into proposed changes to the contract or reference that produced them. Editing the output fixes one run; editing the source fixes every run.

## Inputs

| Source | File/Location | Section/Scope | Why |
|--------|--------------|---------------|-----|
| Edit log | `$PROJECT/.claude/runs/_edits.jsonl` | Full file | Human edits recorded by `run.js` when a later stage started |
| Runs | `$PROJECT/.claude/runs/*/` | Stage artifacts and their `.agent/` copies | Where the log is missing, diff the artifact against the agent's copy |
| Sources | `../../stages/*/CONTEXT.md`, `../../references/`, `../../shared/` | The file a proposal targets | These are the only files a proposal may change |
| Reference | `../../references/formats/learnings.md` | Full file | The exact output shape |

## Process

1. `node $PLUGIN/scripts/icm/run.js <slug> 07-learn`.
2. Read the edit log. Group edits by stage and by kind: tightened wording, removed section, added constraint, reordered tasks, dismissed finding, changed severity.
3. Keep a kind when it recurs in three or more runs, or when the human asked about it directly. Everything else goes under "Not proposed".
4. For each kept kind, find the source line that would have produced the edited version had it been different: a process step, an audit row, a format field, a role card sentence, a size-tier rule.
5. Write the proposal as the exact text change to that one file. State which recurring edit it removes and what could get worse.
6. Write `learnings.md`. Run `node $PLUGIN/scripts/icm/verify.js <slug> 07-learn`.
7. Present the proposals. Do not edit any contract, reference or shared file yourself. The human applies what they accept.

## Checkpoints

| After Step | Agent Presents | Human Decides |
|------------|---------------|---------------|
| 7 | Proposed source changes | Apply, edit, or reject each |

## Audit

| Check | Pass Condition |
|-------|---------------|
| One file per proposal | Every proposal names exactly one source file and an exact change |
| Sources only | No proposal changes a run artifact or the library |
| Recurrence stated | Every proposal lists the runs where the edit recurred |
| Nothing applied | The workspace files are unchanged by this stage |

## Outputs

| Artifact | Location | Format |
|----------|----------|--------|
| Learnings | `$RUN/07-learn/learnings.md` | `../../references/formats/learnings.md` |

Delegate: no
