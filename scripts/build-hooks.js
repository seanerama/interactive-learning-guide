/**
 * Build hooks from src/ to dist/ using esbuild for smaller, self-contained output.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'hooks', 'src');
const distDir = path.join(__dirname, '..', 'hooks', 'dist');

fs.mkdirSync(distDir, { recursive: true });

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.js'));

for (const file of files) {
  const src = path.join(srcDir, file);
  const dest = path.join(distDir, file);

  try {
    execSync(`npx esbuild "${src}" --bundle --platform=node --outfile="${dest}" --minify`, {
      stdio: 'pipe',
    });
    console.log(`  Built: ${file}`);
  } catch (err) {
    // Fallback: just copy the file
    fs.copyFileSync(src, dest);
    console.log(`  Copied (no esbuild): ${file}`);
  }
}

console.log('  Hook build complete.');
