# Stage 01: Brief

Decide what the piece is, who it is for, where it goes, and which value it must deliver.

## Inputs

| Source | File/Location | Section/Scope | Why |
|--------|--------------|---------------|-----|
| User | (conversation) | Topic, platform, anything they already have | What to make |
| Project config | `$PROJECT/.claude/icm.json` | `content` key | Audience, platforms, value types, posting mode |
| Reference | `../../references/value-types.md` | Full file | The value validation list |
| Reference | `../../references/formats/brief.md` | Full file | The exact output shape |

## Process

1. `node $PLUGIN/scripts/icm/new.js <slug> --workspace content` if no run exists, then `node $PLUGIN/scripts/icm/run.js <slug> 01-brief`.
2. Name the piece type and primary platform. Ask in one message for anything missing: the point, must-include material, must-not list.
3. Write the point as one sentence a reader could repeat. Write the angle: why this and not the obvious version.
4. Lock one to three value types and say which sentence or section will deliver each.
5. Present the brief in five lines and pause.
6. Write `brief.md`. Run `node $PLUGIN/scripts/icm/verify.js <slug> 01-brief`.

## Checkpoints

| After Step | Agent Presents | Human Decides |
|------------|---------------|---------------|
| 5 | Point, angle, value types, platforms | Redirect or approve |

## Audit

| Check | Pass Condition |
|-------|---------------|
| The point | One sentence, no "and", repeatable |
| Value types | One to three, each with a planned carrier |
| Platform | Primary platform is in the config's list or the user named it |

## Outputs

| Artifact | Location | Format |
|----------|----------|--------|
| Brief | `$RUN/01-brief/brief.md` | `../../references/formats/brief.md` |

Delegate: no
