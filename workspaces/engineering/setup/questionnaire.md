# Onboarding Questionnaire: Engineering

<!-- Agent instructions: Read this file when the user types "setup". Ask ALL questions
     in a single conversational pass. Derive what you can from the repository first
     (package.json scripts, lockfiles, file extensions, CI config) and present the
     derived answers as defaults so the user only corrects what is wrong. Then write
     $PROJECT/.claude/icm.json with the keys named below. Never ask again. -->

### Q1: Which workspace should new runs use by default?
- Key: `workspace`
- Type: selection
- Options: engineering, research, content, security, harness-ops
- Default: engineering

### Q2: What are the main languages in this repository?
- Key: `languages` (array, lowercase, matching folder names in `$PLUGIN/library/rules/`)
- Type: free text
- Derived: from file extensions and lockfiles; confirm with the user
- Default: the detected list

### Q3: What command runs the test suite?
- Key: `test`
- Type: free text, or "none"
- Derived: `package.json` scripts.test, `pytest`, `go test ./...`, `cargo test`
- Default: the detected command

### Q4: What commands lint, typecheck and check formatting?
- Keys: `lint`, `typecheck`, `format` (any may be null)
- Type: free text
- Derived: `package.json` scripts, `tsc --noEmit`, `ruff check .`, `cargo clippy`
- Default: the detected commands

### Q5: Which package manager?
- Key: `package_manager`
- Type: selection
- Options: npm, pnpm, yarn, bun, pip, uv, cargo, go, other
- Derived: from the lockfile present

### Q6: Delegation policy while a run is active?
- Key: `delegation`
- Type: selection
- Options: contract (only where a stage says Delegate: yes), strict (also deny outside runs), off
- Default: contract

### Q7: Above how many tracked files may 02-research delegate a read-only exploration?
- Key: `delegation_threshold_files`
- Type: number
- Default: 2000

### Q8: Lowest review severity to report?
- Key: `review_min_severity`
- Type: selection
- Options: CRITICAL, HIGH, MEDIUM, LOW
- Default: MEDIUM

### Q9: Keep both human gates (after plan, before commit)?
- Key: `gates`
- Type: yes/no
- Default: yes. Answering no still stops before commit; only GATE 1 becomes a checkpoint.

---

## After Onboarding

Write `$PROJECT/.claude/icm.json` in the shape shown in `../shared/project-config.md`. Tell the user which values were derived and which they set. Then say: "Start a run with `new <slug>`."
