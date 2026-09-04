#!/usr/bin/env node
'use strict';

// One-off converter: ECC agents/*.md -> library/roles/<name>.md
// Strips the agent frontmatter (an agent definition is a sub-agent; a role
// is context the single agent loads) and the repeated Prompt Defense
// Baseline section (Layer 0 carries the invariants once). Writes INDEX.md.
// Usage: convert-roles.js <ecc-root> <out-dir>

const fs = require('fs');
const path = require('path');
const { frontmatter } = require('./context-budget');

function stripSection(text, heading) {
  const lines = text.split('\n');
  const out = [];
  let skipping = false;
  for (const line of lines) {
    if (/^## /.test(line)) skipping = line.trim() === heading;
    if (!skipping) out.push(line);
  }
  return out.join('\n');
}

function convert(eccRoot, outDir) {
  const agentsDir = path.join(eccRoot, 'agents');
  fs.mkdirSync(outDir, { recursive: true });
  const index = [];
  for (const file of fs.readdirSync(agentsDir).filter(f => f.endsWith('.md')).sort()) {
    const text = fs.readFileSync(path.join(agentsDir, file), 'utf8');
    const fm = frontmatter(text);
    const name = fm.name || file.replace(/\.md$/, '');
    let body = text.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
    body = stripSection(body, '## Prompt Defense Baseline').replace(/\n{3,}/g, '\n\n').trim();
    // The source is named without an "agents/" path so the reference adapter
    // does not rewrite the provenance line into a self-reference.
    const header = [
      `# Role: ${name}`,
      '',
      `Source: ECC \`agents\` folder, file \`${file}\` (MIT, Affaan Mustafa). Converted to an ICM role reference: the single agent loads this when a stage contract names it. Former sub-agent model hint: ${fm.model || 'unspecified'}. Former tools: ${fm.tools || 'unspecified'}.`,
      '',
      `Description: ${fm.description || ''}`,
      '',
      '---',
      ''
    ].join('\n');
    fs.writeFileSync(path.join(outDir, `${name}.md`), header + body + '\n');
    index.push({ name, description: fm.description || '', model: fm.model || '', lines: body.split('\n').length });
  }
  const table = [
    '# Roles index',
    '',
    'Converted from the 68 ECC agent definitions. A role is reference material (Layer 3) that the single agent loads when a stage contract names it; nothing here is a sub-agent. Load one file and the section the contract points at, never the whole folder.',
    '',
    '| Role | Former model | Lines | Description |',
    '|---|---|---:|---|',
    ...index.map(r => `| \`${r.name}.md\` | ${r.model} | ${r.lines} | ${r.description.replace(/\|/g, '/').slice(0, 160)} |`),
    ''
  ].join('\n');
  fs.writeFileSync(path.join(outDir, 'INDEX.md'), table);
  return index.length;
}

if (require.main === module) {
  const [eccRoot, outDir] = process.argv.slice(2);
  if (!eccRoot || !outDir) {
    process.stderr.write('Usage: convert-roles.js <ecc-root> <out-dir>\n');
    process.exit(1);
  }
  const n = convert(path.resolve(eccRoot), path.resolve(outDir));
  process.stdout.write(`Converted ${n} agents into roles at ${path.resolve(outDir)}\n`);
}

module.exports = { convert, stripSection };
