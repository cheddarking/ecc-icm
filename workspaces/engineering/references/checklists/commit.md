# Commit Checklist

Run before writing `commit.md`. Every row must pass; `verify.js 06-commit` checks the mechanical ones.

| Check | Pass condition |
|---|---|
| Review clean | `$RUN/05-review/review.md` has no open CRITICAL or HIGH finding |
| Tests | the project's `test` command exits 0 |
| Typecheck and format | the project's `typecheck` and `format` commands exit 0 when configured |
| No debug output | no `console.log` in changed non-test source files |
| No secrets | no keys, tokens or passwords in the diff; `.env` files untouched |
| Hooks intact | no `--no-verify`; linter and formatter config unchanged |
| One change per commit | each commit is one logical change with a conventional prefix |
| Message format | `$PLUGIN/library/rules/common/git-workflow.md`, "Commit Message Format" |
| PR process | `$PLUGIN/library/rules/common/git-workflow.md`, "Pull Request Workflow" |

GATE 2: present `commit.md` and wait. Do not run `git commit` or `git push` until the human says so.
