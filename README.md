# Civitai Theater: Fullscreen Media Slideshow (v2.1 Pro)

[![Version](https://img.shields.io/badge/version-2.1.1-blue.svg)](https://github.com/HoangYell/civitai-theater)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Dependencies: 0](https://img.shields.io/badge/dependencies-0-brightgreen.svg)](package.json)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

A high-definition, cinema-grade fullscreen media player and slideshow experience engineered for [Civitai](https://civitai.com), [Civitai Red](https://civitai.red), and [Decomfy Lab](https://decomfy.com). Converts scattered feed cards, model showcases, and community galleries into an uninterrupted, luxury presentation with VisionOS floating glassmorphism, 3-panel widescreen cinema stage, interactive pan and zoom, a collapsible bottom filmstrip carousel, zero-empty preloader, video playback, live prompt telemetry, and 1-click ComfyUI workflow decompilation.

![Civitai Theater Slideshow](https://raw.githubusercontent.com/HoangYell/civitai-theater/main/store-assets/screenshot_1_theater_1280x800.png)

---

## ⚡ Key Capabilities

- **3-Panel Widescreen Cinema Stage (Before & After Flanks)**: When browsing portrait artworks on widescreen displays (>=1024px), dynamic flanking preview cards fill empty side margins with Before (previous) and After (next) artworks. Click either flank to step through the collection with continuous visual context.
- **Zero-Empty Preloader & LRU Memory Cache**: Bidirectional background preloading (+3/-2 slides) with a true recency-aware LRU memory cache (capped at 24 entries) and instant thumbnail preview fallback. Ensures 0ms responsiveness with zero blank or black voids during network fetches.
- **Strict Media Harvesting (Junk & Badge Purge)**: Multi-tier filtering that isolates genuine community artworks while strictly eliminating buzz icons, cosmetic flair, reactions, avatar badges, and decorative UI elements.
- **Clean Tooltip-Free Interface**: Eliminates intrusive native browser tooltip boxes ("Next Slide", "Previous Slide") in favor of clean `aria-label` accessibility standards.
- **VisionOS Floating Glassmorphism Dock**: Floating pill dock featuring `backdrop-filter: blur(28px)`, subtle 1px border lines, and dual-layer ambient lighting that diffuses colors from active artwork into the surroundings.
- **Interactive Pan & Zoom (1x to 4x)**: Double-click or mouse-wheel zoom into delicate prompt details, high-frequency anime line art, or photo textures. Drag to pan seamlessly across the image.
- **Collapsible Bottom Filmstrip Carousel (`T` Key)**: Live thumbnail scrubber anchored above the dock. Browse upcoming slides, jump to any creation with 1 click, or collapse it for pure minimalism.
- **Zen Mode (`H` Key)**: Instantly hides all HUD overlays, docks, and top bars for an unobstructed art installation experience.
- **Automatic Resolution Elevation**: Automatically strips Civitai CDN downscale constraints (`/width=450/`, `/width=800/`) and upgrades image URLs to crisp 2048px high-DPI or raw uncompressed quality.
- **Native Video & Audio Engine**: Autoplays animated and video creations (`.mp4`, `.webm`, transcode streams) with volume toggle (`M`), loop controls, and intelligent slide advancement when clips finish.
- **Live Generation Specs & Telemetry (`I` Key)**: Xcode-inspired dark side drawer displaying positive prompt, negative prompt, checkpoint model, steps, sampler, seed, and CFG scale with 1-click token copy buttons.
- **Infinite Feed Auto-Harvesting**: Observes the page with a debounced `MutationObserver`. As you approach the end of loaded items, it triggers background viewport scrolling so your slideshow never ends.
- **1-Click ComfyUI Decompilation ([Decomfy.com](https://decomfy.com))**: Integrated with Decomfy Lab. Jump straight from any artwork or prompt into Decomfy's missing node auto-resolver and visual execution DAG.
- **100% Vector Iconography**: Pure Lucide SVG vector icons throughout. Zero raw emojis or pixelated glyphs.

---

## 🚀 Installation & Delivery Formats

### Option 1: Userscript (Tampermonkey / Violentmonkey)

1. Install **Tampermonkey** or **Violentmonkey** in your browser (Chrome, Firefox, Edge, Brave, Arc, Safari/Orion).
2. Install the userscript directly from GitHub or local file:
   - File: `dist/civitai-theater.user.js`
3. Open any feed on [Civitai.com](https://civitai.com/images) or [Civitai.red](https://civitai.red).
4. Click the floating **Theater** pill in the bottom-right corner or press **Alt + S**.

---

### Option 2: 1-Click Browser Bookmarklet (Zero Extensions Required)

Works in any desktop or mobile browser without installing extensions:

1. Open `dist/bookmarklet.html` in your browser.
2. Drag the **Civitai Theater** button to your Bookmarks Toolbar.
3. Whenever you are browsing Civitai, click the bookmarklet to transform the page into a fullscreen slideshow.

Alternatively, paste the contents of `dist/bookmarklet.js` directly into your browser DevTools Console.

---

### Option 3: Chrome / Chromium Extension (Manifest V3)

A native browser extension package is ready for developer loading and Chrome Web Store submission:

1. Open `chrome://extensions` in your Chromium browser (Chrome, Brave, Edge).
2. Enable **Developer mode** (top right toggle).
3. Click **Load unpacked** and select the `extension/` directory.
4. Click the extension toolbar icon on Civitai to view detected artworks and launch Theater mode with 1 click.
5. The pre-packaged submission archive is located at `dist/civitai-theater-extension.zip`.

---

## ⌨️ Keyboard & Touch Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Alt + S` | Launch Civitai Theater from any Civitai page |
| `Space` | Toggle Play / Pause |
| `Right Arrow` / `J` / `Enter` | Next Slide |
| `Left Arrow` / `K` | Previous Slide |
| `T` | Toggle Bottom Filmstrip Scrubber |
| `I` | Toggle Generation Specs & Telemetry Drawer |
| `H` | Toggle Zen Mode (Hide all HUD overlays) |
| `Double Click` / `Wheel` | Zoom In / Out (1x to 4x) |
| `Click & Drag` | Pan around when zoomed in |
| `F` | Toggle True Browser Fullscreen |
| `S` | Toggle Shuffle (Randomized Order) |
| `M` | Toggle Video Sound Mute / Unmute |
| `D` | Download Current Media in Highest Resolution |
| `O` or `V` | Open Original Civitai Post / Image in New Tab |
| `1` to `5` | Speed Presets (3s, 5s, 8s, 12s, Manual) |
| `Escape` | Reset Zoom / Close Drawers / Exit Theater Mode |
| `Swipe Left / Right` | Touch Navigation on Mobile / Tablet Devices |

---

## 🏗️ Repository Layout

```
civitai-theater/
├── userscript/
│   └── civitai-theater.user.js   # Production Userscript (Tampermonkey/Violentmonkey)
├── extension/
│   ├── manifest.json             # Manifest V3 configuration (v2.1.1)
│   ├── content.js                # Extension content script engine
│   ├── popup.html                # Modern toolbar launcher popup
│   ├── popup.js                  # Extension message dispatcher
│   └── icons/                    # Scalable vector and raster icons (16, 48, 128)
├── dist/
│   ├── civitai-theater.user.js   # Standalone userscript distribution
│   ├── bookmarklet.js            # Raw javascript: URI bookmarklet string
│   ├── bookmarklet.html          # Drag-and-drop bookmarklet installation page
│   └── civitai-theater-extension.zip # Chrome Web Store submission package
├── store-assets/
│   ├── STORE_LISTING.md          # Copy-paste submission metadata & privacy declarations
│   ├── screenshot_1_theater_1280x800.png # Fullscreen slideshow screenshot
│   ├── screenshot_2_specs_1280x800.png   # Generation specs inspector screenshot
│   ├── screenshot_3_feed_1280x800.png    # Feed launcher screenshot
│   ├── promo_tile_440x280.png    # Small promo tile
│   ├── marquee_tile_1400x560.png # Marquee promotional banner
│   └── icon_128x128.png          # High-resolution store icon
├── test/
│   ├── index.html                # Interactive test gallery simulating Civitai feeds
│   ├── audit.mjs                 # Automated Chrome CDP visual test harness
│   └── media/                    # Sample test images and video clips
├── LICENSE                       # MIT License (Hoang Yell)
└── README.md
```

---

## 🛠️ Development & Building

Civitai Theater has zero npm dependencies and builds with native Node.js:

```bash
# Clone the repository
git clone https://github.com/HoangYell/civitai-theater.git
cd civitai-theater

# Run syntax, manifest, and repository hygiene tests
npm test

# Build userscript, extension content script, bookmarklet, and distribution zip
npm run build

# Run automated Chrome DevTools Protocol visual audit suite
npm run test:visual
```

---

## 🧪 Visual Verification Ground Truth

Verified across all viewport tiers via Chrome DevTools Protocol:

- **Desktop (1440x900 & 1280x800)**: Clean centered stage, ambient backdrop glow, floating VisionOS glassmorphism dock, bottom filmstrip carousel, responsive side drawer.
- **Tablet (768x1024)**: Responsive touch controls, edge margin safety, zero collision.
- **Mobile (390x844)**: Single-row bottom controls, zero text truncation, zero horizontal overflow.

---

## ❓ Frequently Asked Questions

### How do I launch Civitai Theater?
Click the floating **Theater** pill at the bottom-right corner of any Civitai or Decomfy page, click the extension toolbar icon, or press **Alt + S** on your keyboard.

### Does it work with adult or NSFW content?
Yes. Civitai Theater inherits and respects your personal Civitai account preferences. Whatever images or videos are loaded in your current session will appear in the slideshow without censorship.

### Can I copy generation prompts and model specs?
Yes. Press the **I** key to open the Inspector drawer and click **Copy** next to positive or negative prompts, checkpoints, samplers, seeds, or CFG scale.

### How do I decompile ComfyUI workflows from Civitai artworks?
When viewing an artwork, press **I** to open the Inspector and click **Decompile on Decomfy.com** to automatically analyze embedded PNG metadata, inspect node graphs, and resolve missing custom nodes on Decomfy Lab.

### Does Civitai Theater track my browsing or collect data?
No. Civitai Theater is 100% client-side and open-source under the MIT License. Zero analytics, zero cookies, zero external server tracking. All operations happen directly in your browser.
