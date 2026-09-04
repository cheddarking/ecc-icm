# Onboarding Questionnaire: Research

<!-- Agent instructions: Read this file when the user types "setup" inside the research
     workspace. Ask ALL questions in one pass. Write the answers under the "research"
     key of $PROJECT/.claude/icm.json. Never ask again. -->

### Q1: Which search tools are available in this environment?
- Key: `research.tools` (array)
- Type: selection, multiple
- Options: web fetch, Exa MCP, Context7 MCP, Firecrawl MCP, GitHub code search, PubMed, USPTO
- Derived: check which MCP servers are connected before asking
- Default: web fetch, GitHub code search

### Q2: Default depth?
- Key: `research.depth`
- Type: selection
- Options: quick (3 to 5 sources), standard (8 to 12), deep (20 or more)
- Default: standard

### Q3: Source policy: which source types are acceptable?
- Key: `research.sources`
- Type: free text
- Default: primary docs and papers first, then reputable secondary sources, then forums marked as anecdotal

### Q4: Citation style?
- Key: `research.citation`
- Type: selection
- Options: numbered with URL list, inline links, APA-like
- Default: numbered with URL list

---

## After Onboarding

Write the keys. Then say: "Start with `new <slug>` and give me the question."
