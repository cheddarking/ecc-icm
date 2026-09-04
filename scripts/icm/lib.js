'use strict';

// Shared helpers for the ECC-ICM mechanical scripts. Zero dependencies.
// Every path convention used by the workspace contracts is resolved here:
//   $PLUGIN  -> this plugin's root
//   $PROJECT -> the repository being worked on
//   $RUN     -> $PROJECT/.claude/runs/<slug>

const fs = require('fs');
const path = require('path');
const os = require('os');

function resolvePluginRoot() {
  const fromEnv = process.env.CLAUDE_PLUGIN_ROOT;
  if (fromEnv && fs.existsSync(path.join(fromEnv, 'workspaces'))) return fromEnv;
  return path.resolve(__dirname, '..', '..');
}

const PLUGIN_ROOT = resolvePluginRoot();

function readStdin(maxBytes = 1024 * 1024) {
  try {
    const buf = fs.readFileSync(0);
    return buf.toString('utf8', 0, Math.min(buf.length, maxBytes));
  } catch {
    return '';
  }
}

function parseJson(raw) {
  try {
    return raw && String(raw).trim() ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function projectDir(input) {
  if (input && typeof input.cwd === 'string' && input.cwd) return input.cwd;
  if (process.env.CLAUDE_PROJECT_DIR) return process.env.CLAUDE_PROJECT_DIR;
  return process.cwd();
}

function runsDir(project) {
  return path.join(project, '.claude', 'runs');
}

function configPath(project) {
  return path.join(project, '.claude', 'icm.json');
}

function loadConfig(project) {
  try {
    return JSON.parse(fs.readFileSync(configPath(project), 'utf8'));
  } catch {
    return null;
  }
}

function listWorkspaces() {
  const dir = path.join(PLUGIN_ROOT, 'workspaces');
  try {
    return fs.readdirSync(dir, { withFileTypes: true })
      .filter(e => e.isDirectory() && fs.existsSync(path.join(dir, e.name, 'CLAUDE.md')))
      .map(e => e.name)
      .sort();
  } catch {
    return [];
  }
}

function workspaceDir(workspace) {
  return path.join(PLUGIN_ROOT, 'workspaces', workspace);
}

function stageDirs(workspace) {
  const dir = path.join(workspaceDir(workspace), 'stages');
  try {
    return fs.readdirSync(dir, { withFileTypes: true })
      .filter(e => e.isDirectory() && /^\d{2}-[a-z0-9-]+$/.test(e.name))
      .map(e => e.name)
      .sort();
  } catch {
    return [];
  }
}

function contractPath(workspace, stage) {
  return path.join(workspaceDir(workspace), 'stages', stage, 'CONTEXT.md');
}

// A contract ends with a line "Delegate: yes ..." or "Delegate: no ...".
// Missing line means no delegation. This is the ECC-ICM extension to the
// canonical stage template; see _core/CONVENTIONS.md, "ECC-ICM adaptations".
function contractAllowsDelegation(workspace, stage) {
  try {
    const text = fs.readFileSync(contractPath(workspace, stage), 'utf8');
    const m = text.match(/^Delegate:\s*(yes|no)\b/im);
    return Boolean(m && m[1].toLowerCase() === 'yes');
  } catch {
    return false;
  }
}

function slugOk(slug) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(slug || ''));
}

function runDir(project, slug) {
  return path.join(runsDir(project), slug);
}

function readRun(project, slug) {
  try {
    const run = JSON.parse(fs.readFileSync(path.join(runDir(project, slug), 'run.json'), 'utf8'));
    return run && run.slug === slug ? run : null;
  } catch {
    return null;
  }
}

function writeRun(project, run) {
  const dir = runDir(project, run.slug);
  fs.mkdirSync(dir, { recursive: true });
  run.updated = new Date().toISOString();
  fs.writeFileSync(path.join(dir, 'run.json'), JSON.stringify(run, null, 2) + '\n');
  return run;
}

function listRuns(project) {
  const dir = runsDir(project);
  let names = [];
  try {
    names = fs.readdirSync(dir, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name);
  } catch {
    return [];
  }
  return names
    .map(name => readRun(project, name))
    .filter(Boolean)
    .sort((a, b) => String(b.updated || b.created || '').localeCompare(String(a.updated || a.created || '')));
}

function activeRun(project) {
  return listRuns(project).find(r => r.stage && !r.completed) || null;
}

