import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const STORE_DIR = path.join(ROOT_DIR, 'store-assets');

// Helper to encode local image to Base64 data URI
function getBase64DataUri(relPath) {
  const fullPath = path.join(ROOT_DIR, relPath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`File not found: ${fullPath}`);
    return '';
  }
  const ext = path.extname(fullPath).toLowerCase();
  const mime = ext === '.png' ? 'image/png' : ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : ext === '.webp' ? 'image/webp' : 'application/octet-stream';
  return `data:${mime};base64,${fs.readFileSync(fullPath).toString('base64')}`;
}

const IMG_KOREAN_01 = getBase64DataUri('test/media/korean_01.webp'); // Pistachio Tweed jacket
const IMG_KOREAN_02 = getBase64DataUri('test/media/korean_02.webp'); // Doe eyes cream cashmere
const IMG_KOREAN_03 = getBase64DataUri('test/media/korean_03.webp'); // Double peace sky blue cardigan
const IMG_KOREAN_04 = getBase64DataUri('test/media/korean_04.webp'); // Campus curb cardigan
const IMG_KOREAN_05 = getBase64DataUri('test/media/korean_05.webp'); // Summer pink sundress

const ICONS = {
  play: `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.2" fill="currentColor" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg>`,
  pause: `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.2" fill="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`,
  chevronLeft: `<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`,
  chevronRight: `<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  shuffle: `<svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>`,
  download: `<svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  externalLink: `<svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
  info: `<svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
  close: `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  copy: `<svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
  check: `<svg viewBox="0 0 24 24" width="13" height="13" stroke="#38bdf8" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  film: `<svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>`,
  sparkles: `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>`,
  filmstrip: `<svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>`,
  zoomIn: `<svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>`,
  eye: `<svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  share: `<svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`
};

const COMMON_CSS = `
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width: 1280px;
    height: 800px;
    background: radial-gradient(circle at 50% -10%, rgba(56, 189, 248, 0.12) 0%, transparent 55%),
                radial-gradient(circle at 85% 95%, rgba(30, 58, 138, 0.1) 0%, transparent 45%),
                #07090e;
    color: #f8fafc;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", sans-serif;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    padding: 24px 36px 20px 36px;
    -webkit-font-smoothing: antialiased;
  }
  .bg-grid {
    position: absolute;
    inset: 0;
    background-image: linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
    background-size: 32px 32px;
    pointer-events: none;
    z-index: 0;
  }
  .header-banner {
    position: relative;
    z-index: 2;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .header-left {
    max-width: 860px;
  }
  .pill-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 3px 10px;
    border-radius: 9999px;
    background: rgba(56, 189, 248, 0.1);
    border: 1px solid rgba(56, 189, 248, 0.28);
    color: #38bdf8;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 6px;
  }
  .header-title {
    font-size: 26px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.025em;
    line-height: 1.15;
    margin-bottom: 4px;
  }
  .header-sub {
    font-size: 13.5px;
    color: #94a3b8;
    font-weight: 400;
    line-height: 1.4;
  }
  .header-logo-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(15, 23, 42, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 6px 14px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 600;
    color: #cbd5e1;
    backdrop-filter: blur(8px);
  }
  .header-logo-badge svg { color: #38bdf8; }
  
  /* Mock Window Container */
  .mock-window {
    position: relative;
    z-index: 2;
    flex: 1;
    background: #090b10;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 14px;
    box-shadow: 0 25px 60px -10px rgba(0, 0, 0, 0.8), 0 0 40px rgba(56, 189, 248, 0.06);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .window-topbar {
    height: 34px;
    background: rgba(15, 20, 32, 0.95);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 14px;
    font-size: 11px;
    color: #64748b;
  }
  .window-dots {
    display: flex;
    gap: 6px;
  }
  .dot { width: 10px; height: 10px; border-radius: 50%; }
  .dot-red { background: #ef4444; }
  .dot-yellow { background: #eab308; }
  .dot-green { background: #22c55e; }
  .window-url-pill {
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 6px;
    padding: 2px 14px;
    color: #94a3b8;
    font-size: 11px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .window-body {
    position: relative;
    flex: 1;
    overflow: hidden;
    background: #06080d;
  }
  
  /* Feature Callout Tag */
  .callout-tag {
    position: absolute;
    z-index: 20;
    background: rgba(15, 23, 42, 0.9);
    border: 1px solid rgba(56, 189, 248, 0.4);
    border-radius: 8px;
    padding: 6px 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6), 0 0 15px rgba(56, 189, 248, 0.15);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 600;
    color: #ffffff;
  }
  .callout-tag svg { color: #38bdf8; }
  .callout-sub { font-size: 11px; color: #94a3b8; font-weight: 400; margin-left: 2px; }
`;

