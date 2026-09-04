# How ECC maps to ecc-icm

`library/` mirrors the ECC repository at the commit in `_meta/ecc-source-commit.txt`. Two folders are renamed because their meaning changed: `agents/` became `roles/` and `commands/` became `procedures/`. Everything else keeps its ECC path under `library/`, so an ECC path such as `docs/token-optimization.md` is `$PLUGIN/library/docs/token-optimization.md` here.

`$PLUGIN` is a documentation token, not an environment variable. It stands for the plugin root printed in the `[ECC-ICM]` block at session start. Substitute it before running any command that contains it.

## Surfaces

| ECC surface | Registered in ECC | In ecc-icm | Why |
|---|---|---|---|
| `skills/` (286) | all, as slash-invocable skills | `library/skills/`, none registered, adapted; one `INDEX-<module>.md` per skills install module (20) plus `INDEX-uncategorised.md` for the one skill no module lists | a stage contract names the skill and section it needs; nothing is announced every turn |
| `agents/` (68) | sub-agents | `library/roles/`, converted and adapted; frontmatter and the repeated Prompt Defense section removed, runs of blank lines collapsed | one agent takes a role by loading the file; the Agent tool is gated by the stage contract |
| `commands/` (94) | slash commands | `library/procedures/`, adapted; `INDEX.md` has a "Maps to" column | many are the engineering stages under another name; the rest are procedures the agent reads |
| `legacy-command-shims/commands/` (12) | older slash commands kept as shims | `library/legacy-command-shims/commands/`, adapted; listed at the end of `procedures/INDEX.md` | library text still names `/tdd`, `/verify`, `/e2e`, `/eval`, `/orchestrate`, `/claw` |
| `rules/` (common plus 21 languages) | always on when installed | `library/rules/`, adapted | loaded by section from stage contracts |
| `hooks/hooks.json` (23 hook entries over 7 events), `scripts/hooks/` (53 files), `scripts/lib/` | 6 to 8 entries fire on an Edit or Bash call, each a bootstrap into `run-with-flags.js` and a script | `library/hooks/` (its two markdown files adapted, the JSON pristine), `library/scripts/` pristine, not wired | ecc-icm ships five mechanical hooks; ECC's are here for opt-in and reference |
| `scripts/*.js` CLI (harness-audit, memory, claw, install, ...) | run from the ECC root | `library/scripts/`, pristine | opt-in; some need `cd $PLUGIN/library && npm install` first |
| `manifests/`, `schemas/`, `config/`, `package.json`, `package-lock.json`, `VERSION` | read by the scripts | same paths under `library/`, pristine | so the mirrored scripts find what they load |
| `mcp-configs/` | MCP catalog | `library/mcp-configs/`, pristine | skills that need Exa, Context7 or Firecrawl point here |
| `contexts/` | dynamic prompt contexts | `library/contexts/`, pristine | reference only; stage contracts replace them |
| `examples/` (47 files) | sample projects, harness examples | `library/examples/`, pristine | reference material |
| `workflows/` | native Claude Code workflow scripts | `library/workflows/`, pristine | referenced by three library files |
| `docs/` | documentation | `library/docs/`, pristine, minus the 13 translated copies (one fix note in `docs/fixes/` is in Japanese and stays) | describes ECC as ECC |
| `.agents/skills/` (39) | Codex mirror | `library/.agents/skills/`, pristine | for Codex users. 38 have a Claude counterpart; 35 of those differ at the SKILL.md level and 3 are identical (brand-discovery, competitive-platform-analysis, competitive-report-structure); `everything-claude-code` exists only here. The Claude versions are canonical |
| root guides and markdown | | `library/the-*-guide.md` (long-form and short-form adapted, security pristine), `library/ECC-README.md`, `library/ECC-CLAUDE.md`, `library/ECC-AGENTS.md`, `library/ECC-README.zh-CN.md`, the rest by name, all pristine | prefixed so no harness auto-loads them as instructions |
| Not copied | | ecc2, src, tests, integrations, docker, plugins, translations, `.claude-plugin`, `.claude`, and the per-harness config directories | platform code and harness surfaces, not context |

## Rewrites applied by `scripts/icm/adapt-library.js`

Applied to skills, roles, procedures, legacy shims, rules, the markdown under `hooks/`, and the guides. Not applied to docs, examples, the Codex mirror or ECC's root markdown. Per-file rule counts are in `_meta/adaptation-report.json`.

| In ECC text | Becomes | Condition |
|---|---|---|
| `~/.claude/skills/<skill>/...`, `skills/<skill>/...` | `$PLUGIN/library/skills/<skill>/...` | the skill, and any path after it, exists here |
| `agents/<name>.md`, `~/.claude/agents/<name>.md` | `$PLUGIN/library/roles/<name>.md` | role exists here |
| `commands/<name>.md` | `$PLUGIN/library/procedures/<name>.md` | procedure exists here |
| `scripts/...`, `mcp-configs/...`, `contexts/...`, `scaffolds/...`, `manifests/...`, `schemas/...`, `config/...`, `examples/...`, `workflows/...`, `legacy-command-shims/...` | `$PLUGIN/library/<same>` | file or directory exists here; paths containing `...` or placeholders stay |
| `rules/...`, `docs/...` | `$PLUGIN/library/<same>` | a file, not a directory, exists here; so `docs/examples`, `docs/testing/<name>.tdd.md` and `rules/rust/` in project instructions stay |
| `${CLAUDE_PLUGIN_ROOT}/<tree>/` | `${CLAUDE_PLUGIN_ROOT}/library/<tree>/` | always; agents and commands map to roles and procedures |
| `/name` where `name` is an ECC command or legacy shim | `` `name` procedure `` | in prose, or a bare inline code span such as `` `/plan file` ``; never inside a code span that reads as a sentence, a fenced block of any fence length or indent, a heading, or frontmatter |
| `<agent-name> agent` | `<agent-name> role` | in prose, including `` `name` agent `` across a code span; never inside a code span |
| file mentions procedures, sub-agents, hooks, or ECC installation | one "ECC-ICM notes" paragraph appended | once per file, last |

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

`scripts/icm/sync-library.sh <ecc-checkout>` rebuilds `library/` from any ECC commit: mirror, convert roles, adapt references, regenerate indexes. It is deterministic; only the timestamp in `_meta/adaptation-report.json` changes between runs. Local edits inside `library/` are lost on sync by design; put durable changes in a workspace contract or reference file instead.
