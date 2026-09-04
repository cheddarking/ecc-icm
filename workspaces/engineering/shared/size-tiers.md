# Size Tiers

Ceremony scales to blast radius. Score the request on three signals, take the highest tier any signal reaches, state it in one line so the human can override. Adapted from ECC's orch-pipeline classifier.

| Tier | Files touched | New dependency or contract | Design ambiguity |
|---|---|---|---|
| trivial | 1, a few lines | none | none, the change is obvious |
| small | 1 file or 1 function | none | clear once you read the code |
| standard | 2 to 5 files | maybe a new internal module | one real choice to make |
| large | many or cross-cutting | new external dependency, public API, or a spec document | several open questions |

Tie-breakers: anything that trips the security trigger (`../references/checklists/security-trigger.md`) or touches a public API or contract is at least standard.

## Stage mask per tier

| Tier | Stages that run | Notes |
|---|---|---|
| trivial | 04-implement, 05-review, 06-commit | intake writes the brief and moves straight on |
| small | 02-research (one pass, no delegation), 04-implement, 05-review, 06-commit | no separate plan; the brief carries the task |
| standard | 01 through 06 | GATE 1 after 03-plan, GATE 2 before 06-commit |
| large | 01 through 06, with the 03-plan checkpoint on architecture options | GATE 1 and GATE 2 |

07-learn is optional at every tier and runs only when the human asks or when the same edit has recurred three times.

## Writing the tier into the brief

The brief line is exactly `Tier: <trivial|small|standard|large>` followed by `Stages: <comma-separated stage folders>`. `verify.js` checks both lines.
