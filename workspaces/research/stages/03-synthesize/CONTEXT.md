# Stage 03: Synthesize

Turn the source table into claims with confidence, themes, and the disagreements between sources.

## Inputs

| Source | File/Location | Section/Scope | Why |
|--------|--------------|---------------|-----|
| Previous stage | `$RUN/02-gather/sources.md` | Source table, as edited by the human | The evidence |
| Earlier stage | `$RUN/01-brief/brief.md` | "What counts as an answer" | What the synthesis must resolve |
| Reference | `../../references/source-policy.md` | "Confidence" | The confidence scale |
| Reference | `../../references/formats/synthesis.md` | Full file | The exact output shape |

## Process

1. `node $PLUGIN/scripts/icm/run.js <slug> 03-synthesize`.
2. Extract claims, one per row, each with the source numbers that support it and a confidence level from the scale.
3. Group claims into three to five themes. Every sentence in a theme carries source numbers.
4. List disagreements between sources with an assessment of which position the evidence favours and why.
5. List gaps: answer criteria no source resolved.
6. Draft the answer to the brief's question with its confidence stated.
7. Write `synthesis.md`. Run `node $PLUGIN/scripts/icm/verify.js <slug> 03-synthesize`. Present the draft answer and pause.

## Checkpoints

| After Step | Agent Presents | Human Decides |
|------------|---------------|---------------|
| 7 | Draft answer, confidence, gaps | Accept, correct a claim, or send back to gather |

## Audit

| Check | Pass Condition |
|-------|---------------|
| Citations | Every claim and every theme sentence has at least one source number that exists in `sources.md` |
| Confidence | Every claim has a level from the scale, applied as defined |
| Inference marked | Sentences without a source number say "inference" |
| Criteria addressed | Every answer criterion is resolved in a claim or listed under gaps |

## Outputs

| Artifact | Location | Format |
|----------|----------|--------|
| Synthesis | `$RUN/03-synthesize/synthesis.md` | `../../references/formats/synthesis.md` |

Delegate: no
