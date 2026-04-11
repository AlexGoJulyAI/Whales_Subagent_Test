#!/usr/bin/env node

/**
 * Syncs skill/command files to supported platforms.
 * Source of truth:
 *   .claude/skills/clone-website/SKILL.md
 *   .claude/skills/clone-and-edit-website/SKILL.md (+ agent files)
 *
 * Usage: node scripts/sync-skills.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = join(ROOT, '.claude', 'skills', 'clone-website', 'SKILL.md');

// --- Parse source skill ---

let raw;
try {
  raw = readFileSync(SOURCE, 'utf8').replace(/\r\n/g, '\n');
} catch {
  console.error(`Error: Source skill not found at .claude/skills/clone-website/SKILL.md`);
  process.exit(1);
}

// --- Helpers ---

function write(relPath, content) {
  const full = join(ROOT, relPath);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content, 'utf8');
  console.log(`  \u2713 ${relPath}`);
}

// --- Generate ---

console.log('Syncing clone-website skill...');
console.log(`  Source: .claude/skills/clone-website/SKILL.md\n`);

// GitHub Copilot
write('.github/skills/clone-website/SKILL.md', raw);

console.log('\nDone! 1 platform file generated from source skill.');

// ============================================================
// clone-and-edit-website skill
// ============================================================

const CAE_SOURCE = join(ROOT, '.claude', 'skills', 'clone-and-edit-website', 'SKILL.md');
const CAE_AGENT_FILES = ['INTAKE_AGENT.md', 'DESIGNER_AGENT.md', 'PROTOTYPER_AGENT.md'];

let caeRaw;
try {
  caeRaw = readFileSync(CAE_SOURCE, 'utf8').replace(/\r\n/g, '\n');
} catch {
  console.error(`\nWarning: clone-and-edit-website SKILL.md not found — skipping.`);
  process.exit(0);
}

console.log('\nSyncing clone-and-edit-website skill...');
console.log(`  Source: .claude/skills/clone-and-edit-website/SKILL.md\n`);

// GitHub Copilot — copy SKILL.md + all agent files
write('.github/skills/clone-and-edit-website/SKILL.md', caeRaw);
for (const agentFile of CAE_AGENT_FILES) {
  const agentSrc = join(ROOT, '.claude', 'skills', 'clone-and-edit-website', agentFile);
  try {
    const agentContent = readFileSync(agentSrc, 'utf8');
    write(`.github/skills/clone-and-edit-website/${agentFile}`, agentContent);
  } catch {
    console.log(`  ! .github/skills/clone-and-edit-website/${agentFile} — source not found, skipped`);
  }
}

console.log('\nDone! clone-and-edit-website skill synced to github platform.');
