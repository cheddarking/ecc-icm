# Engineering Workspace

Take a code change from request to commit as one agent that becomes intake clerk, explorer, planner, TDD engineer, reviewer and release clerk by loading one contract at a time.

## Folder Map

```
engineering/
  CLAUDE.md          (you are here)
  CONTEXT.md         (task routing)
  setup/             (questionnaire that writes $PROJECT/.claude/icm.json)
  stages/
    01-intake/       (restate, size, choose the stage mask)
    02-research/     (patterns to mirror, prior art, reuse)
    03-plan/         (vertical-slice task list; GATE 1)
    04-implement/    (red, green, refactor per task)
    05-review/       (correctness, language, security lenses; plan trace)
    06-commit/       (messages and PR body; GATE 2)
    07-learn/        (turn recurring human edits into contract changes)
  references/        (role cards, checklists, output formats, build-fix map)
  shared/            (size tiers, run layout, project config schema)
```

## Triggers

| Keyword | Action |
|---|---|
| `setup` | Ask `setup/questionnaire.md` in one pass, write `$PROJECT/.claude/icm.json` |
| `new <slug>` | `node $PLUGIN/scripts/icm/new.js <slug>` then read `stages/01-intake/CONTEXT.md` |
| `next` | `node $PLUGIN/scripts/icm/run.js <slug> next` then read the printed contract |
| `status` | `node $PLUGIN/scripts/icm/status.js` |

## Routing

| Task | Go To |
|---|---|
| Anything new, or a run with no brief | `stages/01-intake/CONTEXT.md` |
| Brief exists, no research | `stages/02-research/CONTEXT.md` |
| Research exists, no plan | `stages/03-plan/CONTEXT.md` |
| Plan approved | `stages/04-implement/CONTEXT.md` |
| Code written, not reviewed | `stages/05-review/CONTEXT.md` |
| Review clean | `stages/06-commit/CONTEXT.md` |
| Same human edit keeps recurring | `stages/07-learn/CONTEXT.md` |

## What to Load

| Task | Load These | Do NOT Load |
|---|---|---|
| Intake | `shared/size-tiers.md`, `references/checklists/security-trigger.md` | any role file, the library |
| Research | `references/roles/explorer.md` | plan or review references |
| Plan | `references/roles/planner.md`, `references/formats/plan.md` | tdd or reviewer roles |
| Implement | `references/roles/tdd.md`, the language rule the config names | reviewer role, planner role |
| Review | `references/roles/reviewer.md`, `references/roles/security.md` only if the brief says so | tdd role, research file |
| Commit | `references/checklists/commit.md` | everything else |

## Stage Handoffs

Each stage writes to `$RUN/<stage>/`. The next stage reads from there. If you edit an output file, the next stage picks up your edits. Trivial and small tiers skip stages; `shared/size-tiers.md` says which.
