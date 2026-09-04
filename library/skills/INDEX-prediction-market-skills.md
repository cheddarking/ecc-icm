# Skills: prediction-market-skills

Public, non-advisory prediction-market workflows and the consolidated read-only Ito baskets data skill with gated Ito API access.

Load one SKILL.md by path when a stage contract or the task needs it. Do not load this whole domain.

| Skill | What it provides |
|---|---|
| `$PLUGIN/library/skills/ito-baskets/SKILL.md` | Read-only Itô basket and prediction-market data skill. Index the live basket catalog, compare a basket against user-supplied research or a watchlist, build a source-grounded market brief, or draft a non-executable planni |
| `$PLUGIN/library/skills/prediction-market-oracle-research/SKILL.md` | Research prediction markets as data sources or oracle signals for products, agents, dashboards, and corporate decision intelligence. Use for source-grounded analysis of market-implied probabilities, caveats, and integrat |
| `$PLUGIN/library/skills/prediction-market-risk-review/SKILL.md` | Review prediction-market, basket, oracle, and trading-agent workflows for compliance, safety, data-quality, privacy, and execution risk. Use before any workflow handles venue auth, user portfolio data, API keys, or trade |
