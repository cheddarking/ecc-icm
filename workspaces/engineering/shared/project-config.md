# Project Config

`$PROJECT/.claude/icm.json` is the factory configuration for one repository. `setup` writes it once. Stage contracts load it as a Layer 3 input. Scripts read it: `verify.js` runs the commands, `agent-gate.js` reads the delegation policy, `new.js` reads the default workspace.

```json
{
  "workspace": "engineering",
  "languages": ["typescript"],
  "package_manager": "npm",
  "test": "npm test",
  "lint": "npm run lint",
  "typecheck": "npx tsc --noEmit",
  "format": "npx prettier --check .",
  "delegation": "contract",
  "delegation_threshold_files": 2000,
  "review_min_severity": "MEDIUM",
  "gates": true
}
```

| Key | Used by | Meaning |
|---|---|---|
| `workspace` | new.js | default workspace for new runs |
| `languages` | 04-implement, 05-review | which `$PLUGIN/library/rules/<lang>/` and role files to load |
| `package_manager` | 04-implement | how to install and run |
| `test`, `lint`, `typecheck`, `format` | verify.js, 04-implement, 06-commit | commands; null or missing means skip |
| `delegation` | agent-gate.js | contract, strict, or off |
| `delegation_threshold_files` | 02-research | above this many tracked files the stage may delegate read-only exploration |
| `review_min_severity` | 05-review | lowest severity to report |
| `gates` | 03-plan | true keeps GATE 1 as a hard stop; false makes it a checkpoint |

Unknown keys are ignored. Missing keys take the defaults shown.
