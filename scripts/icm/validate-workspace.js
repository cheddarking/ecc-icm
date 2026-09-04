#!/usr/bin/env node
'use strict';

// Machine-check ICM workspaces against _core/CONVENTIONS.md plus the ECC-ICM
// adaptations. Modelled on THEONIC's validate_icm.py.
// Usage: validate-workspace.js (--all | <workspace dir>...) [--json] [--allow-placeholders]
//
// Errors (exit 1):
//   E1 CLAUDE.md or CONTEXT.md missing at the workspace root
//   E2 no stage folders, or a stage folder without CONTEXT.md
//   E3 stage contract missing ## Inputs, ## Process or ## Outputs
//   E4 stage contract over 80 lines
//   E5 stage contract has no "Delegate: yes|no" line
//   E6 em dash anywhere in the workspace
//   E7 a path in an Inputs table does not resolve
//   E8 a stage reads a later stage's run output (one-way references)
//   E9 a file or folder name is not lowercase-with-hyphens
//   E10 unresolved {{PLACEHOLDER}} (error unless --allow-placeholders)
// Warnings:
//   W1 reference or shared file over 200 lines

const fs = require('fs');
const path = require('path');
const lib = require('./lib');

const ALLOWED_NAMES = new Set(['CLAUDE.md', 'CONTEXT.md', 'SKILL.md', 'README.md', 'LICENSE', 'LICENSE.txt', 'INDEX.md', '.gitkeep']);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === '.git') continue;
      out.push({ path: p, dir: true });
      walk(p, out);
    } else {
      out.push({ path: p, dir: false });
    }
  }
  return out;
}

