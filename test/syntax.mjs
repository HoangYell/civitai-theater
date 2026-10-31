import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const rootDir = path.resolve(path.dirname(__filename), '..');

console.log('Running open-source repository syntax and hygiene checks...\n');

let failed = false;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    failed = true;
  } else {
    console.log(`✔ PASS: ${message}`);
  }
}

// 1. Verify Userscript syntax
try {
  const userScriptPath = path.join(rootDir, 'userscript/civitai-theater.user.js');
  const code = fs.readFileSync(userScriptPath, 'utf8');
  new vm.Script(code);
  assert(true, 'userscript/civitai-theater.user.js syntax is valid');

  const descMatch = code.match(/@description\s+(.+)/);
  if (descMatch) {
    const len = descMatch[1].trim().length;
    assert(len <= 150, `Userscript description length is ${len} (<= 150 chars)`);
  }
} catch (e) {
  assert(false, `Userscript syntax error: ${e.message}`);
}

// 2. Verify Extension Content Script syntax
try {
  const contentPath = path.join(rootDir, 'extension/content.js');
  const code = fs.readFileSync(contentPath, 'utf8');
  new vm.Script(code);
  assert(true, 'extension/content.js syntax is valid');
} catch (e) {
  assert(false, `extension/content.js syntax error: ${e.message}`);
}

// 3. Verify Manifest V3 validity & limits
try {
  const manifestPath = path.join(rootDir, 'extension/manifest.json');
  const raw = fs.readFileSync(manifestPath, 'utf8');
  const manifest = JSON.parse(raw);
  assert(manifest.manifest_version === 3, 'manifest_version is 3');
  assert(typeof manifest.name === 'string' && manifest.name.length > 0, 'manifest.name is present');
  assert(manifest.description.length <= 132, `Manifest description length is ${manifest.description.length} (<= 132 chars for Chrome Web Store)`);
  const pkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
  assert(manifest.version === pkg.version, `Manifest version matches package.json (${manifest.version})`);
  assert(!manifest.permissions.includes('storage'), 'Manifest does not request unused storage permission');
} catch (e) {
  assert(false, `extension/manifest.json error: ${e.message}`);
}

// 4. Verify Bookmarklet syntax
try {
  const bookmarkletPath = path.join(rootDir, 'dist/bookmarklet.js');
  const raw = fs.readFileSync(bookmarkletPath, 'utf8');
  assert(raw.startsWith('javascript:'), 'bookmarklet.js has javascript: protocol prefix');
  const decoded = decodeURIComponent(raw.replace(/^javascript:/, ''));
  new vm.Script(decoded);
  assert(true, 'dist/bookmarklet.js decodes and compiles cleanly');
} catch (e) {
  assert(false, `dist/bookmarklet.js error: ${e.message}`);
}

// 5. Hygiene scan: Ensure zero hardcoded local /home/ or private brain paths
const filesToScan = [
  'build.mjs',
  'README.md',
  'extension/manifest.json',
  'extension/popup.html',
  'extension/popup.js',
  'store-assets/STORE_LISTING.md',
  'test/audit.mjs',
  'test/verify.mjs',
  'scripts/publish-cws.mjs',
  'scripts/render-store-assets.mjs',
  'scripts/make_store_assets.mjs'
];

for (const relPath of filesToScan) {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) continue;
  const content = fs.readFileSync(fullPath, 'utf8');
  if (content.includes('/home/')) {
    assert(false, `Forbidden hardcoded /home/ path detected in ${relPath}`);
  }
  if (content.includes('.gemini/antigravity')) {
    assert(false, `Forbidden internal brain path detected in ${relPath}`);
  }
}
assert(true, 'Zero local or internal host paths found across tracked repository files');

if (failed) {
  console.error('\n❌ Repository hygiene checks failed.');
  process.exit(1);
} else {
  console.log('\n✔ All repository syntax and open-source hygiene checks passed successfully!');
}
