# Contributing

Open an issue with a reproducible bug or a focused proposal. For code changes, include the command that reproduces the problem and the relevant validation output.

The plugin runtime uses Node.js built-ins; root-level validation does not need an `npm install`:

```bash
npm test
npm run validate
npm run budget
```

With Claude Code installed, also run `npm run plugin:validate`. The warning about root `CLAUDE.md` is expected: the SessionStart hook injects that map explicitly.

Keep changes small. `library/` mirrors the ECC commit recorded in `library/_meta/ecc-source-commit.txt` and is overwritten by `library:sync`. Put durable behavior in workspace contracts, references, or the adaptation scripts. Keep upstream licenses and notices intact. See `NOTICE.md` for provenance.

Report estimated static context separately from measured session tokens, API cost, latency, and task quality. Dynamic comparisons must follow `benchmarks/README.md`; the checked-in dynamic benchmark is currently unrun.
