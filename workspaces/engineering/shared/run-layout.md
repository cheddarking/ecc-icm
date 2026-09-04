# Run Layout

A run is one task. `new.js` creates it; every stage writes one artifact into its own folder; a human may edit any artifact before the next stage reads it.

```
$PROJECT/.claude/runs/
  <slug>/
    run.json                 (slug, workspace, tier, stage, per-stage timestamps, completed)
    01-intake/brief.md
    02-research/research.md
    03-plan/plan.md
    04-implement/log.md      (code lands in the repository, not here)
    05-review/review.md
    06-commit/commit.md
    07-learn/learnings.md
    <stage>/verify.md        (written by verify.js; not an output)
  _cost.jsonl                (one line per response: tokens, model, Agent tool uses, run, stage)
  _edits.jsonl               (07-learn: human edits to outputs, appended at each gate)
```

## Conventions

- Slugs are lowercase-with-hyphens and name the task: `add-rate-limit`, `fix-null-cursor`.
- One artifact per stage, named as above. Extra files in a stage folder are allowed but the named one is what the next stage reads.
- A stage counts as COMPLETE when its folder holds any file other than `.gitkeep` and `verify.md`.
- `run.json.stage` is the current stage. `run.js` sets it; `agent-gate.js` reads it to decide whether delegation is allowed.
- Commit `.claude/runs/` if you want the pipeline's history in git. Ignore it if you do not. `_cost.jsonl` is safe to commit; it holds counts, not content.

## Editing between stages

Open the artifact, change it, save. Do not tell the agent what you changed; the next stage reads the file as it is. If the change is one you keep making, 07-learn turns it into a contract change.
