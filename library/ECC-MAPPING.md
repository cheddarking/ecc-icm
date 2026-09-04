# How ECC maps to ecc-icm

`library/` mirrors the ECC repository at the commit in `_meta/ecc-source-commit.txt`. Two folders are renamed because their meaning changed: `agents/` became `roles/` and `commands/` became `procedures/`. Everything else keeps its ECC path under `library/`, so an ECC path `X` is `$PLUGIN/library/X` here.

## Surfaces

| ECC surface | Registered in ECC | In ecc-icm | Why |
|---|---|---|---|
| `skills/` (286) | all, as slash-invocable skills | `library/skills/`, none registered; one `INDEX-<domain>.md` per install module | a stage contract names the skill and section it needs; nothing is announced every turn |
| `agents/` (68) | sub-agents | `library/roles/`, converted; frontmatter and the repeated Prompt Defense section removed | one agent takes a role by loading the file; the Agent tool is gated by the stage contract |
| `commands/` (94) | slash commands | `library/procedures/`, verbatim; `INDEX.md` has a "Maps to" column | many are the engineering stages under another name; the rest are procedures the agent reads |
| `rules/` | always on when installed | `library/rules/`, verbatim | loaded by section from stage contracts |
| `hooks/hooks.json`, `scripts/hooks/`, `scripts/lib/` | 53 hooks, 13 to 15 sub-invocations per tool call | `library/hooks/`, `library/scripts/`, verbatim, not wired | ecc-icm ships five mechanical hooks; ECC's are here for opt-in and reference |
| `scripts/*.js` CLI (harness-audit, memory, claw, install, ...) | run from the ECC root | `library/scripts/`, verbatim | opt-in; most need `cd library && npm install` first |
| `mcp-configs/` | MCP catalog | `library/mcp-configs/` | skills that need Exa, Context7 or Firecrawl point here |
| `contexts/` | dynamic prompt contexts | `library/contexts/` | reference only; stage contracts replace them |
| `docs/` | documentation | `library/docs/`, English only | pristine, describes ECC as ECC |
| `.agents/skills/` (39) | Codex mirror | `library/.agents/skills/`, pristine | for Codex users; 36 of the 39 differ from the Claude versions, which are canonical here |
| root guides and markdown | | `library/the-*-guide.md`, `library/ECC-README.md`, `library/ECC-CLAUDE.md`, `library/ECC-AGENTS.md`, others by name | prefixed so no harness auto-loads them as instructions |
| `package.json` | npm deps for scripts | `library/package.json` | `cd $PLUGIN/library && npm install` before running an ECC script that needs sql.js, ajv, js-yaml or toml |
| Not copied | | ecc2, src, tests, integrations, examples, translations, `.claude-plugin`, other harness configs | platform code and harness surfaces, not context |

## Rewrites applied by `scripts/icm/adapt-library.js`

Applied to skills, roles, procedures, rules and the three guides. Not applied to docs, the Codex mirror or ECC's root markdown. Counts are in `_meta/adaptation-report.json`.

| In ECC text | Becomes | Condition |
|---|---|---|
| `~/.claude/skills/<skill>`, `skills/<skill>/...` | `$PLUGIN/library/skills/<skill>/...` | skill exists here |
| `agents/<name>.md`, `~/.claude/agents/<name>.md` | `$PLUGIN/library/roles/<name>.md` | role exists here |
| `commands/<name>.md` | `$PLUGIN/library/procedures/<name>.md` | procedure exists here |
| `rules/...`, `scripts/...`, `mcp-configs/...`, `contexts/...`, `scaffolds/...`, `docs/...` | `$PLUGIN/library/<same>` | file exists here; project-relative examples such as `docs/adr/README.md` stay |
| `${CLAUDE_PLUGIN_ROOT}/<tree>/` | `${CLAUDE_PLUGIN_ROOT}/library/<tree>/` | always; agents and commands map to roles and procedures |
| `/name` where `name` is an ECC command | `` `name` procedure `` | in prose and in a bare inline code span; never in fenced code or headings |
| `<agent-name> agent` | `<agent-name> role` | in prose |
| file mentions sub-agents, hooks, or ECC installation | one "ECC-ICM notes" paragraph appended | once per file |

## Doctrine that ICM supersedes

These library files still say what they said in ECC. The note at their end states the ecc-icm rule, and the hooks enforce it.

| File | ECC says | ecc-icm rule |
|---|---|---|
| `rules/common/agents.md` | use planner, code-reviewer, tdd-guide, architect agents without being asked; always use parallel Task execution; split-role sub-agents | one agent, roles are files, delegation only where a stage contract says `Delegate: yes` |
| `rules/common/development-workflow.md` steps 1 to 3 | planner agent, tdd-guide agent, code-reviewer agent | stages 03-plan, 04-implement, 05-review |
| `skills/orch-pipeline` and the `orch-*` family | each phase delegates to an agent | the engineering workspace is this pipeline with the same two gates, run by one agent |
| `skills/dev-team`, `council`, `council-multi-model`, `team-builder`, `santa-method`, `gan-style-harness`, `team-agent-orchestration` | parallel personas or agents | run the lenses sequentially in one context, or set `delegation` to `off` in `.claude/icm.json` for a deliberate exception |
| `skills/continuous-learning`, `continuous-learning-v2`, `strategic-compact`, `hookify-rules` | per-tool-call observer hooks | edits are recorded at stage boundaries in `_edits.jsonl`; the learn stages propose contract changes |

## Environment variables

`ECC_*` variables in library text configure ECC's scripts and hooks. They have no effect on ecc-icm's hooks, which read `.claude/icm.json`, `ICM_GUARD` and `ICM_DELEGATION`.

## Keeping it close to upstream

`scripts/icm/sync-library.sh <ecc-checkout>` rebuilds `library/` from any ECC commit: mirror, convert roles, adapt references, regenerate indexes. Local edits inside `library/` are lost on sync by design; put durable changes in a workspace contract or reference file instead.
