import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const STORE_DIR = path.join(ROOT_DIR, 'store-assets');
const TEST_HTML = path.join(ROOT_DIR, 'test/index.html');

async function generate() {
  const newTabRes = await fetch('http://localhost:9222/json/new', { method: 'PUT' });
  const tab = await newTabRes.json();
  const socket = new WebSocket(tab.webSocketDebuggerUrl);
  await new Promise(r => socket.onopen = r);

  let reqId = 1;
  const pending = new Map();
  socket.onmessage = (evt) => {
    try {
      const data = JSON.parse(evt.data);
      if (data.id && pending.has(data.id)) {
        pending.get(data.id)(data.result || data.error);
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

    // 1. Screenshot 1: Fullscreen Theater (1280x800)
    console.log('[1] Generating screenshot_1_theater_1280x800.png...');
    await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false });
    await send('Page.navigate', { url: `file://${TEST_HTML}` });
    await new Promise(r => setTimeout(r, 600));

    // Click launcher
    await send('Runtime.evaluate', {
      expression: `
        (async () => {
          for (let i = 0; i < 20; i++) {
            const btn = document.getElementById("ct-launcher-btn");
            if (btn) { btn.click(); return true; }
            await new Promise(r => setTimeout(r, 50));
          }
        })()
      `,
      awaitPromise: true
    });
    await new Promise(r => setTimeout(r, 400));

    let snap = await send('Page.captureScreenshot', { format: 'png' });
    if (snap && snap.data) {
      fs.writeFileSync(path.join(STORE_DIR, 'screenshot_1_theater_1280x800.png'), Buffer.from(snap.data, 'base64'));
      console.log('Saved screenshot_1_theater_1280x800.png');
    }

    // 2. Screenshot 2: Generation Specs Drawer (1280x800)
    console.log('[2] Generating screenshot_2_specs_1280x800.png...');
    await send('Runtime.evaluate', {
      expression: `document.getElementById('ct-btn-info').click();`
    });
    await new Promise(r => setTimeout(r, 300));

    snap = await send('Page.captureScreenshot', { format: 'png' });
    if (snap && snap.data) {
      fs.writeFileSync(path.join(STORE_DIR, 'screenshot_2_specs_1280x800.png'), Buffer.from(snap.data, 'base64'));
      console.log('Saved screenshot_2_specs_1280x800.png');
    }

    // 3. Marquee Tile (1400x560)
    console.log('[3] Generating marquee_tile_1400x560.png...');
    const marqueeHtml = `
      <!DOCTYPE html><html><head><meta charset="utf-8"/>
      <style>
        * { margin:0; padding:0; box-sizing:border-box; }
        body {
          width: 1400px; height: 560px;
          background: radial-gradient(circle at 65% 40%, #0f172a 0%, #020617 100%);
          color: #f8fafc;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 100px; position: relative; overflow: hidden;
        }
        .grid-pattern {
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 32px 32px;
        }
        .content-left { position: relative; z-index: 1; max-width: 700px; }
        .pill {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.3);
          color: #38bdf8; font-size: 13px; font-weight: 700; padding: 6px 14px; border-radius: 9999px; margin-bottom: 24px;
        }
        h1 { font-size: 48px; font-weight: 800; letter-spacing: -0.03em; color: #fff; line-height: 1.15; margin-bottom: 16px; }
        p { font-size: 19px; line-height: 1.6; color: #94a3b8; margin-bottom: 28px; }
        .feature-tags { display: flex; gap: 12px; }
        .tag {
          background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 8px 16px; border-radius: 8px; font-size: 14px; color: #cbd5e1; font-weight: 600;
        }
        .badge-visual {
          position: relative; z-index: 1;
          width: 280px; height: 280px;
          background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 36px; display: flex; align-items: center; justify-content: center;
          box-shadow: 0 30px 60px -12px rgba(0,0,0,0.8), 0 0 60px rgba(56, 189, 248, 0.2);
        }
      </style></head>
      <body>
        <div class="grid-pattern"></div>
        <div class="content-left">
          <div class="pill">CINEMA-GRADE PRESENTATION</div>
          <h1>Civitai Theater</h1>
          <p>Transform all images and videos on Civitai into an immersive high-definition fullscreen slideshow with endless loading and generation telemetry.</p>
          <div class="feature-tags">
            <div class="tag">⚡ 2K/4K Auto-Upscale</div>
            <div class="tag">🎬 Native Video & Audio</div>
            <div class="tag">🔍 Live Prompt Specs</div>
          </div>
        </div>
        <div class="badge-visual">
          <svg viewBox="0 0 24 24" width="120" height="120" stroke="#38bdf8" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="6 3 20 12 6 21 6 3" fill="rgba(56, 189, 248, 0.25)"/>
          </svg>
        </div>
      </body></html>
    `;
    await send('Emulation.setDeviceMetricsOverride', { width: 1400, height: 560, deviceScaleFactor: 1, mobile: false });
    await send('Page.navigate', { url: 'data:text/html;charset=utf-8,' + encodeURIComponent(marqueeHtml) });
    await new Promise(r => setTimeout(r, 400));
    snap = await send('Page.captureScreenshot', { format: 'png' });
    if (snap && snap.data) {
      fs.writeFileSync(path.join(STORE_DIR, 'marquee_tile_1400x560.png'), Buffer.from(snap.data, 'base64'));
      console.log('Saved marquee_tile_1400x560.png');
    }

    // 4. Copy 128x128 icon
    fs.copyFileSync(
      path.join(ROOT_DIR, 'extension/icons/icon128.png'),
      path.join(STORE_DIR, 'icon_128x128.png')
    );
    console.log('Copied icon_128x128.png');

    console.log('All store assets successfully prepared!');
  } finally {
    socket.close();
    await fetch(`http://localhost:9222/json/close/${tab.id}`);
  }
}

generate().catch(console.error);
