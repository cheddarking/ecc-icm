# Stage 03: Plan

Turn the brief and research into a task list of vertical slices, each with a command that proves it done. Ends at GATE 1.

## Inputs

| Source | File/Location | Section/Scope | Why |
|--------|--------------|---------------|-----|
| Previous stage | `$RUN/02-research/research.md` | Full file | Patterns to mirror, reuse, risks |
| Earlier stage | `$RUN/01-intake/brief.md` | "Scope", "Acceptance", `Tier:` line | What the plan must cover and not exceed |
| Project config | `$PROJECT/.claude/icm.json` | `test`, `gates` | Validate commands; whether GATE 1 is a hard stop |
| Role | `../../references/roles/planner.md` | Full file, then the library sections it names | How to plan |
| Reference | `../../references/formats/plan.md` | Full file | The exact output shape |

## Process

1. `node $PLUGIN/scripts/icm/run.js <slug> 03-plan`.
2. Read the research and the brief. Do not re-explore the repository; if research is missing something, note it as a risk or go back to 02-research.
3. Large tier only: write two or three architecture options with one trade-off line each and stop for the checkpoint.
4. List the files to create, update or delete, each with a reason.
5. Write the tasks as vertical slices in dependency order. Each task names the failing test it starts with and the Validate command that proves it. Use the project's `test` command where a narrower one does not exist.
6. Fill the risks table. Copy the acceptance lines from the brief into the acceptance checklist.
7. Write `plan.md`. Run `node $PLUGIN/scripts/icm/verify.js <slug> 03-plan`.
8. GATE 1: present the path to `plan.md` and a five-line summary. Stop. Do not write code. When the human says approved, or edits the file and says so, continue to 04-implement using the file as it is then.

## Checkpoints

| After Step | Agent Presents | Human Decides |
|------------|---------------|---------------|
| 3 (large tier) | Architecture options with trade-offs | Which option the plan follows |
| 8 | The plan | Approve, edit the file, or send back |

## Audit

| Check | Pass Condition |
|-------|---------------|
| Validate lines | Every task has a `Validate:` line with a runnable command |
| Test first | Every task names the test that fails before it |
| File coverage | Every file in "Files to change" appears in at least one task |
| Mirrors research | Every "Mirror:" line points at a row of `research.md` |
| No config weakening | No task edits linter, formatter or hook configuration |
| Scope | No task delivers anything from the brief's "Out" list |

## Outputs

| Artifact | Location | Format |
|----------|----------|--------|
| Plan | `$RUN/03-plan/plan.md` | `../../references/formats/plan.md` |

Delegate: no
