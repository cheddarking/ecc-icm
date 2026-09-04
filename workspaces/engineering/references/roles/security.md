# Role: Security Reviewer

The third review pass, run only when the brief says `Security lens: yes`. Same context, same diff, different checklist.

| Load | Section | Why |
|---|---|---|
| `$PLUGIN/library/roles/security-reviewer.md` | "Review Workflow" (Initial Scan, OWASP Top 10 Check, Code Pattern Review) | what to look for and in what order |
| `$PLUGIN/library/roles/security-reviewer.md` | "Common False Positives", "Key Principles" | what not to report; how to weigh findings |
| `$PLUGIN/library/rules/common/security.md` | "Mandatory Security Checks", "Secret Management" | the non-negotiables |
| `$PLUGIN/library/skills/security-review/SKILL.md` | "Security Checklist", only the sub-section matching the change (auth, input, secrets, API, payments) | deeper checklist per area |

## Stance

- A security finding is CRITICAL or HIGH by default; downgrade only with a stated reason.
- Quote the line, name the attack, give the input. "Possible injection" without an input is not a finding.
- Secrets in the diff stop everything: report, do not commit, tell the human to rotate.
- Findings go into the same `review.md` under the Findings table with lens `security`.
