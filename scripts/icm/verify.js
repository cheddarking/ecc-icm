#!/usr/bin/env node
'use strict';

// Run the mechanical part of a stage's Audit and write verify.md into the
// stage folder. The model reads the result; no model call happens here.
// Usage: verify.js <slug> <stage> [--project <dir>] [--json]
//
// Project commands come from .claude/icm.json:
//   { "test": "npm test", "lint": "npm run lint", "typecheck": "tsc --noEmit",
//     "format": "prettier --check ." }  (any may be null)

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const lib = require('./lib');

// Required text per engineering stage. Other workspaces only get the
// artifact-existence check, which is derived from each contract's Outputs
// table so nothing here needs updating when a workspace is added.
const REQUIRED_TEXT = {
  'engineering/01-intake': [/^Tier:\s*(trivial|small|standard|large)/im, /^Stages:/im, /^Security lens:\s*(yes|no)/im],
  'engineering/03-plan': [/^## Tasks/m, /Validate:/],
  'engineering/05-review': [/^## Findings/m, /^## Trace/m]
};

// Artifacts a stage must write: every `$RUN/<stage>/<file>` in the contract's
// Outputs table. A row whose location is a folder (trailing slash) is skipped.
function requiredArtifacts(workspace, stage) {
  let text;
  try {
    text = fs.readFileSync(lib.contractPath(workspace, stage), 'utf8');
  } catch {
    return [];
  }
  const section = text.split(/^## Outputs\s*$/m)[1];
  if (!section) return [];
  const files = [];
  for (const m of section.split(/^## /m)[0].matchAll(/`\$RUN\/(\d{2}-[a-z0-9-]+)\/([^`\/]+)`/g)) {
    if (m[1] === stage && !files.includes(m[2])) files.push(m[2]);
  }
  return files;
}

// Keep the agent's version of each artifact so a later stage can tell what
// the human changed (see run.js, recordEdits).
function snapshotArtifacts(stageDir, files) {
  const dir = path.join(stageDir, '.agent');
  for (const f of files) {
    const src = path.join(stageDir, f);
    if (!fs.existsSync(src)) continue;
    fs.mkdirSync(dir, { recursive: true });
    fs.copyFileSync(src, path.join(dir, f));
  }
}

function parseArgs(argv) {
  const args = { json: false, project: null, slug: null, stage: null };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === '--json') args.json = true;
    else if (a === '--project') args.project = argv[++i];
    else if (!args.slug) args.slug = a;
    else if (!args.stage) args.stage = a;
  }
  return args;
}

function runCommand(cmd, cwd) {
  const res = spawnSync(cmd, { cwd, shell: true, encoding: 'utf8', timeout: 600000, maxBuffer: 8 * 1024 * 1024 });
  const out = `${res.stdout || ''}${res.stderr || ''}`.trim();
  return { ok: res.status === 0, status: res.status, tail: out.split('\n').slice(-25).join('\n') };
}

function changedFiles(cwd) {
  const res = spawnSync('git', ['status', '--porcelain'], { cwd, encoding: 'utf8' });
  if (res.status !== 0) return [];
  return res.stdout.split('\n').filter(Boolean).map(l => l.slice(3).trim()).filter(Boolean);
}

function consoleLogCheck(cwd) {
  const files = changedFiles(cwd).filter(f => /\.(js|jsx|ts|tsx|mjs|cjs)$/.test(f) && !/(\.test\.|\.spec\.|__tests__|\/tests?\/)/.test(f));
  const hits = [];
  for (const f of files) {
    let text;
    try {
      text = fs.readFileSync(path.join(cwd, f), 'utf8');
    } catch {
      continue;
    }
    text.split('\n').forEach((line, i) => {
      if (/\bconsole\.log\(/.test(line)) hits.push(`${f}:${i + 1}`);
    });
  }
  return hits;
}

function verify({ project, slug, stage }) {
  const run = lib.readRun(project, slug);
  if (!run) throw new Error(`No run "${slug}" in ${lib.runsDir(project)}`);
  const stages = lib.stageDirs(run.workspace);
  if (!stages.includes(stage)) throw new Error(`Unknown stage "${stage}". Stages: ${stages.join(', ')}`);
  const cfg = lib.loadConfig(project) || {};
  const stageDir = path.join(lib.runDir(project, slug), stage);
  const checks = [];
  const add = (name, ok, detail) => checks.push({ name, ok, detail: detail || '' });

  const required = requiredArtifacts(run.workspace, stage);
  const textRules = REQUIRED_TEXT[`${run.workspace}/${stage}`] || [];
  for (const f of required) {
    const exists = fs.existsSync(path.join(stageDir, f));
    add(`output file ${f}`, exists, exists ? '' : `missing in ${stageDir}`);
    if (exists && f === required[0]) {
      const text = fs.readFileSync(path.join(stageDir, f), 'utf8');
      for (const re of textRules) add(`${f} contains ${re}`, re.test(text));
    }
  }

  if (run.workspace === 'engineering' && stage === '04-implement') {
    for (const key of ['test', 'lint']) {
      if (cfg[key]) {
        const r = runCommand(cfg[key], project);
        add(`${key}: ${cfg[key]}`, r.ok, r.ok ? '' : r.tail);
      } else {
        add(`${key} command`, true, 'not configured in .claude/icm.json (skipped)');
      }
    }
  }

  if (run.workspace === 'engineering' && stage === '06-commit') {
    for (const key of ['format', 'typecheck', 'test']) {
      if (cfg[key]) {
        const r = runCommand(cfg[key], project);
        add(`${key}: ${cfg[key]}`, r.ok, r.ok ? '' : r.tail);
      }
    }
    const hits = consoleLogCheck(project);
    add('no console.log in changed source files', hits.length === 0, hits.join(', '));
  }

  const started = run.stages && run.stages[stage] && run.stages[stage].started;
  const transcript = lib.findTranscript(project, null);
  const allowed = lib.contractAllowsDelegation(run.workspace, stage);
  if (transcript) {
    const n = lib.countAgentToolUses(transcript, started);
    add('Agent tool uses in this stage', allowed || n === 0, `${n} (delegation ${allowed ? 'allowed' : 'not allowed'} here)`);
  } else {
    add('Agent tool uses in this stage', true, 'transcript not found (skipped)');
  }

  const ok = checks.every(c => c.ok);
  const lines = [
    `# Verify: ${slug} / ${stage}`,
    '',
    `Result: ${ok ? 'PASS' : 'FAIL'}`,
    `Checked: ${new Date().toISOString()}`,
    '',
    '| Check | Result | Detail |',
    '|---|---|---|',
    ...checks.map(c => `| ${c.name} | ${c.ok ? 'pass' : 'FAIL'} | ${String(c.detail).replace(/\|/g, '\\|').replace(/\n/g, ' ').slice(0, 400)} |`),
    ''
  ];
  fs.mkdirSync(stageDir, { recursive: true });
  fs.writeFileSync(path.join(stageDir, 'verify.md'), lines.join('\n'));
  snapshotArtifacts(stageDir, required);
  return { ok, checks, report: path.join(stageDir, 'verify.md') };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const project = args.project || lib.projectDir(null);
  if (!args.slug || !args.stage) {
    process.stderr.write('Usage: verify.js <slug> <stage> [--project <dir>] [--json]\n');
    process.exit(1);
  }
  try {
    const result = verify({ project, slug: args.slug, stage: args.stage });
    if (args.json) lib.writeJsonOut(result);
    else {
      process.stdout.write(`${result.ok ? 'PASS' : 'FAIL'}: ${result.report}\n`);
      for (const c of result.checks) process.stdout.write(`  [${c.ok ? 'pass' : 'FAIL'}] ${c.name}${c.detail ? ` :: ${c.detail.split('\n')[0]}` : ''}\n`);
    }
    process.exit(result.ok ? 0 : 1);
  } catch (err) {
    process.stderr.write(`[ECC-ICM] verify: ${err.message}\n`);
    process.exit(1);
  }
}

if (require.main === module) main();

module.exports = { verify, requiredArtifacts };
