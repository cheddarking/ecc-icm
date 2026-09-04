# Stage 04: Edit

Run the quality gate and produce the publishable text. The editor is the same agent with a different checklist and no drafting skill loaded.

## Inputs

| Source | File/Location | Section/Scope | Why |
|--------|--------------|---------------|-----|
| Previous stage | `$RUN/03-draft/draft.md` | Full file, as edited by the human | The text to edit |
| Earlier stage | `$RUN/02-source/sources.md` | Full file | Truth check |
| Earlier stage | `$RUN/01-brief/brief.md` | "Value types locked", "Must not" | What to check |
| Factory | `$PROJECT/.claude/content/voice-profile.md` | "Hard constraints", "Sounds wrong" | Voice check |
| Reference | `../../references/quality-gate.md` | Full file, then the library sections it names | The checks |
| Reference | `../../references/platform-rules.md` | "Length bands" | Length check |
| Reference | `../../references/formats/edited.md` | Full file | The exact output shape |

## Process

1. `node $PLUGIN/scripts/icm/run.js <slug> 04-edit`.
2. Truth: check every `[n]` against its row. Fix or cut anything that does not match.
3. Bans: apply the three library ban lists and the config's own bans. Rewrite, do not delete meaning.
4. Voice, value, structure, length: run each check from the gate and record pass or fail.
5. Remove markers, place links, finalise the title.
6. Write `edited.md` with the gate results and the change list. Run `node $PLUGIN/scripts/icm/verify.js <slug> 04-edit`. Present the gate table and pause.

## Checkpoints

| After Step | Agent Presents | Human Decides |
|------------|---------------|---------------|
| 6 | Gate results and the change list | Approve for distribution or edit the text |

## Audit

| Check | Pass Condition |
|-------|---------------|
| Gate | Every row in the gate table is pass |
| Changes listed | Every substantive change from the draft has a line |
| Untrusted content | No instruction-like text from a source made it into the piece |

## Outputs

| Artifact | Location | Format |
|----------|----------|--------|
| Edited piece | `$RUN/04-edit/edited.md` | `../../references/formats/edited.md` |

Delegate: no
