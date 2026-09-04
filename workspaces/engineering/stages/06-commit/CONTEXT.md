# Stage 06: Commit

Group the change into logical commits, write the messages and the PR body, and stop at GATE 2. Nothing reaches git until the human says so.

## Inputs

| Source | File/Location | Section/Scope | Why |
|--------|--------------|---------------|-----|
| Previous stage | `$RUN/05-review/review.md` | "Verdict", "Findings" | Must be APPROVE with no open CRITICAL or HIGH |
| Earlier stage | `$RUN/04-implement/log.md` | Full file | What changed and why, for the messages |
| Earlier stage | `$RUN/01-intake/brief.md` | "Per-run details" | Branch, ticket, PR target |
| Project config | `$PROJECT/.claude/icm.json` | `format`, `typecheck`, `test` | Final checks |
| Reference | `../../references/checklists/commit.md` | Full file | Every row must pass |
| Reference | `$PLUGIN/library/rules/common/git-workflow.md` | "Commit Message Format", "Pull Request Workflow" | Message shape and PR process |
| Reference | `../../references/formats/commit.md` | Full file | The exact output shape |

## Process

1. `node $PLUGIN/scripts/icm/run.js <slug> 06-commit`. Confirm the review verdict is APPROVE. If not, stop and go back to 05-review.
2. Run `node $PLUGIN/scripts/icm/verify.js <slug> 06-commit`. It runs format, typecheck and test when configured and scans for `console.log`. Fix the code, never the checks.
3. Walk the checklist. Confirm no secrets and no config changes by reading `git diff --stat` and the changed file list.
4. Group the diff into commits, one logical change each, in the order they make sense to read. Write each message in the conventional format with a body that says why.
5. Write the PR title and body. Write `commit.md`.
6. GATE 2: present `commit.md` and stop. Do not run `git commit` or `git push`.
7. On approval: if on `main`, create the branch named in the brief first. Commit in order. Push and open the PR only if the human asked for those. Append the commit hashes and PR URL to `commit.md`.
8. Close the run: `node $PLUGIN/scripts/icm/run.js <slug> --done`. Mention 07-learn if the human edited any stage output during this run.

## Checkpoints

| After Step | Agent Presents | Human Decides |
|------------|---------------|---------------|
| 6 | Commit plan and PR body | Approve, edit, or hold |

## Audit

| Check | Pass Condition |
|-------|---------------|
| Verify | `$RUN/06-commit/verify.md` says PASS |
| Review | No open CRITICAL or HIGH in `review.md` |
| Messages | Every commit has a conventional prefix and a body |
| Hooks | No `--no-verify`; no linter, formatter or hook config in the diff |
| Approval | No git write happened before the human approved |

## Outputs

| Artifact | Location | Format |
|----------|----------|--------|
| Commit plan | `$RUN/06-commit/commit.md` | `../../references/formats/commit.md` |

Delegate: no
