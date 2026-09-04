#!/usr/bin/env node
'use strict';

// PreToolUse gate for the Agent tool. Enforces the single-agent rule: while an
// ICM run is active, delegation is allowed only when the current stage's
// contract says "Delegate: yes".
//
// Modes (.claude/icm.json "delegation", or ICM_DELEGATION env):
//   contract (default) deny only inside a run whose stage forbids delegation
//   strict             also deny when no run is active
//   off                never deny

const lib = require('./lib');

function decide({ mode, run, allows }) {
  if (mode === 'off') return null;
  if (!run) {
    return mode === 'strict'
      ? 'No ICM run is active. In strict mode delegation is allowed only inside a stage whose contract says "Delegate: yes". Start a run with `new` or set delegation to "contract" in .claude/icm.json.'
      : null;
  }
  if (allows) return null;
  return `Stage ${run.stage} of run ${run.slug} does not allow delegation (its contract says "Delegate: no"). Do the work in this context. Delegation is allowed only in a stage whose contract says "Delegate: yes".`;
}

function main() {
  const input = lib.parseJson(lib.readStdin());
  const project = lib.projectDir(input);
  const cfg = lib.loadConfig(project) || {};
  const mode = String(process.env.ICM_DELEGATION || cfg.delegation || 'contract').toLowerCase();
  const run = lib.activeRun(project);
  const allows = run ? lib.contractAllowsDelegation(run.workspace, run.stage) : false;
  const reason = decide({ mode, run, allows });
  if (reason) {
    lib.writeJsonOut({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: 'deny',
        permissionDecisionReason: `[ECC-ICM] ${reason}`
      }
    });
  }
  process.exit(0);
}

if (require.main === module) main();

module.exports = { decide };
