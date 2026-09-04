#!/usr/bin/env node
'use strict';

// Render pipeline completion for one run or every run in the project, from
// the files on disk. This is the ICM `status` trigger.
// Usage: status.js [slug] [--project <dir>] [--json]

const lib = require('./lib');

function parseArgs(argv) {
  const args = { json: false, project: null, slug: null };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === '--json') args.json = true;
    else if (a === '--project') args.project = argv[++i];
    else if (!args.slug) args.slug = a;
  }
  return args;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const project = args.project || lib.projectDir(null);
  const runs = args.slug ? [lib.readRun(project, args.slug)].filter(Boolean) : lib.listRuns(project);
  if (args.json) {
    lib.writeJsonOut({
      project,
      runs: runs.map(run => ({ ...run, status: lib.stageStatus(project, run) }))
    });
    return;
  }
  if (!runs.length) {
    process.stdout.write(`No ICM runs in ${lib.runsDir(project)}. Create one with new.js <slug>.\n`);
    return;
  }
  process.stdout.write(runs.map(run => lib.renderStatus(project, run)).join('\n\n') + '\n');
}

if (require.main === module) main();
