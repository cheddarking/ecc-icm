'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const ICM = path.join(ROOT, 'scripts', 'icm');

function run(script, args = [], { input = '', env = {} } = {}) {
  return spawnSync(process.execPath, [path.join(ICM, script), ...args], {
    input,
    encoding: 'utf8',
    env: { ...process.env, CLAUDE_PLUGIN_ROOT: ROOT, ...env }
  });
}

function tmpProject() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'icm-test-'));
  fs.mkdirSync(path.join(dir, '.claude'), { recursive: true });
  return dir;
}

test('guard denies force push, no-verify and root deletes, allows normal commands', () => {
  const { check } = require(path.join(ICM, 'guard.js'));
  assert.ok(check('git push --force origin main'));
  assert.ok(check('git push -f origin feature'));
  assert.equal(check('git push --force-with-lease origin feature'), null);
  assert.ok(check('git commit -m x --no-verify'));
  assert.ok(check('rm -rf /'));
  assert.ok(check('rm -rf ~'));
  assert.ok(check('rm -rf .git'));
  assert.equal(check('rm -rf node_modules'), null);
  assert.equal(check('ls -la && npm test'), null);
  const res = run('guard.js', [], { input: JSON.stringify({ tool_name: 'Bash', tool_input: { command: 'git push --force origin main' } }) });
  assert.equal(res.status, 0);
  const out = JSON.parse(res.stdout);
  assert.equal(out.hookSpecificOutput.permissionDecision, 'deny');
  const ok = run('guard.js', [], { input: JSON.stringify({ tool_input: { command: 'npm test' } }) });
  assert.equal(ok.stdout, '');
});

test('new, run, status and verify work end to end on a temp project', () => {
  const project = tmpProject();
  const created = run('new.js', ['add-thing', '--project', project, '--json']);
  assert.equal(created.status, 0, created.stderr);
  const info = JSON.parse(created.stdout);
  assert.equal(info.run.workspace, 'engineering');
  assert.equal(info.stages.length, 7);
  assert.ok(fs.existsSync(path.join(project, '.claude', 'runs', 'add-thing', '01-intake', '.gitkeep')));

  const dup = run('new.js', ['add-thing', '--project', project]);
  assert.equal(dup.status, 1);

  const started = run('run.js', ['add-thing', '01-intake', '--project', project, '--tier', 'standard', '--json']);
  assert.equal(started.status, 0, started.stderr);
  const s = JSON.parse(started.stdout);
  assert.equal(s.stage, '01-intake');
  assert.equal(s.delegate, false);
  assert.ok(s.contract.endsWith(path.join('engineering', 'stages', '01-intake', 'CONTEXT.md')));

  // verify fails without the artifact, passes with a well-formed one
  let v = run('verify.js', ['add-thing', '01-intake', '--project', project, '--json']);
  assert.equal(v.status, 1);
  const brief = ['# Brief: add-thing', '', 'Tier: standard', 'Stages: 01-intake, 02-research', 'Security lens: no', ''].join('\n');
  fs.writeFileSync(path.join(project, '.claude', 'runs', 'add-thing', '01-intake', 'brief.md'), brief);
  v = run('verify.js', ['add-thing', '01-intake', '--project', project, '--json']);
  assert.equal(v.status, 0, v.stdout + v.stderr);
  assert.ok(fs.existsSync(path.join(project, '.claude', 'runs', 'add-thing', '01-intake', 'verify.md')));
  assert.ok(fs.existsSync(path.join(project, '.claude', 'runs', 'add-thing', '01-intake', '.agent', 'brief.md')));

  // status sees the completed stage
  const st = run('status.js', ['--project', project, '--json']);
  const status = JSON.parse(st.stdout);
  assert.equal(status.runs[0].status[0].state, 'COMPLETE');
  assert.equal(status.runs[0].status[1].state, 'PENDING');

  // a human edit is recorded when the next stage starts
  fs.appendFileSync(path.join(project, '.claude', 'runs', 'add-thing', '01-intake', 'brief.md'), '\n## Scope\n- In: the thing\n');
  const next = run('run.js', ['add-thing', 'next', '--project', project, '--json']);
  assert.equal(next.status, 0, next.stderr);
  const n = JSON.parse(next.stdout);
  assert.equal(n.stage, '02-research');
  assert.equal(n.delegate, true);
  assert.equal(n.editsRecorded, 1);
  const edits = fs.readFileSync(path.join(project, '.claude', 'runs', '_edits.jsonl'), 'utf8').trim().split('\n');
  assert.equal(edits.length, 1);
  assert.equal(JSON.parse(edits[0]).stage, '01-intake');

  const done = run('run.js', ['add-thing', '--done', '--project', project, '--json']);
  assert.equal(JSON.parse(done.stdout).run.completed, true);
});

