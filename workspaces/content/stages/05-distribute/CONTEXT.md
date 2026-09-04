# Stage 05: Distribute

Make one native variant per platform and stop at the gate. Posting is outward-facing; it happens only per approved variant, and only if the config allows it.

## Inputs

| Source | File/Location | Section/Scope | Why |
|--------|--------------|---------------|-----|
| Previous stage | `$RUN/04-edit/edited.md` | The piece, as approved | The canonical text |
| Earlier stage | `$RUN/01-brief/brief.md` | "Primary platform", "Also for" | Which variants to make |
| Project config | `$PROJECT/.claude/icm.json` | `content.posting`, `content.platforms` | Whether posting is allowed at all |
| Reference | `../../references/platform-rules.md` | Full file, then the library sections it names | Adaptation and posting order |
| Reference | `../../references/formats/distribution.md` | Full file | The exact output shape |

## Process

1. `node $PLUGIN/scripts/icm/run.js <slug> 05-distribute`.
2. For each platform in the brief, derive a native variant in the repurposing order from the content-engine skill. Never reuse the same text on two platforms.
3. Check each variant against its length band and the crosspost core rules.
4. Write `distribution.md` with every variant and an empty schedule table.
5. GATE: present the variants and stop. Do not post.
6. If the config says "post after approval" and the human approved specific variants: post those, in the posting order, and record URLs in the schedule table. Otherwise leave the file as the deliverable.
7. Close the run: `node $PLUGIN/scripts/icm/run.js <slug> --done`.

## Checkpoints

| After Step | Agent Presents | Human Decides |
|------------|---------------|---------------|
| 5 | Every variant | Approve per platform, edit, or hold |

## Audit

| Check | Pass Condition |
|-------|---------------|
| Native | No two variants share more than one identical sentence |
| Length | Every variant is inside its band |
| Gate honoured | No post happened before approval; with "prepare only", none happened at all |
| Record | Every posted variant has a URL in the schedule table |

## Outputs

| Artifact | Location | Format |
|----------|----------|--------|
| Distribution | `$RUN/05-distribute/distribution.md` | `../../references/formats/distribution.md` |

Delegate: no
