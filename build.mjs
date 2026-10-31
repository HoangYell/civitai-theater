import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const rootDir = path.dirname(__filename);
const userScriptPath = path.join(rootDir, 'userscript/civitai-theater.user.js');
const userScriptCode = fs.readFileSync(userScriptPath, 'utf8');

// Ensure dist exists
const distDir = path.join(rootDir, 'dist');
fs.mkdirSync(distDir, { recursive: true });

// 1. Copy userscript to dist
fs.writeFileSync(path.join(distDir, 'civitai-theater.user.js'), userScriptCode);

// 2. Extract executable script body (excluding metadata header)
const bodyMatch = userScriptCode.match(/\/\/ ==\/UserScript==([\s\S]+)$/);
const scriptBody = bodyMatch ? bodyMatch[1].trim() : userScriptCode;

// 3. Update extension/content.js
const extensionContentPath = path.join(rootDir, 'extension/content.js');
const extensionHeader = `// Civitai Theater - Chrome Extension Content Script (v2.1.0 Pro)\n// Built for Civitai.com and Civitai.red\n\n`;
fs.writeFileSync(extensionContentPath, extensionHeader + scriptBody);

// 4. Build bookmarklet payload.
// Keep the source intact: regex-based comment stripping corrupts `https://` URLs
// inside string literals and template strings, producing an unrunnable bookmarklet.
const bookmarkletCode = scriptBody.trim();

const bookmarkletUrl = `javascript:${encodeURIComponent(bookmarkletCode)}`;
fs.writeFileSync(path.join(distDir, 'bookmarklet.js'), bookmarkletUrl);

// 5. Create bookmarklet installer HTML page
const bookmarkletHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Civitai Theater - 1-Click Bookmarklet</title>
  <style>
    :root {
      --bg: #07090e;
      --card: #0f172a;
      --border: rgba(255, 255, 255, 0.08);
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --accent: #38bdf8;
    }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      max-width: 680px;
      margin: 40px auto;
      padding: 0 20px;
      line-height: 1.6;
    }
    h1 {
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -0.02em;
      margin-bottom: 8px;
    }
    p {
      color: var(--text-muted);
      margin-bottom: 24px;
    }
    .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 24px;
    }
    .draggable-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 12px 24px;
      background: #f8fafc;
      color: #090a0f;
      text-decoration: none;
      font-size: 14px;
      font-weight: 700;
      border-radius: 9999px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
      cursor: grab;
      transition: all 0.2s ease;
    }
    .draggable-btn:hover {
      background: #ffffff;
      transform: translateY(-2px);
    }
    .steps {
      margin-top: 20px;
      font-size: 13px;
      color: var(--text-muted);
    }
    .steps ol {
      padding-left: 20px;
    }
    .steps li {
      margin-bottom: 8px;
    }
  </style>
</head>
<body>
  <h1>Civitai Theater - Bookmarklet</h1>
  <p>Turn any Civitai page into a cinema-grade fullscreen slideshow with zero extensions installed.</p>

  <div class="card">
    <a class="draggable-btn" href="${bookmarkletUrl}" onclick="alert('Drag this button to your Bookmarks Bar instead of clicking it!'); return false;">
      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg>
      <span>Civitai Theater</span>
    </a>

    <div class="steps">
      <ol>
        <li>Drag the button above to your browser Bookmarks Bar.</li>
        <li>Open any Civitai page (e.g. <code>civitai.com/images</code> or model showcases).</li>
        <li>Click <strong>Civitai Theater</strong> in your bookmarks to launch the fullscreen slideshow!</li>
      </ol>
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync(path.join(distDir, 'bookmarklet.html'), bookmarkletHtml);

// 6. Update test/index.html with current scriptBody
const testIndexPath = path.join(rootDir, 'test/index.html');
if (fs.existsSync(testIndexPath)) {
  let testHtml = fs.readFileSync(testIndexPath, 'utf8');
  // If it already has inline script between <script id="theater-script"> ... </script>
  if (testHtml.includes('<script id="theater-script">')) {
    testHtml = testHtml.replace(
      /<script id="theater-script">[\s\S]*?<\/script>/,
      `<script id="theater-script">\n${scriptBody}\n</script>`
    );
  } else {
    // Replace the external script tag or previous script
    testHtml = testHtml.replace(
      /<script src="\.\.\/userscript\/civitai-theater\.user\.js"><\/script>/,
      `<script id="theater-script">\n${scriptBody}\n</script>`
    );
  }
  fs.writeFileSync(testIndexPath, testHtml);
}

// 7. Package extension into dist/civitai-theater-extension.zip
const zipOutput = path.join(distDir, 'civitai-theater-extension.zip');
if (fs.existsSync(zipOutput)) {
  fs.unlinkSync(zipOutput);
}

execSync('cd extension && zip -r ../dist/civitai-theater-extension.zip manifest.json content.js popup.html popup.js icons/', {
  cwd: rootDir,
  stdio: 'inherit'
});

console.log('Build complete!');
console.log('-> dist/civitai-theater.user.js');
console.log('-> dist/bookmarklet.js');
console.log('-> dist/bookmarklet.html');
console.log('-> extension/content.js');
console.log('-> dist/civitai-theater-extension.zip');
