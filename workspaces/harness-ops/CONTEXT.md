# Harness-Ops Workspace

The workspace that keeps the other workspaces cheap and honest.

## Task Routing

| Task Type | Go To | Description |
|---|---|---|
| Measure the harness | `stages/01-audit/CONTEXT.md` | Static context, hook inventory, cost per run, edits per stage |
| Decide what to change | `stages/02-tune/CONTEXT.md` | Proposals against targets, gated |
| Change it | `stages/03-apply/CONTEXT.md` | Edit config or contracts, validate, test |
| Improve contracts from human edits | `stages/04-learn/CONTEXT.md` | Cross-workspace edit-source loop |

## Shared Resources

| Resource | Location | Contains |
|---|---|---|
| Targets | `references/budget-targets.md` | The numbers this harness holds itself to |
| Audit sources | `references/audit-sources.md` | The command behind every number in an audit |
| Output formats | `references/formats/` | audit, proposals, applied, learnings |
| Library skills | `$PLUGIN/library/skills/context-budget/SKILL.md`, `$PLUGIN/library/skills/strategic-compact/SKILL.md`, `$PLUGIN/library/skills/agent-harness-construction/SKILL.md` | ECC's own harness tuning knowledge, loaded by section |
