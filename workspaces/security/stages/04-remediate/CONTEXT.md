# Stage 04: Remediate

Plan the fixes for the approved findings. Apply them only after the gate, only if the engagement allows, and only with a test per fix.

## Inputs

| Source | File/Location | Section/Scope | Why |
|--------|--------------|---------------|-----|
| Previous stage | `$RUN/03-triage/triage.md` | "Findings", as edited by the human | What to fix |
| Earlier stage | `$RUN/01-scope/scope.md` | "Engagement" line | Whether code may change |
| Project config | `$PROJECT/.claude/icm.json` | `test`, `languages` | How to prove a fix |
| Role | `$PLUGIN/workspaces/engineering/references/roles/tdd.md` | Full file, only when applying fixes | Red, green, refactor for each fix |
| Reference | `../../references/formats/remediation.md` | Full file | The exact output shape |

## Process

1. `node $PLUGIN/scripts/icm/run.js <slug> 04-remediate`.
2. For each finding, write the fix, the files, the test that proves it, and the risk of the fix itself. Order by severity.
3. Write `remediation.md` with the plan and an empty "Applied" table. Run `node $PLUGIN/scripts/icm/verify.js <slug> 04-remediate`.
4. GATE: present the plan and stop. If the engagement is read-only or scanners-only, the plan is the deliverable; continue to 05-report.
5. On approval, apply one fix at a time with a failing test first. Run the project's test command after each. Record the result in "Applied".
6. Anything not fixed goes under "Deferred" with an owner.

## Checkpoints

| After Step | Agent Presents | Human Decides |
|------------|---------------|---------------|
| 4 | The fix plan | Approve fixes, some fixes, or plan only |

## Audit

| Check | Pass Condition |
|-------|---------------|
| Test per fix | Every applied fix has a test result |
| Gate honoured | No code changed before approval |
| Complete | Every finding is applied, deferred, or marked accepted by the human |

## Outputs

| Artifact | Location | Format |
|----------|----------|--------|
| Remediation | `$RUN/04-remediate/remediation.md` | `../../references/formats/remediation.md` |

Delegate: no
