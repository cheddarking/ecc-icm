# Checklist Map

Threat areas and where their checklist lives. Load one area's section at a time.

## Threat areas

| Area | Library section |
|---|---|
| Authentication, sessions, tokens | `$PLUGIN/library/skills/security-review/SKILL.md`, "Security Checklist", the authentication sub-section |
| Input handling, injection, XSS | same file, the input validation and injection sub-sections |
| Secrets and configuration | `$PLUGIN/library/rules/common/security.md`, "Secret Management" |
| API endpoints, rate limits, CORS | `$PLUGIN/library/skills/security-review/SKILL.md`, the API sub-section |
| Payments and sensitive features | same file, the payments sub-section |
| Dependencies and supply chain | `$PLUGIN/library/skills/security-scan/SKILL.md`, first section |
| Framework specifics | `$PLUGIN/library/rules/<lang>/security.md`; Django `$PLUGIN/library/skills/django-security/SKILL.md`; Laravel, Spring Boot, Quarkus, Perl have their own skills in `INDEX-security.md` |
| Health data | `$PLUGIN/library/skills/hipaa-compliance/SKILL.md`, `$PLUGIN/library/skills/healthcare-phi-compliance/SKILL.md` |
| Smart contracts and trading agents | `$PLUGIN/library/skills/defi-amm-security/SKILL.md`, `$PLUGIN/library/skills/llm-trading-agent-security/SKILL.md` |
| Agent and prompt injection surfaces | `$PLUGIN/library/skills/gateguard/SKILL.md`, `$PLUGIN/library/skills/safety-guard/SKILL.md` |

## Method

| Load | Section | Why |
|---|---|---|
| `$PLUGIN/library/roles/security-reviewer.md` | "Review Workflow", "Common False Positives", "Key Principles" | how to scan, what to skip, how to weigh |
| `$PLUGIN/library/skills/security-review/SKILL.md` | "Security Testing" | how to prove a finding |

## Severity

CRITICAL: exploitable now with data loss, takeover, or money movement. HIGH: exploitable with a precondition an attacker can usually meet. MEDIUM: weakness that needs another bug to matter. LOW: hygiene. A finding without a proof input is at most MEDIUM.
