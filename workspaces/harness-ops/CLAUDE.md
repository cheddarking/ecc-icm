# Harness-Ops Workspace

Audit and tune this harness: what the model sees every turn, what the hooks cost, what the runs cost, and what the human keeps editing. Changes to the harness are gated.

## Folder Map

```
harness-ops/
  CLAUDE.md          (you are here)
  CONTEXT.md         (task routing)
  stages/
    01-audit/        (measure: static context, hooks, cost log, edit log)
    02-tune/         (proposals against the targets; GATE)
    03-apply/        (apply approved changes; validate; test)
    04-learn/        (edit-source loop across every workspace)
  references/        (targets, where each number comes from, output formats)
```

## Triggers

| Keyword | Action |
|---|---|
| `new <slug>` | `node $PLUGIN/scripts/icm/new.js <slug> --workspace harness-ops` then read `stages/01-audit/CONTEXT.md` |
| `budget` | `node $PLUGIN/scripts/icm/context-budget.js $PLUGIN` |
| `status` | `node $PLUGIN/scripts/icm/status.js` |

## Routing

| Task | Go To |
|---|---|
| "Why is context filling up", "what does the harness cost", "audit the plugin" | `stages/01-audit/CONTEXT.md` |
| Audit exists | `stages/02-tune/CONTEXT.md` |
| Proposals approved | `stages/03-apply/CONTEXT.md` |
| "The same edit keeps happening" across workspaces | `stages/04-learn/CONTEXT.md` |

## What to Load

| Task | Load These | Do NOT Load |
|---|---|---|
| Audit | `references/audit-sources.md` | the library, any workspace contract |
| Tune | `references/budget-targets.md` | anything under `library/` |
| Apply | the one file each approved proposal names | everything else |
| Learn | `references/formats/learnings.md` | the library |

## Stage Handoffs

Each stage writes to `$RUN/<stage>/`. The next stage reads from there. This workspace has no setup; it reads the project config the others wrote.
