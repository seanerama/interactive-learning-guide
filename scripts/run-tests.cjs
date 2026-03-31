/**
 * Basic smoke tests for the interactive-learning-guide package.
 */

const fs = require('fs');
const path = require('path');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ ${message}`);
    failed++;
  }
}

// Test 1: package.json is valid
const pkg = require('../package.json');
assert(pkg.name === 'interactive-learning-guide', 'package.json has correct name');
assert(pkg.bin['interactive-learning-guide'] === 'bin/install.js', 'package.json has correct bin entry');

// Test 2: All command files exist and have valid frontmatter
const commandsDir = path.join(__dirname, '..', 'commands', 'ilg');
const expectedCommands = ['help', 'start', 'book', 'multiformat', 'init', 'chapter', 'build', 'status'];

for (const cmd of expectedCommands) {
  const filePath = path.join(commandsDir, `${cmd}.md`);
  const exists = fs.existsSync(filePath);
  assert(exists, `Command file exists: ${cmd}.md`);

  if (exists) {
    const content = fs.readFileSync(filePath, 'utf8');
    assert(content.startsWith('---'), `${cmd}.md has frontmatter`);
    assert(content.includes(`name: ilg:${cmd}`), `${cmd}.md has correct name in frontmatter`);
  }
}

// Test 3: All workflow files exist
const workflowsDir = path.join(__dirname, '..', 'ilg', 'workflows');
const expectedWorkflows = [
  'single-session-book.md',
  'single-session-multiformat.md',
  'chunked-init.md',
  'chunked-chapter.md',
  'chunked-build.md',
];

for (const wf of expectedWorkflows) {
  assert(fs.existsSync(path.join(workflowsDir, wf)), `Workflow file exists: ${wf}`);
}

// Test 4: All template files exist
const templatesDir = path.join(__dirname, '..', 'ilg', 'templates');
const expectedTemplates = ['learning-data.json', 'progress.md', 'summary.md', 'config.json'];

for (const tpl of expectedTemplates) {
  assert(fs.existsSync(path.join(templatesDir, tpl)), `Template file exists: ${tpl}`);
}

// Test 5: learning-data.json template is valid JSON
try {
  const data = JSON.parse(fs.readFileSync(path.join(templatesDir, 'learning-data.json'), 'utf8'));
  assert(data.book && data.concepts && data.quizQuestions, 'learning-data.json template has expected structure');
} catch {
  assert(false, 'learning-data.json template is valid JSON');
}

// Test 6: install.js exists and is executable-ready
const installPath = path.join(__dirname, '..', 'bin', 'install.js');
assert(fs.existsSync(installPath), 'bin/install.js exists');
const installContent = fs.readFileSync(installPath, 'utf8');
assert(installContent.startsWith('#!/usr/bin/env node'), 'install.js has shebang');

// Test 7: Hook source exists
assert(fs.existsSync(path.join(__dirname, '..', 'hooks', 'src', 'ilg-session-start.js')), 'Session start hook exists');

// Summary
console.log(`\n  ${passed} passed, ${failed} failed\n`);
process.exit(failed > 0 ? 1 : 0);
