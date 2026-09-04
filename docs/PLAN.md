# Plan: ECC as a single-agent ICM workspace

Written 2026-09-04. Supersedes the first draft that lived in the ECC checkout as `docs/ICM-SINGLE-AGENT-PLAN.md`.

Sources: Van Clief and McDermott, "Interpretable Context Methodology: Folder Structure as Agent Architecture" (arXiv 2603.16021v2); the reference repo `RinDig/Interpretable-Context-Methodology`; the video "Stop Building AI Agents. Use This Folder System Instead."; ECC at commit `e04ea0b9` (recorded in `library/_meta/ecc-source-commit.txt`).

## Decisions taken

| Question | Decision |
|---|---|
| Additive plugin or in-place rewrite | Additive, as a separate repository: this one. ECC is untouched and stays mergeable with upstream |
| Archive or delete the 68 agents | Neither. They were copied and converted into `library/roles/`; ECC keeps its own |
| Which workspaces beyond engineering | Full replication: research, content, security, harness-ops, plus the ICM workspace builder; every ECC skill, rule, role and procedure is reachable through `library/CONTEXT.md` |
| Contract format | ICM's canonical Inputs, Process, Checkpoints, Audit, Outputs, plus one `Delegate:` line, machine-checked by `scripts/icm/validate-workspace.js` |

## What ICM prescribes, in one paragraph

Five layers the agent reads down and stops in: `CLAUDE.md` (where am I), `CONTEXT.md` (where do I go), a stage contract (what do I do), reference material loaded by section (what rules apply), and per-run working files (what am I working with). One stage does one job and writes one file the human can edit before the next stage reads it. Skills are wired into the stage that needs them. Delegation is optional and driven by the same contract. Mechanical work is done by scripts. The full conventions are in `_core/CONVENTIONS.md`; the adaptations for a plugin that serves many repositories are at the end of that file.

## Where ECC stood

Measured with `scripts/icm/context-budget.js` over the ECC checkout: 286 skill descriptions (21,617 tokens), 68 agent descriptions (3,870), 94 command descriptions (2,781), 10 common rules always on when installed (4,438). Total 32,706 tokens of static context per turn before any code is read. Doctrine in `AGENTS.md`, `rules/common/agents.md`, `development-workflow.md`, `orch-pipeline` and `orch-review.workflow.js` mandates delegation to planner, tdd-guide, code-reviewer and security-reviewer sub-agents and parallel reviewer fan-out. Two hooks spawn `claude -p` for summaries on compaction and at low context.

## What this repository is

| Layer | Where | Tokens |
|---|---|---|
| 0 | `CLAUDE.md`, injected by the SessionStart hook with the plugin root substituted | about 950 including the project's run status |
| 1 | `workspaces/<name>/CONTEXT.md` | read on entry |
| 2 | `workspaces/<name>/stages/0N-<stage>/CONTEXT.md`, 30 contracts, each under 80 lines | 200 to 600 each |
| 3 | `workspaces/<name>/references/`, `shared/`, and `library/` (unregistered) | loaded by section |
| 4 | `$PROJECT/.claude/runs/<slug>/0N-<stage>/<artifact>.md` | per run |

Static context this plugin adds: 1,007 tokens (one registered skill description plus the Layer 0 injection). Against ECC's 32,706 that is a 97% reduction of the harness's own overhead. Other plugins, MCP servers and the user's CLAUDE.md files are outside this number.

Delegation is a harness property: `scripts/icm/agent-gate.js` denies the Agent tool while a run is active unless the current stage contract says `Delegate: yes`. Two stages say yes with conditions: engineering 02-research on large repositories, research 02-gather at deep depth. Everything else is one agent.

Hooks: four mechanical scripts, no model calls. Per-tool-call sub-invocations went from about 13 to 1: the Bash guard on Bash, config protection on Edit and Write, the agent gate on Agent. Nothing fires on Read, Grep or Glob.

The edit-source loop from the paper's section 6.3 is mechanical: `verify.js` keeps the agent's copy of each artifact under `.agent/`, `run.js` diffs it when the next stage starts and appends human edits to `_edits.jsonl`, and the learn stages turn recurrences into proposed contract changes that the human applies.

## Success criteria and status

| Criterion | Target | Status |
|---|---|---|
| Static harness tokens per turn | under 3,000 | 1,007 measured; test asserts under 3,000 |
| Agent tool uses on a standard task | 0 by default | enforced by `agent-gate.js`; measured per run in `_cost.jsonl`; not yet exercised on a real task |
| Total tokens on the three benchmark tasks | at least 50% lower than ECC | not measured; protocol in `benchmarks/` |
| Stage outputs present and editable | all | mechanism tested end to end on a temporary project |
| Hook sub-invocations per tool call | 3 or fewer | 1 |
| Model invocations from hooks | 0 | 0 |
| Contract validation and tests | green | `npm test` 8 of 8, `validate --all` 6 of 6 workspaces, `claude plugin validate` passes |

## Phases, revised

| Phase | Content | State |
|---|---|---|
| 0 Baseline, static | `context-budget.js` over both roots | done, numbers above |
| 0 Baseline, dynamic | three benchmark tasks on ECC and on this plugin | protocol written, not run; it costs real tokens and needs a target repository |
| 1 Pilot workspace | engineering, scripts, hooks, tests, plugin manifests | done; validated by tests and a headless session, not yet by a real feature run |
| 2 Doctrine and hooks | single-agent rule, minimal hooks | done here; ECC's own files were never changed |
| 3 Catalog reduction | roles from agents, library from skills and commands | done by copy and conversion; nothing deleted anywhere |
| 4 More workspaces | research, content, security, harness-ops, workspace builder | first drafts; each passes the validator; contracts are grounded in the named ECC skill sections but have not been run |
| 5 Edit-source loop | `_edits.jsonl`, `.agent/` snapshots, learn stages | mechanism done; the proposals stage is a contract the agent follows, not a script |

## Next steps

1. Install into a real repository, run `setup`, then one standard-tier feature through all six gates. Fix whatever the contracts get wrong; that run is the first entry in `_edits.jsonl`.
2. Run the dynamic benchmark on the same repository with ECC's `developer` profile and fill `docs/baseline.md`.
3. Run the workspace builder's 05-validation stage over the four drafted workspaces with a model, in addition to the mechanical validator.
4. Decide whether `.claude/runs/` is committed in target repositories.

## Risks

- Inferred, not yet observed: that a model given only Layer 0 follows the triggers and reads one contract at a time. The headless smoke test checks the first step; a real run checks the rest.
- The Agent tool gate denies delegation inside a run; the built-in Explore and Plan agents are still offered to the model by Claude Code. The gate covers them because they go through the same tool.
- Per-stage context is 2,000 to 8,000 tokens plus the code under work; the code is irreducible.
- The library is a copy at one ECC commit. Re-sync by re-running the copy step and the two generators; local edits to library files would be lost, which is why contracts point into the library and never edit it.
- Codex, OpenCode and Cursor parity is not attempted. The contracts are harness-agnostic text; only the hooks and manifests are Claude Code specific.
