# Audit Sources

Every number in an audit comes from one of these. Run the command, paste the relevant lines, cite the command.

| Number | Command or file |
|---|---|
| This plugin's static context | `node $PLUGIN/scripts/icm/context-budget.js $PLUGIN` |
| Another plugin's or harness's static context | `node $PLUGIN/scripts/icm/context-budget.js <its root>` |
| Enabled plugins and their token cost | `claude plugin list`, then `claude plugin details <name>` per plugin |
| Hooks that fire per tool call | `$PLUGIN/hooks/hooks.json`, plus `~/.claude/settings.json` and `$PROJECT/.claude/settings.json` hooks sections |
| MCP servers and tool counts | `/mcp` in a session, or `~/.claude.json` mcpServers |
| Always-loaded instructions | `~/.claude/CLAUDE.md`, `$PROJECT/CLAUDE.md`, `$PROJECT/.claude/rules/*.md`, `~/.claude/rules/*.md` (count tokens as chars divided by 4) |
| Tokens and Agent tool uses per run | `$PROJECT/.claude/runs/_cost.jsonl` (one line per response; sum by run and stage) |
| Human edits per stage | `$PROJECT/.claude/runs/_edits.jsonl` |
| Stage completion | `node $PLUGIN/scripts/icm/status.js --json` |
| Contract health | `node $PLUGIN/scripts/icm/validate-workspace.js --all` |
| Library skill counts by domain | `$PLUGIN/library/CONTEXT.md` |

Numbers without a command beside them are not audit findings.
