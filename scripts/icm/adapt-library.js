#!/usr/bin/env node
'use strict';

// Rewrite ECC-specific references inside the library's instruction files so
// they resolve inside ecc-icm, and append one short note per file that says
// how ECC's commands, agents and hooks map here. Content is otherwise kept
// verbatim. Re-runnable: nothing matches twice.
//
// What changes
//   paths   ~/.claude/skills/<skill>/..., skills/<skill>/..., agents/<name>.md,
//           commands/<name>.md, rules/..., scripts/..., hooks/hooks.json,
//           mcp-configs/..., contexts/..., docs/..., the-*-guide.md, and the
//           other mirrored trees, plus ${CLAUDE_PLUGIN_ROOT}/<tree>/
//           -> $PLUGIN/library/...   only when the exact target exists here
//   /name   a slash command that is an ECC command or legacy shim
//           -> `name` procedure
//   X agent an ECC agent name followed by "agent" -> X role
// What never changes
//   fenced code blocks (any fence length, any indent), headings, frontmatter,
//   inline code spans other than a bare `/command`, library/docs,
//   library/.agents, library/examples, ECC root markdown
//
// Usage: adapt-library.js [plugin-root] [--dry] [--json]

const fs = require('fs');
const path = require('path');

const PLUGIN = '$PLUGIN';
const MARKER = '<!-- ecc-icm-notes -->';
// Trees where a directory reference is meaningful (scripts live there).
const TREES_ANY = ['scripts', 'mcp-configs', 'contexts', 'scaffolds', 'manifests', 'schemas', 'config', 'examples', 'workflows', 'legacy-command-shims'];
// Trees where only a file reference is rewritten: project-relative examples
// such as docs/examples or rules/rust/ would otherwise collide.
const TREES_FILE = ['rules', 'docs'];
const LB = '(?<![\\w/.$~@-])';

const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const alt = set => [...set].sort((a, b) => b.length - a.length).map(esc).join('|');
const trimTail = p => p.replace(/[.,;:)]+$/, '');

