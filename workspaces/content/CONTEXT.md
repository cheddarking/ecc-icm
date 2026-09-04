# Content Workspace

Long-form and short-form content in a source-derived voice, with platform adaptation and a gated publish step.

## Task Routing

| Task Type | Go To | Description |
|---|---|---|
| Article, guide, newsletter, thread, script, campaign | `stages/01-brief/CONTEXT.md` | Decide the piece, audience, platform, and the value it must deliver |
| Gather the facts and examples | `stages/02-source/CONTEXT.md` | Real material, cited, nothing invented |
| Write it | `stages/03-draft/CONTEXT.md` | In the voice profile, to the brief |
| Make it publishable | `stages/04-edit/CONTEXT.md` | Banned patterns, structure, factual check against sources |
| Adapt and post | `stages/05-distribute/CONTEXT.md` | Per-platform variants; nothing posted before approval |

## Shared Resources

| Resource | Location | Contains |
|---|---|---|
| Voice profile schema | `references/voice-profile.md` | What setup must produce and where it lives |
| Value types | `references/value-types.md` | The value validation list (ICM Pattern 13) |
| Quality gate | `references/quality-gate.md` | Bans and checks, pointing into the library skills |
| Platform rules | `references/platform-rules.md` | Per-platform adaptation and posting order |
| Output formats | `references/formats/` | brief, sources, draft, edited, distribution |
| Library skills | `$PLUGIN/library/skills/INDEX-business-content.md`, `$PLUGIN/library/skills/INDEX-social-distribution.md` | article-writing, brand-voice, content-engine, crosspost, seo and the rest |
