# Stage 02: Tune

Propose the smallest changes that move a measure toward its target. Nothing is applied here.

## Inputs

| Source | File/Location | Section/Scope | Why |
|--------|--------------|---------------|-----|
| Previous stage | `$RUN/01-audit/audit.md` | "Against targets", "Observations" | What is off target |
| Reference | `../../references/budget-targets.md` | Full file | The targets |
| Library | `$PLUGIN/library/skills/context-budget/SKILL.md` | "How It Works", Phase 2 "Classify" and Phase 3 | ECC's classification of always, sometimes, rarely needed |
| Library | `$PLUGIN/library/skills/strategic-compact/SKILL.md` | "Compaction Decision Guide" | When stage boundaries should suggest compaction |
| Reference | `../../references/formats/proposals.md` | Full file | The exact output shape |

## Process

1. `node $PLUGIN/scripts/icm/run.js <slug> 02-tune`.
2. For each measure off target, list candidate changes: unregister a skill, drop or merge a hook, tighten a contract's Inputs table, change a config default, move a reference into the library.
3. Keep the candidate with the best effect per risk. One proposal per row, one file or setting each.
4. Record what was considered and left alone, with the number that says why.
5. Write `proposals.md`. Run `node $PLUGIN/scripts/icm/verify.js <slug> 02-tune`.
6. GATE: present the table and stop. Nothing changes until the human approves rows.

## Checkpoints

| After Step | Agent Presents | Human Decides |
|------------|---------------|---------------|
| 6 | Proposals table | Approve rows, edit, or reject |

## Audit

| Check | Pass Condition |
|-------|---------------|
| One change per row | Every proposal names one file or setting |
| Traceable | Every proposal names the measure it moves |
| Nothing applied | No file outside `$RUN` changed |

## Outputs

| Artifact | Location | Format |
|----------|----------|--------|
| Proposals | `$RUN/02-tune/proposals.md` | `../../references/formats/proposals.md` |

Delegate: no
