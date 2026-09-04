# Legacy Command Shims

These slash-entry shims are no longer loaded by the default plugin command surface.

They remain here for users who still need short-term migration compatibility with old muscle-memory commands such as `tdd` procedure, `eval` procedure, or `verify` procedure.

Prefer the canonical skills or maintained commands referenced inside each shim. If you need one of these shims locally, copy the individual Markdown file into your project-level or user-level Claude commands directory instead of enabling the full archive by default.

---
<!-- ecc-icm-notes -->
ECC-ICM notes: Procedures named above are files, not slash commands: `$PLUGIN/library/procedures/<name>.md`; `$PLUGIN/library/procedures/INDEX.md` says which ecc-icm stage or workspace each maps to. Legacy shims (tdd, verify, e2e, eval, orchestrate, claw and the rest) live under `$PLUGIN/library/legacy-command-shims/commands/`.
