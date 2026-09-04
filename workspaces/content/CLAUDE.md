# Content Workspace

Articles, posts, scripts and campaigns in a voice derived from real examples, then adapted per platform. Publishing is outward-facing and always gated.

## Folder Map

```
content/
  CLAUDE.md          (you are here)
  CONTEXT.md         (task routing)
  setup/             (questionnaire: builds the voice profile once)
  stages/
    01-brief/        (piece, audience, platform, value types)
    02-source/       (facts and examples the piece will use)
    03-draft/        (the piece, in the voice)
    04-edit/         (quality gate: bans, structure, truth)
    05-distribute/   (per-platform variants; GATE before posting)
  references/        (voice profile schema, quality gate, output formats)
```

## Triggers

| Keyword | Action |
|---|---|
| `setup` | Ask `setup/questionnaire.md` in one pass, build `$PROJECT/.claude/content/voice-profile.md`, write the content keys into `$PROJECT/.claude/icm.json` |
| `new <slug>` | `node $PLUGIN/scripts/icm/new.js <slug> --workspace content` then read `stages/01-brief/CONTEXT.md` |
| `status` | `node $PLUGIN/scripts/icm/status.js` |

## Routing

| Task | Go To |
|---|---|
| A new piece of any kind | `stages/01-brief/CONTEXT.md` |
| Brief agreed, no material | `stages/02-source/CONTEXT.md` |
| Material collected | `stages/03-draft/CONTEXT.md` |
| Draft exists | `stages/04-edit/CONTEXT.md` |
| Edited piece approved | `stages/05-distribute/CONTEXT.md` |

## What to Load

| Task | Load These | Do NOT Load |
|---|---|---|
| Brief | `references/value-types.md` | the voice profile, any skill |
| Source | nothing from the library unless a research tool is needed | draft skills |
| Draft | `$PROJECT/.claude/content/voice-profile.md`, one drafting skill section | quality gate, distribution rules |
| Edit | `references/quality-gate.md` | the drafting skill |
| Distribute | `references/platform-rules.md` | drafting or editing references |

## Stage Handoffs

Each stage writes to `$RUN/<stage>/`. The next stage reads from there. The voice profile is factory configuration: change it once in setup, not per piece.