test('agent gate follows the contract, the mode, and the active run', () => {
  const { decide } = require(path.join(ICM, 'agent-gate.js'));
  assert.equal(decide({ mode: 'off', run: { stage: '03-plan' }, allows: false }), null);
  assert.equal(decide({ mode: 'contract', run: null, allows: false }), null);
  assert.ok(decide({ mode: 'strict', run: null, allows: false }));
  assert.ok(decide({ mode: 'contract', run: { slug: 'x', stage: '03-plan' }, allows: false }));
  assert.equal(decide({ mode: 'contract', run: { slug: 'x', stage: '02-research' }, allows: true }), null);

  const project = tmpProject();
  run('new.js', ['gate-test', '--project', project]);
  run('run.js', ['gate-test', '03-plan', '--project', project]);
  const denied = run('agent-gate.js', [], { input: JSON.stringify({ cwd: project, tool_name: 'Agent', tool_input: {} }) });
  assert.equal(JSON.parse(denied.stdout).hookSpecificOutput.permissionDecision, 'deny');
  run('run.js', ['gate-test', '02-research', '--project', project]);
  const allowed = run('agent-gate.js', [], { input: JSON.stringify({ cwd: project, tool_name: 'Agent', tool_input: {} }) });
  assert.equal(allowed.stdout, '');
  fs.writeFileSync(path.join(project, '.claude', 'icm.json'), JSON.stringify({ delegation: 'off' }));
  run('run.js', ['gate-test', '03-plan', '--project', project]);
  const off = run('agent-gate.js', [], { input: JSON.stringify({ cwd: project, tool_name: 'Agent', tool_input: {} }) });
  assert.equal(off.stdout, '');
});

test('layer0 injects the map, the project state, and stays under the cap', () => {
  const project = tmpProject();
  run('new.js', ['ctx-test', '--project', project]);
  const res = run('layer0.js', [], { input: JSON.stringify({ cwd: project, hook_event_name: 'SessionStart', source: 'startup' }) });
  assert.equal(res.status, 0, res.stderr);
  const out = JSON.parse(res.stdout);
  const ctx = out.hookSpecificOutput.additionalContext;
  assert.equal(out.hookSpecificOutput.hookEventName, 'SessionStart');
  assert.ok(ctx.includes(`[ECC-ICM] Plugin root: ${ROOT}`));
  assert.ok(ctx.includes('## Routing'));
  assert.ok(ctx.includes('ctx-test (engineering'));
  assert.ok(ctx.includes('no .claude/icm.json yet'));
  assert.ok(!ctx.includes('$PLUGIN'), 'every $PLUGIN token is substituted');
  assert.ok(ctx.length <= 8000);
  assert.ok(ctx.length / 4 < 1600, `Layer 0 injection is ${Math.ceil(ctx.length / 4)} tokens`);
});

