# Stage 03: Draft

Write the piece in the voice profile, to the brief, from the sources. One pass, then an audit.

## Inputs

| Source | File/Location | Section/Scope | Why |
|--------|--------------|---------------|-----|
| Previous stage | `$RUN/02-source/sources.md` | Full file | The only material allowed |
| Earlier stage | `$RUN/01-brief/brief.md` | Full file | Point, angle, value types, must-not |
| Factory | `$PROJECT/.claude/content/voice-profile.md` | Full file | Constraints to internalise before writing |
| Library | `$PLUGIN/library/skills/article-writing/SKILL.md` | "Writing Process", "Structure Guidance" for long-form pieces | Method |
| Library | `$PLUGIN/library/skills/content-engine/SKILL.md` | "Source-First Workflow", "Platform Adaptation Rules" for short-form pieces | Method |
| Reference | `../../references/formats/draft.md` | Full file | The exact output shape |

## Process

1. `node $PLUGIN/scripts/icm/run.js <slug> 03-draft`.
2. Read the voice profile first and the sources second. Load only the one library skill section for the piece type.
3. Outline: the point in the first three sentences, sections that earn headings, an ending that does not summarise.
4. Write the full piece in one pass. Put a `[n]` marker on every fact, number and quote.
5. Audit against the voice profile's "Sounds wrong" list and hard constraints. Rewrite offending sentences.
6. Write `draft.md` with the footer. Run `node $PLUGIN/scripts/icm/verify.js <slug> 03-draft`. Present the opening and pause.

## Checkpoints

| After Step | Agent Presents | Human Decides |
|------------|---------------|---------------|
| 6 | The first hundred words and the section list | Continue to edit, or redirect the angle |

## Audit

| Check | Pass Condition |
|-------|---------------|
| Markers | Every fact, number and quote has a `[n]` that exists in `sources.md` |
| Voice | No sentence matches a "Sounds wrong" example; hard constraints hold |
| Must-not | Nothing from the brief's must-not list appears |
| Value | Each locked value type has its carrier sentence or section named in the footer |

## Outputs

| Artifact | Location | Format |
|----------|----------|--------|
| Draft | `$RUN/03-draft/draft.md` | `../../references/formats/draft.md` |

Delegate: no
