# Security Trigger

The intake stage sets `Security lens: yes` when the request or the files it will touch involve any of these. The review stage then runs the security pass. Source: ECC orch-pipeline and `rules/common/code-review.md`, "Security Review Triggers".

| Area | Examples |
|---|---|
| Authentication or authorization | login, sessions, tokens, JWT, OAuth, cookies, roles |
| User input handling | forms, query params, uploads, deserialisation |
| Database queries | raw SQL, query builders, migrations touching permissions |
| File-system paths | reading or writing paths derived from input |
| External calls | fetch, axios, subprocess, shelling out |
| Cryptography | hashing, signing, ciphers, key handling |
| Secrets and credentials | API keys, env files, config with credentials |
| Payments and PII | billing, health data, personal data |

## Mechanical detection

`verify.js` does not decide this; the intake clerk does. When unsure, run this over the diff or the file list and treat any hit as a yes:

```
(auth|login|password|passwd|token|secret|credential|api[_-]?key|session|jwt|oauth|cookie|sql|query|exec|eval|crypto|cipher|hash|hmac|sign|fs\.|readFile|writeFile|fetch|axios|request|subprocess|os\.system)
```

A hit in a test file alone does not turn the lens on.
