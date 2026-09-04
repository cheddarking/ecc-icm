#!/usr/bin/env node
'use strict';

// SessionStart hook. Delivers Layer 0 (the plugin's CLAUDE.md) plus the
// project's ICM state as additionalContext. Plugins cannot ship a CLAUDE.md
// that loads on its own, so this hook is how the map reaches the model.
// No model call, no network. Always exits 0.

const fs = require('fs');
const path = require('path');
const lib = require('./lib');

const MAX_CHARS = Number(process.env.ICM_LAYER0_MAX_CHARS) || 8000;

function build(input) {
  const root = lib.PLUGIN_ROOT;
  const project = lib.projectDir(input);
  const layer0 = fs.readFileSync(path.join(root, 'CLAUDE.md'), 'utf8').replace(/\$PLUGIN/g, root).trim();
  const parts = [`[ECC-ICM] Plugin root: ${root}`, `[ECC-ICM] Project: ${project}`, layer0];

  const cfg = lib.loadConfig(project);
  if (cfg) {
    parts.push(`[ECC-ICM] Project config: ${lib.configPath(project)} (default workspace: ${cfg.workspace || 'engineering'}, delegation: ${cfg.delegation || 'contract'})`);
  } else {
    parts.push('[ECC-ICM] This project has no .claude/icm.json yet. Say `setup` to answer the questionnaire once; it creates the file.');
  }

  const runs = lib.listRuns(project).slice(0, 3);
  if (runs.length) {
    parts.push(['[ECC-ICM] Runs (newest first):', ...runs.map(r => lib.renderStatusCompact(project, r))].join('\n'));
  }

  let out = parts.join('\n\n');
  if (out.length > MAX_CHARS) {
    out = out.slice(0, MAX_CHARS - 80) + '\n[ECC-ICM] Truncated. Read CLAUDE.md at the plugin root for the rest.';
  }
  return out;
}

function main() {
  let context = '';
  try {
    context = build(lib.parseJson(lib.readStdin()));
  } catch (err) {
    process.stderr.write(`[ECC-ICM] layer0: ${err.message}\n`);
  }
  if (context) {
    lib.writeJsonOut({ hookSpecificOutput: { hookEventName: 'SessionStart', additionalContext: context } });
  }
  process.exit(0);
}

if (require.main === module) main();

module.exports = { build };
