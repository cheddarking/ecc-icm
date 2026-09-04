#!/usr/bin/env node
'use strict';

// Generate the Layer 3 routing files for the library, so the agent loads one
// small index per domain instead of a catalog of 286 descriptions.
//   library/CONTEXT.md                 domain table with counts and pointers
//   library/skills/INDEX-<domain>.md   one row per skill in that domain
//   library/procedures/INDEX.md        ECC commands as procedures
//   library/rules/INDEX.md             common rules and language rule sets
// Domains come from ECC's own install-modules manifest.
// Usage: build-library-index.js [plugin-root]

const fs = require('fs');
const path = require('path');
const { frontmatter } = require('./context-budget');
const { adaptInline, buildContext } = require('./adapt-library');

let adaptCtx = null;

// Descriptions come from ECC frontmatter, which the adapter leaves verbatim;
// the index copy gets the same command-to-procedure and agent-to-role rewrite
// so the routing tables read consistently with the files they point at.
function readDesc(file) {
  try {
    const raw = (frontmatter(fs.readFileSync(file, 'utf8')).description || '').replace(/\s+/g, ' ').replace(/\|/g, '/').trim();
    return adaptCtx ? adaptInline(raw, adaptCtx) : raw;
  } catch {
    return '';
  }
}

function build(root) {
  const lib = path.join(root, 'library');
  adaptCtx = buildContext(root);
  const manifest = JSON.parse(fs.readFileSync(path.join(lib, '_meta', 'ecc-install-modules.json'), 'utf8'));
  const modules = (manifest.modules || manifest).filter(m => m.kind === 'skills');
  const skillsDir = path.join(lib, 'skills');
  const allSkills = fs.readdirSync(skillsDir, { withFileTypes: true })
    .filter(e => e.isDirectory() && fs.existsSync(path.join(skillsDir, e.name, 'SKILL.md')))
    .map(e => e.name)
    .sort();
  const assigned = new Set();
  const domains = [];
  for (const m of modules) {
    const names = (m.paths || []).filter(p => p.startsWith('skills/')).map(p => p.slice('skills/'.length)).filter(n => allSkills.includes(n));
    if (!names.length) continue;
    names.forEach(n => assigned.add(n));
    domains.push({ id: m.id, description: m.description, names: names.sort() });
  }
  const rest = allSkills.filter(n => !assigned.has(n));
  if (rest.length) domains.push({ id: 'uncategorised', description: 'Skills not listed in any ECC install module.', names: rest });

  for (const d of domains) {
    const rows = d.names.map(n => `| \`$PLUGIN/library/skills/${n}/SKILL.md\` | ${readDesc(path.join(skillsDir, n, 'SKILL.md')).slice(0, 220)} |`);
    const text = [
      `# Skills: ${d.id}`,
      '',
      `${d.description}`,
      '',
      'Load one SKILL.md by path when a stage contract or the task needs it. Do not load this whole domain.',
      '',
      '| Skill | What it provides |',
      '|---|---|',
      ...rows,
      ''
    ].join('\n');
    fs.writeFileSync(path.join(skillsDir, `INDEX-${d.id}.md`), text);
  }

  // Procedures (former slash commands), with the ecc-icm stage or workspace
  // each one maps to. Unlisted procedures have no stage equivalent.
  const STAGE_MAP = [
    [/^(plan|plan-prd|prp-plan|prp-prd|multi-plan|gan-design)$/, 'engineering 03-plan'],
    [/^(build-fix|[a-z]+-build|gradle-build|[a-z]+-test|prp-implement)$/, 'engineering 04-implement'],
    [/^(code-review|review-pr|[a-z]+-review|orch-review)$/, 'engineering 05-review'],
    [/^(pr|prp-pr|prp-commit)$/, 'engineering 06-commit'],
    [/^(checkpoint|quality-gate|test-coverage)$/, 'verify.js at the current stage'],
    [/^(learn|learn-eval|evolve|promote|instinct-.*)$/, 'engineering 07-learn or harness-ops 04-learn'],
    [/^(harness-audit|cost-report|model-route|skill-health|prune|hookify.*|config-gc)$/, 'harness-ops 01-audit or 02-tune'],
    [/^(feature-dev|orch-add-feature|orch-change-feature|orch-fix-defect|orch-refine-code|orch-build-mvp|multi-execute|multi-backend|multi-frontend|multi-workflow|gan-build|santa-loop|refactor-clean)$/, 'an engineering run from 01-intake'],
    [/^security-scan$/, 'security workspace'],
    [/^marketing-campaign$/, 'content workspace'],
    [/^(sessions|save-session|resume-session|projects)$/, 'status.js and the run folder']
  ];
  const stageFor = name => {
    const hit = STAGE_MAP.find(([re]) => re.test(name));
    return hit ? hit[1] : 'procedure only';
  };
  const procDir = path.join(lib, 'procedures');
  const procs = fs.readdirSync(procDir).filter(f => f.endsWith('.md') && f !== 'INDEX.md').sort();
  fs.writeFileSync(path.join(procDir, 'INDEX.md'), [
    '# Procedures index',
    '',
    `The ${procs.length} ECC slash commands, kept as procedures. In ICM they are not registered commands; a stage contract or the user names one and the agent reads it by path. Where a procedure overlaps an ecc-icm stage, prefer the stage contract and use the procedure as its reference.`,
    '',
    '| Procedure | Maps to | What it does |',
    '|---|---|---|',
    ...procs.map(f => `| \`$PLUGIN/library/procedures/${f}\` | ${stageFor(f.slice(0, -3))} | ${readDesc(path.join(procDir, f)).slice(0, 180)} |`),
    ''
  ].join('\n'));

  // Rules
  const rulesDir = path.join(lib, 'rules');
  const common = fs.readdirSync(path.join(rulesDir, 'common')).filter(f => f.endsWith('.md')).sort();
  const langs = fs.readdirSync(rulesDir, { withFileTypes: true }).filter(e => e.isDirectory() && e.name !== 'common').map(e => e.name).sort();
  fs.writeFileSync(path.join(rulesDir, 'INDEX.md'), [
    '# Rules index',
    '',
    'ECC rules, verbatim. Layer 3 reference material: a stage contract names a file and a section. Nothing here is always-on.',
    '',
    '## Common',
    '',
    ...common.map(f => `- \`$PLUGIN/library/rules/common/${f}\``),
    '',
    '## Per language',
    '',
    'Each folder holds coding-style.md, patterns.md, security.md, testing.md and hooks.md where ECC provided them.',
    '',
    ...langs.map(l => `- \`$PLUGIN/library/rules/${l}/\` (${fs.readdirSync(path.join(rulesDir, l)).filter(f => f.endsWith('.md')).join(', ')})`),
    ''
  ].join('\n'));

  // Top-level library routing
  const roleCount = fs.existsSync(path.join(lib, 'roles')) ? fs.readdirSync(path.join(lib, 'roles')).filter(f => f.endsWith('.md') && f !== 'INDEX.md').length : 0;
  fs.writeFileSync(path.join(lib, 'CONTEXT.md'), [
    '# Library',
    '',
    'Layer 3 reference material copied from Everything Claude Code (MIT). Nothing in this folder is registered with Claude Code; it reaches the model only when a stage contract or the user names a file. Read the domain index you need, then one file from it.',
    '',
    '## Routing',
    '',
    '| You need | Read |',
    '|---|---|',
    `| A role to take on (planner, reviewer, tdd, ...) | \`$PLUGIN/library/roles/INDEX.md\` (${roleCount} roles) |`,
    '| Coding rules for a language, or the common rules | `$PLUGIN/library/rules/INDEX.md` |',
    '| A former slash command as a step-by-step procedure | `$PLUGIN/library/procedures/INDEX.md` |',
    ...domains.map(d => `| ${d.description.replace(/\|/g, '/').slice(0, 110)} | \`$PLUGIN/library/skills/INDEX-${d.id}.md\` (${d.names.length} skills) |`),
    "| ECC's hook scripts, CLI scripts and helper libraries (opt-in, not wired) | `$PLUGIN/library/scripts/`, `$PLUGIN/library/hooks/hooks.json` |",
    '| MCP server catalog used by research skills | `$PLUGIN/library/mcp-configs/mcp-servers.json` |',
    "| ECC's prompt contexts (dev, review, research) | `$PLUGIN/library/contexts/` |",
    "| ECC's documentation, English only, unmodified | `$PLUGIN/library/docs/` |",
    '| Writing guides for long-form, short-form and security content | `$PLUGIN/library/the-longform-guide.md`, `the-shortform-guide.md`, `the-security-guide.md` |',
    '| Codex mirror of 39 skills, unmodified | `$PLUGIN/library/.agents/skills/` |',
    '| How every ECC surface maps here, and which doctrine ICM supersedes | `$PLUGIN/library/ECC-MAPPING.md` |',
    '',
    '## Rules of use',
    '',
    '- One-way: the library never points back at a workspace.',
    '- Load a section, not a folder. Every index row is one file.',
    '- Skills here are library files, not registered skills. Do not invoke them with the Skill tool; read the SKILL.md.',
    '- Skills, roles, procedures, rules and guides were adapted by `scripts/icm/adapt-library.js`: `/command` mentions became procedures, agent mentions became roles, ECC paths point into this folder. Each adapted file ends with an "ECC-ICM notes" paragraph. Counts: `$PLUGIN/library/_meta/adaptation-report.json`.',
    ''
  ].join('\n'));
  return { domains: domains.length, skills: allSkills.length, procedures: procs.length, languages: langs.length };
}

if (require.main === module) {
  const root = path.resolve(process.argv[2] || path.join(__dirname, '..', '..'));
  const r = build(root);
  process.stdout.write(`Library index: ${r.domains} domains, ${r.skills} skills, ${r.procedures} procedures, ${r.languages} language rule sets\n`);
}

module.exports = { build };