test('cost tracker sums usage once per message id and counts Agent tool uses', () => {
  const { sumUsage } = require(path.join(ICM, 'cost-tracker.js'));
  const file = path.join(os.tmpdir(), `icm-transcript-${process.pid}.jsonl`);
  const lines = [
    { type: 'assistant', message: { id: 'm1', model: 'claude-x', usage: { input_tokens: 10, output_tokens: 5, cache_read_input_tokens: 100 }, content: [{ type: 'text', text: 'hi' }] } },
    { type: 'assistant', message: { id: 'm1', model: 'claude-x', usage: { input_tokens: 10, output_tokens: 5, cache_read_input_tokens: 100 }, content: [{ type: 'tool_use', name: 'Agent', input: {} }] } },
    { type: 'assistant', message: { id: 'm2', model: 'claude-x', usage: { input_tokens: 3, output_tokens: 2 }, content: [{ type: 'tool_use', name: 'Bash', input: {} }] } },
    { type: 'user', message: { content: 'x' } }
  ];
  fs.writeFileSync(file, lines.map(l => JSON.stringify(l)).join('\n') + '\n');
  const u = sumUsage(file);
  assert.equal(u.input, 13);
  assert.equal(u.output, 7);
  assert.equal(u.cacheRead, 100);
  assert.equal(u.assistantTurns, 2);
  assert.equal(u.agentToolUses, 1);
  fs.unlinkSync(file);
});

test('validate-workspace passes every shipped workspace and fails a broken one', () => {
  const all = run('validate-workspace.js', ['--all', '--json']);
  const report = JSON.parse(all.stdout);
  for (const r of report.results) assert.deepEqual(r.errors, [], `${r.workspace}: ${r.errors.join('; ')}`);
  assert.equal(all.status, 0);
  assert.ok(report.results.length >= 5);

  const broken = fs.mkdtempSync(path.join(os.tmpdir(), 'icm-broken-'));
  fs.mkdirSync(path.join(broken, 'stages', '01-Bad Name'), { recursive: true });
  fs.writeFileSync(path.join(broken, 'CLAUDE.md'), '# x\n');
  fs.writeFileSync(path.join(broken, 'stages', '01-Bad Name', 'CONTEXT.md'), '# Stage\n\n## Inputs\n\n| Source | File/Location | Section/Scope | Why |\n|---|---|---|---|\n| Ref | `missing.md` | Full | no |\n\n## Process\n\n1. do a thing with an em dash — here\n');
  const res = run('validate-workspace.js', [broken, '--json']);
  assert.equal(res.status, 1);
  const r = JSON.parse(res.stdout).results[0];
  const codes = r.errors.map(e => e.split(' ')[0]);
  for (const code of ['E1', 'E3', 'E5', 'E6', 'E7', 'E9']) assert.ok(codes.includes(code), `expected ${code} in ${codes}`);
});

test('context budget for this plugin is under the target', () => {
  const { measure } = require(path.join(ICM, 'context-budget.js'));
  const result = measure(ROOT);
  const skills = result.rows.find(r => r.surface === 'skill descriptions');
  assert.ok(skills.count <= 12, `registered skills: ${skills.count}`);
  assert.equal(result.rows.find(r => r.surface === 'agent descriptions').count, 0);
  assert.ok(result.total < 3000, `static context estimate is ${result.total} tokens`);
});

test('plugin manifests are valid JSON and hooks reference existing scripts', () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, '.claude-plugin', 'plugin.json'), 'utf8'));
  assert.equal(manifest.name, 'ecc-icm');
  const hooks = JSON.parse(fs.readFileSync(path.join(ROOT, 'hooks', 'hooks.json'), 'utf8')).hooks;
  for (const event of Object.keys(hooks)) {
    for (const matcher of hooks[event]) {
      for (const hook of matcher.hooks) {
        const m = hook.command.match(/scripts\/icm\/([a-z0-9-]+\.js)/);
        assert.ok(m, hook.command);
        assert.ok(fs.existsSync(path.join(ICM, m[1])), `${m[1]} missing`);
      }
    }
  }
  const skill = fs.readFileSync(path.join(ROOT, 'skills', 'icm', 'SKILL.md'), 'utf8');
  assert.ok(/^name: icm$/m.test(skill));
});
