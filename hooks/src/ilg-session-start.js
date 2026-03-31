/**
 * ILG Session Start Hook
 * Detects if relay files exist in the working directory and reminds the user
 * of their chunked pipeline state.
 */

const fs = require('fs');
const path = require('path');

function main() {
  const cwd = process.cwd();
  const progressPath = path.join(cwd, 'progress.md');
  const dataPath = path.join(cwd, 'learning-data.json');
  const summaryPath = path.join(cwd, 'summary.md');

  const hasProgress = fs.existsSync(progressPath);
  const hasData = fs.existsSync(dataPath);
  const hasSummary = fs.existsSync(summaryPath);

  if (hasProgress && hasData && hasSummary) {
    try {
      const progress = fs.readFileSync(progressPath, 'utf8');
      const unchecked = (progress.match(/- \[ \]/g) || []).length;
      const checked = (progress.match(/- \[x\]/g) || []).length;

      if (unchecked > 0) {
        console.log(`ILG: Chunked pipeline in progress (${checked} chapters done, ${unchecked} remaining). Run /ilg:status for details.`);
      } else if (unchecked === 0 && checked > 0) {
        console.log('ILG: All chapters processed. Run /ilg:build to generate the HTML guide.');
      }
    } catch {
      // Silently ignore read errors
    }
  }
}

main();
