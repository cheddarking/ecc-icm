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

function readDesc(file) {
  try {
    return (frontmatter(fs.readFileSync(file, 'utf8')).description || '').replace(/\s+/g, ' ').replace(/\|/g, '/').trim();
  } catch {
    return '';
  }
}

function build(root) {
  const lib = path.join(root, 'library');
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

  // Procedures (former slash commands)
  const procDir = path.join(lib, 'procedures');
  const procs = fs.readdirSync(procDir).filter(f => f.endsWith('.md') && f !== 'INDEX.md').sort();
  fs.writeFileSync(path.join(procDir, 'INDEX.md'), [
    '# Procedures index',
    '',
    'The 94 ECC slash commands, kept verbatim as procedures. In ICM they are not registered commands; a stage contract or the user names one and the agent reads it by path. Many overlap with the engineering stages; prefer the stage contract when one exists.',
    '',
    '| Procedure | What it does |',
    '|---|---|',
    ...procs.map(f => `| \`$PLUGIN/library/procedures/${f}\` | ${readDesc(path.join(procDir, f)).slice(0, 200)} |`),
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
    '',
    '## Rules of use',
    '',
    '- One-way: the library never points back at a workspace.',
    '- Load a section, not a folder. Every index row is one file.',
    '- Skills here are library files, not registered skills. Do not invoke them with the Skill tool; read the SKILL.md.',
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
