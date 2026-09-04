# Research Workspace

Answer a question with cited sources: scope it, gather, synthesise, report. One agent, four stages, sources marked as untrusted content throughout.

## Folder Map

```
research/
  CLAUDE.md          (you are here)
  CONTEXT.md         (task routing)
  setup/             (questionnaire: source policy, default depth, tools available)
  stages/
    01-brief/        (question, scope, what counts as an answer)
    02-gather/       (collect sources; nothing is synthesised yet)
    03-synthesize/   (themes, contradictions, confidence)
    04-report/       (the cited deliverable)
  references/        (source policy, output formats)
```

## Triggers

| Keyword | Action |
|---|---|
| `setup` | Ask `setup/questionnaire.md` in one pass, write the research keys into `$PROJECT/.claude/icm.json` |
| `new <slug>` | `node $PLUGIN/scripts/icm/new.js <slug> --workspace research` then read `stages/01-brief/CONTEXT.md` |
| `status` | `node $PLUGIN/scripts/icm/status.js` |

## Routing

| Task | Go To |
|---|---|
| A new question | `stages/01-brief/CONTEXT.md` |
| Brief agreed, no sources | `stages/02-gather/CONTEXT.md` |
| Sources collected | `stages/03-synthesize/CONTEXT.md` |
| Synthesis reviewed | `stages/04-report/CONTEXT.md` |

## What to Load

| Task | Load These | Do NOT Load |
|---|---|---|
| Brief | `references/source-policy.md` | any library skill |
| Gather | `references/source-policy.md`, the one library skill for the tool in use | synthesis or report formats |
| Synthesize | `references/formats/synthesis.md` | raw pages already summarised in sources.md |
| Report | `references/formats/report.md` | the library |

## Stage Handoffs

Each stage writes to `$RUN/<stage>/`. The next stage reads from there. Edit `brief.md` to change scope, `sources.md` to drop a source, `synthesis.md` to correct a claim; the next stage picks up the edit.
