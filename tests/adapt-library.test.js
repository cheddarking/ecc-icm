'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const { adaptText, splitFences, MARKER } = require(path.join(__dirname, '..', 'scripts', 'icm', 'adapt-library.js'));

const files = new Set([
  'rules/common/security.md',
  'scripts/hooks/cost-tracker.js',
  'scripts/harness-audit.js',
  'mcp-configs/mcp-servers.json',
  'docs/token-optimization.md',
  'the-security-guide.md',
  'skills/tdd-workflow/SKILL.md',
  'skills/tdd-workflow/scripts/run.sh',
  'skills/deep-research/SKILL.md',
  'legacy-command-shims/commands/tdd.md'
]);
const dirs = new Set(['rules', 'rules/common', 'rules/rust', 'scripts', 'scripts/hooks', 'scripts/lib/plan-canvas', 'docs', 'docs/examples', 'docs/testing', 'skills/tdd-workflow', 'skills/deep-research', 'legacy-command-shims/commands']);
const norm = rel => rel.replace(/\/+$/, '');
const ctx = {
  skills: new Set(['tdd-workflow', 'deep-research']),
  roles: new Set(['planner', 'code-reviewer', 'architect', 'security-reviewer']),
  procedures: new Set(['plan', 'plan-canvas', 'code-review', 'pr']),
  shims: new Set(['tdd', 'verify']),
  exists: rel => files.has(norm(rel)) || dirs.has(norm(rel)),
  isFile: rel => files.has(norm(rel))
};

test('paths that exist in the library are rewritten, others are left alone', () => {
  const src = [
    'See ~/.claude/skills/tdd-workflow and ~/.claude/skills/my-own-skill.',
    'Read skills/deep-research/SKILL.md and rules/common/security.md and rules/common/nope.md.',
    'Agents live in agents/planner.md; the command is commands/plan.md.',
    'Run node scripts/harness-audit.js and scripts/hooks/cost-tracker.js; config in mcp-configs/mcp-servers.json.',
    'Docs: docs/token-optimization.md and docs/adr/README.md. Guide: the-security-guide.md.',
    'Hook path "${CLAUDE_PLUGIN_ROOT}/scripts/hooks/x.js" and "${CLAUDE_PLUGIN_ROOT}/agents/y.md".',
    'Already $PLUGIN/library/skills/tdd-workflow stays.'
  ].join('\n');
  const { text } = adaptText(src, ctx);
  assert.ok(text.includes('$PLUGIN/library/skills/tdd-workflow and ~/.claude/skills/my-own-skill'));
  assert.ok(text.includes('$PLUGIN/library/skills/deep-research/SKILL.md and $PLUGIN/library/rules/common/security.md and rules/common/nope.md'));
  assert.ok(text.includes('$PLUGIN/library/roles/planner.md; the command is $PLUGIN/library/procedures/plan.md'));
  assert.ok(text.includes('node $PLUGIN/library/scripts/harness-audit.js and $PLUGIN/library/scripts/hooks/cost-tracker.js; config in $PLUGIN/library/mcp-configs/mcp-servers.json'));
  assert.ok(text.includes('$PLUGIN/library/docs/token-optimization.md and docs/adr/README.md. Guide: $PLUGIN/library/the-security-guide.md'));
  assert.ok(text.includes('${CLAUDE_PLUGIN_ROOT}/library/scripts/hooks/x.js'));
  assert.ok(text.includes('${CLAUDE_PLUGIN_ROOT}/library/roles/y.md'));
  assert.ok(!text.includes('$PLUGIN$PLUGIN'));
  assert.equal((text.match(/\$PLUGIN\/library\/skills\/tdd-workflow/g) || []).length, 2);
});

test('skill paths with a tail are rewritten only when the tail exists', () => {
  const src = [
    'Cache at ~/.claude/skills/tdd-workflow/results.json is written at runtime.',
    'Run skills/tdd-workflow/scripts/run.sh, then read skills/tdd-workflow/SKILL.md.',
    'Broken: skills/tdd-workflow/missing.md.'
  ].join('\n');
  const { text } = adaptText(src, ctx);
  assert.ok(text.includes('Cache at ~/.claude/skills/tdd-workflow/results.json'));
  assert.ok(text.includes('Run $PLUGIN/library/skills/tdd-workflow/scripts/run.sh, then read $PLUGIN/library/skills/tdd-workflow/SKILL.md.'));
  assert.ok(text.includes('Broken: skills/tdd-workflow/missing.md.'));
});

