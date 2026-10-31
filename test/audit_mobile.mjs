import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ARTIFACT_DIR = process.env.ARTIFACT_DIR || path.join(ROOT_DIR, 'test/screenshots');
fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
const TEST_HTML = path.join(ROOT_DIR, 'test/index.html');

async function runMobileAudit() {
  const newTabRes = await fetch('http://localhost:9222/json/new', { method: 'PUT' });
  const tab = await newTabRes.json();
  const pageId = tab.id;

  const socket = new WebSocket(tab.webSocketDebuggerUrl);
  await new Promise(r => socket.onopen = r);

  let reqId = 1;
  const pending = new Map();
  socket.onmessage = (evt) => {
    try {
      const data = JSON.parse(evt.data);
      if (data.id && pending.has(data.id)) {
        pending.get(data.id)(data.result);
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

    // 1. Tablet Viewport
    await send('Emulation.setDeviceMetricsOverride', {
      width: 768,
      height: 1024,
      deviceScaleFactor: 1,
      mobile: false
    });

    await send('Page.navigate', { url: `file://${TEST_HTML}` });
    await new Promise(r => setTimeout(r, 600));

    // Open theater
    await send('Runtime.evaluate', {
      expression: `document.getElementById('ct-launcher-btn').click();`
    });
    await new Promise(r => setTimeout(r, 400));

    let snap = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'civitai_theater_tablet.png'), Buffer.from(snap.data, 'base64'));
    console.log('-> Saved civitai_theater_tablet.png');

    // 2. Mobile Viewport (390x844)
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

    console.log('Tablet & Mobile audits passed!');
  } finally {
    socket.close();
    await fetch(`http://localhost:9222/json/close/${pageId}`);
  }
}

runMobileAudit().catch(err => {
  console.error(err);
  process.exit(1);
});