function buildContext(root) {
  const lib = path.join(root, 'library');
  const dirs = d => {
    try {
      return fs.readdirSync(path.join(lib, d), { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name);
    } catch {
      return [];
    }
  };
  const mds = d => {
    try {
      return fs.readdirSync(path.join(lib, d)).filter(f => f.endsWith('.md') && f !== 'INDEX.md').map(f => f.slice(0, -3));
    } catch {
      return [];
    }
  };
  const stat = rel => {
    try {
      return fs.statSync(path.join(lib, rel));
    } catch {
      return null;
    }
  };
  return {
    lib,
    skills: new Set(dirs('skills')),
    roles: new Set(mds('roles')),
    procedures: new Set(mds('procedures')),
    shims: new Set(mds(path.join('legacy-command-shims', 'commands'))),
    exists: rel => Boolean(stat(rel)),
    isFile: rel => {
      const s = stat(rel);
      return Boolean(s && s.isFile());
    }
  };
}

function makeSub(stats, fired) {
  return (str, re, fn, rule) => {
    let n = 0;
    const out = str.replace(re, (...a) => {
      const r = fn(...a);
      if (r !== a[0]) n += 1;
      return r;
    });
    if (n) {
      stats[rule] = (stats[rule] || 0) + n;
      fired.add(rule);
    }
    return out;
  };
}

// CommonMark-style fence tracking: a fence opens with three or more backticks
// or tildes at any indent and closes with the same character, at least as
// long, on a line of its own. An unclosed fence runs to the end of the text.
function splitFences(body) {
  const segments = [];
  let buf = [];
  let open = null;
  const flush = fenced => {
    if (buf.length) segments.push({ fenced, text: buf.join('\n') });
    buf = [];
  };
  const lines = body.split('\n');
  for (const line of lines) {
    if (!open) {
      const m = line.match(/^\s*(`{3,}|~{3,})(.*)$/);
      if (m && !(m[1][0] === '`' && m[2].includes('`'))) {
        flush(false);
        open = { ch: m[1][0], len: m[1].length };
        buf.push(line);
        continue;
      }
      buf.push(line);
    } else {
      buf.push(line);
      const c = line.match(/^\s*(`{3,}|~{3,})\s*$/);
      if (c && c[1][0] === open.ch && c[1].length >= open.len) {
        flush(true);
        open = null;
      }
    }
  }
  flush(Boolean(open));
  return segments;
}

function pathRules(s, ctx, sub) {
  const map = { agents: 'roles', commands: 'procedures' };
  if (ctx.skills.size) {
    const skillTail = (all, n, tail) => {
      const t = trimTail(tail || '');
      if (t && !ctx.exists(`skills/${n}${t}`)) return all;
      return `${PLUGIN}/library/skills/${n}${tail || ''}`;
    };
    s = sub(s, new RegExp(`~/\\.claude/skills/(${alt(ctx.skills)})((?:/[\\w./-]*)?)(?![\\w-])`, 'g'), skillTail, 'home-skills');
    s = sub(s, new RegExp(`${LB}skills/(${alt(ctx.skills)})((?:/[\\w./-]*)?)(?![\\w-])`, 'g'), skillTail, 'rel-skills');
  }
  if (ctx.roles.size) {
    s = sub(s, new RegExp(`~/\\.claude/agents/(${alt(ctx.roles)})\\.md`, 'g'), (all, n) => `${PLUGIN}/library/roles/${n}.md`, 'home-agents');
    s = sub(s, new RegExp(`${LB}agents/(${alt(ctx.roles)})\\.md`, 'g'), (all, n) => `${PLUGIN}/library/roles/${n}.md`, 'rel-agents');
  }
  if (ctx.procedures.size) {
    s = sub(s, new RegExp(`${LB}commands/(${alt(ctx.procedures)})\\.md`, 'g'), (all, n) => `${PLUGIN}/library/procedures/${n}.md`, 'rel-commands');
  }
  s = sub(s, /~\/\.claude\/rules\/([\w./-]+)/g, (all, p) => (ctx.isFile(`rules/${trimTail(p)}`) ? `${PLUGIN}/library/rules/${p}` : all), 'home-rules');
  s = sub(s, /\$\{CLAUDE_PLUGIN_ROOT\}\/(skills|agents|commands|scripts|hooks|rules|mcp-configs|contexts|scaffolds|docs|manifests|schemas|config|examples|workflows|legacy-command-shims)\//g, (all, t) => `\${CLAUDE_PLUGIN_ROOT}/library/${map[t] || t}/`, 'plugin-root');
  const treeRule = (trees, check) => (all, t, p) => {
    if (p.includes('...')) return all;
    return check(`${t}/${trimTail(p)}`) ? `${PLUGIN}/library/${t}/${p}` : all;
  };
  s = sub(s, new RegExp(`${LB}(${TREES_ANY.join('|')})/([\\w./-]+)`, 'g'), treeRule(TREES_ANY, ctx.exists), 'rel-tree');
  s = sub(s, new RegExp(`${LB}(${TREES_FILE.join('|')})/([\\w./-]+)`, 'g'), treeRule(TREES_FILE, ctx.isFile), 'rel-tree');
  s = sub(s, new RegExp(`${LB}hooks/hooks\\.json`, 'g'), () => `${PLUGIN}/library/hooks/hooks.json`, 'rel-hooks-json');
  s = sub(s, new RegExp(`${LB}(the-(?:longform|security|shortform)-guide\\.md)`, 'g'), (all, f) => (ctx.isFile(f) ? `${PLUGIN}/library/${f}` : all), 'rel-guides');
  return s;
}

function proseRules(s, ctx, sub, fired) {
  const names = new Set([...ctx.procedures, ...ctx.shims]);
  const procAlt = names.size ? alt(names) : null;
  const roleAlt = ctx.roles.size ? alt(ctx.roles) : null;
  const spanRe = procAlt ? new RegExp(`^\`/(${procAlt})((?:\\s[^\`]*)?)\`$`) : null;
  // Same exclusions as LB plus a backtick and a colon, so a command inside a
  // code span or a URL scheme is never treated as a slash command.
  const bareRe = procAlt ? new RegExp('(?<![\\w/.$~@`:-])/(' + procAlt + ')(?![\\w/-])', 'g') : null;
  const roleRe = roleAlt ? new RegExp(`((?:\\*\\*|\`)?)(${roleAlt})((?:\\*\\*|\`)?)\\s+(?:sub-?)?agents?\\b`, 'gi') : null;
  const codeRoleRe = roleAlt ? new RegExp(`^\`(${roleAlt})\`$`, 'i') : null;
  const noteShim = n => {
    if (ctx.shims.has(n) && !ctx.procedures.has(n)) fired.add('legacy-shim');
  };
  return s.split('\n').map(line => {
    if (/^\s{0,3}#{1,6}\s/.test(line)) return line;
    const segs = line.split(/(`[^`\n]*`)/);
    return segs.map((seg, i) => {
      if (i % 2 === 1) {
        if (!spanRe) return seg;
        return sub(seg, spanRe, (all, n, args) => {
          const a = (args || '').trim();
          if (/\.\s/.test(a)) return all; // an example sentence, not an invocation
          noteShim(n);
          return a ? `\`${n}\` procedure (\`${a}\`)` : `\`${n}\` procedure`;
        }, 'slash-cmd');
      }
      let t = seg;
      // A role name in a code span followed by "agent" in prose: `name` agent.
      if (codeRoleRe && i > 0 && codeRoleRe.test(segs[i - 1])) {
        t = sub(t, /^(\s+)(?:sub-?)?agents?\b/i, (all, ws) => `${ws}role`, 'agent-role');
      }
      if (bareRe) {
        t = sub(t, bareRe, (all, n) => {
          noteShim(n);
          return `\`${n}\` procedure`;
        }, 'slash-cmd');
      }
      if (roleRe) t = sub(t, roleRe, (all, o, n, c) => `${o}${n}${c} role`, 'agent-role');
      return t;
    }).join('');
  }).join('\n');
}

