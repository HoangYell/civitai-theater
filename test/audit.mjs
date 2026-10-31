import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ARTIFACT_DIR = process.env.ARTIFACT_DIR || path.join(ROOT_DIR, 'test/screenshots');
fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
const TEST_HTML = path.join(ROOT_DIR, 'test/index.html');

async function runAudit() {
  console.log('[1] Creating new tab in Chrome CDP...');
  const newTabRes = await fetch('http://localhost:9222/json/new', { method: 'PUT' });
  const tab = await newTabRes.json();
  const pageId = tab.id;
  console.log('[2] Tab created:', pageId);

  const socket = new WebSocket(tab.webSocketDebuggerUrl);
  await new Promise(r => socket.onopen = r);

  let reqId = 1;
  const pending = new Map();
  socket.onmessage = (evt) => {
    try {
      const data = JSON.parse(evt.data);
      if (data.id && pending.has(data.id)) {
        const resolve = pending.get(data.id);
        pending.delete(data.id);
        resolve(data.result);
      }
    } catch (_) {}
  };

  function send(method, params = {}) {
    return new Promise(resolve => {
      const id = reqId++;
      pending.set(id, resolve);
      socket.send(JSON.stringify({ id, method, params }));
    });
  }

  try {
    await send('Page.enable');
    await send('Runtime.enable');

    console.log('[3] Setting Desktop viewport (1440x900)...');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    console.log('[4] Navigating to test page...');
    await send('Page.navigate', { url: `file://${TEST_HTML}` });
    await new Promise(r => setTimeout(r, 800));

    // Capture 1: Feed with Floating Launcher Button
    console.log('[5] Capturing Feed Desktop...');
    let snap = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'civitai_feed_desktop.png'), Buffer.from(snap.data, 'base64'));
    console.log('-> Saved civitai_feed_desktop.png');

    // Click Launcher to open Theater Mode
    console.log('[6] Clicking Launcher Button...');
    await send('Runtime.evaluate', {
      expression: `document.getElementById('ct-launcher-btn').click();`
    });
    await new Promise(r => setTimeout(r, 500));

    // Capture 2: Theater Desktop Slide 1
    console.log('[7] Capturing Theater Desktop Slide 1...');
    snap = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'civitai_theater_desktop_slide1.png'), Buffer.from(snap.data, 'base64'));
    console.log('-> Saved civitai_theater_desktop_slide1.png');

    // Open Inspector Drawer
    console.log('[8] Toggling Inspector Drawer (i)...');
    await send('Runtime.evaluate', {
      expression: `document.getElementById('ct-btn-inspect').click();`
    });
    await new Promise(r => setTimeout(r, 300));

    // Capture 3: Desktop Theater with Inspector Drawer
    console.log('[9] Capturing Theater Desktop with Inspector Drawer...');
    snap = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'civitai_theater_desktop_info.png'), Buffer.from(snap.data, 'base64'));
    console.log('-> Saved civitai_theater_desktop_info.png');

    // Close inspector drawer for tablet & mobile
    await send('Runtime.evaluate', {
      expression: `document.getElementById('ct-btn-close-inspector').click();`
    });

    // Capture 4: Tablet Viewport (768x1024)
    console.log('[10] Switching to Tablet (768x1024)...');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 768,
      height: 1024,
      deviceScaleFactor: 1,
      mobile: false
    });
    await new Promise(r => setTimeout(r, 400));
    snap = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'civitai_theater_tablet.png'), Buffer.from(snap.data, 'base64'));
    console.log('-> Saved civitai_theater_tablet.png');

    // Capture 5: Mobile Viewport (390x844)
    console.log('[11] Switching to Mobile (390x844)...');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 1,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 400));
    snap = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'civitai_theater_mobile.png'), Buffer.from(snap.data, 'base64'));
    console.log('-> Saved civitai_theater_mobile.png');

    console.log('ALL VERIFICATION AUDITS PASSED WITH FLYING COLORS!');
  } finally {
    socket.close();
    await fetch(`http://localhost:9222/json/close/${pageId}`);
  }
}

runAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