test('project-relative doc and rule paths that only match a directory or a placeholder stay', () => {
  const src = [
    'Write the report to docs/testing/<plan-or-task-name>.tdd.md in the project.',
    'Ensure docs/examples are updated if the repo expects it. Create a `rules/rust/` directory.',
    'Also `@docs/...` is accepted. But scripts/lib/plan-canvas/ is a real folder.'
  ].join('\n');
  const { text } = adaptText(src, ctx);
  assert.ok(text.includes('docs/testing/<plan-or-task-name>.tdd.md in the project'));
  assert.ok(text.includes('Ensure docs/examples are updated'));
  assert.ok(text.includes('Create a `rules/rust/` directory'));
  assert.ok(text.includes('`@docs/...` is accepted'));
  assert.ok(text.includes('$PLUGIN/library/scripts/lib/plan-canvas/ is a real folder'));
});

test('slash commands become procedures outside code fences and headings', () => {
  const src = [
    '# Use /plan first',
    'Run `/plan` then `/code-review path/to/file` and finally /pr.',
    'Not a command: https://example.com/plan and docs/plan/x.md and ./plan.',
    '`/plan-canvas` is separate from `/plan`.',
    '```',
    'User: /plan add notifications',
    '```',
    'Inline code that mentions `run /plan now` is left alone.',
    'Legacy: run /tdd before /verify.'
  ].join('\n');
  const { text, fired } = adaptText(src, ctx);
  assert.ok(text.includes('# Use /plan first'));
  assert.ok(text.includes('Run `plan` procedure then `code-review` procedure (`path/to/file`) and finally `pr` procedure.'));
  assert.ok(text.includes('https://example.com/plan and docs/plan/x.md and ./plan.'));
  assert.ok(text.includes('`plan-canvas` procedure is separate from `plan` procedure.'));
  assert.ok(text.includes('User: /plan add notifications'));
  assert.ok(text.includes('`run /plan now` is left alone'));
  assert.ok(text.includes('Legacy: run `tdd` procedure before `verify` procedure.'));
  assert.ok(fired.has('slash-cmd') && fired.has('legacy-shim'));
  assert.ok(text.includes(MARKER));
  assert.ok(text.includes('Procedures named above are files'));
  assert.ok(text.includes('legacy-command-shims/commands/'));
});

test('fences of any length or indent are left alone by the prose rules', () => {
  const src = [
    'Intro /plan here.',
    '````text',
    'User: /plan inside a four-backtick fence',
    '```',
    'nested three backticks are content',
    '```',
    '````',
    'Back in prose /pr.',
    '   ```bash',
    '   /code-review inside an indented fence',
    '   ```',
    '~~~',
    'tilde fence /plan',
    '~~~',
    'Last /plan.'
  ].join('\n');
  const { text } = adaptText(src, ctx);
  assert.ok(text.includes('Intro `plan` procedure here.'));
  assert.ok(text.includes('User: /plan inside a four-backtick fence'));
  assert.ok(text.includes('Back in prose `pr` procedure.'));
  assert.ok(text.includes('   /code-review inside an indented fence'));
  assert.ok(text.includes('tilde fence /plan'));
  assert.ok(text.includes('Last `plan` procedure.'));
  const segs = splitFences(src);
  // The indented fence and the tilde fence are adjacent, so no prose sits between them.
  assert.deepEqual(segs.map(s => s.fenced), [false, true, false, true, true, false]);
});

test('example prompts and roles inside code spans are not rewritten', () => {
  const src = 'Try `/plan [feature]. /tdd to implement. /code-review.` and `security-reviewer agent.` as a prompt.\n';
  const { text } = adaptText(src, ctx);
  assert.ok(text.includes('`/plan [feature]. /tdd to implement. /code-review.`'));
  assert.ok(text.includes('`security-reviewer agent.`'));
});

test('agent mentions become roles, including across an inline code span, once', () => {
  const src = 'Use the **planner** agent, then the `code-reviewer` agent. The Architect agent decides. Spawn subagents for research.\n';
  const first = adaptText(src, ctx);
  assert.ok(first.text.includes('Use the **planner** role, then the `code-reviewer` role. The Architect role decides.'));
  assert.ok(first.text.includes('Roles named above are files under'));
  const second = adaptText(first.text, ctx);
  assert.equal(second.text, first.text, 'second pass changes nothing');
  assert.equal((second.text.match(new RegExp(MARKER, 'g')) || []).length, 1);
});

test('frontmatter and files without ECC references are untouched', () => {
  const src = '---\nname: x\ndescription: Use /plan to plan\n---\n\nPlain text about testing.\n';
  const { text, fired } = adaptText(src, ctx);
  assert.equal(text, src);
  assert.equal(fired.size, 0);
});

test('hook and install mentions get their notes', () => {
  const src = 'Add this to hooks/hooks.json under PostToolUse. Install with /plugin install ecc.\n';
  const { text } = adaptText(src, ctx);
  assert.ok(text.includes('$PLUGIN/library/hooks/hooks.json'));
  assert.ok(text.includes("ECC's hooks are not installed by ecc-icm"));
  assert.ok(text.includes('Install and configuration steps above describe ECC itself'));
});