// 1. Screenshot 1: 3-Panel Cinema Slideshow
function getSlide1Html() {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>
  ${COMMON_CSS}
  .theater-stage {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at 50% 50%, rgba(20, 35, 60, 0.45) 0%, #06080d 75%);
  }
  .stage-3panel {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 22px;
    width: 100%;
    height: 100%;
    padding: 20px 40px 70px 40px;
  }
  .flank-card {
    position: relative;
    width: 220px;
    height: 480px;
    border-radius: 12px;
    overflow: hidden;
    opacity: 0.42;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 15px 35px rgba(0,0,0,0.6);
    flex-shrink: 0;
  }
  .flank-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.7) blur(1px);
  }
  .flank-tag {
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0,0,0,0.7);
    border: 1px solid rgba(255,255,255,0.15);
    padding: 3px 10px;
    border-radius: 9999px;
    font-size: 10px;
    font-weight: 700;
    color: #cbd5e1;
    letter-spacing: 0.05em;
  }
  .hero-card {
    position: relative;
    height: 520px;
    width: 360px;
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid rgba(56, 189, 248, 0.3);
    box-shadow: 0 25px 60px rgba(0,0,0,0.9), 0 0 35px rgba(56, 189, 248, 0.2);
    flex-shrink: 0;
  }
  .hero-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .hero-glow {
    position: absolute;
    inset: -20px;
    background: radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, transparent 70%);
    filter: blur(25px);
    z-index: -1;
  }
  /* Top header bar */
  .top-header {
    position: absolute;
    top: 14px;
    left: 20px;
    right: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 10;
  }
  .top-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .counter-badge {
    background: rgba(13, 17, 28, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.12);
    padding: 5px 12px;
    border-radius: 9999px;
    font-size: 12px;
    font-weight: 700;
    color: #f8fafc;
  }
  .civitai-pill {
    background: rgba(56, 189, 248, 0.12);
    border: 1px solid rgba(56, 189, 248, 0.25);
    padding: 5px 12px;
    border-radius: 9999px;
    font-size: 12px;
    font-weight: 600;
    color: #38bdf8;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .top-right {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .top-btn {
    background: rgba(13, 17, 28, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.12);
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    color: #cbd5e1;
    display: flex;
    align-items: center;
    gap: 6px;
    backdrop-filter: blur(12px);
  }
  .top-btn-share {
    background: rgba(56, 189, 248, 0.15);
    border: 1px solid rgba(56, 189, 248, 0.4);
    color: #38bdf8;
    box-shadow: 0 0 15px rgba(56, 189, 248, 0.2);
  }
  .hd-badge {
    background: rgba(34, 197, 94, 0.15);
    border: 1px solid rgba(34, 197, 94, 0.35);
    color: #4ade80;
    font-size: 11px;
    font-weight: 700;
    padding: 4px 8px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  /* Floating Glass Dock */
  .vision-dock {
    position: absolute;
    bottom: 18px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(15, 20, 32, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 9999px;
    padding: 6px 16px;
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.8), 0 0 25px rgba(56, 189, 248, 0.1);
    backdrop-filter: blur(16px);
    z-index: 10;
  }
  .dock-btn {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #f8fafc;
  }
  .dock-btn-hero {
    background: #38bdf8;
    border: none;
    color: #090a0f;
    box-shadow: 0 4px 12px rgba(56, 189, 248, 0.4);
  }
  .dock-divider {
    width: 1px;
    height: 18px;
    background: rgba(255, 255, 255, 0.12);
  }
  .dock-speed-pills {
    display: flex;
    gap: 4px;
  }
  .speed-pill {
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 600;
    color: #94a3b8;
  }
  .speed-pill-active {
    background: rgba(56, 189, 248, 0.2);
    color: #38bdf8;
    border: 1px solid rgba(56, 189, 248, 0.35);
  }
  </style></head><body>
  <div class="bg-grid"></div>
  <div class="header-banner">
    <div class="header-left">
      <div class="pill-badge">CINEMA-GRADE PRESENTATION (v2.2 PRO)</div>
      <h1 class="header-title">3-Panel Widescreen Cinema Slideshow</h1>
      <p class="header-sub">Immersive fullscreen presentation with dynamic Before & After context flanks, ambient background glow, and true 2K/4K resolution elevation.</p>
    </div>
    <div class="header-logo-badge">
      ${ICONS.film}
      <span>Civitai Theater v2.2</span>
    </div>
  </div>
  <div class="mock-window">
    <div class="window-topbar">
      <div class="window-dots"><div class="dot dot-red"></div><div class="dot dot-yellow"></div><div class="dot dot-green"></div></div>
      <div class="window-url-pill">civitai.com/images/143353989 — Civitai Theater</div>
      <div>100% Client-Side</div>
    </div>
    <div class="window-body">
      <!-- Callouts -->
      <div class="callout-tag" style="top: 130px; left: 40px;">
        ${ICONS.sparkles}
        <div>Dynamic Context Flanks <span class="callout-sub">(Previous / Next preview)</span></div>
      </div>
      <div class="callout-tag" style="top: 70px; right: 260px;">
        ${ICONS.share}
        <div>Share via Decomfy <span class="callout-sub">(1-click universal link)</span></div>
      </div>
      <div class="callout-tag" style="bottom: 75px; left: 620px;">
        ${ICONS.play}
        <div>VisionOS Floating Glass Dock <span class="callout-sub">(Speed & hotkeys)</span></div>
      </div>

      <!-- Top Header -->
      <div class="top-header">
        <div class="top-left">
          <div class="counter-badge">1 / 48</div>
          <div class="civitai-pill">Civitai #143353989</div>
          <div class="hd-badge">${ICONS.sparkles} 4K UHD</div>
        </div>
        <div class="top-right">
          <div class="top-btn top-btn-share">${ICONS.share} Share via Decomfy</div>
          <div class="top-btn">${ICONS.sparkles} Specs (I)</div>
          <div class="top-btn">${ICONS.filmstrip} Filmstrip (T)</div>
          <div class="top-btn">${ICONS.download} Download</div>
          <div class="top-btn">${ICONS.close}</div>
        </div>
      </div>

      <!-- 3-Panel Stage -->
      <div class="theater-stage">
        <div class="stage-3panel">
          <div class="flank-card">
            <img src="${IMG_KOREAN_04}" alt="Previous artwork" />
            <div class="flank-tag">PREV (Left Arrow)</div>
          </div>
          <div class="hero-card">
            <div class="hero-glow"></div>
            <img src="${IMG_KOREAN_01}" alt="Hero artwork" />
          </div>
          <div class="flank-card">
            <img src="${IMG_KOREAN_02}" alt="Next artwork" />
            <div class="flank-tag">NEXT (Right Arrow)</div>
          </div>
        </div>
      </div>

      <!-- VisionOS Dock -->
      <div class="vision-dock">
        <div class="dock-btn">${ICONS.chevronLeft}</div>
        <div class="dock-btn dock-btn-hero">${ICONS.play}</div>
        <div class="dock-btn">${ICONS.chevronRight}</div>
        <div class="dock-divider"></div>
        <div class="dock-btn">${ICONS.shuffle}</div>
        <div class="dock-btn">${ICONS.eye}</div>
        <div class="dock-divider"></div>
        <div class="dock-speed-pills">
          <div class="speed-pill">3s</div>
          <div class="speed-pill speed-pill-active">5s</div>
          <div class="speed-pill">8s</div>
          <div class="speed-pill">Manual</div>
        </div>
      </div>
    </div>
  </div>
  </body></html>`;
}

// 2. Screenshot 2: 1-Click Sharing via Decomfy
function getSlide2Html() {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>
  ${COMMON_CSS}
  .theater-stage {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at 50% 50%, rgba(20, 35, 60, 0.45) 0%, #06080d 75%);
  }
  .stage-3panel {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 22px;
    width: 100%;
    height: 100%;
    padding: 20px 40px 70px 40px;
    opacity: 0.6;
    filter: blur(1px);
  }
  .hero-card {
    position: relative;
    height: 520px;
    width: 360px;
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.15);
  }
  .hero-card img { width: 100%; height: 100%; object-fit: cover; }
  
  /* Top Toast & HUD */
  .toast-hud {
    position: absolute;
    top: 70px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(13, 20, 35, 0.95);
    border: 1px solid rgba(56, 189, 248, 0.5);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.8), 0 0 30px rgba(56, 189, 248, 0.25);
    border-radius: 9999px;
    padding: 8px 24px;
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 25;
    font-size: 13px;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: 0.03em;
  }
  .toast-hud svg { color: #38bdf8; }
  
  /* Spotlight Share Bridge Card */
  .share-spotlight {
    position: absolute;
    top: 140px;
    left: 50%;
    transform: translateX(-50%);
    width: 780px;
    background: rgba(15, 23, 42, 0.95);
    border: 1px solid rgba(56, 189, 248, 0.4);
    border-radius: 18px;
    box-shadow: 0 30px 70px rgba(0,0,0,0.9), 0 0 50px rgba(56, 189, 248, 0.15);
    backdrop-filter: blur(20px);
    padding: 26px 32px;
    z-index: 20;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  .spotlight-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .spotlight-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 18px;
    font-weight: 800;
    color: #ffffff;
  }
  .spotlight-title svg { color: #38bdf8; }
  .badge-hotkey {
    background: rgba(56, 189, 248, 0.15);
    border: 1px solid rgba(56, 189, 248, 0.3);
    color: #38bdf8;
    font-size: 11px;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 6px;
  }
  .spotlight-url-box {
    background: #090d16;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 12px 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }
  .spotlight-url-text {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 12.5px;
    color: #38bdf8;
    white-space: nowrap;
    overflow: visible;
  }
  .btn-copied {
    background: #38bdf8;
    color: #090a0f;
    border: none;
    padding: 6px 14px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }
  .spotlight-features {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
  .spotlight-feature-item {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .feat-label { font-size: 12px; font-weight: 700; color: #f8fafc; }
  .feat-desc { font-size: 11px; color: #94a3b8; line-height: 1.3; }
  </style></head><body>
  <div class="bg-grid"></div>
  <div class="header-banner">
    <div class="header-left">
      <div class="pill-badge">UNIVERSAL ZERO-INSTALL SHARING</div>
      <h1 class="header-title">Share Any Civitai Album via Decomfy (Shift + C)</h1>
      <p class="header-sub">Generate 1-click shareable links. Recipients can watch full Civitai fullscreen slideshows directly on decomfy.com without installing any extension!</p>
    </div>
    <div class="header-logo-badge">
      ${ICONS.share}
      <span>Zero Extension Required</span>
    </div>
  </div>
  <div class="mock-window">
    <div class="window-topbar">
      <div class="window-dots"><div class="dot dot-red"></div><div class="dot dot-yellow"></div><div class="dot dot-green"></div></div>
      <div class="window-url-pill">decomfy.com/theater?url=https://civitai.com/images/143363839</div>
      <div>Instant Universal Playback</div>
    </div>
    <div class="window-body">
      <!-- Toast HUD -->
      <div class="toast-hud">
        ${ICONS.check}
        <span>DECOMFY SLIDESHOW LINK COPIED TO CLIPBOARD!</span>
      </div>

      <!-- Spotlight Card -->
      <div class="share-spotlight">
        <div class="spotlight-header">
          <div class="spotlight-title">
            ${ICONS.share}
            <span>Instant Web Slideshow Bridge</span>
          </div>
          <div class="badge-hotkey">Shift + C</div>
        </div>
        <div class="spotlight-url-box">
          <div class="spotlight-url-text">https://decomfy.com/theater?url=https://civitai.com/images/143363839</div>
          <div class="btn-copied">${ICONS.check} Copied</div>
        </div>
        <div class="spotlight-features">
          <div class="spotlight-feature-item">
            <div class="feat-label">Zero-Install Playback</div>
            <div class="feat-desc">Works on any browser, iOS, Android, and Desktop without plugins.</div>
          </div>
          <div class="spotlight-feature-item">
            <div class="feat-label">Preserves Album Context</div>
            <div class="feat-desc">Loads the full multi-image post album with smooth keyboard navigation.</div>
          </div>
          <div class="spotlight-feature-item">
            <div class="feat-label">Telemetry & LoRA Specs</div>
            <div class="feat-desc">Viewers can inspect positive prompts and download raw ComfyUI nodes.</div>
          </div>
        </div>
      </div>

      <!-- Background theater stage -->
      <div class="theater-stage">
        <div class="stage-3panel">
          <div class="hero-card" style="opacity: 0.35;"><img src="${IMG_KOREAN_01}"/></div>
          <div class="hero-card"><img src="${IMG_KOREAN_02}"/></div>
          <div class="hero-card" style="opacity: 0.35;"><img src="${IMG_KOREAN_03}"/></div>
        </div>
      </div>
    </div>
  </div>
  </body></html>`;
}

