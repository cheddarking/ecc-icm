# Library

Layer 3 reference material copied from Everything Claude Code (MIT). Nothing in this folder is registered with Claude Code; it reaches the model only when a stage contract or the user names a file. Read the domain index you need, then one file from it.

## Routing

| You need | Read |
|---|---|
| A role to take on (planner, reviewer, tdd, ...) | `$PLUGIN/library/roles/INDEX.md` (68 roles) |
| Coding rules for a language, or the common rules | `$PLUGIN/library/rules/INDEX.md` |
| A former slash command as a step-by-step procedure | `$PLUGIN/library/procedures/INDEX.md` |
| Core framework, language, and application-engineering skills. | `$PLUGIN/library/skills/INDEX-framework-language.md` (69 skills) |
| Database and persistence-focused skills. | `$PLUGIN/library/skills/INDEX-database.md` (7 skills) |
| Single-skill unified-memory guidance; requires the separately installed ecc-universal CLI runtime. | `$PLUGIN/library/skills/INDEX-skill-unified-memory.md` (1 skills) |
| Evaluation, TDD, verification, compaction, learning, and cross-harness memory skills, including the legacy con | `$PLUGIN/library/skills/INDEX-workflow-quality.md` (47 skills) |
| Parallel execution, benchmarking, data-throughput, latency, and recursive decision-ledger skills for faster ev | `$PLUGIN/library/skills/INDEX-optimization-workflows.md` (8 skills) |
| Security review and security-focused framework guidance. | `$PLUGIN/library/skills/INDEX-security.md` (19 skills) |
| Research and API integration skills for deep investigations and model integrations. | `$PLUGIN/library/skills/INDEX-research-apis.md` (9 skills) |
| Business, writing, market, and investor communication skills. | `$PLUGIN/library/skills/INDEX-business-content.md` (14 skills) |
| Connected-app operator workflows for setup audits, billing operations, program tracking, Google Workspace, and | `$PLUGIN/library/skills/INDEX-operator-workflows.md` (19 skills) |
| Public, non-advisory prediction-market workflows and the consolidated read-only Ito baskets data skill with ga | `$PLUGIN/library/skills/INDEX-prediction-market-skills.md` (3 skills) |
| Authenticated Itô GPU inventory, RFQ, status, device revocation, and explicitly gated node-qualification workf | `$PLUGIN/library/skills/INDEX-ito-compute.md` (3 skills) |
| Experimental Nasiko CLI lifecycle bridge guidance for pinned installation, read-only status, qualified uninsta | `$PLUGIN/library/skills/INDEX-nasiko-control-plane.md` (1 skills) |
| Social publishing and distribution skills. | `$PLUGIN/library/skills/INDEX-social-distribution.md` (3 skills) |
| Media generation, technical explainers, and AI-assisted editing skills. | `$PLUGIN/library/skills/INDEX-media-generation.md` (9 skills) |
| Swift, SwiftUI, and Apple platform skills including concurrency, persistence, and design patterns. | `$PLUGIN/library/skills/INDEX-swift-apple.md` (7 skills) |
| Agentic engineering, autonomous loops, agent harness construction, and LLM pipeline optimization skills. | `$PLUGIN/library/skills/INDEX-agentic-patterns.md` (35 skills) |
| Deployment workflows, Docker patterns, and infrastructure skills. | `$PLUGIN/library/skills/INDEX-devops-infra.md` (17 skills) |
| Production machine-learning engineering workflows for data contracts, reproducible training, evaluation, deplo | `$PLUGIN/library/skills/INDEX-machine-learning.md` (4 skills) |
| Supply chain, logistics, procurement, and manufacturing domain skills. | `$PLUGIN/library/skills/INDEX-supply-chain-domain.md` (8 skills) |
| Document processing, conversion, and translation skills. | `$PLUGIN/library/skills/INDEX-document-processing.md` (2 skills) |
| Skills not listed in any ECC install module. | `$PLUGIN/library/skills/INDEX-uncategorised.md` (1 skills) |
| ECC's hook scripts, CLI scripts and helper libraries (opt-in, not wired) | `$PLUGIN/library/scripts/`, `$PLUGIN/library/hooks/hooks.json` |
| Manifests, schemas, config and the lockfile the mirrored scripts read | `$PLUGIN/library/manifests/`, `schemas/`, `config/`, `package-lock.json` |
| ECC's legacy command shims (tdd, verify, e2e, eval, orchestrate, claw, ...) | `$PLUGIN/library/legacy-command-shims/commands/` |
| MCP server catalog used by research skills | `$PLUGIN/library/mcp-configs/mcp-servers.json` |
| ECC's prompt contexts (dev, review, research) | `$PLUGIN/library/contexts/` |
| ECC's sample projects and harness examples, unmodified | `$PLUGIN/library/examples/` |
| ECC's native Claude Code workflow scripts | `$PLUGIN/library/workflows/` |
| ECC's documentation minus the 13 translated copies, unmodified | `$PLUGIN/library/docs/` |
| Writing guides for long-form, short-form and security content | `$PLUGIN/library/the-longform-guide.md`, `the-shortform-guide.md`, `the-security-guide.md` |
| Codex mirror of 39 skills, unmodified | `$PLUGIN/library/.agents/skills/` |
| How every ECC surface maps here, and which doctrine ICM supersedes | `$PLUGIN/library/ECC-MAPPING.md` |

## Rules of use

- `$PLUGIN` in any file is a documentation token for the plugin root printed at session start. Substitute it before running a command.
- One-way: the library never points back at a workspace.
- Load a section, not a folder. Every index row is one file.
- Skills here are library files, not registered skills. Do not invoke them with the Skill tool; read the SKILL.md.
- Skills, roles, procedures, legacy shims, rules, hook markdown and the guides were adapted by `scripts/icm/adapt-library.js`: `/command` mentions became procedures, agent mentions became roles, ECC paths point into this folder. Each adapted file ends with an "ECC-ICM notes" paragraph. Per-file rule counts: `$PLUGIN/library/_meta/adaptation-report.json`.
