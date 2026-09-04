# Notices

ecc-icm is MIT licensed (see LICENSE). It bundles and adapts two MIT-licensed works.

## Everything Claude Code (ECC)

Copyright (c) 2026 Affaan Mustafa. MIT License. https://github.com/affaan-m/ECC

Copied verbatim into `library/` at the commit recorded in `library/_meta/ecc-source-commit.txt`:
`skills/` (as `library/skills/`), `rules/` (as `library/rules/`), `commands/` (as `library/procedures/`),
`manifests/install-modules.json` (as `library/_meta/ecc-install-modules.json`).
Converted: `agents/*.md` into `library/roles/*.md` (frontmatter and the repeated Prompt Defense Baseline section removed; bodies unchanged).
Adapted: `scripts/hooks/config-protection.js` (copied with a header), `scripts/hooks/cost-tracker.js` (usage summation kept, pricing removed).
The ECC license text is at `library/_meta/LICENSE-ECC.txt`.

## Interpretable Context Methodology (ICM)

Copyright (c) 2026 Model Workspace Protocol Contributors. MIT License.
https://github.com/RinDig/Interpretable-Context-Methodology
Paper: Jake Van Clief and David McDermott, "Interpretable Context Methodology: Folder Structure as Agent Architecture", arXiv 2603.16021.

Copied with the protocol's older name "MWP" replaced by "ICM": `_core/CONVENTIONS.md` (with an added "ECC-ICM adaptations" section), `_core/placeholder-syntax.md`, `_core/templates/*`, and `workspaces/workspace-builder/` (paths adapted to the run-directory layout, `Delegate:` lines added).
The ICM license text is at `_core/LICENSE-ICM.txt`.