function notesFor(body, fired) {
  const notes = [];
  if (fired.has('slash-cmd')) {
    let n = 'Procedures named above are files, not slash commands: `$PLUGIN/library/procedures/<name>.md`; `$PLUGIN/library/procedures/INDEX.md` says which ecc-icm stage or workspace each maps to.';
    if (fired.has('legacy-shim')) n += ' Legacy shims (tdd, verify, e2e, eval, orchestrate, claw and the rest) live under `$PLUGIN/library/legacy-command-shims/commands/`.';
    notes.push(n);
  }
  if (fired.has('agent-role') || /\bsub-?agents?\b|\bTask tool\b|\bAgent tool\b|\bspawn(?:ing|ed)?\b[^.\n]*\bagents?\b/i.test(body)) {
    notes.push('Roles named above are files under `$PLUGIN/library/roles/`. ecc-icm runs one agent: take a role in this context by loading its file. Do not spawn or delegate unless the current stage contract says `Delegate: yes`; the Agent tool is gated by a hook.');
  }
  if (/hooks\.json|scripts\/hooks|PreToolUse|PostToolUse|SessionStart|\bhook profile\b|ECC_HOOK/.test(body)) {
    notes.push("ECC's hooks are not installed by ecc-icm. Their scripts ship under `$PLUGIN/library/scripts/hooks/` with `$PLUGIN/library/hooks/hooks.json` for opt-in use; they expect ECC's layout and npm dependencies (`$PLUGIN/library/package.json`). ecc-icm's own hooks are the five in its README.");
  }
  if (/\/plugin install|ecc-install|npx ecc\b|ecc-universal|configure-ecc/.test(body)) {
    notes.push('Install and configuration steps above describe ECC itself. In ecc-icm nothing is installed beyond the plugin; per-project setup is the `setup` trigger, which writes `.claude/icm.json`.');
  }
  return notes;
}

