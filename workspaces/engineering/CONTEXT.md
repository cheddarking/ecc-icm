# Engineering Workspace

Code changes of any size: features, fixes, refactors, reviews, commits. Sequential, human-gated, one agent.

## Task Routing

| Task Type | Go To | Description |
|---|---|---|
| New feature, bug fix, refactor, or any request without a run | `stages/01-intake/CONTEXT.md` | Restate, classify size, set the stage mask and security lens |
| Understand the code before planning | `stages/02-research/CONTEXT.md` | Patterns to mirror with file:line, libraries, reusable code |
| Produce the task list | `stages/03-plan/CONTEXT.md` | Vertical slices with a Validate command each; GATE 1 |
| Write the code | `stages/04-implement/CONTEXT.md` | Red, green, refactor per task; build-fix on breaks |
| Review a diff (this run's or an external one) | `stages/05-review/CONTEXT.md` | Correctness, language idiom, optional security lens; plan trace |
| Commit and open a PR | `stages/06-commit/CONTEXT.md` | Messages, PR body; GATE 2 |
| Improve the contracts from repeated human edits | `stages/07-learn/CONTEXT.md` | Edit-source loop |

## Shared Resources

| Resource | Location | Contains |
|---|---|---|
| Size tiers and stage masks | `shared/size-tiers.md` | trivial, small, standard, large and which stages each runs |
| Run layout | `shared/run-layout.md` | `$RUN` folder shape, run.json fields, cost log |
| Project config schema | `shared/project-config.md` | keys of `$PROJECT/.claude/icm.json` |
| Role cards | `references/roles/` | short cards that point into `$PLUGIN/library/roles/` by section |
| Output formats | `references/formats/` | the exact shape each stage writes and `verify.js` checks |
| Checklists | `references/checklists/` | security trigger, commit |
| Build-fix map | `references/build-fix.md` | language to build-resolver role file |
| Library | `$PLUGIN/library/CONTEXT.md` | skills, rules, roles, procedures by domain |
