import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const STORE_DIR = path.join(ROOT_DIR, 'store-assets');
const ARTIFACT_DIR = process.env.ARTIFACT_DIR || path.join(ROOT_DIR, 'test/screenshots');
const TEST_HTML = path.join(ROOT_DIR, 'test/index.html');

async function renderAssets() {
  console.log('[1] Creating CDP target...');
  const newTabRes = await fetch('http://localhost:9222/json/new', { method: 'PUT' });
  const tab = await newTabRes.json();
  const pageId = tab.id;

  const socket = new WebSocket(tab.webSocketDebuggerUrl);
  await new Promise(r => socket.onopen = r);

  let reqId = 1;
  const pending = new Map();
  let loadResolve;
  const loadPromise = new Promise(r => loadResolve = r);

  socket.onmessage = (evt) => {
    try {
      const data = JSON.parse(evt.data);
      if (data.method === 'Page.loadEventFired') loadResolve();
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

  async function capture(outPath, width, height) {
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: false
    });
    await new Promise(r => setTimeout(r, 400));
    const snap = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(outPath, Buffer.from(snap.data, 'base64'));
    console.log(`Saved: ${path.basename(outPath)} (${width}x${height})`);
  }

  try {
    await send('Page.enable');
    await send('Runtime.enable');

    // 1. Screenshot 3: Feed View (1280x800)
    console.log('[2] Capturing Store Screenshot 3: Feed (1280x800)...');
    await send('Page.navigate', { url: `file://${TEST_HTML}` });
    await loadPromise;
    await new Promise(r => setTimeout(r, 600));
    await capture(path.join(STORE_DIR, 'screenshot_3_feed_1280x800.png'), 1280, 800);
    fs.copyFileSync(path.join(STORE_DIR, 'screenshot_3_feed_1280x800.png'), path.join(ARTIFACT_DIR, 'civitai_feed_desktop.png'));

    // 2. Screenshot 1: Fullscreen Theater View with Filmstrip (1280x800)
    console.log('[3] Capturing Store Screenshot 1: Theater (1280x800)...');
    await send('Runtime.evaluate', {
      expression: `
        const inst = window.__CIVITAI_THEATER_INSTANCE__;
        inst.open();
        inst.pause();
        inst.toggleFilmstrip(true);
      `
    });
    await new Promise(r => setTimeout(r, 600));
    await capture(path.join(STORE_DIR, 'screenshot_1_theater_1280x800.png'), 1280, 800);
    fs.copyFileSync(path.join(STORE_DIR, 'screenshot_1_theater_1280x800.png'), path.join(ARTIFACT_DIR, 'civitai_theater_desktop_slide1.png'));

    // 3. Screenshot 2: Generation Specs Drawer (1280x800)
    console.log('[4] Capturing Store Screenshot 2: Specs Drawer (1280x800)...');
    await send('Runtime.evaluate', {
      expression: `window.__CIVITAI_THEATER_INSTANCE__.toggleInspector(true);`
    });
    await new Promise(r => setTimeout(r, 500));
    await capture(path.join(STORE_DIR, 'screenshot_2_specs_1280x800.png'), 1280, 800);
    fs.copyFileSync(path.join(STORE_DIR, 'screenshot_2_specs_1280x800.png'), path.join(ARTIFACT_DIR, 'civitai_theater_desktop_info.png'));

    // 4. Tablet Viewport (768x1024)
    console.log('[5] Capturing Tablet Viewport (768x1024)...');
    await send('Runtime.evaluate', {
      expression: `window.__CIVITAI_THEATER_INSTANCE__.toggleInspector(false);`
    });
    await capture(path.join(ARTIFACT_DIR, 'civitai_theater_tablet.png'), 768, 1024);

    // 5. Mobile Viewport (390x844)
    console.log('[6] Capturing Mobile Viewport (390x844)...');
    await capture(path.join(ARTIFACT_DIR, 'civitai_theater_mobile.png'), 390, 844);

    // 6. Promo Tile (440x280)
    console.log('[7] Generating Small Promo Tile (440x280)...');
    const promoHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <style>
          * { margin:0; padding:0; box-sizing:border-box; }
          body {
            width: 440px;
            height: 280px;
            background: radial-gradient(circle at 50% 30%, #0f172a 0%, #020617 100%);
            color: #f8fafc;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
            border: 1px solid rgba(255,255,255,0.1);
          }
          .grid-pattern {
            position: absolute;
            inset: 0;
            background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
            background-size: 20px 20px;
          }
          .icon-box {
            position: relative;
            z-index: 1;
            width: 64px;
            height: 64px;
            background: rgba(15, 23, 42, 0.85);
            border: 1px solid rgba(56, 189, 248, 0.4);
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 14px;
            box-shadow: 0 12px 30px -4px rgba(56, 189, 248, 0.25);
          }
          .icon-box svg {
            color: #38bdf8;
          }
          h1 {
            position: relative;
            z-index: 1;
            font-size: 22px;
            font-weight: 700;
            letter-spacing: -0.02em;
            color: #ffffff;
            margin-bottom: 6px;
          }
          p {
            position: relative;
            z-index: 1;
            font-size: 13px;
            color: #94a3b8;
            font-weight: 500;
          }
          .badge {
            position: absolute;
            top: 14px;
            right: 14px;
            background: rgba(56, 189, 248, 0.15);
            border: 1px solid rgba(56, 189, 248, 0.3);
            color: #38bdf8;
            font-size: 10px;
            font-weight: 700;
            padding: 3px 8px;
            border-radius: 9999px;
            letter-spacing: 0.05em;
          }
        </style>
      </head>
      <body>
        <div class="grid-pattern"></div>
        <div class="badge">v2.0 PRO - 2K/4K</div>
        <div class="icon-box">
          <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="6 3 20 12 6 21 6 3" fill="#38bdf8"/>
          </svg>
        </div>
        <h1>Civitai Theater</h1>
        <p>Fullscreen Media Slideshow</p>
      </body>
      </html>
    `;
    await send('Page.navigate', { url: 'data:text/html;charset=utf-8,' + encodeURIComponent(promoHtml) });
    await new Promise(r => setTimeout(r, 400));
    await capture(path.join(STORE_DIR, 'promo_tile_440x280.png'), 440, 280);

    // 7. Marquee Banner (1400x560)
    console.log('[8] Generating Large Marquee Tile (1400x560)...');
    const marqueeHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <style>
          * { margin:0; padding:0; box-sizing:border-box; }
          body {
            width: 1400px;
            height: 560px;
            background: radial-gradient(circle at 60% 40%, #0f172a 0%, #020617 100%);
            color: #f8fafc;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 90px;
            position: relative;
            overflow: hidden;
          }
          .grid-pattern {
            position: absolute;
            inset: 0;
            background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
            background-size: 32px 32px;
          }
          .content-left {
            position: relative;
            z-index: 1;
            max-width: 650px;
          }
          .pill {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(56, 189, 248, 0.12);
            border: 1px solid rgba(56, 189, 248, 0.3);
            color: #38bdf8;
            font-size: 13px;
            font-weight: 700;
            padding: 6px 14px;
            border-radius: 9999px;
            margin-bottom: 20px;
          }
          h1 {
            font-size: 46px;
            font-weight: 800;
            letter-spacing: -0.03em;
            color: #ffffff;
            line-height: 1.15;
            margin-bottom: 16px;
          }
          p {
            font-size: 18px;
            line-height: 1.6;
            color: #94a3b8;
            margin-bottom: 24px;
          }
          .feature-tags {
            display: flex;
            gap: 12px;
          }
          .tag {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 6px 14px;
            border-radius: 8px;
            font-size: 13px;
            color: #cbd5e1;
            font-weight: 500;
          }
          .badge-visual {
            position: relative;
            z-index: 1;
            width: 320px;
            height: 320px;
            background: rgba(15, 23, 42, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 30px 60px -12px rgba(0,0,0,0.8), 0 0 50px rgba(56, 189, 248, 0.15);
          }
        </style>
      </head>
      <body>
        <div class="grid-pattern"></div>
        <div class="content-left">
          <div class="pill">CINEMA-GRADE PRESENTATION (v2.0 PRO)</div>
          <h1>Civitai Theater</h1>
          <p>Transform all images and videos on Civitai into an immersive high-definition fullscreen slideshow with interactive pan & zoom, filmstrip scrubber, and prompt telemetry.</p>
          <div class="feature-tags">
            <div class="tag">⚡ 2K/4K Upscale</div>
            <div class="tag">🎞️ Filmstrip Scrubber</div>
            <div class="tag">🔍 Telemetry Inspector</div>
            <div class="tag">🔍 Pan & Zoom</div>
          </div>
        </div>
        <div class="badge-visual">
          <svg viewBox="0 0 24 24" width="120" height="120" stroke="#38bdf8" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="6 3 20 12 6 21 6 3" fill="rgba(56, 189, 248, 0.2)"/>
          </svg>
        </div>
      </body>
      </html>
    `;
    await send('Page.navigate', { url: 'data:text/html;charset=utf-8,' + encodeURIComponent(marqueeHtml) });
    await new Promise(r => setTimeout(r, 400));
    await capture(path.join(STORE_DIR, 'marquee_tile_1400x560.png'), 1400, 560);

    // Copy 128x128 icon
    fs.copyFileSync(
      path.join(ROOT_DIR, 'extension/icons/icon128.png'),
      path.join(STORE_DIR, 'icon_128x128.png')
    );
    console.log('Copied icon_128x128.png');

    console.log('All store assets and verification visuals successfully rendered!');
  } finally {
    socket.close();
    await fetch(`http://localhost:9222/json/close/${pageId}`);
  }
}

renderAssets().catch(err => {
  console.error('Error rendering store assets:', err);
  process.exit(1);
});
