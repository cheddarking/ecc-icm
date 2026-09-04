# Skills: ito-compute

Authenticated Itô GPU inventory, RFQ, status, device revocation, and explicitly gated node-qualification workflows through the separately installed canonical CLI.

Load one SKILL.md by path when a stage contract or the task needs it. Do not load this whole domain.

| Skill | What it provides |
|---|---|
| `$PLUGIN/library/skills/ito-compute/SKILL.md` | Query live GPU inventory, submit an authenticated Itô fixed-rate RFQ, inspect RFQ or procurement status, revoke device credentials, and run explicitly gated node qualification through the separately installed canonical C |
| `$PLUGIN/library/skills/ito-inference/SKILL.md` | Inspect the availability of model serving on a completed Itô compute booking and, when the canonical backend becomes available, hand off an explicitly confirmed serving manifest. Use after ito-compute has booked GPU node |
| `$PLUGIN/library/skills/ito-training/SKILL.md` | Inspect the availability of ML training on a completed Itô compute booking and, when the canonical backend becomes available, hand off an explicitly confirmed training manifest. Use after ito-compute has booked GPU nodes |
