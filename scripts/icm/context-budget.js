#!/usr/bin/env node
'use strict';

// Estimate the static context a plugin or harness root puts in front of the
// model every turn: registered skill, agent and command descriptions, rules
// that install as always-on, and any SessionStart injection.
// Usage: context-budget.js <root> [--json]
// Tokens are chars/4 estimates. Compare roots, do not treat as billing.

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

function tok(s) {
  return Math.ceil(String(s || '').length / 4);
}

function frontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const fm = {};
  if (!m) return fm;
  let key = null;
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([A-Za-z_-]+):\s*(.*)$/);
    if (kv) {
      key = kv[1];
      fm[key] = kv[2].replace(/^>-?\s*$/, '');
    } else if (key && /^\s+\S/.test(line)) {
      fm[key] = `${fm[key]} ${line.trim()}`.trim();
    }
  }
  return fm;
}

function readManifest(root) {
  try {
    return JSON.parse(fs.readFileSync(path.join(root, '.claude-plugin', 'plugin.json'), 'utf8'));
  } catch {
    return null;
  }
}

function asList(v) {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

function listSkillFiles(root, manifest) {
  const dirs = manifest && manifest.skills ? asList(manifest.skills) : ['./skills/'];
  const files = [];
  for (const d of dirs) {
    const abs = path.resolve(root, d);
    if (!fs.existsSync(abs)) continue;
    if (fs.existsSync(path.join(abs, 'SKILL.md'))) {
      files.push(path.join(abs, 'SKILL.md'));
      continue;
    }
    for (const e of fs.readdirSync(abs, { withFileTypes: true })) {
      if (e.isDirectory() && fs.existsSync(path.join(abs, e.name, 'SKILL.md'))) files.push(path.join(abs, e.name, 'SKILL.md'));
    }
  }
  return files;
}

function listMdFiles(root, manifestKey, manifest, defaultDir) {
  const entries = manifest && manifest[manifestKey] ? asList(manifest[manifestKey]) : [`./${defaultDir}/`];
  const files = [];
  for (const d of entries) {
    const abs = path.resolve(root, d);
    if (!fs.existsSync(abs)) continue;
    if (fs.statSync(abs).isFile()) {
      files.push(abs);
      continue;
    }
    for (const e of fs.readdirSync(abs)) if (e.endsWith('.md')) files.push(path.join(abs, e));
  }
  return files;
}

function descTokens(files) {
  let total = 0;
  for (const f of files) {
    const fm = frontmatter(fs.readFileSync(f, 'utf8'));
    total += tok(`${fm.name || path.basename(path.dirname(f))}: ${fm.description || ''}`);
  }
  return total;
}

function measure(root) {
  const manifest = readManifest(root);
  const rows = [];
  const skills = listSkillFiles(root, manifest);
  rows.push({ surface: 'skill descriptions', count: skills.length, tokens: descTokens(skills) });
  const agents = listMdFiles(root, 'agents', manifest, 'agents');
  rows.push({ surface: 'agent descriptions', count: agents.length, tokens: descTokens(agents) });
  const commands = listMdFiles(root, 'commands', manifest, 'commands');
  rows.push({ surface: 'command descriptions', count: commands.length, tokens: descTokens(commands) });

  const rulesDir = path.join(root, 'rules', 'common');
  if (fs.existsSync(rulesDir)) {
    const files = fs.readdirSync(rulesDir).filter(f => f.endsWith('.md'));
    const tokens = files.reduce((n, f) => n + tok(fs.readFileSync(path.join(rulesDir, f), 'utf8')), 0);
    rows.push({ surface: 'rules/common (always-on when installed)', count: files.length, tokens });
  }

  const layer0 = path.join(root, 'scripts', 'icm', 'layer0.js');
  if (fs.existsSync(layer0)) {
    const res = spawnSync(process.execPath, [layer0], { input: JSON.stringify({ cwd: root }), encoding: 'utf8', env: { ...process.env, CLAUDE_PLUGIN_ROOT: root } });
    let injected = '';
    try {
      injected = JSON.parse(res.stdout).hookSpecificOutput.additionalContext;
    } catch {
      injected = res.stdout || '';
    }
    rows.push({ surface: 'SessionStart injection (Layer 0 + status)', count: 1, tokens: tok(injected) });
  }

  const total = rows.reduce((n, r) => n + r.tokens, 0);
  return { root, rows, total };
}

function main() {
  const argv = process.argv.slice(2);
  const json = argv.includes('--json');
  const root = path.resolve(argv.find(a => !a.startsWith('--')) || '.');
  const result = measure(root);
  if (json) {
    process.stdout.write(JSON.stringify(result, null, 2));
    return;
  }
  process.stdout.write(`Static context estimate for ${root}\n\n`);
  process.stdout.write('| Surface | Count | Tokens |\n|---|---:|---:|\n');
  for (const r of result.rows) process.stdout.write(`| ${r.surface} | ${r.count} | ${r.tokens.toLocaleString()} |\n`);
  process.stdout.write(`| total | | ${result.total.toLocaleString()} |\n`);
}

if (require.main === module) main();

module.exports = { measure, frontmatter };