function tablePaths(text) {
  // Every backticked token in a table row of the Inputs section.
  const section = text.split(/^## Inputs\s*$/m)[1];
  if (!section) return [];
  const body = section.split(/^## /m)[0];
  const paths = [];
  for (const line of body.split('\n')) {
    if (!line.trim().startsWith('|')) continue;
    const cells = line.split('|').map(c => c.trim());
    if (cells.length < 4) continue;
    const cell = cells[2];
    if (/^-+$/.test(cell) || /File\/Location/i.test(cell)) continue;
    const ticks = [...cell.matchAll(/`([^`]+)`/g)].map(m => m[1]);
    for (const t of ticks) paths.push(t);
  }
  return paths;
}

function resolveContractPath(token, stageDir, pluginRoot) {
  if (token.startsWith('$RUN') || token.startsWith('$PROJECT')) return { skip: true };
  if (!/[\/.]/.test(token)) return { skip: true };
  if (/^(git |\(|conversation)/.test(token)) return { skip: true };
  let file;
  if (token.startsWith('$PLUGIN/')) file = path.join(pluginRoot, token.slice('$PLUGIN/'.length));
  else if (token.startsWith('/')) file = path.join(pluginRoot, token.slice(1));
  else file = path.join(stageDir, token);
  // A glob names a family of files; check that the part before the first
  // wildcard exists.
  if (file.includes('*')) file = file.slice(0, file.indexOf('*')).replace(/[\/]+$/, '');
  return { file };
}

function validateWorkspace(wsDir, opts = {}) {
  const pluginRoot = opts.pluginRoot || lib.PLUGIN_ROOT;
  const errors = [];
  const warnings = [];
  const rel = p => path.relative(pluginRoot, p);

  for (const f of ['CLAUDE.md', 'CONTEXT.md']) {
    if (!fs.existsSync(path.join(wsDir, f))) errors.push(`E1 ${rel(wsDir)}: missing ${f}`);
  }

  const stagesDir = path.join(wsDir, 'stages');
  let stages = [];
  try {
    stages = fs.readdirSync(stagesDir, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name).sort();
  } catch {
    errors.push(`E2 ${rel(wsDir)}: no stages/ folder`);
  }
  if (!stages.length && fs.existsSync(stagesDir)) errors.push(`E2 ${rel(wsDir)}: stages/ is empty`);

  const stageNums = stages.map(s => Number(s.slice(0, 2)));
  for (const stage of stages) {
    const stageDir = path.join(stagesDir, stage);
    const contract = path.join(stageDir, 'CONTEXT.md');
    if (!/^\d{2}-[a-z0-9-]+$/.test(stage)) errors.push(`E9 ${rel(stageDir)}: stage folder must look like 01-name`);
    if (!fs.existsSync(contract)) {
      errors.push(`E2 ${rel(stageDir)}: missing CONTEXT.md`);
      continue;
    }
    const text = fs.readFileSync(contract, 'utf8');
    const lines = text.split('\n');
    for (const h of ['## Inputs', '## Process', '## Outputs']) {
      if (!new RegExp(`^${h}\\s*$`, 'm').test(text)) errors.push(`E3 ${rel(contract)}: missing "${h}"`);
    }
    if (lines.length > 80) errors.push(`E4 ${rel(contract)}: ${lines.length} lines (limit 80)`);
    if (!/^Delegate:\s*(yes|no)\b/im.test(text)) errors.push(`E5 ${rel(contract)}: missing "Delegate: yes|no" line`);
    for (const token of tablePaths(text)) {
      const r = resolveContractPath(token, stageDir, pluginRoot);
      if (r.skip) continue;
      if (!fs.existsSync(r.file)) errors.push(`E7 ${rel(contract)}: input path does not resolve: ${token}`);
    }
    const myNum = Number(stage.slice(0, 2));
    for (const m of text.matchAll(/\$RUN\/(\d{2})-[a-z0-9-]+/g)) {
      if (Number(m[1]) > myNum) errors.push(`E8 ${rel(contract)}: reads later stage output ${m[0]}`);
    }
    for (const m of text.matchAll(/\.\.\/(\d{2})-[a-z0-9-]+\//g)) {
      if (Number(m[1]) > myNum && stageNums.includes(Number(m[1]))) errors.push(`E8 ${rel(contract)}: references later stage ${m[0]}`);
    }
  }

  for (const entry of walk(wsDir)) {
    const name = path.basename(entry.path);
    if (!ALLOWED_NAMES.has(name) && !/^[a-z0-9]+(?:[-.][a-z0-9]+)*$/.test(name)) {
      errors.push(`E9 ${rel(entry.path)}: name is not lowercase-with-hyphens`);
    }
    if (entry.dir) continue;
    if (!/\.(md|json|txt|yaml|yml)$/.test(name)) continue;
    const text = fs.readFileSync(entry.path, 'utf8');
    if (text.includes('—')) errors.push(`E6 ${rel(entry.path)}: contains an em dash`);
    // Placeholders inside code spans or fenced blocks document the syntax;
    // only a bare {{NAME}} in prose is an unresolved placeholder.
    const prose = text.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
    if (/\{\{[A-Z0-9_?\/]+\}\}/.test(prose) && !opts.allowPlaceholders) {
      if (/(templates|placeholder-syntax|questionnaire)/.test(entry.path)) continue;
      errors.push(`E10 ${rel(entry.path)}: unresolved {{PLACEHOLDER}}`);
    }
    if (/\/(references|shared)\//.test(entry.path) && text.split('\n').length > 200) {
      warnings.push(`W1 ${rel(entry.path)}: ${text.split('\n').length} lines (guideline 200)`);
    }
    // W2: a table row that names a file and quotes section names must point
    // at headings that exist, so selective section routing cannot go stale.
    for (const line of text.split('\n')) {
      if (!line.trim().startsWith('|')) continue;
      const cells = line.split('|').map(c => c.trim());
      for (let i = 1; i < cells.length - 1; i += 1) {
        const pm = cells[i].match(/^`(\$PLUGIN\/[^`]+|\.\.?\/[^`]+)`$/);
        if (!pm) continue;
        const names = [...(cells[i + 1] || '').matchAll(/"([^"]+)"/g)].map(m => m[1]);
        if (!names.length) continue;
        const target = pm[1].startsWith('$PLUGIN/') ? path.join(pluginRoot, pm[1].slice(8)) : path.join(path.dirname(entry.path), pm[1]);
        if (!fs.existsSync(target) || fs.statSync(target).isDirectory()) continue;
        const heads = [...fs.readFileSync(target, 'utf8').matchAll(/^#{1,6}\s+(.+)$/gm)].map(m => m[1].replace(/[*`]/g, '').trim().toLowerCase());
        for (const n of names) {
          if (!heads.some(h => h.includes(n.toLowerCase()))) warnings.push(`W2 ${rel(entry.path)}: no heading "${n}" in ${pm[1]}`);
        }
      }
    }
  }

  return { workspace: rel(wsDir) || path.basename(wsDir), stages: stages.length, errors, warnings };
}

function main() {
  const argv = process.argv.slice(2);
  const json = argv.includes('--json');
  const allowPlaceholders = argv.includes('--allow-placeholders');
  let targets = argv.filter(a => !a.startsWith('--'));
  if (argv.includes('--all')) {
    targets = lib.listWorkspaces().map(w => lib.workspaceDir(w));
  }
  if (!targets.length) {
    process.stderr.write('Usage: validate-workspace.js (--all | <workspace dir>...) [--json] [--allow-placeholders]\n');
    process.exit(1);
  }
  const results = targets.map(t => validateWorkspace(path.resolve(t), { allowPlaceholders }));
  const failed = results.some(r => r.errors.length);
  if (json) {
    lib.writeJsonOut({ ok: !failed, results });
  } else {
    for (const r of results) {
      process.stdout.write(`${r.errors.length ? 'FAIL' : 'PASS'} ${r.workspace} (${r.stages} stages, ${r.errors.length} errors, ${r.warnings.length} warnings)\n`);
      for (const e of r.errors) process.stdout.write(`  ${e}\n`);
      for (const w of r.warnings) process.stdout.write(`  ${w}\n`);
    }
  }
  process.exit(failed ? 1 : 0);
}

if (require.main === module) main();

module.exports = { validateWorkspace, tablePaths };
