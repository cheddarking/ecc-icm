#!/usr/bin/env node
'use strict';

// Scaffold a run directory: $PROJECT/.claude/runs/<slug>/<stage>/ for every
// stage of the chosen workspace, plus run.json. Prints the first contract to
// read. Usage: new.js <slug> [--workspace <name>] [--project <dir>] [--json]

const fs = require('fs');
const path = require('path');
const lib = require('./lib');

function parseArgs(argv) {
  const args = { json: false, workspace: null, project: null, slug: null };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === '--json') args.json = true;
    else if (a === '--workspace') args.workspace = argv[++i];
    else if (a === '--project') args.project = argv[++i];
    else if (!args.slug) args.slug = a;
  }
  return args;
}

function createRun({ slug, workspace, project }) {
  if (!lib.slugOk(slug)) throw new Error(`Slug must be lowercase-with-hyphens, got "${slug}"`);
  const stages = lib.stageDirs(workspace);
  if (!stages.length) throw new Error(`Workspace "${workspace}" has no stages (looked in ${lib.workspaceDir(workspace)})`);
  if (lib.readRun(project, slug)) throw new Error(`Run "${slug}" already exists at ${lib.runDir(project, slug)}`);
  const dir = lib.runDir(project, slug);
  for (const stage of stages) {
    fs.mkdirSync(path.join(dir, stage), { recursive: true });
    fs.writeFileSync(path.join(dir, stage, '.gitkeep'), '');
  }
  const run = lib.writeRun(project, {
    slug,
    workspace,
    created: new Date().toISOString(),
    stage: null,
    tier: null,
    stages: {},
    completed: false
  });
  return { run, dir, stages, firstContract: lib.contractPath(workspace, stages[0]) };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const project = args.project || lib.projectDir(null);
  const cfg = lib.loadConfig(project) || {};
  const workspace = args.workspace || cfg.workspace || 'engineering';
  if (!args.slug) {
    process.stderr.write('Usage: new.js <slug> [--workspace <name>] [--project <dir>] [--json]\n');
    process.exit(1);
  }
  try {
    const result = createRun({ slug: args.slug, workspace, project });
    if (args.json) {
      lib.writeJsonOut({ ok: true, ...result });
    } else {
      process.stdout.write(`Created run ${args.slug} (${workspace}) at ${result.dir}\n`);
      process.stdout.write(`Stages: ${result.stages.join(', ')}\n`);
      process.stdout.write(`Next: node ${path.join(lib.PLUGIN_ROOT, 'scripts', 'icm', 'run.js')} ${args.slug} ${result.stages[0]}\n`);
    }
  } catch (err) {
    process.stderr.write(`[ECC-ICM] new: ${err.message}\n`);
    process.exit(1);
  }
}

if (require.main === module) main();

module.exports = { createRun };
