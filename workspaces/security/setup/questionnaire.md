# Onboarding Questionnaire: Security

<!-- Agent instructions: Read this file when the user types "setup" inside the security
     workspace. Ask ALL questions in one pass. Write the answers under the "security"
     key of $PROJECT/.claude/icm.json. Never ask again. -->

### Q1: Rules of engagement: what may the agent do without asking?
- Key: `security.engagement`
- Type: selection
- Options: read only, run scanners, run scanners and change code after the gate
- Default: run scanners

### Q2: Which scanners are installed?
- Key: `security.scanners` (array of commands)
- Type: free text
- Derived: check for `npm audit`, `pip-audit`, `cargo audit`, `gitleaks`, `semgrep`, `trivy` on PATH
- Default: the detected list

### Q3: Compliance regimes that apply?
- Key: `security.compliance` (array)
- Type: selection, multiple
- Options: none, HIPAA, PCI, GDPR, SOC2
- Default: none

### Q4: Lowest severity to report?
- Key: `security.min_severity`
- Type: selection
- Options: CRITICAL, HIGH, MEDIUM, LOW
- Default: LOW

### Q5: Where do reports go?
- Key: `security.report_dir`
- Type: free text
- Default: the run folder only

---

## After Onboarding

Write the keys. Then say: "Start a review with `new <slug>` and name the target."
