# Onboarding Questionnaire: Content

<!-- Agent instructions: Read this file when the user types "setup" inside the content
     workspace. Ask ALL questions in one pass. Then build the voice profile with the
     brand-voice skill named in references/voice-profile.md and write the content keys
     into $PROJECT/.claude/icm.json. Never ask again. -->

### Q1: Where are real examples of the voice?
- Key: `content.voice_sources` (array of paths or URLs)
- Type: free text
- Purpose: the profile is derived from these, never described from adjectives
- Default: none; setup cannot finish without at least three examples

### Q2: Who is the audience?
- Key: `content.audience`
- Type: free text
- Example: working developers with 2 to 8 years of experience, technical decision makers

### Q3: Which platforms will pieces go to?
- Key: `content.platforms` (array)
- Type: selection, multiple
- Options: blog, newsletter, X, LinkedIn, Threads, Bluesky, YouTube script, TikTok script
- Default: blog, X

### Q4: Which value types must every piece hit at least one of?
- Key: `content.value_types` (array)
- Type: selection, multiple
- Options: NOVEL, USABLE, QUESTION-GENERATING, INTERESTING, TEACHES
- Default: USABLE, INTERESTING

### Q5: Hard bans beyond the defaults in the quality gate?
- Key: `content.bans` (array of phrases or patterns)
- Type: free text
- Default: none

### Q6: Posting: may the agent post directly, or only prepare drafts?
- Key: `content.posting`
- Type: selection
- Options: prepare only, post after approval
- Default: prepare only

---

## After Onboarding

Build `$PROJECT/.claude/content/voice-profile.md` from the examples (see `../references/voice-profile.md`). Present the derived profile for review; fix what the user corrects. Then say: "Start a piece with `new <slug>`."
