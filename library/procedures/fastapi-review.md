---
description: Review a FastAPI application for architecture, async correctness, dependency injection, Pydantic schemas, security, performance, and testability.
---

# FastAPI Review

Invoke the `fastapi-reviewer` role for a focused FastAPI review.

## Usage

```text
/fastapi-review [file-or-directory]
```

## Review Areas

- App factory, router boundaries, middleware, and exception handlers.
- Pydantic request and response schema separation.
- Dependency injection for database sessions, auth, pagination, and settings.
- Async database and external HTTP patterns.
- CORS, auth, rate limits, logging, and secret handling.
- OpenAPI metadata and documented response models.
- Test client setup and dependency overrides.

## Expected Output

```text
[SEVERITY] Short issue title
File: path/to/file.py:42
Issue: What is wrong and why it matters.
Fix: Concrete change to make.
```

## Related

- Agent: `fastapi-reviewer`
- Skill: `fastapi-patterns`
- Command: `python-review` procedure
- Skill: `security-scan`

---
<!-- ecc-icm-notes -->
ECC-ICM notes: Procedures named above are files, not slash commands: `$PLUGIN/library/procedures/<name>.md`; `$PLUGIN/library/procedures/INDEX.md` says which ecc-icm stage or workspace each maps to. Roles named above are files under `$PLUGIN/library/roles/`. ecc-icm runs one agent: take a role in this context by loading its file. Do not spawn or delegate unless the current stage contract says `Delegate: yes`; the Agent tool is gated by a hook.
