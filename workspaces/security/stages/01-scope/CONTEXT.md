# Stage 01: Scope

Fix the target, the threat areas, and what the agent is allowed to do. Nothing is scanned yet.

## Inputs

| Source | File/Location | Section/Scope | Why |
|--------|--------------|---------------|-----|
| User | (conversation) | Target and concerns | What to review |
| Project config | `$PROJECT/.claude/icm.json` | `security` key, `languages` | Engagement rules, scanners, compliance, floor |
| Reference | `../../references/checklist-map.md` | "Threat areas" | The areas to choose from |
| Reference | `../../references/formats/scope.md` | Full file | The exact output shape |

## Process

1. `node $PLUGIN/scripts/icm/new.js <slug> --workspace security` if no run exists, then `node $PLUGIN/scripts/icm/run.js <slug> 01-scope`.
2. Name the target precisely: a path list, a diff range, or a feature with its entry points.
3. Pick threat areas from the map. For each, find at least one entry point in the target and record `path:line`.
4. List scanners from the config that apply to the languages present. Write out-of-scope paths.
5. Present target, areas, scanners and engagement rules in five lines and pause.
6. Write `scope.md`. Run `node $PLUGIN/scripts/icm/verify.js <slug> 01-scope`.

## Checkpoints

| After Step | Agent Presents | Human Decides |
|------------|---------------|---------------|
| 5 | Target, threat areas, scanners, engagement | Adjust scope or approve |

## Audit

| Check | Pass Condition |
|-------|---------------|
| Entry points | Every threat area has a `path:line` |
| Engagement | The engagement line matches the config or a stated override |
| Exclusions | Out of scope has at least one line, or "none" with a reason |

## Outputs

| Artifact | Location | Format |
|----------|----------|--------|
| Scope | `$RUN/01-scope/scope.md` | `../../references/formats/scope.md` |

Delegate: no
