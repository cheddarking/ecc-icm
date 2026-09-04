# Stage 01: Intake

Restate the request, size it, decide which stages run and whether the security lens is on. This is the direction-setting stage; the human edits here more than anywhere else.

## Inputs

| Source | File/Location | Section/Scope | Why |
|--------|--------------|---------------|-----|
| User | (conversation) | The request and any per-run details | What to build or fix |
| Project config | `$PROJECT/.claude/icm.json` | Full file, if it exists | Languages, commands, gates. If missing, offer `setup` or continue with defaults |
| Reference | `../../shared/size-tiers.md` | Full file | Tier signals and the stage mask per tier |
| Reference | `../../references/checklists/security-trigger.md` | Both tables | Whether 05-review runs the security pass |
| Reference | `../../references/formats/brief.md` | Full file | The exact output shape |

## Process

1. If no run exists, create one: `node $PLUGIN/scripts/icm/new.js <slug>` with a slug that names the task. Then `node $PLUGIN/scripts/icm/run.js <slug> 01-intake`.
2. Restate the request in two sentences using the user's own words. If a per-run detail is missing (constraint, deadline, related ticket, branch), ask for all of them in one message.
3. Score the three tier signals from `size-tiers.md`. Take the highest tier any signal reaches. Apply the tie-breakers.
4. Decide the security lens from the trigger table. When unsure, run the mechanical regex over the files the change will touch.
5. Copy the stage mask for the tier into the `Stages:` line. Write two or three acceptance lines that a person could check without reading code.
6. Present tier, stage mask, security lens and open questions in one short message.
7. Record the tier: `node $PLUGIN/scripts/icm/run.js <slug> 01-intake --tier <tier>`.
8. Write `brief.md` in the format. Run `node $PLUGIN/scripts/icm/verify.js <slug> 01-intake` and fix anything it reports.
9. For trivial tier, move straight to `04-implement`. Otherwise continue with the next stage in the mask.

## Checkpoints

| After Step | Agent Presents | Human Decides |
|------------|---------------|---------------|
| 6 | Tier, stage mask, security lens, open questions | Override the tier or lens, answer questions, or approve as is |

## Audit

| Check | Pass Condition |
|-------|---------------|
| Tier line | `Tier:` is one of trivial, small, standard, large and matches the signals stated |
| Stage mask | `Stages:` equals the mask for that tier in `size-tiers.md` |
| Security lens | `Security lens:` is yes or no, with the trigger area named when yes |
| Acceptance | Every acceptance line is an observable fact, not an activity |
| Scope | The "Out" list names at least one tempting thing that will not change |

## Outputs

| Artifact | Location | Format |
|----------|----------|--------|
| Brief | `$RUN/01-intake/brief.md` | `../../references/formats/brief.md` |

Delegate: no
