# ecc-icm

Everything Claude Code, reshaped as a single-agent workspace on Jake Van Clief's Interpretable Context Methodology.

One agent. Folder-routed stage contracts instead of 68 sub-agents. A Layer 0 map of under 800 tokens instead of 286 registered skill descriptions. Mechanical scripts at stage boundaries instead of 53 per-tool hooks. Every stage writes a file a human edits before the next stage reads it.

## What is inside

```
CLAUDE.md                Layer 0: map, routing, triggers, rules (injected at session start)
workspaces/
  engineering/           intake, research, plan (GATE), implement, review, commit (GATE), learn
  research/              brief, gather, synthesize, report
  content/               brief, source, draft, edit, distribute (GATE)
  security/              scope, scan, triage, remediate (GATE), report
  harness-ops/           audit, tune (GATE), apply, learn
  workspace-builder/     builds a new workspace for any domain (ported from ICM)
library/                 a mirror of ECC at one commit, unregistered: skills, rules, roles (from agents),
                         procedures (from commands), scripts, hooks, mcp-configs, contexts, docs (English),
                         the Codex skill mirror, the writing guides; ECC-MAPPING.md says how each maps here
scripts/icm/             new, run, status, verify, validate-workspace, context-budget, hooks, sync-library
_core/                   ICM conventions and templates, plus the ECC-ICM adaptations
```

The library is rebuilt from an ECC checkout with `scripts/icm/sync-library.sh <ecc-checkout>`. Skills, roles, procedures, rules and guides are then adapted by `scripts/icm/adapt-library.js`: `/command` mentions become procedures, `<name> agent` becomes a role, ECC paths point into `library/`, and each adapted file ends with a short "ECC-ICM notes" paragraph. Docs, the Codex mirror and ECC's root markdown stay pristine. `library/_meta/adaptation-report.json` lists every rewrite.

Static context this plugin adds per turn: about 1,400 tokens (run `npm run budget`). The same measurement over ECC's `developer` profile is about 30,000.

## Install

From a marketplace path, on any machine with Claude Code 2.1 or later:

```bash
claude plugin marketplace add /home/elvis/Projects/ecc-icm
claude plugin install ecc-icm@ecc-icm
```

Or for one session without installing:

```bash
claude --plugin-dir /home/elvis/Projects/ecc-icm
```

## Use

In any repository:

1. `setup` once. The agent asks the engineering questionnaire in one pass and writes `.claude/icm.json`.
2. `new add-rate-limit` starts a run. The agent reads `stages/01-intake/CONTEXT.md` and nothing else.
3. `next` moves to the next stage. Each stage writes one file under `.claude/runs/add-rate-limit/`. Edit it before saying `next`.
4. Two gates stop the agent: after the plan, before the commit.
5. `status` renders the pipeline. `verify 05-review` runs the mechanical audit for a stage.

`/icm` is the only registered skill; it does the same routing when you prefer a slash command.

## Hooks

Four, all mechanical, none call a model:

| Event | Script | Does |
|---|---|---|
| SessionStart | `layer0.js` | injects `CLAUDE.md` and the project's run status |
| PreToolUse Bash | `guard.js` | denies `--no-verify`, force push, deleting `/`, `~` or `.git` |
| PreToolUse Edit, Write | `config-protection.js` | denies edits to linter and formatter config (from ECC) |
| PreToolUse Agent | `agent-gate.js` | denies delegation unless the current stage contract says `Delegate: yes` |
| Stop | `cost-tracker.js` | appends tokens and Agent tool uses to `.claude/runs/_cost.jsonl` |

## Develop

```bash
npm test               # node --test tests/*.test.js
npm run validate       # every workspace against _core/CONVENTIONS.md
npm run budget         # static context estimate for this plugin
claude plugin validate .
```

Resync the whole library from an ECC checkout: `scripts/icm/sync-library.sh <ecc-root>` (mirror, convert roles, adapt references, regenerate indexes). Local edits inside `library/` are lost on sync by design.

## Provenance

ECC content is MIT, Affaan Mustafa. ICM conventions, templates and the workspace builder are MIT, Model Workspace Protocol Contributors. See `NOTICE.md`. The plan that led here is in `docs/PLAN.md`.
