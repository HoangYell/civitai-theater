// Civitai Theater - Chrome Extension Content Script (v2.1.1 Pro)
// Built for Civitai.com and Civitai.red

(function () {
  'use strict';

  if (window.__CIVITAI_THEATER_INITIALIZED__) return;
  window.__CIVITAI_THEATER_INITIALIZED__ = true;

  // --- 100% Vector Lucide SVGs (Zero Raw Emojis) ---
  const ICONS = {
    play: `<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.2" fill="currentColor" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg>`,
    pause: `<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.2" fill="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`,
    chevronLeft: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`,
    chevronRight: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
    shuffle: `<svg viewBox="0 0 24 24" width="17" height="17" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>`,
    maximize: `<svg viewBox="0 0 24 24" width="17" height="17" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>`,
    minimize: `<svg viewBox="0 0 24 24" width="17" height="17" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="3" y1="21" x2="10" y2="14"/></svg>`,
    volume2: `<svg viewBox="0 0 24 24" width="17" height="17" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`,
    volumeX: `<svg viewBox="0 0 24 24" width="17" height="17" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`,
    download: `<svg viewBox="0 0 24 24" width="17" height="17" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
    externalLink: `<svg viewBox="0 0 24 24" width="17" height="17" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
    info: `<svg viewBox="0 0 24 24" width="17" height="17" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
    close: `<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    copy: `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
    check: `<svg viewBox="0 0 24 24" width="14" height="14" stroke="#38bdf8" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    film: `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>`,
    sparkles: `<svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>`,
    filmstrip: `<svg viewBox="0 0 24 24" width="17" height="17" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>`,
    zoomIn: `<svg viewBox="0 0 24 24" width="17" height="17" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>`,
    eye: `<svg viewBox="0 0 24 24" width="17" height="17" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
    loader: `<svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>`
  };

  // --- Apple VisionOS & Linear Minimalist Stylesheet ---
  const STYLES = `
    :root {
      --ct-bg: #06080d;
      --ct-surface: rgba(13, 17, 28, 0.72);
      --ct-surface-card: rgba(18, 24, 38, 0.65);
      --ct-border: rgba(255, 255, 255, 0.09);
      --ct-border-hover: rgba(255, 255, 255, 0.22);
      --ct-text: #f8fafc;
      --ct-text-muted: #94a3b8;
      --ct-text-dim: #64748b;
      --ct-accent: #38bdf8;
      --ct-accent-glow: rgba(56, 189, 248, 0.35);
      --ct-font: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, Helvetica, sans-serif;
      --ct-mono: "SF Mono", Monaco, Consolas, "Liberation Mono", Courier, monospace;
    }

    /* Screen lock during active theater */
    html.ct-open-locked, body.ct-open-locked {
      overflow: hidden !important;
      scrollbar-width: none !important;
    }
    html.ct-open-locked::-webkit-scrollbar, body.ct-open-locked::-webkit-scrollbar {
      display: none !important;
    }

    /* Floating Launcher Button on Civitai Feed */
    #ct-launcher-btn {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 999990;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 18px;
      background: rgba(10, 15, 26, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 9999px;
      color: #f8fafc;
      font-family: var(--ct-font);
      font-size: 13px;
      font-weight: 600;
      letter-spacing: -0.015em;
      cursor: pointer;
      box-shadow: 0 20px 35px -8px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(24px) saturate(180%);
      -webkit-backdrop-filter: blur(24px) saturate(180%);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    #ct-launcher-btn:hover {
      background: rgba(17, 24, 39, 0.95);
      border-color: rgba(56, 189, 248, 0.4);
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 24px 40px -10px rgba(0, 0, 0, 0.8), 0 0 20px var(--ct-accent-glow);
    }
    #ct-launcher-btn:active {
      transform: translateY(0) scale(0.98);
    }
    #ct-launcher-btn svg {
      color: var(--ct-accent);
      flex-shrink: 0;
    }
    .ct-source-tag, .ct-badge {
      display: inline-flex;
      align-items: center;
      padding: 2px 8px;
      border-radius: 9999px;
      background: rgba(56, 189, 248, 0.15);
      border: 1px solid rgba(56, 189, 248, 0.3);
      color: var(--ct-accent);
      font-size: 11px;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.04em;
    }

    /* Main Theater Overlay Container */
    #ct-overlay {
      position: fixed;
      inset: 0;
      z-index: 9999999;
      background: var(--ct-bg);
      color: var(--ct-text);
      font-family: var(--ct-font);
      display: none !important;
      visibility: hidden !important;
      opacity: 0;
      pointer-events: none !important;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      user-select: none;
      -webkit-user-select: none;
      transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    #ct-overlay.ct-active {
      display: flex !important;
      visibility: visible !important;
      opacity: 1;
      pointer-events: auto !important;
    }

    /* Dynamic Multi-Layer Ambient Glow Canvas */
    .ct-ambient-glow {
      position: absolute;
      inset: -50px;
      background-size: cover;
      background-position: center;
      filter: blur(24px) brightness(0.25) saturate(1.3);
      opacity: 0.8;
      transform: scale(1.08);
      z-index: 0;
      pointer-events: none;
    }
    .ct-vignette {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at center, transparent 40%, rgba(6, 8, 13, 0.88) 100%);
      z-index: 1;
      pointer-events: none;
    }

    /* Media Presentation Stage */
    .ct-stage {
      position: relative;
      z-index: 2;
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: default;
      overflow: hidden;
      gap: 0;
    }
    .ct-media-canvas {
      position: relative;
      z-index: 5;
      max-width: 100vw;
      max-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 auto;
      transition: transform 0.15s ease-out;
      will-change: transform;
    }
    /* Guarantee 100% Full Height for portrait / tall media */
    .ct-media-canvas.ct-tall-media {
      height: 100vh;
      max-height: 100vh;
      width: auto;
      max-width: 100vw;
    }
    .ct-media-canvas.ct-tall-media .ct-media-img,
    .ct-media-canvas.ct-tall-media .ct-media-video {
      height: 100vh;
      max-height: 100vh;
      width: auto;
      max-width: 100vw;
      object-fit: contain;
    }
    /* Guarantee 100% Full Width for landscape / wide media */
    .ct-media-canvas.ct-wide-media {
      width: 100vw;
      max-width: 100vw;
      height: auto;
      max-height: 100vh;
    }
    .ct-media-canvas.ct-wide-media .ct-media-img,
    .ct-media-canvas.ct-wide-media .ct-media-video {
      width: 100vw;
      max-width: 100vw;
      height: auto;
      max-height: 100vh;
      object-fit: contain;
    }
    .ct-media-img {
      max-width: 100vw;
      max-height: 100vh;
      width: auto;
      height: auto;
      object-fit: contain;
      border-radius: 4px;
      display: block;
      box-shadow: 0 35px 80px -10px rgba(0, 0, 0, 0.95);
      opacity: 0;
      transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .ct-media-img.ct-loaded {
      opacity: 1;
    }
    .ct-media-img.ct-thumbnail-preview {
      position: absolute;
      inset: 0;
      margin: auto;
      width: 100%;
      height: 100%;
      object-fit: contain;
      filter: blur(10px);
      transform: scale(0.98);
      opacity: 0.75;
      z-index: 1;
      transition: opacity 0.4s ease;
    }
    .ct-media-video {
      max-width: 100vw;
      max-height: 100vh;
      width: auto;
      height: auto;
      object-fit: contain;
      border-radius: 4px;
      display: block;
      box-shadow: 0 35px 80px -10px rgba(0, 0, 0, 0.95);
    }
    .ct-stage-loader {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 15;
      pointer-events: none;
      opacity: 0;
      color: var(--ct-accent);
      transition: opacity 0.2s ease;
    }
    .ct-stage-loader.ct-visible {
      opacity: 1;
    }
    .ct-stage-loader svg {
      animation: ct-spin 0.85s linear infinite;
    }
    @keyframes ct-spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    /* Widescreen Cinema Flanks (Before & After Preview) */
    .ct-flank {
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 4;
      flex: 1 1 0;
      min-width: 0;
      height: 100vh;
      padding: 0 16px;
      box-sizing: border-box;
      overflow: hidden;
      cursor: pointer;
      user-select: none;
      -webkit-user-select: none;
      transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .ct-flank-prev {
      order: 1;
    }
    .ct-media-canvas {
      order: 2;
    }
    .ct-flank-next {
      order: 3;
    }
    @media (min-width: 1024px) {
      .ct-stage.ct-has-flanks .ct-flank {
        display: flex;
      }
    }
    .ct-flank-preview {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .ct-flank-img {
      max-height: calc(100vh - 80px);
      max-width: 90%;
      width: auto;
      height: auto;
      object-fit: contain;
      border-radius: 8px;
      box-shadow: 0 20px 45px rgba(0, 0, 0, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.08);
      opacity: 0.38;
      filter: brightness(0.65) contrast(0.95);
      transform: scale(0.92);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      will-change: transform, opacity, filter;
    }
    .ct-flank:hover .ct-flank-img {
      opacity: 0.92;
      filter: brightness(1.05) contrast(1.02);
      transform: scale(0.96);
      border-color: rgba(56, 189, 248, 0.4);
      box-shadow: 0 30px 70px rgba(0, 0, 0, 0.95), 0 0 25px rgba(56, 189, 248, 0.25);
    }
    .ct-flank-badge {
      position: absolute;
      bottom: 28px;
      left: 50%;
      transform: translateX(-50%);
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 14px;
      border-radius: 9999px;
      background: rgba(15, 23, 42, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: var(--ct-text-muted);
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.03em;
      opacity: 0.7;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      transition: all 0.25s ease;
      z-index: 2;
      pointer-events: none;
    }
    .ct-flank-badge svg {
      color: var(--ct-accent);
      flex-shrink: 0;
    }
    .ct-flank:hover .ct-flank-badge {
      opacity: 1;
      color: #f8fafc;
      border-color: rgba(56, 189, 248, 0.4);
      background: rgba(15, 23, 42, 0.9);
      transform: translateX(-50%) translateY(-2px);
    }

    /* Hide flanks during Zoom, Inspector, or Zen */
    .ct-stage.ct-stage-zoomed .ct-flank {
      opacity: 0 !important;
      pointer-events: none !important;
      transform: scale(0.8);
    }
    .ct-overlay.ct-inspector-open .ct-flank {
      display: none !important;
    }
    .ct-hud-hidden .ct-flank-badge {
      opacity: 0 !important;
      pointer-events: none !important;
    }
    .ct-overlay.ct-filmstrip-open .ct-flank {
      height: calc(100vh - 220px);
    }
    .ct-overlay.ct-filmstrip-open .ct-flank-img {
      max-height: 100%;
    }

    /* Zoom Indicator Pill */
    .ct-zoom-hud {
      position: absolute;
      top: 64px;
      right: 24px;
      z-index: 12;
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      background: rgba(10, 14, 23, 0.7);
      border: 1px solid var(--ct-border);
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 600;
      color: var(--ct-text-muted);
      backdrop-filter: blur(16px);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease, transform 0.2s ease;
    }
    .ct-zoom-hud.ct-visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* Click Targets for Left / Right Slide Navigation */
    .ct-hit-prev, .ct-hit-next {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 20%;
      z-index: 3;
      cursor: pointer;
    }
    .ct-hit-prev { left: 0; }
    .ct-hit-next { right: 0; }

    /* Floating Side Navigation Arrows */
    .ct-edge-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 6;
      width: 46px;
      height: 46px;
      border-radius: 9999px;
      background: rgba(12, 16, 26, 0.6);
      border: 1px solid var(--ct-border);
      color: #f1f5f9;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      box-shadow: 0 12px 25px -4px rgba(0, 0, 0, 0.6);
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      opacity: 0.55;
    }
    .ct-edge-arrow:hover {
      opacity: 1;
      background: rgba(18, 24, 38, 0.9);
      border-color: rgba(255, 255, 255, 0.25);
      transform: translateY(-50%) scale(1.08);
      box-shadow: 0 16px 30px -4px rgba(0, 0, 0, 0.7);
    }
    .ct-edge-arrow.ct-prev { left: 24px; }
    .ct-edge-arrow.ct-next { right: 24px; }

    /* Top Timeline & Brand Header */
    .ct-top-header {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 10;
      display: flex;
      flex-direction: column;
      transition: opacity 0.35s ease, transform 0.35s ease;
    }
    .ct-progress-track {
      width: 100%;
      height: 2px;
      background: rgba(255, 255, 255, 0.06);
      position: relative;
    }
    .ct-progress-fill {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, #0284c7 0%, #38bdf8 100%);
      box-shadow: 0 0 10px var(--ct-accent-glow);
      transition: width 0.08s linear;
    }
    .ct-top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 24px;
      background: linear-gradient(180deg, rgba(6, 8, 13, 0.9) 0%, rgba(6, 8, 13, 0) 100%);
    }
    .ct-brand-meta {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: -0.015em;
      color: #f1f5f9;
    }
    .ct-brand-meta svg {
      color: var(--ct-accent);
    }
    .ct-counter-pill {
      font-size: 12px;
      font-variant-numeric: tabular-nums;
      color: var(--ct-text-muted);
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid var(--ct-border);
      padding: 3px 10px;
      border-radius: 9999px;
    }
    .ct-quality-tag {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.05em;
      padding: 2px 7px;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid var(--ct-border);
      color: #cbd5e1;
    }
    .ct-civitai-pill {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 11px;
      font-weight: 600;
      color: #38bdf8;
      background: rgba(56, 189, 248, 0.12);
      border: 1px solid rgba(56, 189, 248, 0.3);
      padding: 2px 8px;
      border-radius: 9999px;
      text-decoration: none;
      transition: all 0.18s ease;
      cursor: pointer;
    }
    .ct-civitai-pill svg {
      flex-shrink: 0;
    }
    .ct-civitai-pill span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .ct-civitai-pill:hover {
      background: rgba(56, 189, 248, 0.22);
      border-color: rgba(56, 189, 248, 0.5);
      color: #7dd3fc;
      transform: translateY(-1px);
    }
    .ct-top-actions {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    /* VisionOS-Style Floating Bottom Control Dock */
    .ct-dock {
      position: absolute;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 10;
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 6px 10px;
      background: var(--ct-surface);
      border: 1px solid var(--ct-border);
      border-radius: 9999px;
      box-shadow: 0 25px 45px -10px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.12);
      backdrop-filter: blur(28px) saturate(180%);
      -webkit-backdrop-filter: blur(28px) saturate(180%);
      transition: opacity 0.35s ease, transform 0.35s ease;
    }
    .ct-dock-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      border-radius: 9999px;
      background: transparent;
      border: none;
      color: #cbd5e1;
      cursor: pointer;
      position: relative;
      transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
      outline: none;
    }
    .ct-dock-btn:hover {
      background: rgba(255, 255, 255, 0.09);
      color: #ffffff;
      transform: scale(1.04);
    }
    .ct-dock-btn:active {
      transform: scale(0.92);
    }
    .ct-dock-btn.ct-active {
      color: var(--ct-accent);
      background: rgba(56, 189, 248, 0.15);
      border: 1px solid rgba(56, 189, 248, 0.3);
    }
    .ct-dock-btn.ct-hero-play {
      background: #f8fafc;
      color: #06080d;
      box-shadow: 0 4px 14px rgba(255, 255, 255, 0.2);
    }
    .ct-dock-btn.ct-hero-play:hover {
      background: #ffffff;
      transform: scale(1.08);
      box-shadow: 0 6px 20px rgba(255, 255, 255, 0.3);
    }
    .ct-dock-divider {
      width: 1px;
      height: 22px;
      background: var(--ct-border);
      margin: 0 4px;
    }

    /* Speed Scrubber Selector */
    .ct-speed-group {
      display: flex;
      align-items: center;
      gap: 2px;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 9999px;
      padding: 3px;
    }
    .ct-speed-item {
      background: transparent;
      border: none;
      color: var(--ct-text-dim);
      font-size: 11px;
      font-weight: 600;
      padding: 4px 9px;
      border-radius: 9999px;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .ct-speed-item:hover {
      color: #f1f5f9;
    }
    .ct-speed-item.ct-selected {
      background: rgba(255, 255, 255, 0.14);
      color: #ffffff;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
    }

    /* Collapsible Bottom Filmstrip Carousel */
    .ct-filmstrip {
      position: absolute;
      bottom: 84px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      z-index: 9;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 14px;
      max-width: 85vw;
      overflow-x: auto;
      scrollbar-width: none;
      background: var(--ct-surface);
      border: 1px solid var(--ct-border);
      border-radius: 14px;
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.7);
      opacity: 0;
      pointer-events: none;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .ct-filmstrip::-webkit-scrollbar { display: none; }
    .ct-filmstrip.ct-open {
      opacity: 1;
      pointer-events: auto;
      transform: translateX(-50%) translateY(0);
    }
    .ct-thumb-card {
      position: relative;
      width: 58px;
      height: 58px;
      border-radius: 8px;
      overflow: hidden;
      flex-shrink: 0;
      border: 1px solid transparent;
      cursor: pointer;
      opacity: 0.6;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .ct-thumb-card img, .ct-thumb-card video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .ct-thumb-card:hover {
      opacity: 0.9;
      transform: scale(1.05);
    }
    .ct-thumb-card.ct-active {
      opacity: 1;
      border-color: var(--ct-accent);
      box-shadow: 0 0 12px var(--ct-accent-glow);
      transform: scale(1.1);
    }

    /* Generation Specs & Inspector Side Drawer (Apple/Xcode Quality) */
    .ct-inspector {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 400px;
      max-width: 90vw;
      background: rgba(9, 13, 22, 0.94);
      border-left: 1px solid var(--ct-border);
      z-index: 25;
      display: flex;
      flex-direction: column;
      box-shadow: -25px 0 60px rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(32px) saturate(180%);
      -webkit-backdrop-filter: blur(32px) saturate(180%);
      transform: translateX(100%);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .ct-inspector.ct-open {
      transform: translateX(0);
    }
    .ct-inspector-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 22px;
      border-bottom: 1px solid var(--ct-border);
    }
    .ct-inspector-title {
      font-size: 14px;
      font-weight: 700;
      letter-spacing: -0.01em;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 9px;
    }
    .ct-inspector-title svg {
      color: var(--ct-accent);
    }
    .ct-inspector-tabs {
      display: flex;
      padding: 0 22px;
      border-bottom: 1px solid var(--ct-border);
      gap: 16px;
    }
    .ct-tab-btn {
      padding: 10px 0;
      background: transparent;
      border: none;
      color: var(--ct-text-dim);
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      position: relative;
      transition: color 0.15s ease;
    }
    .ct-tab-btn:hover {
      color: #cbd5e1;
    }
    .ct-tab-btn.ct-active {
      color: #ffffff;
    }
    .ct-tab-btn.ct-active::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--ct-accent);
      box-shadow: 0 0 8px var(--ct-accent-glow);
    }
    .ct-inspector-body {
      flex: 1;
      overflow-y: auto;
      padding: 22px;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .ct-spec-card {
      background: var(--ct-surface-card);
      border: 1px solid var(--ct-border);
      border-radius: 10px;
      padding: 14px;
      position: relative;
    }
    .ct-spec-label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--ct-text-dim);
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .ct-spec-copy-btn {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--ct-border);
      border-radius: 6px;
      color: var(--ct-text-muted);
      font-size: 11px;
      font-weight: 600;
      padding: 3px 8px;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .ct-spec-copy-btn:hover {
      background: rgba(255, 255, 255, 0.12);
      color: #ffffff;
    }
    .ct-prompt-box {
      font-family: var(--ct-mono);
      font-size: 12px;
      line-height: 1.6;
      color: #cbd5e1;
      max-height: 150px;
      overflow-y: auto;
      white-space: pre-wrap;
      word-break: break-word;
      user-select: text;
      -webkit-user-select: text;
    }
    .ct-stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
      margin-top: 10px;
    }
    .ct-stat-cell {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--ct-border);
      border-radius: 6px;
      padding: 8px 10px;
    }
    .ct-stat-header {
      font-size: 10px;
      font-weight: 600;
      color: var(--ct-text-dim);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .ct-stat-data {
      font-size: 12px;
      font-weight: 600;
      color: #f8fafc;
      margin-top: 2px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .ct-lora-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 8px;
    }
    .ct-lora-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 8px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--ct-border);
      border-radius: 9999px;
      font-size: 11px;
      color: #e2e8f0;
      max-width: 100%;
    }
    .ct-lora-name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 500;
    }
    .ct-lora-weight {
      font-family: var(--ct-mono);
      font-size: 10px;
      color: #38bdf8;
      background: rgba(56, 189, 248, 0.12);
      padding: 1px 5px;
      border-radius: 4px;
      font-weight: 600;
    }

    /* Keyboard Shortcuts Modal / Drawer */
    .ct-shortcut-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .ct-key-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px 0;
      font-size: 12px;
    }
    .ct-key-label {
      color: #cbd5e1;
    }
    .ct-kbd {
      background: rgba(255, 255, 255, 0.07);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 5px;
      padding: 2px 7px;
      font-family: var(--ct-mono);
      font-size: 11px;
      color: #ffffff;
      box-shadow: 0 1px 2px rgba(0,0,0,0.4);
    }


    /* Auto-Hide HUD State */
    .ct-hud-hidden .ct-top-header {
      opacity: 0;
      transform: translateY(-10px);
      pointer-events: none;
    }
    .ct-hud-hidden .ct-dock {
      opacity: 0;
      transform: translate(-50%, 12px);
      pointer-events: none;
    }
    .ct-hud-hidden .ct-edge-arrow {
      opacity: 0;
      pointer-events: none;
    }
    .ct-hud-hidden .ct-filmstrip {
      opacity: 0;
      pointer-events: none;
    }

    /* Prevent mobile bottom navigation collision (e.g. Civitai profile tab) */
    @media (max-width: 768px) {
      #ct-launcher-btn {
        bottom: calc(env(safe-area-inset-bottom, 0px) + 84px);
        right: 16px;
        padding: 8px 14px;
        font-size: 12px;
      }
    }

    /* Mobile / Tablet Responsive Layouts */
    @media (max-width: 640px) {
      .ct-top-bar {
        padding: calc(8px + env(safe-area-inset-top, 0px)) calc(12px + env(safe-area-inset-right, 0px)) 8px calc(12px + env(safe-area-inset-left, 0px));
        gap: 8px;
      }
      .ct-brand-meta {
        gap: 6px;
        font-size: 12px;
        min-width: 0;
        flex-shrink: 1;
        white-space: nowrap;
      }
      .ct-brand-name,
      .ct-quality-tag {
        display: none;
      }
      .ct-counter-pill {
        font-size: 11px;
        padding: 2px 7px;
        white-space: nowrap;
        flex-shrink: 0;
      }
      .ct-civitai-pill {
        max-width: 110px;
        min-width: 0;
        flex-shrink: 1;
        padding: 2px 7px;
        font-size: 11px;
        gap: 4px;
      }
      .ct-top-actions {
        gap: 5px;
        flex-shrink: 0;
      }
      .ct-top-actions #ct-btn-fs,
      .ct-top-actions #ct-btn-ext {
        display: none !important;
      }
      .ct-top-actions .ct-dock-btn {
        width: 32px;
        height: 32px;
      }
      #ct-btn-close {
        width: 34px;
        height: 34px;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.16);
        color: #fff;
      }
      .ct-dock {
        bottom: calc(14px + env(safe-area-inset-bottom, 0px));
        padding: 4px 6px;
        gap: 3px;
        max-width: 94vw;
      }
      .ct-dock-btn {
        width: 34px;
        height: 34px;
      }
      .ct-edge-arrow {
        display: none;
      }
      .ct-speed-group {
        display: none;
      }
      .ct-inspector {
        width: 100vw;
        max-width: 100vw;
      }
      .ct-inspector-header {
        padding: calc(14px + env(safe-area-inset-top, 0px)) 16px 14px 16px;
      }
      .ct-inspector-body {
        padding-bottom: calc(24px + env(safe-area-inset-bottom, 0px));
      }
      .ct-filmstrip {
        bottom: calc(68px + env(safe-area-inset-bottom, 0px));
        max-width: 95vw;
      }
      .ct-zoom-hud {
        top: calc(56px + env(safe-area-inset-top, 0px));
        right: calc(14px + env(safe-area-inset-right, 0px));
      }
    }

    @media (max-width: 480px) {
      .ct-top-actions #ct-btn-filmstrip {
        display: none !important;
      }
      .ct-civitai-pill {
        max-width: 120px;
      }
    }

    /* Floating Glass Toast for Page Actions */
    #ct-page-toast {
      position: fixed;
      bottom: 32px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: rgba(15, 23, 42, 0.92);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
      color: #f8fafc;
      padding: 10px 18px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: -0.01em;
      z-index: 2147483647;
      opacity: 0;
      pointer-events: none;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    #ct-page-toast.ct-visible {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  `;

  // --- Clean-Room Helpers ---
  function upgradeCivitaiUrl(url, mode = 'hd') {
    if (!url) return '';
    if (!url.includes('civitai.com')) return url;

    try {
      const uuidRegex = /\/xG1nkqKTMzGDvpLrqFT7WA\/([a-f0-9-]{36})\/([^/]+)\/(.+)$/i;
      const match = url.match(uuidRegex);
      if (!match) {
        if (mode === 'raw') {
          return url.replace(/\/width=\d+[^/]*\//g, '/original=true/').replace(/\/transcode=[^/]*\//g, '/original=true/');
        } else {
          return url.includes('/width=') ? url.replace(/\/width=\d+/g, '/width=2048') : url;
        }
      }

      const [_, uuid, transformSeg, rest] = match;
      if (mode === 'raw') {
        return url.replace(uuidRegex, `/xG1nkqKTMzGDvpLrqFT7WA/${uuid}/original=true/${rest}`);
      } else {
        if (transformSeg === 'original=true') return url;
        let newTransform = transformSeg;
        if (/width=\d+/i.test(newTransform)) {
          newTransform = newTransform.replace(/width=\d+/i, 'width=2048');
        } else {
          newTransform = `width=2048,${newTransform}`;
        }
        return url.replace(uuidRegex, `/xG1nkqKTMzGDvpLrqFT7WA/${uuid}/${newTransform}/${rest}`);
      }
    } catch (_) {
      return url;
    }
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function sanitizeMediaUrl(url) {
    const raw = String(url || '').trim();
    if (!raw) return '';
    if (/^(https?:)?\/\//i.test(raw) || raw.startsWith('/') || raw.startsWith('blob:') || raw.startsWith('file:')) return raw;
    return '';
  }

  function cssImageUrl(url) {
    const safe = sanitizeMediaUrl(url);
    if (!safe) return 'none';
    return `url("${safe.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/[\r\n]/g, '')}")`;
  }

  // --- Civitai Theater Class ---
  class CivitaiTheater {
    constructor() {
      window.__CIVITAI_THEATER_INSTANCE__ = this;
      this.items = [];
      this.seenIds = new Set();
      this.currentIndex = 0;
      this.isPlaying = false;
      this.intervalMs = 5000;
      this.progressTimer = null;
      this.elapsedMs = 0;
      this.isShuffled = false;
      this.isMuted = true;
      this.qualityMode = 'hd';
      this.isInspectorOpen = false;
      this.isFilmstripOpen = false;
      this.isZenMode = false;
      this.idleTimer = null;
      this.zoom = 1.0;
      this.panX = 0;
      this.panY = 0;
      this.isDragging = false;
      this.dragStartX = 0;
      this.dragStartY = 0;
      this.imageCache = new Map();
      this.cacheLimit = 24;
      this.pendingPreloads = new Set();
      this.slideRequestId = 0;
      this.loaderTimer = null;
      this.resizeRaf = null;

      this.injectStyles();
      this.buildDOM();
      this.bindEvents();
      this.startObserver();
      this.scanPageMedia();
      this.setupExtensionBridge();
      this.checkAutoOpen();
    }

    checkAutoOpen() {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('theater') === '1' || window.location.hash === '#theater') {
          const attempt = (retries = 12) => {
            this.scanPageMedia();
            if (this.items.length > 0) {
              this.open(0);
            } else if (retries > 0) {
              setTimeout(() => attempt(retries - 1), 250);
            }
          };
          setTimeout(() => attempt(), 150);
        }
      } catch (_) {}
    }

    setupExtensionBridge() {
      if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
        chrome.runtime.onMessage.addListener((req, sender, sendRes) => {
          if (req.action === 'LAUNCH_THEATER') {
            this.open();
            sendRes({ status: 'ok', count: this.items.length });
          } else if (req.action === 'GET_COUNT') {
            sendRes({ count: this.items.length });
          }
        });
      }
    }

    injectStyles() {
      const styleEl = document.createElement('style');
      styleEl.id = 'ct-theater-styles';
      styleEl.textContent = STYLES;
      document.head.appendChild(styleEl);
    }

    buildDOM() {
      // 1. Floating Launcher Button (Civitai only; suppressed on Decomfy which uses native UI)
      const isDecomfyHost = typeof location !== 'undefined' && location.hostname.includes('decomfy.com');
      this.launcherBtn = document.createElement('button');
      this.launcherBtn.id = 'ct-launcher-btn';
      this.launcherBtn.innerHTML = `
        ${ICONS.film}
        <span>Theater</span>
      `;
      this.launcherBtn.title = 'Launch Fullscreen Slideshow (Alt+S)';
      if (isDecomfyHost) {
        this.launcherBtn.style.display = 'none';
      }
      document.body.appendChild(this.launcherBtn);

      // 2. Main Theater Overlay
      this.overlay = document.createElement('div');
      this.overlay.id = 'ct-overlay';
      this.overlay.className = 'ct-overlay';
      this.overlay.setAttribute('aria-label', 'Civitai Theater');
      this.overlay.setAttribute('aria-hidden', 'true');
      this.overlay.innerHTML = `
        <div class="ct-ambient-glow" id="ct-ambient-glow"></div>
        <div class="ct-vignette"></div>

        <!-- Top Timeline & Header -->
        <div class="ct-top-header" id="ct-top-header">
          <div class="ct-progress-track">
            <div class="ct-progress-fill" id="ct-progress-fill"></div>
          </div>
          <div class="ct-top-bar">
            <div class="ct-brand-meta">
              ${ICONS.film}
              <span class="ct-brand-name">Civitai Theater</span>
              <span class="ct-counter-pill" id="ct-counter">0 / 0</span>
              <span class="ct-quality-tag" id="ct-quality-indicator">2K HD</span>
              <a class="ct-civitai-pill" id="ct-header-civitai-pill" href="#" target="_blank" rel="noopener noreferrer" title="Open artwork on Civitai.com (O)" style="display: none;">
                ${ICONS.externalLink}
                <span id="ct-header-civitai-text">Civitai</span>
              </a>
            </div>
            <div class="ct-top-actions">
              <button class="ct-dock-btn" id="ct-btn-filmstrip" title="Toggle Filmstrip Scrubber (T)">
                ${ICONS.filmstrip}
              </button>
              <button class="ct-dock-btn" id="ct-btn-inspect" title="Inspector / Prompt Specs (I)">
                ${ICONS.info}
              </button>
              <button class="ct-dock-btn" id="ct-btn-download" title="Download High-Res (D)">
                ${ICONS.download}
              </button>
              <button class="ct-dock-btn" id="ct-btn-ext" title="Open Image on Civitai (O)">
                ${ICONS.externalLink}
              </button>
              <button class="ct-dock-btn" id="ct-btn-fs" title="Toggle Fullscreen (F)">
                ${ICONS.maximize}
              </button>
              <button class="ct-dock-btn" id="ct-btn-close" title="Exit Theater (Esc)">
                ${ICONS.close}
              </button>
            </div>
          </div>
        </div>

        <!-- Zoom HUD -->
        <div class="ct-zoom-hud" id="ct-zoom-hud">FIT</div>

        <!-- Media Stage -->
        <div class="ct-stage" id="ct-stage">
          <div class="ct-hit-prev" id="ct-hit-prev" aria-label="Previous"></div>
          <div class="ct-hit-next" id="ct-hit-next" aria-label="Next"></div>

          <button class="ct-edge-arrow ct-prev" id="ct-edge-prev" aria-label="Previous">
            ${ICONS.chevronLeft}
          </button>

          <!-- Before Flank (Widescreen + Portrait) -->
          <div class="ct-flank ct-flank-prev" id="ct-flank-prev" aria-label="Previous Artwork">
            <div class="ct-flank-preview" id="ct-flank-prev-inner"></div>
            <div class="ct-flank-badge">${ICONS.chevronLeft}<span>Before</span></div>
          </div>

          <div class="ct-media-canvas" id="ct-media-canvas">
            <!-- Dynamic Image / Video Injected Here -->
          </div>

          <!-- Ambient Stage Spinner when loading network chunks -->
          <div class="ct-stage-loader" id="ct-stage-loader">${ICONS.loader}</div>

          <!-- After Flank (Widescreen + Portrait) -->
          <div class="ct-flank ct-flank-next" id="ct-flank-next" aria-label="Next Artwork">
            <div class="ct-flank-preview" id="ct-flank-next-inner"></div>
            <div class="ct-flank-badge"><span>After</span>${ICONS.chevronRight}</div>
          </div>

          <button class="ct-edge-arrow ct-next" id="ct-edge-next" aria-label="Next">
            ${ICONS.chevronRight}
          </button>
        </div>

        <!-- Collapsible Bottom Filmstrip Scrubber -->
        <div class="ct-filmstrip" id="ct-filmstrip"></div>

        <!-- Apple VisionOS Floating Control Dock -->
        <div class="ct-dock" id="ct-dock">
          <button class="ct-dock-btn" id="ct-dock-prev" aria-label="Previous Slide">
            ${ICONS.chevronLeft}
          </button>
          <button class="ct-dock-btn ct-hero-play" id="ct-dock-play" title="Play / Pause (Space)">
            ${ICONS.play}
          </button>
          <button class="ct-dock-btn" id="ct-dock-next" aria-label="Next Slide">
            ${ICONS.chevronRight}
          </button>

          <div class="ct-dock-divider"></div>

          <button class="ct-dock-btn" id="ct-dock-shuffle" title="Shuffle Slides (S)">
            ${ICONS.shuffle}
          </button>
          <button class="ct-dock-btn" id="ct-dock-mute" title="Toggle Sound (M)" style="display: none;">
            ${ICONS.volumeX}
          </button>
          <button class="ct-dock-btn" id="ct-dock-zen" title="Zen Mode / Hide UI (H)">
            ${ICONS.eye}
          </button>

          <div class="ct-dock-divider"></div>

          <div class="ct-speed-group">
            <button class="ct-speed-item" data-speed="3000">3s</button>
            <button class="ct-speed-item ct-selected" data-speed="5000">5s</button>
            <button class="ct-speed-item" data-speed="8000">8s</button>
            <button class="ct-speed-item" data-speed="12000">12s</button>
            <button class="ct-speed-item" data-speed="0">Manual</button>
          </div>
        </div>

        <!-- Generation Specs & Inspector Drawer (Figma / Xcode Quality) -->
        <div class="ct-inspector" id="ct-inspector">
          <div class="ct-inspector-header">
            <div class="ct-inspector-title">
              ${ICONS.sparkles}
              <span>Generation Specs</span>
            </div>
            <button class="ct-dock-btn" id="ct-btn-close-inspector" title="Close Inspector">
              ${ICONS.close}
            </button>
          </div>
          <div class="ct-inspector-tabs">
            <button class="ct-tab-btn ct-active" id="ct-tab-specs">Telemetry</button>
            <button class="ct-tab-btn" id="ct-tab-shortcuts">Shortcuts</button>
          </div>
          <div class="ct-inspector-body" id="ct-inspector-body"></div>
        </div>
      `;
      document.body.appendChild(this.overlay);

      // Cache DOM references
      this.ambientGlow = this.overlay.querySelector('#ct-ambient-glow');
      this.mediaCanvas = this.overlay.querySelector('#ct-media-canvas');
      this.counterEl = this.overlay.querySelector('#ct-counter');
      this.progressFill = this.overlay.querySelector('#ct-progress-fill');
      this.zoomHud = this.overlay.querySelector('#ct-zoom-hud');
      this.dock = this.overlay.querySelector('#ct-dock');
      this.filmstrip = this.overlay.querySelector('#ct-filmstrip');
      this.inspector = this.overlay.querySelector('#ct-inspector');
      this.inspectorBody = this.overlay.querySelector('#ct-inspector-body');
      this.playBtn = this.overlay.querySelector('#ct-dock-play');
      this.shuffleBtn = this.overlay.querySelector('#ct-dock-shuffle');
      this.muteBtn = this.overlay.querySelector('#ct-dock-mute');
      this.filmstripBtn = this.overlay.querySelector('#ct-btn-filmstrip');
      this.inspectBtn = this.overlay.querySelector('#ct-btn-inspect');
      this.headerCivitaiPill = this.overlay.querySelector('#ct-header-civitai-pill');
      this.headerCivitaiText = this.overlay.querySelector('#ct-header-civitai-text');
    }

    bindEvents() {
      // Launcher Click
      this.launcherBtn.addEventListener('click', () => this.open());

      // Navigation & Playback Controls
      this.overlay.querySelector('#ct-dock-prev').addEventListener('click', (e) => { e.stopPropagation(); this.prev(); });
      this.overlay.querySelector('#ct-dock-next').addEventListener('click', (e) => { e.stopPropagation(); this.next(); });
      this.overlay.querySelector('#ct-edge-prev').addEventListener('click', (e) => { e.stopPropagation(); this.prev(); });
      this.overlay.querySelector('#ct-edge-next').addEventListener('click', (e) => { e.stopPropagation(); this.next(); });
      this.playBtn.addEventListener('click', (e) => { e.stopPropagation(); this.togglePlay(); });

      // Click zones on stage
      this.overlay.querySelector('#ct-hit-prev').addEventListener('click', () => this.prev());
      this.overlay.querySelector('#ct-hit-next').addEventListener('click', () => this.next());

      // Flank clicks (Before & After)
      const flankPrev = this.overlay.querySelector('#ct-flank-prev');
      const flankNext = this.overlay.querySelector('#ct-flank-next');
      if (flankPrev) {
        flankPrev.addEventListener('click', (e) => {
          e.stopPropagation();
          this.prev();
        });
      }
      if (flankNext) {
        flankNext.addEventListener('click', (e) => {
          e.stopPropagation();
          this.next();
        });
      }

      // Speed selection
      this.overlay.querySelectorAll('.ct-speed-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const speed = parseInt(btn.dataset.speed, 10);
          this.setSpeed(speed);
          this.overlay.querySelectorAll('.ct-speed-item').forEach(b => b.classList.remove('ct-selected'));
          btn.classList.add('ct-selected');
        });
      });

      // Shuffle toggle
      this.shuffleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.isShuffled = !this.isShuffled;
        this.shuffleBtn.classList.toggle('ct-active', this.isShuffled);
      });

      // Audio Mute toggle
      this.muteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleMute();
      });

      // Zen Mode toggle
      this.overlay.querySelector('#ct-dock-zen').addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleZenMode();
      });

      // Actions in top bar
      this.filmstripBtn.addEventListener('click', () => this.toggleFilmstrip());
      this.inspectBtn.addEventListener('click', () => this.toggleInspector());
      this.overlay.querySelector('#ct-btn-close').addEventListener('click', () => this.close());
      this.overlay.querySelector('#ct-btn-close-inspector').addEventListener('click', () => this.toggleInspector(false));
      this.overlay.querySelector('#ct-btn-fs').addEventListener('click', () => this.toggleFullscreen());
      this.overlay.querySelector('#ct-btn-download').addEventListener('click', () => this.downloadCurrent());
      this.overlay.querySelector('#ct-btn-ext').addEventListener('click', () => this.openExternal());

      // Inspector Tabs
      this.overlay.querySelector('#ct-tab-specs').addEventListener('click', () => this.switchInspectorTab('specs'));
      this.overlay.querySelector('#ct-tab-shortcuts').addEventListener('click', () => this.switchInspectorTab('shortcuts'));

      // Interactive Pan & Zoom
      const stage = this.overlay.querySelector('#ct-stage');
      stage.addEventListener('wheel', (e) => this.handleWheel(e), { passive: false });
      stage.addEventListener('mousedown', (e) => this.handleMouseDown(e));
      stage.addEventListener('dblclick', () => this.handleDoubleClick());

      // Mouse Idle Auto-Hide
      this.overlay.addEventListener('mousemove', () => this.handleUserActivity());
      this.overlay.addEventListener('click', () => this.handleUserActivity());

      // Global Keyboard Controls
      window.addEventListener('keydown', (e) => this.handleKeyDown(e));

      // Window resize listener to recompute Before/After flanks & 100% media sizing
      window.addEventListener('resize', () => {
        if (!this.overlay.classList.contains('ct-active')) return;
        cancelAnimationFrame(this.resizeRaf);
        this.resizeRaf = requestAnimationFrame(() => this.refreshFlanks());
      });

      // Touch Gestures for Mobile & Tablet (Pinch-to-zoom + Pan + Swipe navigation + Tap to toggle HUD)
      let touchStartX = 0;
      let touchStartY = 0;
      let initialDist = 0;
      let initialZoom = 1.0;
      let isPinching = false;
      let lastTapTime = 0;
      let touchStartTime = 0;
      let isTouchDragging = false;
      let touchDragStartX = 0;
      let touchDragStartY = 0;

      this.overlay.addEventListener('touchstart', (e) => {
        // Ignore touches inside inspector, dock, filmstrip, top header
        if (e.target.closest('#ct-inspector') || e.target.closest('#ct-dock') || e.target.closest('#ct-filmstrip') || e.target.closest('.ct-top-header')) {
          return;
        }

        if (e.touches.length === 2) {
          isPinching = true;
          isTouchDragging = false;
          initialDist = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
          );
          initialZoom = this.zoom;
        } else if (e.touches.length === 1) {
          isPinching = false;
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
          touchStartTime = Date.now();

          if (this.zoom > 1.0) {
            isTouchDragging = true;
            touchDragStartX = e.touches[0].clientX - this.panX;
            touchDragStartY = e.touches[0].clientY - this.panY;
          } else {
            isTouchDragging = false;
          }
        }
      }, { passive: false });

      this.overlay.addEventListener('touchmove', (e) => {
        if (e.target.closest('#ct-inspector') || e.target.closest('#ct-dock') || e.target.closest('#ct-filmstrip') || e.target.closest('.ct-top-header')) {
          return;
        }

        if (isPinching && e.touches.length === 2) {
          e.preventDefault();
          const currentDist = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
          );
          if (initialDist > 0) {
            const scale = currentDist / initialDist;
            this.zoom = Math.min(Math.max(1.0, initialZoom * scale), 4.0);
            if (this.zoom === 1.0) {
              this.panX = 0;
              this.panY = 0;
            }
            this.clampPan();
            this.applyTransform();
            this.showZoomHud();
          }
        } else if (isTouchDragging && e.touches.length === 1 && this.zoom > 1.0) {
          e.preventDefault();
          this.panX = e.touches[0].clientX - touchDragStartX;
          this.panY = e.touches[0].clientY - touchDragStartY;
          this.clampPan();
          this.applyTransform();
        }
      }, { passive: false });

      this.overlay.addEventListener('touchend', (e) => {
        if (e.target.closest('#ct-inspector') || e.target.closest('#ct-dock') || e.target.closest('#ct-filmstrip') || e.target.closest('.ct-top-header')) {
          return;
        }

        if (isPinching) {
          if (e.touches.length < 2) isPinching = false;
          return;
        }

        if (isTouchDragging) {
          isTouchDragging = false;
          return;
        }

        if (!e.changedTouches || e.changedTouches.length === 0) return;

        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        const distance = Math.hypot(diffX, diffY);
        const elapsed = Date.now() - touchStartTime;

        // Double-tap or Single-tap detection on stage/image
        const now = Date.now();
        if (distance < 15 && elapsed < 280) {
          if (now - lastTapTime < 320) {
            // Double tap: toggle 2x zoom
            this.handleDoubleClick();
            lastTapTime = 0;
            return;
          }
          lastTapTime = now;

          // Single tap on stage: toggle HUD (Zen Mode)
          setTimeout(() => {
            if (lastTapTime === now) {
              this.toggleZenMode();
            }
          }, 320);
          return;
        }

        // Swipe Gestures (Only when not zoomed in)
        if (this.zoom <= 1.0) {
          if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 0) this.prev();
            else this.next();
          } else if (diffY > 90 && Math.abs(diffY) > Math.abs(diffX)) {
            // Swipe down to dismiss
            this.close();
          }
        }
      }, { passive: true });
    }

    handleUserActivity() {
      if (this.isZenMode) return;
      this.overlay.classList.remove('ct-hud-hidden');
      clearTimeout(this.idleTimer);
      if (this.isPlaying) {
        this.idleTimer = setTimeout(() => {
          if (!this.isInspectorOpen && !this.isFilmstripOpen) {
            this.overlay.classList.add('ct-hud-hidden');
          }
        }, 2500);
      }
    }

    handleWheel(e) {
      if (e.target.closest('#ct-inspector') || e.target.closest('#ct-filmstrip')) return;
      e.preventDefault();

      const delta = e.deltaY * -0.002;
      const prevZoom = this.zoom;
      this.zoom = Math.min(Math.max(1.0, this.zoom + delta), 4.0);

      if (this.zoom === 1.0) {
        this.panX = 0;
        this.panY = 0;
      }

      this.clampPan();
      this.applyTransform();
      this.showZoomHud();
    }

    handleMouseDown(e) {
      if (!this.overlay.classList.contains('ct-active')) return;
      if (this.zoom <= 1.0) return;
      if (e.target.closest('#ct-inspector') || e.target.closest('#ct-dock') || e.target.closest('#ct-filmstrip')) return;

      this.isDragging = true;
      this.dragStartX = e.clientX - this.panX;
      this.dragStartY = e.clientY - this.panY;
      this.mediaCanvas.style.cursor = 'grabbing';

      this._boundMouseMove = (ev) => this.handleMouseMove(ev);
      this._boundMouseUp = () => this.handleMouseUp();
      window.addEventListener('mousemove', this._boundMouseMove);
      window.addEventListener('mouseup', this._boundMouseUp);
    }

    handleMouseMove(e) {
      if (!this.isDragging) return;
      this.panX = e.clientX - this.dragStartX;
      this.panY = e.clientY - this.dragStartY;
      this.clampPan();
      this.applyTransform();
    }

    handleMouseUp() {
      if (this.isDragging) {
        this.isDragging = false;
        this.mediaCanvas.style.cursor = this.zoom > 1.0 ? 'grab' : 'default';
      }
      if (this._boundMouseMove) {
        window.removeEventListener('mousemove', this._boundMouseMove);
        this._boundMouseMove = null;
      }
      if (this._boundMouseUp) {
        window.removeEventListener('mouseup', this._boundMouseUp);
        this._boundMouseUp = null;
      }
    }

    handleDoubleClick() {
      if (this.zoom > 1.0) {
        this.zoom = 1.0;
        this.panX = 0;
        this.panY = 0;
      } else {
        this.zoom = 2.0;
      }
      this.clampPan();
      this.applyTransform();
      this.showZoomHud();
    }

    clampPan() {
      if (this.zoom <= 1.0) {
        this.panX = 0;
        this.panY = 0;
        return;
      }
      const stage = this.overlay.querySelector('#ct-stage');
      if (!stage) return;
      const maxX = Math.max(0, (this.mediaCanvas.offsetWidth * this.zoom - stage.clientWidth) / 2);
      const maxY = Math.max(0, (this.mediaCanvas.offsetHeight * this.zoom - stage.clientHeight) / 2);
      this.panX = Math.min(maxX, Math.max(-maxX, this.panX));
      this.panY = Math.min(maxY, Math.max(-maxY, this.panY));
    }

    applyTransform() {
      this.clampPan();
      this.mediaCanvas.style.transform = `translate(${this.panX}px, ${this.panY}px) scale(${this.zoom})`;
      this.mediaCanvas.style.cursor = this.zoom > 1.0 ? (this.isDragging ? 'grabbing' : 'grab') : 'default';
      const stage = this.overlay.querySelector('#ct-stage');
      if (stage) {
        stage.classList.toggle('ct-stage-zoomed', this.zoom > 1.0);
      }
    }

    copyTextToClipboard(text) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
      }
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        return Promise.resolve(ok);
      } catch (_) {
        return Promise.resolve(false);
      }
    }

    openRemix() {
      const item = this.items[this.currentIndex];
      if (item && item.imageId) {
        window.open('https://civitai.com/generate?remixImageId=' + encodeURIComponent(item.imageId), '_blank', 'noopener,noreferrer');
      }
    }

    copyCivitaiLink() {
      const item = this.items[this.currentIndex];
      if (!item) return;
      const link = item.civitaiUrl || (item.imageId ? `https://civitai.com/images/${encodeURIComponent(item.imageId)}` : '');
      if (link) {
        this.copyTextToClipboard(link).then((ok) => {
          if (ok) this.showZoomHud('LINK COPIED');
        });
      }
    }

    copyCurrentPrompt() {
      const item = this.items[this.currentIndex];
      if (!item) return;
      const metaPrompt = item.meta && item.meta.prompt ? String(item.meta.prompt).trim() : '';
      const domText = this.inspectorBody && this.inspectorBody.querySelector('#ct-prompt-text')
        ? this.inspectorBody.querySelector('#ct-prompt-text').textContent.trim()
        : '';
      const domPrompt = domText && !/^(Loading telemetry|No positive prompt)/i.test(domText) ? domText : '';
      const prompt = metaPrompt || domPrompt;
      if (prompt) {
        this.copyTextToClipboard(prompt).then((ok) => {
          if (ok) this.showZoomHud('PROMPT COPIED');
        });
      }
    }

    showZoomHud(customText = null) {
      const text = customText || (this.zoom === 1.0 ? 'FIT' : `${Math.round(this.zoom * 100)}%`);
      this.zoomHud.textContent = text;
      this.zoomHud.classList.add('ct-visible');
      clearTimeout(this.zoomHudTimer);
      this.zoomHudTimer = setTimeout(() => {
        this.zoomHud.classList.remove('ct-visible');
      }, 1500);
    }

    handleKeyDown(e) {
      if (e.altKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        this.open();
        return;
      }

      if (!this.overlay.classList.contains('ct-active')) return;
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          if (this.isInspectorOpen) this.toggleInspector(false);
          else if (this.isFilmstripOpen) this.toggleFilmstrip(false);
          else if (this.zoom > 1.0) { this.zoom = 1.0; this.applyTransform(); this.showZoomHud(); }
          else this.close();
          break;
        case ' ':
          e.preventDefault();
          this.togglePlay();
          break;
        case 'ArrowRight':
        case 'j':
        case 'J':
        case 'Enter':
          e.preventDefault();
          if (this.zoom > 1.0 && e.key === 'ArrowRight') {
            this.panX -= 50;
            this.applyTransform();
          } else {
            this.next();
          }
          break;
        case 'ArrowLeft':
        case 'k':
        case 'K':
          e.preventDefault();
          if (this.zoom > 1.0 && e.key === 'ArrowLeft') {
            this.panX += 50;
            this.applyTransform();
          } else {
            this.prev();
          }
          break;
        case 'ArrowUp':
          if (this.zoom > 1.0) {
            e.preventDefault();
            this.panY += 50;
            this.applyTransform();
          }
          break;
        case 'ArrowDown':
          if (this.zoom > 1.0) {
            e.preventDefault();
            this.panY -= 50;
            this.applyTransform();
          }
          break;
        case '+':
        case '=':
          e.preventDefault();
          this.zoom = Math.min(4.0, Number((this.zoom + 0.25).toFixed(2)));
          this.applyTransform();
          this.showZoomHud();
          break;
        case '-':
        case '_':
          e.preventDefault();
          this.zoom = Math.max(1.0, Number((this.zoom - 0.25).toFixed(2)));
          if (this.zoom === 1.0) { this.panX = 0; this.panY = 0; }
          this.applyTransform();
          this.showZoomHud();
          break;
        case '0':
          e.preventDefault();
          this.zoom = 1.0;
          this.panX = 0;
          this.panY = 0;
          this.applyTransform();
          this.showZoomHud();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          this.toggleFullscreen();
          break;
        case 's':
        case 'S':
          e.preventDefault();
          this.isShuffled = !this.isShuffled;
          this.shuffleBtn.classList.toggle('ct-active', this.isShuffled);
          break;
        case 'i':
        case 'I':
          e.preventDefault();
          this.toggleInspector();
          break;
        case 't':
        case 'T':
          e.preventDefault();
          this.toggleFilmstrip();
          break;
        case 'h':
        case 'H':
          e.preventDefault();
          this.toggleZenMode();
          break;
        case 'm':
        case 'M':
          e.preventDefault();
          this.toggleMute();
          break;
        case 'z':
        case 'Z':
          e.preventDefault();
          this.handleDoubleClick();
          break;
        case 'd':
        case 'D':
          e.preventDefault();
          this.downloadCurrent();
          break;
        case 'o':
        case 'O':
        case 'v':
        case 'V':
          e.preventDefault();
          this.openExternal();
          break;
        case 'r':
        case 'R':
          e.preventDefault();
          this.openRemix();
          break;
        case 'c':
        case 'C':
          e.preventDefault();
          this.copyCivitaiLink();
          break;
        case 'p':
        case 'P':
          e.preventDefault();
          this.copyCurrentPrompt();
          break;
        case '1': this.setSpeed(3000); break;
        case '2': this.setSpeed(5000); break;
        case '3': this.setSpeed(8000); break;
        case '4': this.setSpeed(12000); break;
        case '5': this.setSpeed(0); break;
      }
    }

    startObserver() {
      let debounceTimeout = null;
      const observer = new MutationObserver((mutations) => {
        const hasExternalMutation = mutations.some(m => {
          const target = m.target;
          if (!target || !target.closest) return false;
          if (target.closest('#ct-overlay') || target.closest('#ct-launcher-btn')) {
            return false;
          }
          if (target.closest('.mantine-Menu-dropdown, [data-menu-dropdown], [role="menu"], [data-popover], .mantine-Popover-dropdown, .mantine-Tooltip-tooltip')) {
            return false;
          }
          return true;
        });

        if (!hasExternalMutation) return;

        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
          this.scanPageMedia();
        }, 400);
      });

      observer.observe(document.body, { childList: true, subtree: true });
    }

    scanPageMedia() {
      // Strictly target artwork elements on Civitai feeds, carousels, cards, and detail pages
      const candidates = document.querySelectorAll(`
        [data-image-id] img,
        [data-image-id] video,
        [data-image-id],
        a[href*="/images/"] img,
        a[href*="/images/"] video,
        a[href*="/posts/"] img,
        a[href*="/posts/"] video,
        .mantine-Card-root img,
        .mantine-Card-root video,
        .mantine-Carousel-slide img,
        .mantine-Carousel-slide video,
        [class*="Carousel-slide"] img,
        [class*="Carousel-slide"] video,
        [class*="carousel"] img,
        [class*="carousel"] video,
        [class*="ImageGuard"] img,
        [class*="ImageGuard"] video,
        [class*="MasonryCard"] img,
        [class*="MasonryCard"] video,
        [class*="FeedCard"] img,
        [class*="FeedCard"] video,
        [class*="ImageCard"] img,
        [class*="ImageCard"] video,
        [class*="ImageViewer"] img,
        [class*="ImageViewer"] video,
        main img[src*="civitai.com"],
        main video,
        img[src*="image.civitai.com"],
        video[src*="image.civitai.com"],
        img[src*="xG1nkqKTMzGDvpLrqFT7WA"],
        video[src*="xG1nkqKTMzGDvpLrqFT7WA"],
        .lab-card img,
        .lab-card video,
        .lab-card-media img,
        .lab-card-media video,
        [data-slug] img,
        [data-slug] video
      `);

      // Junk keyword pattern for icons, badges, avatars, cosmetics, buzz, and UI decorations
      const JUNK_URL_REGEX = /\/(badge|badges|cosmetic|cosmetics|avatar|avatars|icon|icons|logo|logos|buzz|coin|coins|reaction|reactions|emoji|emojis|sticker|stickers|award|awards|flair|tier)\b/i;
      const JUNK_ATTR_REGEX = /\b(badge|badges|cosmetic|cosmetics|avatar|avatars|icon|icons|logo|logos|buzz|coin|coins|reaction|reactions|emoji|emojis|sticker|stickers|award|awards|medal|trophy|flair|tier|supporter|moderator|founder|rank|level)\b/i;
      const JUNK_ANCESTOR_SELECTOR = `
        [class*="badge" i],
        [data-badge],
        [class*="cosmetic" i],
        [data-cosmetic],
        [class*="avatar" i],
        [data-avatar],
        [class*="reaction" i],
        [class*="buzz" i],
        [class*="coin" i],
        header,
        nav,
        aside,
        footer,
        [role="navigation"],
        [class*="Header"],
        [class*="Navbar"],
        [class*="Sidebar"],
        [class*="UserBadge"],
        [class*="UserInfo"]
      `;

      // Civitai standard artwork storage UUID pattern
      const CIVITAI_UUID_REGEX = /\/xG1nkqKTMzGDvpLrqFT7WA\/([a-f0-9-]{36})\//i;

      candidates.forEach(el => {
        // Skip elements inside theater overlay or launcher itself
        if (el.closest('#ct-overlay, #ct-launcher-btn')) return;

        // Skip any element nested inside junk containers (badges, avatars, reactions, cosmetics, navbars)
        if (el.closest(JUNK_ANCESTOR_SELECTOR)) return;

        let mediaUrl = '';
        let isVideo = false;
        let imageId = '';
        let postId = '';
        let username = '';
        let poster = null;

        if (el.tagName === 'VIDEO') {
          isVideo = true;
          mediaUrl = el.currentSrc || el.src;
          poster = el.getAttribute('poster');
          if (!mediaUrl) {
            const srcEl = el.querySelector('source');
            if (srcEl) mediaUrl = srcEl.src;
          }
        } else if (el.tagName === 'IMG') {
          mediaUrl = el.currentSrc || el.src || (el.srcset ? el.srcset.split(',')[0].trim().split(' ')[0] : '');
        } else if (el.tagName === 'A') {
          const video = el.querySelector('video');
          const img = el.querySelector('img');
          if (video) {
            isVideo = true;
            mediaUrl = video.currentSrc || video.src;
            poster = video.getAttribute('poster');
          } else if (img) {
            mediaUrl = img.currentSrc || img.src || (img.srcset ? img.srcset.split(',')[0].trim().split(' ')[0] : '');
          }
        } else if (el.hasAttribute('data-image-id')) {
          const video = el.querySelector('video');
          const img = el.querySelector('img');
          if (video) {
            isVideo = true;
            mediaUrl = video.currentSrc || video.src;
            poster = video.getAttribute('poster');
          } else if (img) {
            mediaUrl = img.currentSrc || img.src || (img.srcset ? img.srcset.split(',')[0].trim().split(' ')[0] : '');
          }
        }

        if (!mediaUrl || mediaUrl.startsWith('data:')) return;

        // 1. Strict URL check against junk badges/icons
        if (JUNK_URL_REGEX.test(mediaUrl)) return;
        if (poster && JUNK_URL_REGEX.test(poster)) return;

        // 2. Strict attribute check (alt, title, aria-label, class with word boundary)
        const alt = el.getAttribute('alt') || '';
        const title = el.getAttribute('title') || '';
        const ariaLabel = el.getAttribute('aria-label') || '';
        const className = typeof el.className === 'string' ? el.className : '';
        if (JUNK_ATTR_REGEX.test(alt) || JUNK_ATTR_REGEX.test(title) || JUNK_ATTR_REGEX.test(ariaLabel) || JUNK_ATTR_REGEX.test(className)) {
          return;
        }

        // 3. Dimension guard: eliminate small badges, icons, stickers (real artworks are never tiny thumbnails)
        if (el.tagName === 'IMG') {
          if ((el.naturalWidth > 0 && el.naturalWidth < 180) || (el.naturalHeight > 0 && el.naturalHeight < 180)) return;
          if (el.clientWidth > 0 && el.clientHeight > 0 && el.clientWidth < 160 && el.clientHeight < 160) return;
        }

        // 4. Resolve parent artwork card context
        const parentCard = el.closest('[data-image-id], .mantine-Card-root, a[href*="/images/"], a[href*="/posts/"], [class*="ImageGuard"], [class*="MasonryCard"], [class*="FeedCard"], [class*="Carousel-slide"], [class*="ImageViewer"], .lab-card, [data-slug]');

        let decomfyPayload = null;
        let decomfySlug = null;
        if (parentCard && (parentCard.classList.contains('lab-card') || parentCard.hasAttribute('data-slug'))) {
          decomfySlug = parentCard.getAttribute('data-slug');
          const payloadEl = parentCard.querySelector('.lab-card-payload');
          if (payloadEl) {
            try {
              decomfyPayload = JSON.parse(payloadEl.textContent);
            } catch (_) {}
          }
        }

        // Find imageId / postId
        const link = parentCard ? (parentCard.tagName === 'A' ? parentCard : parentCard.querySelector('a[href*="/images/"], a[href*="/posts/"]')) : (el.tagName === 'A' ? el : el.closest('a'));
        const href = link ? (link.getAttribute('href') || '') : '';

        const imgMatch = href.match(/\/images\/(\d+)/);
        if (imgMatch) imageId = imgMatch[1];

        if (!imageId && parentCard && parentCard.hasAttribute('data-image-id')) {
          imageId = parentCard.getAttribute('data-image-id');
        } else if (!imageId && el.hasAttribute('data-image-id')) {
          imageId = el.getAttribute('data-image-id');
        }

        const postMatch = href.match(/\/posts\/(\d+)/);
        if (postMatch) postId = postMatch[1];
        if (!postId && parentCard && parentCard.hasAttribute('data-post-id')) {
          postId = parentCard.getAttribute('data-post-id');
        }

        let civitaiUrl = '';
        if (parentCard && parentCard.hasAttribute('data-civitai-url')) {
          civitaiUrl = parentCard.getAttribute('data-civitai-url');
        }

        if (decomfyPayload) {
          if (decomfyPayload.imageId) imageId = String(decomfyPayload.imageId);
          else if (decomfyPayload.civitaiId) {
            const cidMatch = String(decomfyPayload.civitaiId).match(/\d+/);
            if (cidMatch) imageId = cidMatch[0];
          }
          if (decomfyPayload.postId) postId = String(decomfyPayload.postId);
          if (decomfyPayload.civitaiUrl) civitaiUrl = decomfyPayload.civitaiUrl;
          if (decomfyPayload.slug) decomfySlug = decomfyPayload.slug;
          username = 'Decomfy Lab';
        }

        if (!civitaiUrl) {
          if (imageId) civitaiUrl = `https://civitai.com/images/${encodeURIComponent(imageId)}`;
          else if (postId) civitaiUrl = `https://civitai.com/posts/${encodeURIComponent(postId)}`;
        }

        // 5. Positive artwork verification: ONLY select actual artworks ("chỉ chọn các tác phẩm thôi")
        // Must have an imageId, a postId, a verified Civitai artwork UUID, or be a verified Decomfy recipe card
        const uuidMatch = mediaUrl.match(CIVITAI_UUID_REGEX);
        const isDecomfy = Boolean(decomfyPayload || decomfySlug || location.hostname.includes('decomfy.com'));
        const isVerifiedArtwork = Boolean(imageId || postId || uuidMatch || isDecomfy);

        if (!isVerifiedArtwork) {
          return; // Strictly reject anything that is not a verified artwork!
        }

        // Extract creator username if available
        if (parentCard && !username) {
          const userLink = parentCard.querySelector('a[href*="/user/"]');
          if (userLink) {
            const uMatch = userLink.getAttribute('href').match(/\/user\/([^/?#]+)/);
            if (uMatch) username = uMatch[1];
          }
        }

        const uniqueKey = imageId
          ? `img_${imageId}`
          : (postId
            ? `post_${postId}_${mediaUrl.split('?')[0].split('/').slice(-1)[0]}`
            : (uuidMatch
              ? `uuid_${uuidMatch[1].toLowerCase()}`
              : (decomfySlug
                ? `decomfy_${decomfySlug}`
                : `media_${mediaUrl.split('?')[0].split('/').slice(-1)[0]}`)));
        if (this.seenIds.has(uniqueKey)) return;
        this.seenIds.add(uniqueKey);

        const hdUrl = sanitizeMediaUrl(upgradeCivitaiUrl(mediaUrl, 'hd'));
        const rawUrl = sanitizeMediaUrl(upgradeCivitaiUrl(mediaUrl, 'raw'));
        if (!hdUrl) {
          this.seenIds.delete(uniqueKey);
          return;
        }

        // Extract known aspect ratio and dimensions immediately from host page DOM if rendered
        let isPortrait = null;
        let natW = 0;
        let natH = 0;
        if (el.tagName === 'IMG' && el.naturalWidth > 0 && el.naturalHeight > 0) {
          natW = el.naturalWidth;
          natH = el.naturalHeight;
          isPortrait = natH > natW;
        } else if (el.tagName === 'VIDEO' && el.videoWidth > 0 && el.videoHeight > 0) {
          natW = el.videoWidth;
          natH = el.videoHeight;
          isPortrait = natH > natW;
        } else if (el.clientWidth > 0 && el.clientHeight > 0) {
          isPortrait = el.clientHeight > el.clientWidth;
        }

        const metaObj = decomfyPayload ? {
          prompt: decomfyPayload.prompt || decomfyPayload.title || '',
          negativePrompt: decomfyPayload.negPrompt || '',
          Model: decomfyPayload.model || '',
          steps: decomfyPayload.steps || null,
          cfgScale: decomfyPayload.cfg || null,
          sampler: decomfyPayload.sampler ? `${decomfyPayload.sampler} ${decomfyPayload.scheduler || ''}`.trim() : null,
          seed: decomfyPayload.seed != null ? decomfyPayload.seed : null
        } : null;

        this.items.push({
          id: uniqueKey,
          imageId: imageId,
          postId: postId,
          civitaiUrl: civitaiUrl,
          username: username,
          decomfySlug: decomfySlug,
          type: isVideo ? 'video' : 'image',
          url: hdUrl,
          rawUrl: rawUrl,
          thumbnail: sanitizeMediaUrl(isVideo ? (poster || '') : mediaUrl),
          poster: sanitizeMediaUrl(poster),
          width: natW,
          height: natH,
          isPortrait: isPortrait,
          meta: metaObj || null,
          baseModel: decomfyPayload ? (decomfyPayload.model || '') : '',
          metaLoaded: Boolean(decomfyPayload)
        });
      });

      if (this.overlay.classList.contains('ct-active')) {
        this.updateCounter();
        this.updateFilmstrip();
      }
    }

    showPageNotice(message, duration = 3000) {
      let toast = document.getElementById('ct-page-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'ct-page-toast';
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        document.body.appendChild(toast);
      }
      toast.textContent = message;
      toast.classList.add('ct-visible');
      clearTimeout(this._pageToastTimer);
      this._pageToastTimer = setTimeout(() => {
        toast.classList.remove('ct-visible');
      }, duration);
    }

    open(startIndex = null) {
      if (this.overlay.classList.contains('ct-active')) return;

      if (this.items.length === 0) {
        this.scanPageMedia();
      }

      if (this.items.length === 0) {
        this.showPageNotice('Civitai Theater: No artworks visible on screen yet. Scroll down to load images.');
        return;
      }

      if (startIndex !== null && startIndex >= 0 && startIndex < this.items.length) {
        this.currentIndex = startIndex;
      }

      document.documentElement.classList.add('ct-open-locked');
      document.body.classList.add('ct-open-locked');
      this.overlay.setAttribute('role', 'dialog');
      this.overlay.setAttribute('aria-modal', 'true');
      this.overlay.setAttribute('aria-hidden', 'false');
      this.overlay.classList.add('ct-active');
      this.renderCurrentSlide();
      this.play();
    }

    openBySlug(slug) {
      if (this.items.length === 0) this.scanPageMedia();
      const idx = this.items.findIndex(it => it.decomfySlug === slug);
      if (this.overlay.classList.contains('ct-active')) {
        if (idx >= 0) {
          this.currentIndex = idx;
          this.renderCurrentSlide();
        }
      } else {
        this.open(idx >= 0 ? idx : 0);
      }
    }

    openByImageId(id) {
      if (this.items.length === 0) this.scanPageMedia();
      const cleanId = String(id).replace(/\D/g, '');
      const idx = this.items.findIndex(it => it.imageId === cleanId);
      if (this.overlay.classList.contains('ct-active')) {
        if (idx >= 0) {
          this.currentIndex = idx;
          this.renderCurrentSlide();
        }
      } else {
        this.open(idx >= 0 ? idx : 0);
      }
    }

    close() {
      this.pause();
      if (this.isDragging) {
        this.handleMouseUp();
      }
      document.documentElement.classList.remove('ct-open-locked');
      document.body.classList.remove('ct-open-locked');
      this.overlay.classList.remove('ct-active');
      this.overlay.removeAttribute('role');
      this.overlay.removeAttribute('aria-modal');
      this.overlay.setAttribute('aria-hidden', 'true');
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
      const vid = this.mediaCanvas.querySelector('video');
      if (vid) {
        vid.pause();
        vid.removeAttribute('src');
        vid.load();
      }
      clearTimeout(this.loaderTimer);
      const loaderEl = this.overlay.querySelector('#ct-stage-loader');
      if (loaderEl) loaderEl.classList.remove('ct-visible');
      this.mediaCanvas.innerHTML = '';
      this.ambientGlow.style.backgroundImage = 'none';
      this.overlay.querySelectorAll('.ct-flank-preview').forEach(el => { el.innerHTML = ''; });
      this.overlay.querySelector('#ct-stage').classList.remove('ct-has-flanks');
      this.zoom = 1.0;
      this.panX = 0;
      this.panY = 0;
      this.applyTransform();
    }

    setCacheItem(key, img) {
      if (!key || !img) return;
      this.pendingPreloads.delete(key);
      if (this.imageCache.has(key)) this.imageCache.delete(key);
      this.imageCache.set(key, img);
      while (this.imageCache.size > this.cacheLimit) {
        const oldestKey = this.imageCache.keys().next().value;
        this.imageCache.delete(oldestKey);
      }
    }

    getCacheItem(key) {
      if (!key || !this.imageCache.has(key)) return null;
      const img = this.imageCache.get(key);
      this.imageCache.delete(key);
      this.imageCache.set(key, img);
      return img;
    }

    renderCurrentSlide() {
      const item = this.items[this.currentIndex];
      if (!item) return;

      const requestId = ++this.slideRequestId;

      // Reset Zoom & Pan on slide change
      this.zoom = 1.0;
      this.panX = 0;
      this.panY = 0;
      this.applyTransform();

      this.updateCounter();
      this.resetTimer();

      // Stop + release any previous video before replacing the stage contents
      const oldVideo = this.mediaCanvas.querySelector('video');
      if (oldVideo) oldVideo.pause();

      // Ambient Dual-Layer Glow (use thumbnail or HD url)
      this.ambientGlow.style.backgroundImage = cssImageUrl(item.thumbnail || item.url);

      // 1. Update flanks immediately with known aspect ratio (zero popping/shifting)
      let isPortrait = item.isPortrait;
      let natW = item.width || 0;
      let natH = item.height || 0;
      const cachedImg = this.getCacheItem(item.url);
      if (cachedImg && cachedImg.naturalWidth > 0) {
        natW = cachedImg.naturalWidth;
        natH = cachedImg.naturalHeight;
        isPortrait = natH > natW;
        item.isPortrait = isPortrait;
      }
      this.updateFlanks(Boolean(isPortrait), natW, natH);

      const loaderEl = this.overlay.querySelector('#ct-stage-loader');
      clearTimeout(this.loaderTimer);

      const mediaAlt = item.username ? `Artwork by ${item.username}` : 'Civitai Artwork';

      if (item.type === 'video') {
        if (loaderEl) loaderEl.classList.remove('ct-visible');
        this.mediaCanvas.innerHTML = '';

        const video = document.createElement('video');
        video.className = 'ct-media-video';
        video.src = sanitizeMediaUrl(item.url);
        if (item.poster || item.thumbnail) {
          video.poster = sanitizeMediaUrl(item.poster || item.thumbnail);
        }
        video.autoplay = true;
        video.loop = !this.isPlaying || this.intervalMs <= 0;
        video.muted = this.isMuted;
        video.playsInline = true;

        const syncVideo = () => {
          if (this.slideRequestId !== requestId) return;
          if (video.videoWidth > 0 && video.videoHeight > 0) {
            item.isPortrait = video.videoHeight > video.videoWidth;
            this.updateFlanks(item.isPortrait, video.videoWidth, video.videoHeight);
          }
          // Let the clip play to completion before advancing (instead of cutting at 5s)
          if (this.isPlaying && this.intervalMs > 0 && Number.isFinite(video.duration) && video.duration > 0) {
            this.startTimer(Math.max(1200, video.duration * 1000));
          }
        };
        if (video.readyState >= 1) {
          syncVideo();
        } else {
          video.onloadedmetadata = syncVideo;
        }

        this.mediaCanvas.appendChild(video);
        this.muteBtn.style.display = 'inline-flex';
        this.updateMuteIcon();

        video.addEventListener('ended', () => {
          if (this.slideRequestId === requestId && this.isPlaying && this.intervalMs > 0) {
            this.next();
          }
        });
      } else {
        // IMAGE HANDLING: GUARANTEE IMAGE IS LOADED BEFORE DISPLAYING
        this.muteBtn.style.display = 'none';

        // Check if high-res image is already decoded & in memory
        if (cachedImg && cachedImg.complete && cachedImg.naturalWidth > 0) {
          if (loaderEl) loaderEl.classList.remove('ct-visible');

          cachedImg.className = 'ct-media-img ct-loaded';
          cachedImg.alt = mediaAlt;
          cachedImg.loading = 'eager';
          cachedImg.decoding = 'async';

          item.isPortrait = cachedImg.naturalHeight > cachedImg.naturalWidth;
          this.updateFlanks(item.isPortrait, cachedImg.naturalWidth, cachedImg.naturalHeight);

          this.mediaCanvas.innerHTML = '';
          this.mediaCanvas.appendChild(cachedImg);
        } else {
          // If not in cache yet:
          // Display the cached thumbnail immediately so the screen is NEVER empty!
          if (item.thumbnail) {
            this.mediaCanvas.innerHTML = `
              <img class="ct-media-img ct-thumbnail-preview" src="${escapeHtml(item.thumbnail)}" alt="Loading artwork preview" loading="eager" decoding="async" />
            `;
          }

          // Show loader if fetch takes > 180ms
          this.loaderTimer = setTimeout(() => {
            if (this.slideRequestId === requestId && loaderEl) {
              loaderEl.classList.add('ct-visible');
            }
          }, 180);

          // Preload and decode high-res offscreen before showing
          const preImg = new Image();
          preImg.decoding = 'async';
          let settled = false;

          const onLoaded = () => {
            if (settled) return;
            settled = true;
            this.setCacheItem(item.url, preImg);

            if (preImg.naturalWidth > 0) {
              item.isPortrait = preImg.naturalHeight > preImg.naturalWidth;
            }

            if (this.slideRequestId !== requestId) return; // Stale request, ignore DOM update
            clearTimeout(this.loaderTimer);
            if (loaderEl) loaderEl.classList.remove('ct-visible');

            this.updateFlanks(item.isPortrait, preImg.naturalWidth, preImg.naturalHeight);

            // Adopt the already-decoded Image node (no duplicate decode / network fetch)
            preImg.className = 'ct-media-img';
            preImg.alt = mediaAlt;
            preImg.loading = 'eager';

            this.mediaCanvas.innerHTML = '';
            this.mediaCanvas.appendChild(preImg);

            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                if (this.slideRequestId === requestId) {
                  preImg.classList.add('ct-loaded');
                }
              });
            });
          };

          preImg.onload = onLoaded;
          preImg.onerror = () => {
            if (settled) return;
            settled = true;
            this.pendingPreloads.delete(item.url);
            if (this.slideRequestId !== requestId) return;
            clearTimeout(this.loaderTimer);
            if (loaderEl) loaderEl.classList.remove('ct-visible');
            if (item.thumbnail) {
              const img = document.createElement('img');
              img.className = 'ct-media-img ct-loaded';
              img.src = sanitizeMediaUrl(item.thumbnail);
              img.alt = mediaAlt;
              this.mediaCanvas.innerHTML = '';
              this.mediaCanvas.appendChild(img);
            }
          };

          preImg.src = item.url;
          if (preImg.complete && preImg.naturalWidth > 0) {
            onLoaded();
          }
        }
      }

      // Aggressive multi-directional preloading (+1, +2, +3, -1, -2)
      this.preloadMedia(this.currentIndex);
      this.updateFilmstripActive();

      if (this.isInspectorOpen) {
        this.renderInspector(item);
      }

      // Infinite Scroll Buffer
      if (this.items.length >= 8 && this.currentIndex >= this.items.length - 3) {
        window.scrollBy({ top: window.innerHeight, behavior: 'instant' });
      }
    }

    refreshFlanks() {
      const img = this.mediaCanvas.querySelector('img:not(.ct-thumbnail-preview)');
      const video = this.mediaCanvas.querySelector('video');
      if (img && img.naturalWidth > 0) {
        this.updateFlanks(img.naturalHeight > img.naturalWidth, img.naturalWidth, img.naturalHeight);
      } else if (video && video.videoWidth > 0) {
        this.updateFlanks(video.videoHeight > video.videoWidth, video.videoWidth, video.videoHeight);
      }
    }

    updateFlanks(isPortrait = false, naturalW = 0, naturalH = 0) {
      const stage = this.overlay.querySelector('#ct-stage');
      const prevInner = this.overlay.querySelector('#ct-flank-prev-inner');
      const nextInner = this.overlay.querySelector('#ct-flank-next-inner');

      if (!stage || !prevInner || !nextInner) return;

      const viewportW = window.innerWidth;
      const viewportH = window.innerHeight;
      const viewportRatio = viewportW / viewportH;

      let imageRatio = 0.6; // Default portrait aspect ratio
      if (naturalW > 0 && naturalH > 0) {
        imageRatio = naturalW / naturalH;
      } else if (!isPortrait) {
        imageRatio = 1.77; // Default landscape aspect ratio
      }

      // True tall vs wide determination against current viewport ratio
      const isTall = imageRatio < viewportRatio;

      // 1. Enforce 100% Full Height (for tall) or 100% Full Width (for wide)
      this.mediaCanvas.classList.toggle('ct-tall-media', isTall);
      this.mediaCanvas.classList.toggle('ct-wide-media', !isTall);

      // 2. Compute rendered media width and remaining leftover horizontal space
      const renderedMediaWidth = isTall ? (viewportH * imageRatio) : viewportW;
      const leftoverPerSide = Math.max(0, (viewportW - renderedMediaWidth) / 2);

      // 3. Flanks are active ONLY if there is ample leftover space (>= 100px) on wide desktop screens (>= 1024px)
      const isWidescreen = viewportW >= 1024;
      const canShowFlanks = isWidescreen && isTall && leftoverPerSide >= 100 && this.items.length >= 2;

      if (!canShowFlanks) {
        stage.classList.remove('ct-has-flanks');
        prevInner.innerHTML = '';
        nextInner.innerHTML = '';
        return;
      }

      const prevIdx = (this.currentIndex - 1 + this.items.length) % this.items.length;
      const nextIdx = (this.currentIndex + 1) % this.items.length;
      const prevItem = this.items[prevIdx];
      const nextItem = this.items[nextIdx];

      // Use thumbnail or cached image so flanks render in 0ms without ever being empty
      const pickSrc = (it) => sanitizeMediaUrl(it.thumbnail) || sanitizeMediaUrl(it.type === 'video' ? it.poster : it.url) || sanitizeMediaUrl(it.url);
      const prevSrc = pickSrc(prevItem);
      const nextSrc = pickSrc(nextItem);

      const currentPrev = prevInner.querySelector('img');
      if (!currentPrev || currentPrev.getAttribute('data-id') !== prevItem.id) {
        prevInner.innerHTML = `
          <img class="ct-flank-img" data-id="${escapeHtml(prevItem.id)}" src="${escapeHtml(prevSrc)}" alt="${escapeHtml(prevItem.username ? `By ${prevItem.username}` : 'Previous artwork')}" loading="eager" decoding="async" />
        `;
      }

      const currentNext = nextInner.querySelector('img');
      if (!currentNext || currentNext.getAttribute('data-id') !== nextItem.id) {
        nextInner.innerHTML = `
          <img class="ct-flank-img" data-id="${escapeHtml(nextItem.id)}" src="${escapeHtml(nextSrc)}" alt="${escapeHtml(nextItem.username ? `By ${nextItem.username}` : 'Next artwork')}" loading="eager" decoding="async" />
        `;
      }

      stage.classList.add('ct-has-flanks');
    }

    preloadImage(url, item = null) {
      const safeUrl = sanitizeMediaUrl(url);
      if (!safeUrl || this.imageCache.has(safeUrl) || this.pendingPreloads.has(safeUrl)) return;

      this.pendingPreloads.add(safeUrl);
      const img = new Image();
      img.decoding = 'async';

      const settle = () => {
        if (img.naturalWidth > 0) {
          if (item && item.isPortrait === null) {
            item.isPortrait = img.naturalHeight > img.naturalWidth;
          }
          this.setCacheItem(safeUrl, img);
        } else {
          this.pendingPreloads.delete(safeUrl);
        }
      };

      img.onload = () => {
        if (img.decode) {
          img.decode().then(settle).catch(settle);
        } else {
          settle();
        }
      };
      img.onerror = () => this.pendingPreloads.delete(safeUrl);
      img.src = safeUrl;
    }

    preloadMedia(index) {
      if (!this.items || this.items.length === 0) return;

      // Bidirectional preloading: 3 forward, 2 backward (deduped for tiny galleries)
      const count = this.items.length;
      const indices = [...new Set([
        (index + 1) % count,
        (index - 1 + count) % count,
        (index + 2) % count,
        (index - 2 + count) % count,
        (index + 3) % count
      ])].filter(idx => idx !== index);

      indices.forEach(idx => {
        const it = this.items[idx];
        if (!it) return;

        if (it.type === 'image') {
          this.preloadImage(it.url, it);
        }
        // Preload thumbnail for flanks / filmstrip (tiny, cheap)
        this.preloadImage(it.thumbnail);
      });
    }

    next() {
      if (this.items.length === 0) return;
      if (this.isShuffled) {
        let rand = Math.floor(Math.random() * this.items.length);
        if (rand === this.currentIndex && this.items.length > 1) {
          rand = (rand + 1) % this.items.length;
        }
        this.currentIndex = rand;
      } else {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
      }
      this.renderCurrentSlide();
    }

    prev() {
      if (this.items.length === 0) return;
      this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
      this.renderCurrentSlide();
    }

    play() {
      this.isPlaying = true;
      this.playBtn.innerHTML = ICONS.pause;
      this.playBtn.title = 'Pause (Space)';
      const video = this.mediaCanvas.querySelector('video');
      if (video) {
        video.loop = this.intervalMs <= 0;
        const playPromise = video.play();
        if (playPromise && playPromise.catch) playPromise.catch(() => {});
      }
      this.handleUserActivity();
      if (video && this.intervalMs > 0 && Number.isFinite(video.duration) && video.duration > 0) {
        const remainingMs = Math.max(1200, (video.duration - video.currentTime) * 1000);
        this.startTimer(remainingMs);
      } else {
        this.startTimer();
      }
    }

    pause() {
      this.isPlaying = false;
      this.playBtn.innerHTML = ICONS.play;
      this.playBtn.title = 'Play (Space)';
      const video = this.mediaCanvas.querySelector('video');
      if (video) video.pause();
      if (this.progressFill) {
        const computedWidth = window.getComputedStyle(this.progressFill).width;
        this.progressFill.style.transition = 'none';
        this.progressFill.style.width = computedWidth;
      }
      this.clearTimers();
      this.overlay.classList.remove('ct-hud-hidden');
    }

    togglePlay() {
      if (this.isPlaying) this.pause();
      else this.play();
    }

    setSpeed(ms) {
      this.intervalMs = ms;
      const video = this.mediaCanvas.querySelector('video');
      if (video) video.loop = this.intervalMs <= 0;
      this.resetTimer();
      if (this.intervalMs === 0) this.pause();
      else if (!this.isPlaying) this.play();
    }

    startTimer(durationMs = this.intervalMs) {
      this.clearTimers();
      if (durationMs <= 0 || !this.isPlaying) {
        if (this.progressFill) {
          this.progressFill.style.transition = 'none';
          this.progressFill.style.width = '0%';
        }
        return;
      }

      if (this.progressFill) {
        this.progressFill.style.transition = 'none';
        this.progressFill.style.width = '0%';
        // Force reflow for deterministic CSS transition restart
        void this.progressFill.offsetWidth;
        this.progressFill.style.transition = `width ${durationMs}ms linear`;
        this.progressFill.style.width = '100%';
      }

      this.progressTimer = setTimeout(() => {
        if (this.isPlaying) {
          this.next();
        }
      }, durationMs);
    }

    resetTimer() {
      this.clearTimers();
      if (this.progressFill) {
        this.progressFill.style.transition = 'none';
        this.progressFill.style.width = '0%';
      }
      if (this.isPlaying && this.intervalMs > 0) {
        this.startTimer();
      }
    }

    clearTimers() {
      if (this.progressTimer) {
        clearTimeout(this.progressTimer);
        this.progressTimer = null;
      }
    }

    toggleMute() {
      this.isMuted = !this.isMuted;
      const video = this.mediaCanvas.querySelector('video');
      if (video) video.muted = this.isMuted;
      this.updateMuteIcon();
    }

    updateMuteIcon() {
      this.muteBtn.innerHTML = this.isMuted ? ICONS.volumeX : ICONS.volume2;
      this.muteBtn.title = this.isMuted ? 'Unmute Audio (M)' : 'Mute Audio (M)';
      this.muteBtn.classList.toggle('ct-active', !this.isMuted);
    }

    toggleFullscreen() {
      const fsBtn = this.overlay.querySelector('#ct-btn-fs');
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
          fsBtn.innerHTML = ICONS.minimize;
        }).catch(() => {});
      } else {
        document.exitFullscreen().then(() => {
          fsBtn.innerHTML = ICONS.maximize;
        }).catch(() => {});
      }
    }

    toggleZenMode() {
      this.isZenMode = !this.isZenMode;
      this.overlay.querySelector('#ct-dock-zen').classList.toggle('ct-active', this.isZenMode);
      if (this.isZenMode) {
        this.toggleInspector(false);
        this.toggleFilmstrip(false);
        this.overlay.classList.add('ct-hud-hidden');
      } else {
        this.overlay.classList.remove('ct-hud-hidden');
      }
    }

    toggleFilmstrip(force = null) {
      this.isFilmstripOpen = force !== null ? force : !this.isFilmstripOpen;
      this.filmstrip.classList.toggle('ct-open', this.isFilmstripOpen);
      this.filmstripBtn.classList.toggle('ct-active', this.isFilmstripOpen);
      this.overlay.classList.toggle('ct-filmstrip-open', this.isFilmstripOpen);
      if (this.isFilmstripOpen) {
        this.updateFilmstrip();
      }
    }

    updateFilmstrip() {
      if (!this.isFilmstripOpen) return;
      this.filmstrip.innerHTML = '';
      this.items.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = `ct-thumb-card ${index === this.currentIndex ? 'ct-active' : ''}`;
        card.setAttribute('role', 'button');
        card.tabIndex = 0;
        card.setAttribute('aria-label', item.username ? `Artwork by ${item.username}` : `Artwork ${index + 1}`);

        const thumbSrc = sanitizeMediaUrl(item.type === 'video' ? (item.poster || item.thumbnail) : item.thumbnail);
        if (thumbSrc) {
          const img = document.createElement('img');
          img.src = thumbSrc;
          img.alt = '';
          img.loading = 'lazy';
          img.decoding = 'async';
          card.appendChild(img);
        } else {
          const placeholder = document.createElement('div');
          placeholder.className = 'ct-thumb-video-placeholder';
          placeholder.innerHTML = ICONS.film;
          card.appendChild(placeholder);
        }

        if (item.type === 'video') {
          const badge = document.createElement('div');
          badge.className = 'ct-thumb-video-badge';
          badge.innerHTML = ICONS.play;
          card.appendChild(badge);
        }

        const select = (e) => {
          e.stopPropagation();
          e.preventDefault();
          this.currentIndex = index;
          this.renderCurrentSlide();
        };
        card.addEventListener('click', select);
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') select(e);
        });
        this.filmstrip.appendChild(card);
      });
      this.scrollActiveThumbIntoView();
    }

    updateFilmstripActive() {
      if (!this.isFilmstripOpen) return;
      const cards = this.filmstrip.querySelectorAll('.ct-thumb-card');
      cards.forEach((c, i) => c.classList.toggle('ct-active', i === this.currentIndex));
      this.scrollActiveThumbIntoView();
    }

    scrollActiveThumbIntoView() {
      const active = this.filmstrip.querySelector('.ct-thumb-card.ct-active');
      if (active) {
        active.scrollIntoView({ behavior: 'auto', inline: 'center', block: 'nearest' });
      }
    }

    toggleInspector(force = null) {
      this.isInspectorOpen = force !== null ? force : !this.isInspectorOpen;
      this.inspector.classList.toggle('ct-open', this.isInspectorOpen);
      this.inspectBtn.classList.toggle('ct-active', this.isInspectorOpen);
      this.overlay.classList.toggle('ct-inspector-open', this.isInspectorOpen);

      if (this.isInspectorOpen) {
        const item = this.items[this.currentIndex];
        this.renderInspector(item);
      }
    }

    switchInspectorTab(tab) {
      this.overlay.querySelector('#ct-tab-specs').classList.toggle('ct-active', tab === 'specs');
      this.overlay.querySelector('#ct-tab-shortcuts').classList.toggle('ct-active', tab === 'shortcuts');
      const item = this.items[this.currentIndex];
      if (tab === 'specs') {
        this.renderInspector(item);
      } else {
        this.renderShortcutsTab();
      }
    }

    renderShortcutsTab() {
      this.inspectorBody.innerHTML = `
        <div class="ct-spec-card">
          <div class="ct-spec-label">Pro Keyboard Controls</div>
          <div class="ct-shortcut-list">
            <div class="ct-key-row"><span class="ct-key-label">Play / Pause</span><span class="ct-kbd">Space</span></div>
            <div class="ct-key-row"><span class="ct-key-label">Next Slide</span><span class="ct-kbd">→ / J / Enter</span></div>
            <div class="ct-key-row"><span class="ct-key-label">Previous Slide</span><span class="ct-kbd">← / K</span></div>
            <div class="ct-key-row"><span class="ct-key-label">Toggle Fullscreen</span><span class="ct-kbd">F</span></div>
            <div class="ct-key-row"><span class="ct-key-label">Toggle Filmstrip</span><span class="ct-kbd">T</span></div>
            <div class="ct-key-row"><span class="ct-key-label">Zen Mode (Hide UI)</span><span class="ct-kbd">H</span></div>
            <div class="ct-key-row"><span class="ct-key-label">Toggle Shuffle</span><span class="ct-kbd">S</span></div>
            <div class="ct-key-row"><span class="ct-key-label">Video Audio Mute</span><span class="ct-kbd">M</span></div>
            <div class="ct-key-row"><span class="ct-key-label">Zoom 2x / Reset</span><span class="ct-kbd">Z / DblClick</span></div>
            <div class="ct-key-row"><span class="ct-key-label">Zoom In / Out / Reset</span><span class="ct-kbd">+ / - / 0</span></div>
            <div class="ct-key-row"><span class="ct-key-label">Download Media</span><span class="ct-kbd">D</span></div>
            <div class="ct-key-row"><span class="ct-key-label">Open Civitai Post</span><span class="ct-kbd">O / V</span></div>
            <div class="ct-key-row"><span class="ct-key-label">Remix on Civitai</span><span class="ct-kbd">R</span></div>
            <div class="ct-key-row"><span class="ct-key-label">Copy Civitai link</span><span class="ct-kbd">C</span></div>
            <div class="ct-key-row"><span class="ct-key-label">Copy prompt</span><span class="ct-kbd">P</span></div>
            <div class="ct-key-row"><span class="ct-key-label">Mobile Gestures</span><span class="ct-kbd">Swipe / Pinch</span></div>
            <div class="ct-key-row"><span class="ct-key-label">Speed 3s / 5s / 8s</span><span class="ct-kbd">1 / 2 / 3</span></div>
            <div class="ct-key-row"><span class="ct-key-label">Exit Theater</span><span class="ct-kbd">Esc</span></div>
          </div>
        </div>
      `;
    }

    renderInspector(item) {
      if (!item) return;

      this.inspectorBody.innerHTML = `
        <div class="ct-spec-card">
          <div class="ct-spec-label">
            <span>Media Source</span>
            <span class="ct-source-tag">${item.type === 'video' ? 'VIDEO' : 'IMAGE'}</span>
          </div>
          <div style="font-size: 13px; font-weight: 600; color: #f8fafc;">
            ${item.username ? `Creator: <span style="color: var(--ct-accent);">${escapeHtml(item.username)}</span>` : 'Civitai Community Showcase'}
          </div>
          ${item.imageId ? `<div style="font-size: 11px; color: var(--ct-text-dim); margin-top: 4px;">Image ID: ${escapeHtml(item.imageId)}</div>` : ''}
          ${item.postId ? `<div style="font-size: 11px; color: var(--ct-text-dim);">Post ID: ${escapeHtml(item.postId)}</div>` : ''}
          <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">
            ${item.imageId ? `
              <a href="https://civitai.com/images/${encodeURIComponent(item.imageId)}" target="_blank" rel="noopener noreferrer" style="flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 7px 10px; background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 6px; color: #38bdf8; font-size: 11.5px; font-weight: 600; text-decoration: none; transition: all 0.2s ease;">
                ${ICONS.externalLink}
                <span>Open on Civitai</span>
              </a>
            ` : (item.postId ? `
              <a href="https://civitai.com/posts/${encodeURIComponent(item.postId)}" target="_blank" rel="noopener noreferrer" style="flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 7px 10px; background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 6px; color: #38bdf8; font-size: 11.5px; font-weight: 600; text-decoration: none; transition: all 0.2s ease;">
                ${ICONS.externalLink}
                <span>Open on Civitai</span>
              </a>
            ` : (item.civitaiUrl ? `
              <a href="${escapeHtml(item.civitaiUrl)}" target="_blank" rel="noopener noreferrer" style="flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 7px 10px; background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 6px; color: #38bdf8; font-size: 11.5px; font-weight: 600; text-decoration: none; transition: all 0.2s ease;">
                ${ICONS.externalLink}
                <span>Open on Civitai</span>
              </a>
            ` : ''))}
            ${item.imageId ? `
              <button id="ct-btn-remix" style="flex: 1 1 140px; display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 7px 10px; background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 6px; color: #38bdf8; font-size: 11.5px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; appearance: none; font-family: inherit;">
                ${ICONS.sparkles}
                <span>Remix on Civitai</span>
              </button>
            ` : ''}
            <a href="${escapeHtml(sanitizeMediaUrl(item.rawUrl || item.url))}" target="_blank" rel="noopener noreferrer" style="flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 7px 10px; background: rgba(255, 255, 255, 0.05); border: 1px solid var(--ct-border); border-radius: 6px; color: #cbd5e1; font-size: 11.5px; font-weight: 600; text-decoration: none; transition: all 0.2s ease;">
              ${ICONS.zoomIn}
              <span>Raw 4K / Original</span>
            </a>
          </div>
        </div>

        <div class="ct-spec-card" id="ct-card-prompt">
          <div class="ct-spec-label">
            <span>Positive Prompt</span>
            <button class="ct-spec-copy-btn" id="ct-copy-prompt">
              ${ICONS.copy} <span>Copy</span>
            </button>
          </div>
          <div class="ct-prompt-box" id="ct-prompt-text">
            Loading telemetry from Civitai API...
          </div>
        </div>

        <div class="ct-spec-card" id="ct-card-negative" style="display: none;">
          <div class="ct-spec-label">
            <span>Negative Prompt</span>
            <button class="ct-spec-copy-btn" id="ct-copy-neg">
              ${ICONS.copy} <span>Copy</span>
            </button>
          </div>
          <div class="ct-prompt-box" id="ct-neg-text"></div>
        </div>

        <div class="ct-spec-card" id="ct-card-loras" style="display: none;">
          <div class="ct-spec-label">
            <span>LoRAs &amp; Resources</span>
            <span class="ct-source-tag" id="ct-loras-count" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8;"></span>
          </div>
          <div class="ct-lora-list" id="ct-loras-list"></div>
        </div>

        <div class="ct-spec-card" id="ct-card-params" style="display: none;">
          <div class="ct-spec-label">Generation Parameters</div>
          <div class="ct-stats-grid" id="ct-params-grid"></div>
        </div>

        <!-- Decomfy Lab ComfyUI Workflow Integration -->
        <div class="ct-spec-card">
          <div class="ct-spec-label">
            <span>ComfyUI Reverse Engineering</span>
            <span class="ct-source-tag" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8;">DECOMFY</span>
          </div>
          <div style="font-size: 12px; color: var(--ct-text-dim); margin-bottom: 10px; line-height: 1.4;">
            Decompile embedded PNG workflows, extract node DAGs, and resolve missing custom nodes on Decomfy Lab.
          </div>
          <a href="${item.decomfySlug ? `https://decomfy.com/${encodeURIComponent(item.decomfySlug)}/` : (item.imageId ? `https://decomfy.com/resolve/?civitai=${encodeURIComponent(item.imageId)}` : 'https://decomfy.com/resolve/')}" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 8px 12px; background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 6px; color: #38bdf8; font-size: 12px; font-weight: 600; text-decoration: none; transition: all 0.2s ease;">
            ${ICONS.externalLink}
            <span>${item.decomfySlug ? 'View Recipe on Decomfy.com' : 'Decompile on Decomfy.com'}</span>
          </a>
        </div>
      `;

      if (item.metaLoaded) {
        this.renderMetaFields(item);
      } else if (item.imageId) {
        this.fetchCivitaiMeta(item);
      } else {
        const pEl = this.inspectorBody.querySelector('#ct-prompt-text');
        if (pEl) pEl.textContent = 'No positive prompt recorded for this preview card.';
      }

      const remixBtn = this.inspectorBody.querySelector('#ct-btn-remix');
      if (remixBtn) remixBtn.addEventListener('click', () => this.openRemix());

      this.bindCopyAction('#ct-copy-prompt', '#ct-prompt-text');
      this.bindCopyAction('#ct-copy-neg', '#ct-neg-text');
    }

    renderMetaFields(item) {
      const root = this.inspectorBody;
      if (!root) return;

      const meta = (item.meta && typeof item.meta === 'object') ? item.meta : {};

      const pEl = root.querySelector('#ct-prompt-text');
      if (pEl) {
        pEl.textContent = meta.prompt ? String(meta.prompt) : 'Standard Civitai Showcase item.';
      }

      const negCard = root.querySelector('#ct-card-negative');
      const negEl = root.querySelector('#ct-neg-text');
      const negative = meta.negativePrompt ? String(meta.negativePrompt) : '';
      if (negCard && negEl) {
        negCard.style.display = negative ? 'block' : 'none';
        negEl.textContent = negative;
      }

      // Extract LoRAs from meta.resources and prompt tags
      const loras = [];
      const seenLoras = new Set();
      if (Array.isArray(meta.resources)) {
        meta.resources.forEach(r => {
          if (r && r.name) {
            const name = String(r.name).trim();
            if (!seenLoras.has(name.toLowerCase())) {
              seenLoras.add(name.toLowerCase());
              const w = r.weight != null ? String(r.weight) : (r.strength != null ? String(r.strength) : '1.0');
              loras.push({ name, weight: w });
            }
          }
        });
      }
      const promptStr = meta.prompt ? String(meta.prompt) : '';
      const loraRegex = /<\s*lora\s*:\s*([^:>]+)(?::\s*([^>]+))?\s*>/gi;
      let lMatch;
      while ((lMatch = loraRegex.exec(promptStr)) !== null) {
        const name = lMatch[1].trim();
        if (!seenLoras.has(name.toLowerCase())) {
          seenLoras.add(name.toLowerCase());
          loras.push({ name, weight: lMatch[2] ? lMatch[2].trim() : '1.0' });
        }
      }

      const loraCard = root.querySelector('#ct-card-loras');
      const loraList = root.querySelector('#ct-loras-list');
      const loraCount = root.querySelector('#ct-loras-count');
      if (loraCard && loraList) {
        loraCard.style.display = loras.length ? 'block' : 'none';
        if (loraCount) loraCount.textContent = loras.length ? `${loras.length} LORAS` : '';
        loraList.innerHTML = loras.map(l => `
          <div class="ct-lora-pill" title="Weight: ${escapeHtml(l.weight)}">
            <span class="ct-lora-name">${escapeHtml(l.name)}</span>
            <span class="ct-lora-weight">${escapeHtml(l.weight)}</span>
          </div>
        `).join('');
      }

      const stats = [];
      if (item.baseModel) stats.push(['Base Model', item.baseModel]);
      if (meta.Model) stats.push(['Checkpoint', meta.Model]);
      const res = meta.Size || (meta.width && meta.height ? `${meta.width}x${meta.height}` : '');
      if (res) stats.push(['Resolution', res]);
      if (meta.steps != null) stats.push(['Steps', meta.steps]);
      const cfg = meta.cfgScale ?? meta['CFG scale'] ?? meta.cfg_scale;
      if (cfg != null) stats.push(['CFG Scale', cfg]);
      if (meta.sampler) stats.push(['Sampler', meta.sampler]);
      const clip = meta.clipSkip ?? meta['Clip skip'];
      if (clip != null) stats.push(['Clip Skip', clip]);
      if (meta.seed != null) stats.push(['Seed', meta.seed]);

      const paramsCard = root.querySelector('#ct-card-params');
      const grid = root.querySelector('#ct-params-grid');
      if (paramsCard && grid) {
        paramsCard.style.display = stats.length ? 'block' : 'none';
        grid.innerHTML = stats.map(([label, value]) => `
          <div class="ct-stat-cell">
            <div class="ct-stat-header">${escapeHtml(label)}</div>
            <div class="ct-stat-data">${escapeHtml(value)}</div>
          </div>
        `).join('');
      }
    }

    bindCopyAction(btnSel, textSel) {
      const btn = this.inspectorBody.querySelector(btnSel);
      if (!btn) return;
      btn.addEventListener('click', () => {
        const text = this.inspectorBody.querySelector(textSel)?.textContent || '';
        navigator.clipboard.writeText(text).then(() => {
          btn.innerHTML = `${ICONS.check} <span>Copied</span>`;
          setTimeout(() => { btn.innerHTML = `${ICONS.copy} <span>Copy</span>`; }, 1600);
        }).catch(() => {});
      });
    }

    async fetchCivitaiMeta(item) {
      if (!item || item.metaLoaded || item.metaFetching) return;
      item.metaFetching = true;

      try {
        const res = await fetch(`https://civitai.com/api/v1/images?imageId=${encodeURIComponent(item.imageId)}`, {
          credentials: 'omit'
        });
        if (!res.ok) throw new Error('API failed');
        const data = await res.json();
        const info = data.items && data.items[0];

        let meta = (info && info.meta) || {};
        if (typeof meta === 'string') {
          try { meta = JSON.parse(meta); } catch (_) { meta = {}; }
        }

        item.meta = (meta && typeof meta === 'object') ? meta : {};
        item.baseModel = (info && info.baseModel) || '';
        if (info && info.username) item.username = info.username;
        item.metaLoaded = true;

        if (this.items[this.currentIndex] === item && this.isInspectorOpen) {
          this.renderMetaFields(item);
        }
      } catch (_) {
        if (this.items[this.currentIndex] === item && this.isInspectorOpen) {
          const pEl = this.inspectorBody.querySelector('#ct-prompt-text');
          if (pEl) pEl.textContent = 'Standard generation telemetry: Civitai Community Showcase.';
        }
      } finally {
        item.metaFetching = false;
      }
    }

    downloadCurrent() {
      const item = this.items[this.currentIndex];
      if (!item) return;

      const href = sanitizeMediaUrl(item.rawUrl || item.url);
      if (!href) return;

      const a = document.createElement('a');
      a.href = href;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      const ext = item.type === 'video' ? 'mp4' : 'jpg';
      a.download = `civitai_${item.imageId || this.currentIndex}_${item.username || 'art'}.${ext}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    openExternal() {
      const item = this.items[this.currentIndex];
      if (!item) return;

      let targetUrl = '';
      if (item.imageId) {
        targetUrl = `https://civitai.com/images/${encodeURIComponent(item.imageId)}`;
      } else if (item.postId) {
        targetUrl = `https://civitai.com/posts/${encodeURIComponent(item.postId)}`;
      } else if (item.civitaiUrl) {
        targetUrl = item.civitaiUrl;
      } else if (item.decomfySlug) {
        targetUrl = `https://decomfy.com/${encodeURIComponent(item.decomfySlug)}/`;
      } else {
        targetUrl = sanitizeMediaUrl(item.rawUrl || item.url);
      }

      if (!targetUrl) return;
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }

    updateCounter() {
      if (this.counterEl) {
        this.counterEl.textContent = `${this.currentIndex + 1} / ${this.items.length}`;
      }
      const item = this.items[this.currentIndex];
      if (this.headerCivitaiPill) {
        if (item && item.imageId) {
          this.headerCivitaiPill.href = `https://civitai.com/images/${encodeURIComponent(item.imageId)}`;
          if (this.headerCivitaiText) this.headerCivitaiText.textContent = `Civitai #${item.imageId}`;
          this.headerCivitaiPill.style.display = 'inline-flex';
        } else if (item && item.postId) {
          this.headerCivitaiPill.href = `https://civitai.com/posts/${encodeURIComponent(item.postId)}`;
          if (this.headerCivitaiText) this.headerCivitaiText.textContent = `Civitai Post #${item.postId}`;
          this.headerCivitaiPill.style.display = 'inline-flex';
        } else if (item && item.civitaiUrl) {
          this.headerCivitaiPill.href = item.civitaiUrl;
          if (this.headerCivitaiText) this.headerCivitaiText.textContent = 'Civitai';
          this.headerCivitaiPill.style.display = 'inline-flex';
        } else {
          this.headerCivitaiPill.style.display = 'none';
        }
      }
    }
  }

  // Initialize on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new CivitaiTheater());
  } else {
    new CivitaiTheater();
  }
})();