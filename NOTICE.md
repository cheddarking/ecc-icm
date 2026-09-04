# Notices

ecc-icm is MIT licensed (see LICENSE). It bundles and adapts two MIT-licensed works.

## Everything Claude Code (ECC)

Copyright (c) 2026 Affaan Mustafa. MIT License. https://github.com/affaan-m/ECC

Mirrored into `library/` by `scripts/icm/sync-library.sh` at the commit recorded in `library/_meta/ecc-source-commit.txt`:
`skills/`, `rules/`, `commands/` (as `library/procedures/`), `legacy-command-shims/`, `scripts/`, `hooks/`, `mcp-configs/`, `contexts/`, `scaffolds/`, `manifests/`, `schemas/`, `config/`, `examples/`, `workflows/`, `docs/` (minus the 13 translated copies), `.agents/` (the Codex skill mirror), the three writing guides, ECC's root markdown (`CLAUDE.md`, `AGENTS.md` and the READMEs carry an `ECC-` prefix), `package.json`, `package-lock.json` and `VERSION`.
Converted: `agents/*.md` into `library/roles/*.md` (frontmatter and the repeated Prompt Defense Baseline section removed, runs of blank lines collapsed, a provenance header added).
Adapted by `scripts/icm/adapt-library.js` in skills, roles, procedures, legacy shims, rules, the markdown under `hooks/` and the long-form and short-form guides: ECC paths rewritten to `library/`, slash-command mentions to procedures, agent mentions to roles, plus one appended "ECC-ICM notes" paragraph per affected file. Per-file rule counts are in `library/_meta/adaptation-report.json`; `library/ECC-MAPPING.md` explains the mapping. Everything else in `library/` is byte-identical to ECC.
Adapted separately for this plugin's own hooks: `scripts/icm/config-protection.js` (ECC's `scripts/hooks/config-protection.js` with a header) and `scripts/icm/cost-tracker.js` (ECC's `scripts/hooks/cost-tracker.js` with the usage summation kept and the pricing removed).
The ECC license text is at `library/_meta/LICENSE-ECC.txt`.

## Interpretable Context Methodology (ICM)

Copyright (c) 2026 Model Workspace Protocol Contributors. MIT License.
https://github.com/RinDig/Interpretable-Context-Methodology
Paper: Jake Van Clief and David McDermott, "Interpretable Context Methodology: Folder Structure as Agent Architecture", arXiv 2603.16021.

Copied with the protocol's older name "MWP" replaced by "ICM": `_core/CONVENTIONS.md` (with an added "ECC-ICM adaptations" section), `_core/placeholder-syntax.md`, `_core/templates/*`, and `workspaces/workspace-builder/` (paths adapted to the run-directory layout, `Delegate:` lines added).
The ICM license text is at `_core/LICENSE-ICM.txt`.
