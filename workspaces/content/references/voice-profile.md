# Voice Profile

Factory configuration for the content workspace. Built once by `setup`, stored at `$PROJECT/.claude/content/voice-profile.md`, loaded by 03-draft.

## How it is built

| Load | Section | Why |
|---|---|---|
| `$PLUGIN/library/skills/brand-voice/SKILL.md` | "Source Priority", "Collection Workflow", "What to Extract", "Output Contract" | The extraction method |
| `$PLUGIN/library/skills/brand-voice/SKILL.md` | "Hard Bans" | Defaults every profile inherits |

Skip the "Affaan / ECC Defaults" section; it describes someone else's voice.

## Shape of the file

```markdown
# Voice profile: <name>

Derived from: <the example sources, with dates>

## Hard constraints
- <things the voice never does, each with an example that breaks it>

## Sentence rules
- <length, rhythm, punctuation habits, with a matching example sentence>

## Pacing and structure
- <how pieces open, move, and end>

## Sounds right
- <three to five verbatim sentences from the sources>

## Sounds wrong
- <three to five sentences that a generic model would write for this audience>

## Vocabulary
- prefers: <words>
- avoids: <words>
```

Examples over descriptions: a rule without a matching example sentence is not a rule.
