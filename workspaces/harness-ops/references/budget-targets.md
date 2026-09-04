# Budget Targets

The numbers the harness holds itself to. An audit reports each; a tune proposal must move one of them or say why not.

| Measure | Target | Source of the number |
|---|---|---|
| Static context per turn from this plugin | under 3,000 tokens | `context-budget.js $PLUGIN` |
| Registered skills | at most 12 | `.claude-plugin/plugin.json` and `skills/` |
| Registered agents | at most 1 | plugin manifest |
| Hook sub-invocations per tool call | at most 3 | `hooks/hooks.json` |
| Model invocations from hooks | 0 | grep for `claude -p` and `spawnSync('claude'` under `scripts/` |
| Agent tool uses per run, stages marked `Delegate: no` | 0 | `_cost.jsonl` and `verify.md` files |
| Stage outputs present per completed run | all | `status.js --json` |
| Contract validation | 0 errors | `validate-workspace.js --all` |
| Per-stage working context | 2,000 to 8,000 tokens plus the code under work | estimate from the Inputs table sizes |

Other plugins, MCP servers and the user's own CLAUDE.md files add to the static context. The audit reports them separately; this plugin's target covers only what it ships.
