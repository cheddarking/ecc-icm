# Platform Rules

Used by 05-distribute. One piece, one native variant per platform, never the same text twice.

| Load | Section | What it gives |
|---|---|---|
| `$PLUGIN/library/skills/content-engine/SKILL.md` | "Platform Adaptation Rules", "Repurposing Flow" | Per-platform shape and the order to derive variants |
| `$PLUGIN/library/skills/crosspost/SKILL.md` | "Core Rules", "Posting Order", "Output Format" | Distribution rules and the delivery shape |
| `$PLUGIN/library/skills/x-api/SKILL.md` | first section, only when posting to X through the API | Mechanics |

## Length bands

| Platform | Band |
|---|---|
| blog, guide | 800 to 2,500 words |
| newsletter | 400 to 1,200 words |
| X post | under 280 characters; threads 5 to 12 posts |
| LinkedIn | 900 to 2,000 characters |
| Threads, Bluesky | under 500 and under 300 characters |
| video script | timed to the target length at 150 words per minute |

## Posting

Posting is outward-facing. The distribution stage prepares every variant in `distribution.md` and stops at GATE. With `content.posting` set to "post after approval", the agent posts only the variants the human approved, in the posting order from the crosspost skill, and records the URLs. With "prepare only", it never posts.
