# Stage 05: Review

Review the diff in three sequential passes inside this one context: correctness, language idiom, and security when the brief says so. Trace the diff back to the plan.

## Inputs

| Source | File/Location | Section/Scope | Why |
|--------|--------------|---------------|-----|
| Working | `git diff <base>` plus `git diff` for uncommitted changes | Full diff | The change under review; base is the branch point named in the brief or `main` |
| Earlier stage | `$RUN/03-plan/plan.md` | "Tasks" | Cross-stage trace: does the diff implement the plan |
| Earlier stage | `$RUN/01-intake/brief.md` | `Security lens:` line, "Acceptance" | Whether pass three runs; what done means |
| Earlier stage | `$RUN/04-implement/log.md` | "Unplanned changes", "Open items" | What the implementer already flagged |
| Project config | `$PROJECT/.claude/icm.json` | `languages`, `review_min_severity` | Which lens files; the severity floor |
| Role | `../../references/roles/reviewer.md` | Full file, then the library sections it names | Passes one and two, proof standard, language lens table |
| Role | `../../references/roles/security.md` | Full file, only when the lens is yes | Pass three |
| Reference | `../../references/formats/review.md` | Full file | The exact output shape |

## Process

1. `node $PLUGIN/scripts/icm/run.js <slug> 05-review`. Gather the diff once. List every changed file with one line on what changed.
2. Pass one, correctness: for each candidate finding, quote the line and state the input that makes it fail. Drop anything you cannot prove.
3. Pass two, language: load the lens file for each project language and apply its first section.
4. Pass three, security: only if `Security lens: yes`. Load the security role. Secrets in the diff stop the run.
5. Trace: mark every plan task implemented, partial or missing with evidence. List every change not in the plan and whether `log.md` justified it.
6. Set the verdict. Write `review.md`. Run `node $PLUGIN/scripts/icm/verify.js <slug> 05-review`.
7. If any CRITICAL or HIGH is open: write the open rows into `$RUN/04-implement/rework.md`, run `node $PLUGIN/scripts/icm/run.js <slug> 04-implement`, and go back to that contract.
8. Otherwise present `review.md` and stop. The human deletes rows to dismiss findings or adds notes to accept a risk, then says continue.

## Checkpoints

| After Step | Agent Presents | Human Decides |
|------------|---------------|---------------|
| 8 | The review with its verdict | Dismiss, accept, or send back to implement |

## Audit

| Check | Pass Condition |
|-------|---------------|
| Proof | Every HIGH or CRITICAL row has a quoted line and a failing input |
| Trace complete | Every plan task has a status and evidence |
| Unplanned changes | Every unplanned change is listed with its justification status |
| Severity floor | No row below `review_min_severity` |
| Single context | Agent tool uses during this stage: 0 |

## Outputs

| Artifact | Location | Format |
|----------|----------|--------|
| Review | `$RUN/05-review/review.md` | `../../references/formats/review.md` |
| Rework list | `$RUN/04-implement/rework.md` | Only when findings block; the open rows of the Findings table |

Delegate: no
