import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Native global WebSocket is built-in in Node.js 22+
const WS = globalThis.WebSocket;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const ARTIFACT_DIR = process.env.ARTIFACT_DIR || path.join(ROOT_DIR, 'test/screenshots');
fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

// Simple Static HTTP Server for test assets
function startServer(port = 4399) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let reqPath = req.url.split('?')[0];
      if (reqPath === '/') reqPath = '/test/index.html';

      const filePath = path.join(ROOT_DIR, reqPath);
      console.log(`[HTTP] ${req.method} ${req.url} -> ${filePath}`);

      if (!fs.existsSync(filePath)) {
        console.log(`[HTTP 404] Not found: ${filePath}`);
        res.writeHead(404);
        res.end('Not found');
        return;
      }

      const stat = fs.statSync(filePath);
      const ext = path.extname(filePath);
      const mimeTypes = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.mp4': 'video/mp4',
        '.svg': 'image/svg+xml'
      };

      const contentType = mimeTypes[ext] || 'application/octet-stream';
      const range = req.headers.range;

      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(filePath, { start, end });
        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${stat.size}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': contentType,
        });
        file.pipe(res);
      } else {
        res.writeHead(200, {
          'Content-Length': stat.size,
          'Accept-Ranges': 'bytes',
          'Content-Type': contentType
        });
        fs.createReadStream(filePath).pipe(res);
      }
    });

    server.listen(port, () => {
      console.log(`Test server running at http://localhost:${port}`);
      resolve(server);
    });
  });
}