function stageFiles(project, run, stage) {
  const dir = path.join(runDir(project, run.slug), stage);
  try {
    return fs.readdirSync(dir).filter(f => !f.startsWith('.') && f !== 'verify.md').sort();
  } catch {
    return [];
  }
}

function stageStatus(project, run) {
  return stageDirs(run.workspace).map(stage => {
    const files = stageFiles(project, run, stage);
    let state = 'PENDING';
    if (files.length) state = 'COMPLETE';
    if (run.stage === stage && !files.length) state = 'CURRENT';
    return { stage, state, files };
  });
}

function renderStatus(project, run) {
  const rows = stageStatus(project, run);
  const line1 = rows.map(r => `[${r.stage}]`).join('  -->  ');
  const line2 = rows.map(r => r.state.padEnd(r.stage.length + 2)).join('       ');
  const line3 = rows.map(r => (r.files.length ? `(${r.files.join(', ')})` : '(empty)').padEnd(r.stage.length + 2)).join('       ');
  return [`Pipeline Status: ${run.slug} (${run.workspace})`, '', `  ${line1}`, `  ${line2}`, `  ${line3}`].join('\n');
}

function renderStatusCompact(project, run) {
  const rows = stageStatus(project, run);
  const marks = rows.map(r => `${r.stage}:${r.state === 'COMPLETE' ? 'done' : r.state === 'CURRENT' ? 'CURRENT' : 'pending'}`);
  return `- ${run.slug} (${run.workspace}, tier ${run.tier || 'unset'}): ${marks.join(' > ')}`;
}

function estimateTokens(text) {
  return Math.ceil(String(text || '').length / 4);
}

function encodeProjectDir(p) {
  return String(p).replace(/[\\/]/g, '-');
}

// Claude Code keeps transcripts under ~/.claude/projects/<encoded cwd>/*.jsonl.
// Best effort: explicit path first, then the newest file for this project.
function findTranscript(project, explicit) {
  if (explicit && fs.existsSync(explicit)) return explicit;
  if (process.env.CLAUDE_TRANSCRIPT_PATH && fs.existsSync(process.env.CLAUDE_TRANSCRIPT_PATH)) {
    return process.env.CLAUDE_TRANSCRIPT_PATH;
  }
  const base = path.join(os.homedir(), '.claude', 'projects');
  const candidates = [encodeProjectDir(project), String(project).replace(/[^A-Za-z0-9-]/g, '-')];
  for (const name of candidates) {
    const dir = path.join(base, name);
    let files = [];
    try {
      files = fs.readdirSync(dir).filter(f => f.endsWith('.jsonl')).map(f => path.join(dir, f));
    } catch {
      continue;
    }
    if (!files.length) continue;
    files.sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
    return files[0];
  }
  return null;
}

function countAgentToolUses(transcriptPath, sinceIso) {
  let content;
  try {
    content = fs.readFileSync(transcriptPath, 'utf8');
  } catch {
    return null;
  }
  const since = sinceIso ? Date.parse(sinceIso) : null;
  let count = 0;
  for (const line of content.split('\n')) {
    if (!line.trim()) continue;
    let entry;
    try {
      entry = JSON.parse(line);
    } catch {
      continue;
    }
    if (entry.type !== 'assistant' || !entry.message) continue;
    if (since && entry.timestamp && Date.parse(entry.timestamp) < since) continue;
    const blocks = Array.isArray(entry.message.content) ? entry.message.content : [];
    for (const b of blocks) {
      if (b && b.type === 'tool_use' && (b.name === 'Agent' || b.name === 'Task')) count += 1;
    }
  }
  return count;
}

function writeJsonOut(obj) {
  process.stdout.write(JSON.stringify(obj));
}

module.exports = {
  PLUGIN_ROOT,
  readStdin,
  parseJson,
  projectDir,
  runsDir,
  configPath,
  loadConfig,
  listWorkspaces,
  workspaceDir,
  stageDirs,
  contractPath,
  contractAllowsDelegation,
  slugOk,
  runDir,
  readRun,
  writeRun,
  listRuns,
  activeRun,
  stageFiles,
  stageStatus,
  renderStatus,
  renderStatusCompact,
  estimateTokens,
  encodeProjectDir,
  findTranscript,
  countAgentToolUses,
  writeJsonOut
};