// 3. Screenshot 3: Generation Specs & LoRA Telemetry
function getSlide3Html() {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>
  ${COMMON_CSS}
  .stage-with-drawer {
    position: absolute;
    inset: 0;
    display: flex;
  }
  .stage-artwork {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at 40% 50%, rgba(20, 35, 60, 0.45) 0%, #06080d 80%);
    position: relative;
    padding: 20px 20px 60px 20px;
  }
  .stage-artwork .hero-card {
    height: 520px;
    width: 370px;
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 25px 60px rgba(0,0,0,0.9), 0 0 35px rgba(56, 189, 248, 0.15);
  }
  .stage-artwork .hero-card img { width: 100%; height: 100%; object-fit: cover; }
  
  /* Inspector Drawer */
  .inspector-drawer {
    width: 440px;
    background: rgba(13, 17, 28, 0.98);
    border-left: 1px solid rgba(255, 255, 255, 0.12);
    display: flex;
    flex-direction: column;
    padding: 16px 20px;
    gap: 12px;
    box-shadow: -15px 0 40px rgba(0,0,0,0.7);
    overflow-y: auto;
  }
  .drawer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
  .drawer-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 700;
    color: #ffffff;
  }
  .drawer-title svg { color: #38bdf8; }
  .drawer-tabs {
    display: flex;
    gap: 8px;
  }
  .tab-btn {
    padding: 4px 12px;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 600;
    color: #94a3b8;
    background: transparent;
    border: 1px solid transparent;
  }
  .tab-btn-active {
    background: rgba(56, 189, 248, 0.15);
    border: 1px solid rgba(56, 189, 248, 0.3);
    color: #38bdf8;
  }
  .drawer-card {
    background: rgba(255, 255, 255, 0.035);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .card-label {
    font-size: 10px;
    font-weight: 700;
    color: #94a3b8;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  .btn-copy-mini {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #cbd5e1;
    font-size: 10px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .card-text {
    font-size: 11.5px;
    color: #e2e8f0;
    line-height: 1.45;
  }
  .lora-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .lora-pill {
    background: rgba(56, 189, 248, 0.08);
    border: 1px solid rgba(56, 189, 248, 0.2);
    border-radius: 6px;
    padding: 4px 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 11px;
    color: #cbd5e1;
  }
  .lora-weight {
    background: rgba(56, 189, 248, 0.2);
    color: #38bdf8;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 700;
  }
  .specs-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
  }
  .spec-item {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 6px;
    padding: 6px 8px;
    font-size: 11px;
  }
  .spec-lbl { color: #64748b; font-size: 10px; margin-bottom: 2px; }
  .spec-val { color: #f8fafc; font-weight: 600; }
  .drawer-actions {
    display: flex;
    gap: 8px;
    margin-top: 4px;
  }
  .btn-decompile {
    flex: 1;
    background: #38bdf8;
    color: #090a0f;
    border: none;
    padding: 8px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }
  .btn-drawer-share {
    flex: 1;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #f8fafc;
    padding: 8px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }
  </style></head><body>
  <div class="bg-grid"></div>
  <div class="header-banner">
    <div class="header-left">
      <div class="pill-badge">METADATA & WORKFLOW REVERSE ENGINEERING</div>
      <h1 class="header-title">Full Generation Specs & LoRA Weights (I Key)</h1>
      <p class="header-sub">Inspect checkpoints, samplers, seeds, CFG scales, AutoV2 LoRA hashes, and 1-click decompile ComfyUI graphs on Decomfy Lab.</p>
    </div>
    <div class="header-logo-badge">
      ${ICONS.sparkles}
      <span>Telemetry Inspector</span>
    </div>
  </div>
  <div class="mock-window">
    <div class="window-topbar">
      <div class="window-dots"><div class="dot dot-red"></div><div class="dot dot-yellow"></div><div class="dot dot-green"></div></div>
      <div class="window-url-pill">civitai.com/images/143363839 — Generation Inspector</div>
      <div>Telemetry Active</div>
    </div>
    <div class="window-body">
      <div class="stage-with-drawer">
        <!-- Center Artwork -->
        <div class="stage-artwork">
          <div class="hero-card">
            <img src="${IMG_KOREAN_03}" alt="Portrait" />
          </div>
        </div>

        <!-- Inspector Drawer -->
        <div class="inspector-drawer">
          <div class="drawer-header">
            <div class="drawer-title">
              ${ICONS.sparkles}
              <span>Generation Specs</span>
            </div>
            <div class="drawer-tabs">
              <div class="tab-btn tab-btn-active">Telemetry</div>
              <div class="tab-btn">Shortcuts</div>
            </div>
          </div>

          <!-- Base Model -->
          <div class="drawer-card">
            <div class="card-label">BASE MODEL CHECKPOINT</div>
            <div style="font-size: 12px; font-weight: 700; color: #38bdf8;">Illustrious-XL-v1.0 (illustriousXL_v10.safetensors)</div>
          </div>

          <!-- Positive Prompt -->
          <div class="drawer-card">
            <div class="card-top">
              <div class="card-label">POSITIVE PROMPT</div>
              <div class="btn-copy-mini">${ICONS.copy} Copy</div>
            </div>
            <div class="card-text">cute 21yo charming Korean girl, translucent milky porcelain-white fair skin, sweet youthful smile, subtle aegyo-sal, expressive almond eyes, healthy rosy flushed cheeks, sky blue cardigan, botanical solarium cafe, soft diffuse lighting, 8k raw candid portrait</div>
          </div>

          <!-- LoRAs -->
          <div class="drawer-card">
            <div class="card-top">
              <div class="card-label">ACTIVE LORAS (2)</div>
              <div style="font-size: 10px; color: #38bdf8; font-weight: 700;">AUTOV2 HASHED</div>
            </div>
            <div class="lora-list">
              <div class="lora-pill">
                <span>korean_beauty_aesthetic_v2</span>
                <span class="lora-weight">0.85</span>
              </div>
              <div class="lora-pill">
                <span>cardigan_knitwear_lookbook_v1</span>
                <span class="lora-weight">0.70</span>
              </div>
            </div>
          </div>

          <!-- Technical Specs Grid -->
          <div class="specs-grid">
            <div class="spec-item"><div class="spec-lbl">SAMPLER</div><div class="spec-val">Euler a</div></div>
            <div class="spec-item"><div class="spec-lbl">STEPS</div><div class="spec-val">28</div></div>
            <div class="spec-item"><div class="spec-lbl">CFG SCALE</div><div class="spec-val">5.5</div></div>
            <div class="spec-item"><div class="spec-lbl">SEED</div><div class="spec-val">3849102847</div></div>
            <div class="spec-item"><div class="spec-lbl">SIZE</div><div class="spec-val">1024 x 1536</div></div>
            <div class="spec-item"><div class="spec-lbl">CLIP SKIP</div><div class="spec-val">2</div></div>
          </div>

          <!-- Actions -->
          <div class="drawer-actions">
            <div class="btn-decompile">${ICONS.externalLink} Decompile on Decomfy</div>
            <div class="btn-drawer-share">${ICONS.share} Share via Decomfy</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </body></html>`;
}

// 4. Screenshot 4: 4x Pan-Zoom & Filmstrip Scrubber
function getSlide4Html() {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>
  ${COMMON_CSS}
  .stage-zoomed {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #06080d;
    overflow: hidden;
  }
  .zoomed-image-box {
    position: relative;
    width: 650px;
    height: 720px;
    transform: scale(1.6) translateY(-40px);
    border-radius: 12px;
    overflow: hidden;
    cursor: grab;
  }
  .zoomed-image-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  /* Zoom HUD Badge */
  .zoom-hud-badge {
    position: absolute;
    top: 70px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(15, 23, 42, 0.9);
    border: 1px solid rgba(56, 189, 248, 0.45);
    border-radius: 9999px;
    padding: 6px 18px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 800;
    color: #38bdf8;
    box-shadow: 0 10px 25px rgba(0,0,0,0.8), 0 0 20px rgba(56, 189, 248, 0.2);
    z-index: 20;
  }
  
  /* Bottom Filmstrip Carousel */
  .filmstrip-container {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(10, 14, 24, 0.96);
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    padding: 12px 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    backdrop-filter: blur(20px);
    z-index: 20;
    box-shadow: 0 -10px 30px rgba(0,0,0,0.8);
  }
  .filmstrip-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 11px;
    color: #94a3b8;
  }
  .filmstrip-title {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 700;
    color: #f8fafc;
  }
  .filmstrip-title svg { color: #38bdf8; }
  .filmstrip-row {
    display: flex;
    align-items: center;
    gap: 12px;
    overflow: hidden;
  }
  .thumb-item {
    position: relative;
    width: 90px;
    height: 90px;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
    flex-shrink: 0;
    opacity: 0.65;
  }
  .thumb-item img { width: 100%; height: 100%; object-fit: cover; }
  .thumb-item-active {
    opacity: 1;
    border: 2px solid #38bdf8;
    box-shadow: 0 0 15px rgba(56, 189, 248, 0.4);
    transform: scale(1.05);
  }
  .thumb-item-active::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #38bdf8;
  }
  </style></head><body>
  <div class="bg-grid"></div>
  <div class="header-banner">
    <div class="header-left">
      <div class="pill-badge">DEEP PIXEL INSPECTION & BROWSING</div>
      <h1 class="header-title">Interactive 4x Pan-Zoom & Filmstrip Scrubber (T Key)</h1>
      <p class="header-sub">Scrub across 100+ album items with interactive thumbnails. Double-click or mouse-wheel to zoom up to 4x to inspect micro-textures and fine line art.</p>
    </div>
    <div class="header-logo-badge">
      ${ICONS.filmstrip}
      <span>Filmstrip Active</span>
    </div>
  </div>
  <div class="mock-window">
    <div class="window-topbar">
      <div class="window-dots"><div class="dot dot-red"></div><div class="dot dot-yellow"></div><div class="dot dot-green"></div></div>
      <div class="window-url-pill">civitai.com/images/143353989 — 200% Zoom & Filmstrip</div>
      <div>Pan & Zoom Active</div>
    </div>
    <div class="window-body">
      <!-- Callouts -->
      <div class="callout-tag" style="top: 130px; left: 60px;">
        ${ICONS.zoomIn}
        <div>Click & Drag to Pan <span class="callout-sub">(Inspect eyes & textures)</span></div>
      </div>
      <div class="callout-tag" style="bottom: 150px; right: 60px;">
        ${ICONS.filmstrip}
        <div>Filmstrip Scrubber <span class="callout-sub">(Jump directly to any slide)</span></div>
      </div>

      <!-- Zoom HUD -->
      <div class="zoom-hud-badge">
        ${ICONS.zoomIn}
        <span>200% ZOOM (DRAG TO PAN)</span>
      </div>

      <!-- Zoomed Stage -->
      <div class="stage-zoomed">
        <div class="zoomed-image-box">
          <img src="${IMG_KOREAN_01}" alt="Zoomed detail" />
        </div>
      </div>

      <!-- Bottom Filmstrip -->
      <div class="filmstrip-container">
        <div class="filmstrip-header">
          <div class="filmstrip-title">
            ${ICONS.filmstrip}
            <span>Album Scrubber (48 Artworks)</span>
          </div>
          <div>Press T to Toggle Filmstrip • Double-Click to Reset Zoom</div>
        </div>
        <div class="filmstrip-row">
          <div class="thumb-item"><img src="${IMG_KOREAN_04}"/></div>
          <div class="thumb-item"><img src="${IMG_KOREAN_05}"/></div>
          <div class="thumb-item thumb-item-active"><img src="${IMG_KOREAN_01}"/></div>
          <div class="thumb-item"><img src="${IMG_KOREAN_02}"/></div>
          <div class="thumb-item"><img src="${IMG_KOREAN_03}"/></div>
          <div class="thumb-item"><img src="${IMG_KOREAN_04}"/></div>
          <div class="thumb-item"><img src="${IMG_KOREAN_05}"/></div>
          <div class="thumb-item"><img src="${IMG_KOREAN_01}"/></div>
          <div class="thumb-item"><img src="${IMG_KOREAN_02}"/></div>
        </div>
      </div>
    </div>
  </div>
  </body></html>`;
}

// 5. Screenshot 5: Extension Toolbar Popup & Civitai Feed
function getSlide5Html() {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>
  ${COMMON_CSS}
  .civitai-feed-view {
    position: absolute;
    inset: 0;
    background: #141517;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .feed-topbar {
    height: 48px;
    background: #1a1b1e;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
  }
  .civitai-logo {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 800;
    color: #ffffff;
    font-size: 15px;
  }
  .feed-grid {
    padding: 18px 24px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    overflow: hidden;
  }
  .mock-card {
    background: #25262b;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 460px;
  }
  .card-media {
    width: 100%;
    height: 380px;
    overflow: hidden;
  }
  .card-media img { width: 100%; height: 100%; object-fit: cover; }
  .card-info {
    padding: 8px 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 11px;
    color: #94a3b8;
  }
  
  /* Floating Launcher Pill */
  .floating-launcher-pill {
    position: absolute;
    bottom: 24px;
    right: 28px;
    background: rgba(15, 23, 42, 0.95);
    border: 1px solid rgba(56, 189, 248, 0.4);
    box-shadow: 0 15px 35px rgba(0,0,0,0.8), 0 0 25px rgba(56, 189, 248, 0.2);
    border-radius: 9999px;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 700;
    color: #ffffff;
    z-index: 10;
  }
  .floating-launcher-pill svg { color: #38bdf8; }
  .hotkey-badge {
    background: rgba(255,255,255,0.1);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 10px;
    color: #94a3b8;
  }
  
  /* Extension Toolbar Popup */
  .extension-popup-card {
    position: absolute;
    top: 54px;
    right: 24px;
    width: 310px;
    background: rgba(13, 17, 28, 0.98);
    border: 1px solid rgba(56, 189, 248, 0.35);
    border-radius: 14px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-shadow: 0 25px 50px rgba(0,0,0,0.8), 0 0 35px rgba(56, 189, 248, 0.15);
    backdrop-filter: blur(20px);
    z-index: 30;
  }
  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    padding-bottom: 10px;
  }
  .popup-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 700;
    color: #ffffff;
  }
  .popup-title svg { color: #38bdf8; }
  .popup-status {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 10px;
    color: #4ade80;
    font-weight: 600;
  }
  .status-dot { width: 6px; height: 6px; border-radius: 50%; background: #4ade80; }
  .popup-count-box {
    background: rgba(56, 189, 248, 0.08);
    border: 1px solid rgba(56, 189, 248, 0.2);
    border-radius: 8px;
    padding: 8px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .popup-count-num { font-size: 14px; font-weight: 800; color: #38bdf8; }
  .popup-btn-launch {
    background: #38bdf8;
    color: #090a0f;
    border: none;
    border-radius: 8px;
    padding: 9px;
    font-size: 12px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }
  .popup-btn-share {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    color: #f8fafc;
    border-radius: 8px;
    padding: 8px;
    font-size: 11.5px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }
  .popup-shortcuts {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
    font-size: 10px;
    color: #94a3b8;
    padding-top: 6px;
    border-top: 1px solid rgba(255,255,255,0.06);
  }
  </style></head><body>
  <div class="bg-grid"></div>
  <div class="header-banner">
    <div class="header-left">
      <div class="pill-badge">SEAMLESS BROWSER INTEGRATION</div>
      <h1 class="header-title">Instant Extension Popup & Infinite Feed Scanner</h1>
      <p class="header-sub">Launch directly from the extension popup, floating launcher pill, or press Alt + S anywhere on Civitai. Automatically harvests feed images as you browse.</p>
    </div>
    <div class="header-logo-badge">
      ${ICONS.film}
      <span>1-Click Launch</span>
    </div>
  </div>
  <div class="mock-window">
    <div class="window-topbar">
      <div class="window-dots"><div class="dot dot-red"></div><div class="dot dot-yellow"></div><div class="dot dot-green"></div></div>
      <div class="window-url-pill">civitai.com/images — Feed View with Extension Popup</div>
      <div>Auto-Harvest Active</div>
    </div>
    <div class="window-body">
      <!-- Callouts -->
      <div class="callout-tag" style="bottom: 80px; right: 280px;">
        ${ICONS.film}
        <div>Floating Launcher Pill <span class="callout-sub">(Alt + S to open)</span></div>
      </div>
      <div class="callout-tag" style="top: 140px; right: 350px;">
        ${ICONS.sparkles}
        <div>Extension Toolbar Popup <span class="callout-sub">(Instant status & controls)</span></div>
      </div>

      <!-- Feed Container -->
      <div class="civitai-feed-view">
        <div class="feed-topbar">
          <div class="civitai-logo">CIVITAI EXPLORE</div>
          <div style="font-size: 12px; color: #94a3b8;">Trending Images (48 Loaded)</div>
        </div>
        <div class="feed-grid">
          <div class="mock-card">
            <div class="card-media"><img src="${IMG_KOREAN_01}"/></div>
            <div class="card-info"><span>@salttaro</span><span>1.4k likes</span></div>
          </div>
          <div class="mock-card">
            <div class="card-media"><img src="${IMG_KOREAN_02}"/></div>
            <div class="card-info"><span>@freya_art</span><span>2.8k likes</span></div>
          </div>
          <div class="mock-card">
            <div class="card-media"><img src="${IMG_KOREAN_03}"/></div>
            <div class="card-info"><span>@korean_lookbook</span><span>3.2k likes</span></div>
          </div>
          <div class="mock-card">
            <div class="card-media"><img src="${IMG_KOREAN_04}"/></div>
            <div class="card-info"><span>@solarium_master</span><span>980 likes</span></div>
          </div>
        </div>
      </div>

      <!-- Floating Launcher -->
      <div class="floating-launcher-pill">
        ${ICONS.film}
        <span>Theater</span>
        <span class="hotkey-badge">Alt + S</span>
      </div>

      <!-- Extension Popup Dropdown -->
      <div class="extension-popup-card">
        <div class="popup-header">
          <div class="popup-title">
            ${ICONS.film}
            <span>Civitai Theater v2.2</span>
          </div>
          <div class="popup-status"><div class="status-dot"></div> Active</div>
        </div>
        <div class="popup-count-box">
          <span style="font-size: 11px; color: #cbd5e1;">Artworks In View</span>
          <span class="popup-count-num">48 Items</span>
        </div>
        <div class="popup-btn-launch">
          ${ICONS.play}
          <span>Launch Fullscreen (Space)</span>
        </div>
        <div class="popup-btn-share">
          ${ICONS.share}
          <span>Share via Decomfy (Shift+C)</span>
        </div>
        <div class="popup-shortcuts">
          <div><code>Alt + S</code> Launch</div>
          <div><code>Shift + C</code> Share</div>
          <div><code>I</code> Specs</div>
          <div><code>T</code> Filmstrip</div>
        </div>
      </div>
    </div>
  </div>
  </body></html>`;
}

// 6. Marquee Tile (1400x560)
function getMarqueeHtml() {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width: 1400px;
    height: 560px;
    background: radial-gradient(circle at 65% 45%, #0e172a 0%, #030712 100%);
    color: #f8fafc;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", sans-serif;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 80px;
    position: relative;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
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
    z-index: 2;
    max-width: 680px;
  }
  .pill-pro {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(56, 189, 248, 0.12);
    border: 1px solid rgba(56, 189, 248, 0.3);
    color: #38bdf8;
    font-size: 12px;
    font-weight: 700;
    padding: 5px 12px;
    border-radius: 9999px;
    margin-bottom: 16px;
    letter-spacing: 0.05em;
  }
  h1 {
    font-size: 48px;
    font-weight: 900;
    letter-spacing: -0.03em;
    color: #ffffff;
    line-height: 1.1;
    margin-bottom: 14px;
  }
  p {
    font-size: 17px;
    line-height: 1.55;
    color: #94a3b8;
    margin-bottom: 24px;
  }
  .feature-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .tag {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 12px;
    color: #e2e8f0;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .tag svg { color: #38bdf8; }
  
  /* Right Visual Mockup */
  .right-mockup {
    position: relative;
    z-index: 2;
    width: 520px;
    height: 460px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .card-mockup-behind {
    position: absolute;
    width: 280px;
    height: 380px;
    left: 20px;
    border-radius: 14px;
    overflow: hidden;
    opacity: 0.35;
    filter: blur(1px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  .card-mockup-behind img { width: 100%; height: 100%; object-fit: cover; }
  .card-mockup {
    position: relative;
    z-index: 2;
    width: 320px;
    height: 440px;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid rgba(56, 189, 248, 0.35);
    box-shadow: 0 30px 70px rgba(0,0,0,0.9), 0 0 50px rgba(56, 189, 248, 0.2);
  }
  .card-mockup img { width: 100%; height: 100%; object-fit: cover; }
  .card-dock-overlay {
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(15, 23, 42, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 9999px;
    padding: 6px 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.8);
    backdrop-filter: blur(12px);
  }
  .pill-share-floating {
    position: absolute;
    top: 24px;
    right: 10px;
    z-index: 3;
    background: rgba(15, 23, 42, 0.95);
    border: 1px solid rgba(56, 189, 248, 0.4);
    box-shadow: 0 15px 35px rgba(0,0,0,0.8);
    border-radius: 10px;
    padding: 8px 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 700;
    color: #ffffff;
  }
  .pill-share-floating svg { color: #38bdf8; }
  </style></head><body>
  <div class="grid-pattern"></div>
  <div class="content-left">
    <div class="pill-pro">CINEMA-GRADE PRESENTATION (v2.2 PRO)</div>
    <h1>Civitai Theater</h1>
    <p>Transform scattered Civitai masonry feeds into an ultra-smooth 4K fullscreen slideshow with 3-panel widescreen view, prompt telemetry, and 1-click Decomfy sharing.</p>
    <div class="feature-tags">
      <div class="tag">${ICONS.sparkles} 3-Panel Widescreen</div>
      <div class="tag">${ICONS.share} Share via Decomfy (Shift+C)</div>
      <div class="tag">${ICONS.sparkles} AutoV2 LoRA Telemetry</div>
      <div class="tag">${ICONS.zoomIn} 4x Pan & Zoom</div>
      <div class="tag">${ICONS.filmstrip} Filmstrip Scrubber</div>
    </div>
  </div>
  <div class="right-mockup">
    <div class="card-mockup-behind">
      <img src="${IMG_KOREAN_04}" alt="Flank" />
    </div>
    <div class="card-mockup">
      <img src="${IMG_KOREAN_01}" alt="Hero" />
      <div class="card-dock-overlay">
        <div style="color: #38bdf8;">${ICONS.play}</div>
        <span style="font-size: 11px; font-weight: 700;">Playing (5s)</span>
      </div>
    </div>
    <div class="pill-share-floating">
      ${ICONS.share}
      <span>Share via Decomfy</span>
    </div>
  </div>
  </body></html>`;
}

// 7. Small Promo Tile (440x280)
function getPromoHtml() {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width: 440px;
    height: 280px;
    background: radial-gradient(circle at 50% 30%, #0e172a 0%, #030712 100%);
    color: #f8fafc;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.1);
    -webkit-font-smoothing: antialiased;
  }
  .grid-pattern {
    position: absolute;
    inset: 0;
    background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 20px 20px;
  }
  .badge {
    position: absolute;
    top: 14px;
    right: 14px;
    background: rgba(56, 189, 248, 0.15);
    border: 1px solid rgba(56, 189, 248, 0.35);
    color: #38bdf8;
    font-size: 10px;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 9999px;
    letter-spacing: 0.05em;
  }
  .icon-box {
    position: relative;
    z-index: 1;
    width: 68px;
    height: 68px;
    background: rgba(15, 23, 42, 0.9);
    border: 1px solid rgba(56, 189, 248, 0.45);
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
    box-shadow: 0 12px 30px -4px rgba(56, 189, 248, 0.3);
  }
  .icon-box svg { color: #38bdf8; width: 34px; height: 34px; }
  h1 {
    position: relative;
    z-index: 1;
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #ffffff;
    margin-bottom: 4px;
  }
  p {
    position: relative;
    z-index: 1;
    font-size: 13px;
    color: #94a3b8;
    font-weight: 500;
    margin-bottom: 12px;
  }
  .feature-pills {
    position: relative;
    z-index: 1;
    display: flex;
    gap: 6px;
  }
  .pill {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 3px 8px;
    border-radius: 6px;
    font-size: 10px;
    color: #cbd5e1;
    font-weight: 600;
  }
  </style></head><body>
  <div class="grid-pattern"></div>
  <div class="badge">v2.2 PRO</div>
  <div class="icon-box">
    <svg viewBox="0 0 24 24" width="34" height="34" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="6 3 20 12 6 21 6 3" fill="rgba(56, 189, 248, 0.25)"/>
    </svg>
  </div>
  <h1>Civitai Theater</h1>
  <p>Fullscreen Slideshow & Decomfy Sharing</p>
  <div class="feature-pills">
    <div class="pill">4K Cinema</div>
    <div class="pill">LoRA Specs</div>
    <div class="pill">1-Click Share</div>
  </div>
  </body></html>`;
}

// Master execution runner via Chrome CDP
async function main() {
  console.log('[*] Connecting to Chrome CDP on port 9222...');
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
        if (data.error) {
          console.error(`[CDP Error ${data.id}]:`, data.error);
        }
        pending.get(data.id)(data.result || {});
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
    await new Promise(r => setTimeout(r, 600));
    const snap = await send('Page.captureScreenshot', { format: 'png' });
    if (!snap || !snap.data) {
      throw new Error(`captureScreenshot returned no data for ${outPath}: ${JSON.stringify(snap)}`);
    }
    fs.writeFileSync(outPath, Buffer.from(snap.data, 'base64'));
    const stats = fs.statSync(outPath);
    console.log(`[✓] Saved: ${path.basename(outPath)} (${width}x${height}, ${(stats.size / 1024).toFixed(1)} KB)`);
  }

  const tempHtmlPath = path.join(ROOT_DIR, 'test/temp_showcase.html');

  try {
    await send('Page.enable');
    await send('Runtime.enable');

    const tasks = [
      {
        name: 'screenshot_1_theater_1280x800.png',
        html: getSlide1Html(),
        w: 1280,
        h: 800
      },
      {
        name: 'screenshot_2_share_decomfy_1280x800.png',
        html: getSlide2Html(),
        w: 1280,
        h: 800
      },
      {
        name: 'screenshot_3_specs_1280x800.png',
        html: getSlide3Html(),
        w: 1280,
        h: 800
      },
      {
        name: 'screenshot_4_filmstrip_zoom_1280x800.png',
        html: getSlide4Html(),
        w: 1280,
        h: 800
      },
      {
        name: 'screenshot_5_feed_popup_1280x800.png',
        html: getSlide5Html(),
        w: 1280,
        h: 800
      },
      {
        name: 'marquee_tile_1400x560.png',
        html: getMarqueeHtml(),
        w: 1400,
        h: 560
      },
      {
        name: 'promo_tile_440x280.png',
        html: getPromoHtml(),
        w: 440,
        h: 280
      }
    ];

    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      console.log(`[${i + 1}/${tasks.length}] Rendering ${task.name}...`);
      fs.writeFileSync(tempHtmlPath, task.html, 'utf8');
      await send('Page.navigate', {
        url: `file://${tempHtmlPath}`
      });
      await new Promise(r => setTimeout(r, 600));
      await capture(path.join(STORE_DIR, task.name), task.w, task.h);
    }

    if (fs.existsSync(tempHtmlPath)) {
      fs.unlinkSync(tempHtmlPath);
    }

    console.log('\n[🎉] All Chrome Web Store showcase screenshots and promotional tiles rendered successfully!');
  } finally {
    socket.close();
    await fetch(`http://localhost:9222/json/close/${pageId}`);
  }
}

main().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
