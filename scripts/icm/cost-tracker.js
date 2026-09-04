#!/usr/bin/env node
'use strict';

// Stop hook. Appends one JSON line per response with the session's token
// usage so before/after comparisons have real numbers. Derived from ECC's
// cost-tracker (MIT); the pricing table is dropped on purpose, only tokens
// are recorded. Writes to $PROJECT/.claude/runs/_cost.jsonl. Never blocks.

const fs = require('fs');
const path = require('path');
const lib = require('./lib');

function toNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

// Claude Code writes one JSONL line per content block, so one API response
// spans several assistant lines that repeat the same usage. Count once per
// message id, keeping the last line seen.
function sumUsage(transcriptPath) {
  let content;
  try {
    content = fs.readFileSync(transcriptPath, 'utf8');
  } catch {
    return null;
  }
  const byId = new Map();
  let synthetic = 0;
  let model = 'unknown';
  let assistantTurns = 0;
  let agentToolUses = 0;
  for (const line of content.split('\n')) {
    if (!line.trim()) continue;
    let entry;
    try {
      entry = JSON.parse(line);
    } catch {
      continue;
    }
    if (entry.type !== 'assistant' || !entry.message) continue;
    const msg = entry.message;
    if (Array.isArray(msg.content)) {
      for (const b of msg.content) {
        if (b && b.type === 'tool_use' && (b.name === 'Agent' || b.name === 'Task')) agentToolUses += 1;
      }
    }
    if (!msg.usage) continue;
    const key = typeof msg.id === 'string' && msg.id ? msg.id : `__line_${++synthetic}`;
    byId.set(key, msg.usage);
    if (msg.model && msg.model !== 'unknown') model = msg.model;
  }
  const totals = { input: 0, output: 0, cacheWrite: 0, cacheRead: 0 };
  for (const u of byId.values()) {
    totals.input += toNumber(u.input_tokens);
    totals.output += toNumber(u.output_tokens);
    totals.cacheWrite += toNumber(u.cache_creation_input_tokens);
    totals.cacheRead += toNumber(u.cache_read_input_tokens);
  }
  assistantTurns = byId.size;
  return { model, assistantTurns, agentToolUses, ...totals };
}

function main() {
  try {
    const input = lib.parseJson(lib.readStdin());
    const project = lib.projectDir(input);
    const transcript = lib.findTranscript(project, input.transcript_path);
    if (!transcript) process.exit(0);
    const usage = sumUsage(transcript);
    if (!usage) process.exit(0);
    const run = lib.activeRun(project);
    const record = {
      ts: new Date().toISOString(),
      session: input.session_id || null,
      run: run ? run.slug : null,
      stage: run ? run.stage : null,
      ...usage
    };
    const dir = lib.runsDir(project);
    fs.mkdirSync(dir, { recursive: true });
    fs.appendFileSync(path.join(dir, '_cost.jsonl'), JSON.stringify(record) + '\n');
  } catch (err) {
    process.stderr.write(`[ECC-ICM] cost-tracker: ${err.message}\n`);
  }
  process.exit(0);
}

if (require.main === module) main();

module.exports = { sumUsage };
