#!/usr/bin/env node
'use strict';

// Mark a stage as current and print the contract to read and the folder to
// write to. Usage: run.js <slug> <stage|next> [--project <dir>] [--json]
// "next" picks the first stage with no output. Also accepts --tier <tier>
// and --done to record intake decisions and to close a run.

const fs = require('fs');
const path = require('path');
const lib = require('./lib');

// When a stage starts, compare every earlier stage's artifacts with the copy
// verify.js kept in .agent/. A difference is a human edit: append it to
// $PROJECT/.claude/runs/_edits.jsonl once, keyed by the edited content hash.
function recordEdits(project, run) {
  const crypto = require('crypto');
  const logPath = path.join(lib.runsDir(project), '_edits.jsonl');
  let seen = new Set();
  try {
    seen = new Set(fs.readFileSync(logPath, 'utf8').split('\n').filter(Boolean).map(l => {
      try {
        const e = JSON.parse(l);
        return `${e.run}/${e.stage}/${e.artifact}/${e.humanSha}`;
      } catch {
        return '';
      }
    }));
  } catch {
    seen = new Set();
  }
  const dir = lib.runDir(project, run.slug);
  let recorded = 0;
  for (const stage of lib.stageDirs(run.workspace)) {
    const agentDir = path.join(dir, stage, '.agent');
    if (!fs.existsSync(agentDir)) continue;
    for (const artifact of fs.readdirSync(agentDir)) {
      const current = path.join(dir, stage, artifact);
      if (!fs.existsSync(current)) continue;
      const before = fs.readFileSync(path.join(agentDir, artifact), 'utf8');
      const after = fs.readFileSync(current, 'utf8');
      if (before === after) continue;
      const humanSha = crypto.createHash('sha256').update(after).digest('hex').slice(0, 16);
      const key = `${run.slug}/${stage}/${artifact}/${humanSha}`;
      if (seen.has(key)) continue;
      const entry = {
        ts: new Date().toISOString(),
        run: run.slug,
        workspace: run.workspace,
        stage,
        artifact,
        agentSha: crypto.createHash('sha256').update(before).digest('hex').slice(0, 16),
        humanSha,
        diff: simpleDiff(before, after)
      };
      fs.appendFileSync(logPath, JSON.stringify(entry) + '\n');
      seen.add(key);
      recorded += 1;
    }
  }
  return recorded;
}

// Line-level diff, small enough to log: removed and added lines only.
function simpleDiff(before, after) {
  const a = before.split('\n');
  const b = after.split('\n');
  const setA = new Set(a);
  const setB = new Set(b);
  const removed = a.filter(l => !setB.has(l)).slice(0, 40);
  const added = b.filter(l => !setA.has(l)).slice(0, 40);
  return { removed, added };
}

function parseArgs(argv) {
  const args = { json: false, project: null, slug: null, stage: null, tier: null, done: false };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === '--json') args.json = true;
    else if (a === '--project') args.project = argv[++i];
    else if (a === '--tier') args.tier = argv[++i];
    else if (a === '--done') args.done = true;
    else if (!args.slug) args.slug = a;
    else if (!args.stage) args.stage = a;
  }
  return args;
}

function nextStage(project, run) {
  const rows = lib.stageStatus(project, run);
  const pending = rows.find(r => r.state !== 'COMPLETE');
  return pending ? pending.stage : null;
}

function startStage({ project, slug, stage, tier, done }) {
  const run = lib.readRun(project, slug);
  if (!run) throw new Error(`No run "${slug}" in ${lib.runsDir(project)}. Create it with new.js.`);
  if (done) {
    run.completed = true;
    run.stage = null;
    lib.writeRun(project, run);
    return { run, stage: null, contract: null, outputDir: null };
  }
  const stages = lib.stageDirs(run.workspace);
  let target = stage === 'next' || !stage ? nextStage(project, run) : stage;
  if (!target) throw new Error(`Run "${slug}" has no pending stage. Close it with --done.`);
  if (!stages.includes(target)) throw new Error(`Unknown stage "${target}". Stages: ${stages.join(', ')}`);
  const edits = recordEdits(project, run);
  run.stage = target;
  run.stages = run.stages || {};
  run.stages[target] = { ...(run.stages[target] || {}), started: new Date().toISOString() };
  if (tier) run.tier = tier;
  lib.writeRun(project, run);
  return {
    run,
    stage: target,
    contract: lib.contractPath(run.workspace, target),
    outputDir: path.join(lib.runDir(project, slug), target),
    delegate: lib.contractAllowsDelegation(run.workspace, target),
    editsRecorded: edits
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const project = args.project || lib.projectDir(null);
  if (!args.slug) {
    process.stderr.write('Usage: run.js <slug> <stage|next> [--tier <tier>] [--done] [--project <dir>] [--json]\n');
    process.exit(1);
  }
  try {
    const result = startStage({ project, slug: args.slug, stage: args.stage, tier: args.tier, done: args.done });
    if (args.json) {
      lib.writeJsonOut({ ok: true, ...result });
    } else if (args.done) {
      process.stdout.write(`Run ${args.slug} closed.\n`);
    } else {
      process.stdout.write(`Stage ${result.stage} is current for run ${args.slug}.\n`);
      process.stdout.write(`Read the contract: ${result.contract}\n`);
      process.stdout.write(`Write outputs to:  ${result.outputDir}\n`);
      process.stdout.write(`Delegation:        ${result.delegate ? 'allowed by this contract' : 'not allowed in this stage'}\n`);
      if (result.editsRecorded) process.stdout.write(`Human edits since last stage: ${result.editsRecorded} (logged to _edits.jsonl)\n`);
    }
  } catch (err) {
    process.stderr.write(`[ECC-ICM] run: ${err.message}\n`);
    process.exit(1);
  }
}

if (require.main === module) main();

module.exports = { startStage, nextStage, recordEdits };
