# Stage 04: Report

Write the cited deliverable from the reviewed synthesis. No new research here.

## Inputs

| Source | File/Location | Section/Scope | Why |
|--------|--------------|---------------|-----|
| Previous stage | `$RUN/03-synthesize/synthesis.md` | Full file, as edited by the human | The claims, themes, answer |
| Earlier stage | `$RUN/02-gather/sources.md` | Source table | The numbered source list |
| Earlier stage | `$RUN/01-brief/brief.md` | "Question", "Why it matters" | Framing |
| Project config | `$PROJECT/.claude/icm.json` | `research.citation` | Citation style |
| Reference | `../../references/formats/report.md` | Full file | The exact output shape |

## Process

1. `node $PLUGIN/scripts/icm/run.js <slug> 04-report`.
2. Write the executive summary from the draft answer. Confidence stated in the first paragraph.
3. Write one section per theme, keeping every source number.
4. Write key takeaways, gaps and caveats, the source list in the configured style, and the methodology.
5. Check every source number in the text against the list. Remove any claim whose source was dropped in gather.
6. Write `report.md`. Run `node $PLUGIN/scripts/icm/verify.js <slug> 04-report`. Close the run with `node $PLUGIN/scripts/icm/run.js <slug> --done`.

## Audit

| Check | Pass Condition |
|-------|---------------|
| Citation integrity | Every number in the text exists in Sources; every source is cited at least once or listed under methodology as consulted |
| No new claims | Every claim in the report appears in `synthesis.md` |
| Gaps kept | The gaps section matches the synthesis gaps |

## Outputs

| Artifact | Location | Format |
|----------|----------|--------|
| Report | `$RUN/04-report/report.md` | `../../references/formats/report.md` |

Delegate: no
