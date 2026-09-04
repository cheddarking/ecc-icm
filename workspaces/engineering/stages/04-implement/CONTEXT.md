# Stage 04: Implement

Execute the approved plan one task at a time with tests first. Code lands in the repository; the evidence lands in `log.md`.

## Inputs

| Source | File/Location | Section/Scope | Why |
|--------|--------------|---------------|-----|
| Previous stage | `$RUN/03-plan/plan.md` | "Tasks", "Files to change" | The work, as the human left it after GATE 1 |
| Earlier stage | `$RUN/01-intake/brief.md` | "Acceptance", `Tier:` line | What done means; trivial tier has no plan, so the brief is the task |
| Rework | `$RUN/04-implement/rework.md` | Full file, only if present | Open findings sent back by 05-review |
| Project config | `$PROJECT/.claude/icm.json` | `test`, `lint`, `languages`, `package_manager` | Commands and rule sets |
| Role | `../../references/roles/tdd.md` | Full file, then the library sections it names | Red, green, refactor discipline |
| Reference | `../../references/build-fix.md` | Full file, only when a build breaks | Which resolver role to load |
| Reference | `../../references/formats/log.md` | Full file | The exact output shape |

## Process

1. `node $PLUGIN/scripts/icm/run.js <slug> 04-implement`. Detect the test runner as the tdd role says; write the command at the top of `log.md`.
2. If `rework.md` exists, treat its rows as the first tasks.
3. For each task in order: write the failing test, run it and record the failure; write the minimal code; run it and record the pass; refactor if needed; run the task's Validate command; append the task block to `log.md`.
4. On a build or type error, load `build-fix.md`, apply the smallest fix, record it under "Build breaks". Never change linter, formatter or hook config.
5. If a task turns out wrong or impossible as written, stop, record why in "Open items", and ask. Do not re-plan silently.
6. After the last task, run the project's `test` and `lint` commands. Record results and coverage if measured.
7. Run `node $PLUGIN/scripts/icm/verify.js <slug> 04-implement`. Fix failures before moving on.
8. Continue to 05-review. The reviewer sees the whole diff; keep unplanned changes listed and justified in `log.md`.

## Audit

| Check | Pass Condition |
|-------|---------------|
| Evidence per task | Every task block has a Red result, a Green result and a Validate result |
| Tests green | The project's `test` command exits 0 |
| Lint clean | The project's `lint` command exits 0 when configured |
| Unplanned changes | Every changed file not named in the plan is listed with a reason |
| Config untouched | No linter, formatter or hook configuration file changed |
| Scope | Nothing from the brief's "Out" list was implemented |

## Outputs

| Artifact | Location | Format |
|----------|----------|--------|
| Code | the repository working tree | as planned |
| Log | `$RUN/04-implement/log.md` | `../../references/formats/log.md` |

Delegate: no