// Apply every rule to one file's text. Returns { text, stats, fired }.
function adaptText(text, ctx) {
  const stats = {};
  const fired = new Set();
  const sub = makeSub(stats, fired);
  let front = '';
  let body = text;
  const fm = text.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/);
  if (fm) {
    front = fm[0];
    body = text.slice(fm[0].length);
  }
  body = splitFences(body).map(seg => {
    const t = pathRules(seg.text, ctx, sub);
    return seg.fenced ? t : proseRules(t, ctx, sub, fired);
  }).join('\n');
  const notes = notesFor(body, fired);
  if (notes.length && !body.includes(MARKER)) {
    body = `${body.replace(/\s*$/, '')}\n\n---\n${MARKER}\nECC-ICM notes: ${notes.join(' ')}\n`;
    fired.add('notes');
    stats.notes = 1;
  }
  return { text: front + body, stats, fired };
}

// One line of prose (an index description, for example): path and prose
// rules, no notes.
function adaptInline(text, ctx) {
  const sub = makeSub({}, new Set());
  return proseRules(pathRules(String(text || ''), ctx, sub), ctx, sub, new Set());
}

function targets(lib) {
  const out = [];
  const skip = new Set(['_meta', 'docs', '.agents', 'examples', 'node_modules']);
  const walk = dir => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) {
        if (dir === lib && skip.has(e.name)) continue;
        walk(p);
      } else if (e.name.endsWith('.md')) {
        if (dir === lib && !/^the-.*-guide\.md$/.test(e.name)) continue;
        if (e.name === 'INDEX.md' || e.name === 'CONTEXT.md' || /^INDEX-.*\.md$/.test(e.name) || e.name === 'ECC-MAPPING.md') continue;
        out.push(path.relative(lib, p));
      }
    }
  };
  walk(lib);
  return out.sort();
}

function run(root, { dry = false } = {}) {
  const ctx = buildContext(root);
  const report = { generated: new Date().toISOString(), filesScanned: 0, filesChanged: 0, rules: {}, files: {} };
  for (const rel of targets(ctx.lib)) {
    const abs = path.join(ctx.lib, rel);
    const before = fs.readFileSync(abs, 'utf8');
    const { text, stats } = adaptText(before, ctx);
    report.filesScanned += 1;
    if (text !== before) {
      report.filesChanged += 1;
      report.files[rel] = stats;
      for (const [k, v] of Object.entries(stats)) report.rules[k] = (report.rules[k] || 0) + v;
      if (!dry) fs.writeFileSync(abs, text);
    }
  }
  if (!dry) {
    fs.mkdirSync(path.join(ctx.lib, '_meta'), { recursive: true });
    fs.writeFileSync(path.join(ctx.lib, '_meta', 'adaptation-report.json'), JSON.stringify(report, null, 2) + '\n');
  }
  return report;
}

if (require.main === module) {
  const argv = process.argv.slice(2);
  const root = path.resolve(argv.find(a => !a.startsWith('--')) || path.join(__dirname, '..', '..'));
  const report = run(root, { dry: argv.includes('--dry') });
  if (argv.includes('--json')) {
    process.stdout.write(JSON.stringify(report, null, 2));
  } else {
    process.stdout.write(`Adapted ${report.filesChanged} of ${report.filesScanned} library files${argv.includes('--dry') ? ' (dry run)' : ''}\n`);
    for (const [k, v] of Object.entries(report.rules).sort((a, b) => b[1] - a[1])) process.stdout.write(`  ${k.padEnd(16)} ${String(v).padStart(6)}\n`);
  }
}

module.exports = { adaptText, adaptInline, buildContext, splitFences, run, MARKER };
