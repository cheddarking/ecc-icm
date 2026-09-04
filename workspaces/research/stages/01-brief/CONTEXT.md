# Stage 01: Brief

Scope the question and agree what counts as an answer before anything is fetched.

## Inputs

| Source | File/Location | Section/Scope | Why |
|--------|--------------|---------------|-----|
| User | (conversation) | The question and any starting points | What to research |
| Project config | `$PROJECT/.claude/icm.json` | `research` key, if present | Depth, tools, source policy |
| Reference | `../../references/source-policy.md` | "Search order" | What is reachable in this environment |
| Reference | `../../references/formats/brief.md` | Full file | The exact output shape |

## Process

1. `node $PLUGIN/scripts/icm/new.js <slug> --workspace research` if no run exists, then `node $PLUGIN/scripts/icm/run.js <slug> 01-brief`.
2. Restate the question in one sentence. Ask in one message for anything missing: why it matters, deadline, known starting points.
3. Write two to four "what counts as an answer" lines. These decide when gathering stops.
4. Set depth from the config default unless the user said otherwise. Write in and out of scope.
5. Present the brief in five lines and pause.
6. Write `brief.md`. Run `node $PLUGIN/scripts/icm/verify.js <slug> 01-brief`.

## Checkpoints

| After Step | Agent Presents | Human Decides |
|------------|---------------|---------------|
| 5 | Question, answer criteria, scope, depth | Narrow, widen, or approve |

## Audit

| Check | Pass Condition |
|-------|---------------|
| Answer criteria | Each line is a fact that could be found, not an activity |
| Scope | "Out of scope" has at least one entry |
| Depth | Depth is one of quick, standard, deep |

## Outputs

| Artifact | Location | Format |
|----------|----------|--------|
| Brief | `$RUN/01-brief/brief.md` | `../../references/formats/brief.md` |

Delegate: no