// Chrome DevTools Protocol Client
async function runVisualVerification() {
  const server = await startServer(4399);

  // Create new page in Chrome CDP
  const targetRes = await fetch('http://localhost:9222/json/new?about:blank', { method: 'PUT' });
  const target = await targetRes.json();
  const socket = new WS(target.webSocketDebuggerUrl);

  await new Promise(res => {
    socket.onopen = res;
  });

  let reqId = 1;
  const pending = new Map();

  socket.onmessage = (evt) => {
    try {
      const data = JSON.parse(evt.data);
      if (data.id) {
        console.log(`[CDP RECV id=${data.id}]`, data.error ? data.error : 'OK');
        if (pending.has(data.id)) {
          const resolve = pending.get(data.id);
          pending.delete(data.id);
          resolve(data.result);
        }
      }
    } catch (e) {
      console.error('[CDP PARSE ERR]', e);
    }
  };

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = reqId++;
      console.log(`[CDP SEND id=${id}] ${method}`);
      pending.set(id, resolve);
      socket.send(JSON.stringify({ id, method, params }));
    });
  }

  async function capture(filename, width, height, dsf = 1) {
    console.log(`[Capture start] ${filename} ${width}x${height}`);
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: dsf,
      mobile: width < 600
    });
    await new Promise(r => setTimeout(r, 200));
    const snap = await send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(snap.data, 'base64');
    const outPath = path.join(ARTIFACT_DIR, filename);
    fs.writeFileSync(outPath, buffer);
    console.log(`Saved screenshot: ${filename} (${width}x${height})`);
  }

  try {
    console.log('[Step 1] Enabling Page and Runtime');
    await send('Page.enable');
    await send('Runtime.enable');

    console.log('[Step 2] Navigating');
    await send('Page.navigate', { url: 'http://localhost:4399/test/index.html' });
    await new Promise(r => setTimeout(r, 800));

    // Verify Closed Theater State & Profile Button Pass-Through
    console.log('[Step 2.1] Verifying Civitai Profile Button & Zero Inert Interference');
    const preFlightAudit = await send('Runtime.evaluate', {
      expression: `(() => {
        const overlay = document.getElementById('ct-overlay');
        const overlayStyle = window.getComputedStyle(overlay);
        const hasAriaModal = overlay.hasAttribute('aria-modal');
        const role = overlay.getAttribute('role');
        const ariaHidden = overlay.getAttribute('aria-hidden');

        // Test Profile Button Interaction
        const profileBtn = document.getElementById('mock-profile-btn');
        const profileDropdown = document.getElementById('mock-profile-dropdown');
        profileBtn.click();
        const dropdownOpenAfterClick = profileDropdown && window.getComputedStyle(profileDropdown).display === 'block';
        const hasModalConflict = Boolean(window.__MANTINE_MODAL_CONFLICT__);

        // Click menu item
        const item = document.getElementById('mock-profile-item-account');
        if (item) item.click();
        const profileClickedVal = window.__PROFILE_CLICKED__;

        return {
          overlayDisplay: overlayStyle.display,
          overlayVisibility: overlayStyle.visibility,
          overlayPointerEvents: overlayStyle.pointerEvents,
          hasAriaModal,
          role,
          ariaHidden,
          dropdownOpenAfterClick,
          hasModalConflict,
          profileClickedVal
        };
      })()`,
      returnByValue: true
    });

    console.log('[Pre-Flight Profile & Overlay Assertions]', preFlightAudit.result.value);
    const pre = preFlightAudit.result.value;
    if (pre.overlayDisplay !== 'none') {
      throw new Error(`Assertion failed: closed #ct-overlay must have display: none, got ${pre.overlayDisplay}`);
    }
    if (pre.overlayVisibility !== 'hidden') {
      throw new Error(`Assertion failed: closed #ct-overlay must have visibility: hidden, got ${pre.overlayVisibility}`);
    }
    if (pre.overlayPointerEvents !== 'none') {
      throw new Error(`Assertion failed: closed #ct-overlay must have pointer-events: none, got ${pre.overlayPointerEvents}`);
    }
    if (pre.hasAriaModal) {
      throw new Error('Assertion failed: closed #ct-overlay must NOT have aria-modal attribute');
    }
    if (pre.role === 'dialog') {
      throw new Error('Assertion failed: closed #ct-overlay must NOT have role="dialog"');
    }
    if (pre.hasModalConflict) {
      throw new Error('Assertion failed: Mantine FloatingFocusManager detected modal conflict on profile button');
    }
    if (!pre.dropdownOpenAfterClick || pre.profileClickedVal !== 'account') {
      throw new Error('Assertion failed: Civitai profile dropdown did not open or receive click cleanly');
    }

    // Capture feed with floating launcher button
    console.log('[Step 3] Capturing desktop feed');
    await capture('civitai_feed_desktop.png', 1440, 900);

    // Click launcher button
    console.log('[Step 4] Clicking launcher button');
    await send('Runtime.evaluate', {
      expression: `document.getElementById('ct-launcher-btn').click();`
    });
    await new Promise(r => setTimeout(r, 600));

    // Capture Desktop Slide 1
    console.log('[Step 5] Capturing slide 1');
    await capture('civitai_theater_desktop_slide1.png', 1440, 900);

    // Navigate to slide 2 (Video slide is index 2)
    await send('Runtime.evaluate', {
      expression: `
        // Click next twice to hit video slide
        const theaterEl = document.querySelector('#ct-overlay');
        document.querySelector('#ct-dock-next').click();
        document.querySelector('#ct-dock-next').click();
      `
    });
    await new Promise(r => setTimeout(r, 600));

    // Capture Video Slide in Theater Mode
    await capture('civitai_theater_desktop_video.png', 1440, 900);

    // Verify hard assertions on theater state
    const auditData = await send('Runtime.evaluate', {
      expression: `(() => {
        const inst = window.__CIVITAI_THEATER_INSTANCE__;
        const stage = document.getElementById('ct-stage');
        const canvas = document.getElementById('ct-media-canvas');
        const activeMedia = canvas.querySelector('img:not(.ct-thumbnail-preview)') || canvas.querySelector('video');
        const prevFlank = document.getElementById('ct-flank-prev-inner');
        const nextFlank = document.getElementById('ct-flank-next-inner');
        const prevFlankEl = document.getElementById('ct-flank-prev');
        const nextFlankEl = document.getElementById('ct-flank-next');
        const tooltips = Array.from(document.querySelectorAll('[title]')).map(el => el.title);
        const hasBadTooltips = tooltips.some(t => /previous slide|next slide|previous artwork|next artwork/i.test(t));
        return {
          itemCount: inst.items.length,
          hasFlanks: stage.classList.contains('ct-has-flanks'),
          prevFlankImg: Boolean(prevFlank && prevFlank.querySelector('img')),
          nextFlankImg: Boolean(nextFlank && nextFlank.querySelector('img')),
          hasBadTooltips: hasBadTooltips,
          stageHeight: stage.clientHeight,
          mediaHeight: activeMedia ? activeMedia.clientHeight : 0,
          mediaWidth: activeMedia ? activeMedia.clientWidth : 0,
          leftFlankWidth: prevFlankEl ? prevFlankEl.clientWidth : 0,
          rightFlankWidth: nextFlankEl ? nextFlankEl.clientWidth : 0,
          stageWidth: stage.clientWidth
        };
      })()`,
      returnByValue: true
    });

    console.log('[Audit Assertions]', auditData.result.value);
    const {
      itemCount,
      hasFlanks,
      prevFlankImg,
      nextFlankImg,
      hasBadTooltips,
      stageHeight,
      mediaHeight,
      mediaWidth,
      leftFlankWidth,
      rightFlankWidth,
      stageWidth
    } = auditData.result.value;

    if (itemCount !== 4) throw new Error(`Assertion failed: expected 4 items, got ${itemCount}`);
    if (!hasFlanks) throw new Error('Assertion failed: 3-panel flanks should be active on 1440px desktop');
    if (!prevFlankImg || !nextFlankImg) throw new Error('Assertion failed: flanks must have rendered images');
    if (hasBadTooltips) throw new Error('Assertion failed: slide navigation tooltips must not exist');
    if (mediaHeight !== stageHeight) {
      throw new Error(`Assertion failed: main portrait media must be 100% full height (${stageHeight}px), got ${mediaHeight}px`);
    }
    const totalRowWidth = leftFlankWidth + mediaWidth + rightFlankWidth;
    if (Math.abs(totalRowWidth - stageWidth) > 2) {
      throw new Error(`Assertion failed: row must fill 100% stage width (${stageWidth}px), got ${totalRowWidth}px`);
    }

    // Open Inspector Drawer
    await send('Runtime.evaluate', {
      expression: `document.getElementById('ct-btn-inspect').click();`
    });
    await new Promise(r => setTimeout(r, 400));
    await capture('civitai_theater_desktop_info.png', 1440, 900);

    const inspectorAudit = await send('Runtime.evaluate', {
      expression: `(() => {
        const prevFlank = document.getElementById('ct-flank-prev');
        const nextFlank = document.getElementById('ct-flank-next');
        return {
          inspectorOpen: document.getElementById('ct-overlay').classList.contains('ct-inspector-open'),
          prevFlankDisplay: prevFlank ? getComputedStyle(prevFlank).display : 'missing',
          nextFlankDisplay: nextFlank ? getComputedStyle(nextFlank).display : 'missing'
        };
      })()`,
      returnByValue: true
    });

    console.log('[Inspector Assertions]', inspectorAudit.result.value);
    const inspectorState = inspectorAudit.result.value;
    if (!inspectorState.inspectorOpen) throw new Error('Assertion failed: inspector should be open');
    if (inspectorState.prevFlankDisplay !== 'none' || inspectorState.nextFlankDisplay !== 'none') {
      throw new Error('Assertion failed: cinema flanks must hide while inspector is open');
    }

    // 2. Tablet Viewport (768px)
    await capture('civitai_theater_tablet.png', 768, 1024);

    // 3. Mobile Viewport (390px)
    // Close inspector drawer for clean mobile view
    await send('Runtime.evaluate', {
      expression: `document.getElementById('ct-btn-close-inspector').click();`
    });
    await new Promise(r => setTimeout(r, 300));
    await capture('civitai_theater_mobile.png', 390, 844);

    // Verify Mobile Launcher safe zone offset when theater is closed
    console.log('[Step 6] Closing Theater & Verifying Clean Return to Page');
    const exitAudit = await send('Runtime.evaluate', {
      expression: `(() => {
        const inst = window.__CIVITAI_THEATER_INSTANCE__;
        inst.close();

        const overlay = document.getElementById('ct-overlay');
        const overlayStyle = window.getComputedStyle(overlay);
        const launcher = document.getElementById('ct-launcher-btn');
        const launcherRect = launcher.getBoundingClientRect();
        const distanceFromBottom = window.innerHeight - launcherRect.bottom;

        // Test profile button again after theater close
        const profileBtn = document.getElementById('mock-profile-btn');
        const profileDropdown = document.getElementById('mock-profile-dropdown');
        window.__PROFILE_CLICKED__ = null;
        profileBtn.click();
        const dropdownOpenAfterClose = profileDropdown && window.getComputedStyle(profileDropdown).display === 'block';

        return {
          overlayDisplay: overlayStyle.display,
          hasAriaModal: overlay.hasAttribute('aria-modal'),
          hasRole: overlay.hasAttribute('role'),
          ariaHidden: overlay.getAttribute('aria-hidden'),
          distanceFromBottom,
          dropdownOpenAfterClose
        };
      })()`,
      returnByValue: true
    });

    console.log('[Post-Close Assertions]', exitAudit.result.value);
    const post = exitAudit.result.value;
    if (post.overlayDisplay !== 'none') {
      throw new Error(`Assertion failed: closed overlay must have display: none, got ${post.overlayDisplay}`);
    }
    if (post.hasAriaModal || post.hasRole) {
      throw new Error('Assertion failed: closed overlay must not have role or aria-modal');
    }
    if (post.ariaHidden !== 'true') {
      throw new Error('Assertion failed: closed overlay must have aria-hidden="true"');
    }
    if (post.distanceFromBottom < 70) {
      throw new Error(`Assertion failed: mobile launcher must stay clear of bottom nav (>= 70px), got ${post.distanceFromBottom}px`);
    }
    if (!post.dropdownOpenAfterClose) {
      throw new Error('Assertion failed: profile dropdown must open cleanly after theater is closed');
    }

    console.log('Visual audit & assertions completed successfully across all viewports!');
  } finally {
    await send('Page.close');
    socket.close();
    server.close();
  }
}

runVisualVerification().catch(err => {
  console.error('Visual verification failed:', err);
  process.exit(1);
});
