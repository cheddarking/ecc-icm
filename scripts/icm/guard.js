#!/usr/bin/env node
'use strict';

// PreToolUse guard for Bash. Denies a short list of irreversible commands.
// Everything else passes silently. Set ICM_GUARD=off to disable.

const lib = require('./lib');

const RULES = [
  {
    re: /(^|\s)--no-verify(\s|$)/,
    why: 'Commit and push hooks must run. Remove --no-verify.'
  },
  {
    re: /\bgit\s+push\b[^|;&\n]*\s(--force|-f)(?![-\w])/,
    why: 'Force push is blocked. Use --force-with-lease on a branch you own, never on main.'
  },
  {
    re: /\brm\s+(?:-[a-zA-Z]*r[a-zA-Z]*f[a-zA-Z]*|-[a-zA-Z]*f[a-zA-Z]*r[a-zA-Z]*|--recursive\s+--force|--force\s+--recursive)\s+(?:"|')?(?:\/|~|\$HOME|\.git(?:\/|\s|$)|\*|\.(?:\/)?\s*$)/,
    why: 'Recursive delete of a root, home, .git, or the whole working tree is blocked.'
  },
  {
    re: /\bgit\s+branch\s+-D\s+(main|master)\b/,
    why: 'Deleting the main branch is blocked.'
  }
];

function check(command) {
  const text = String(command || '');
  for (const rule of RULES) {
    if (rule.re.test(text)) return rule.why;
  }
  return null;
}

function main() {
  if (/^(off|0|false)$/i.test(String(process.env.ICM_GUARD || ''))) process.exit(0);
  const input = lib.parseJson(lib.readStdin());
  const command = input && input.tool_input ? input.tool_input.command : '';
  const why = check(command);
  if (why) {
    lib.writeJsonOut({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: 'deny',
        permissionDecisionReason: `[ECC-ICM guard] ${why}`
      }
    });
  }
  process.exit(0);
}

if (require.main === module) main();

module.exports = { check, RULES };
