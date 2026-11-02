If you spend any significant time browsing Civitai, you already know the frustration: you are scrolling through an endless masonry wall of thumbnails, clicking one image, waiting for the modal to open, closing it, losing your place on the page, and doing it all over again.

On top of that, Civitai serves downscaled previews (`/width=450/` or `/width=800/`) by default to save bandwidth. Unless you open every single image directly, you rarely get to see the actual sharpness and detail of what the creator rendered.

I built **Civitai Theater** to fix this. It turns any Civitai feed, creator showcase, or post album into a clean, fullscreen slideshow with automatic 4K CDN resolution, live prompt telemetry, 4x pan-zoom, and 1-click web sharing.

![Civitai Theater 3-Panel Cinema Slideshow](https://raw.githubusercontent.com/HoangYell/civitai-theater/main/store-assets/screenshot_1_theater_1280x800.png)

---

## What is New in v2.2: 1-Click Universal Sharing (`Shift + C`)

The biggest feature in this update solves a problem we all run into when sharing AI art:

When you find a multi-image showcase or creator album that you want to send to a friend on Discord, X, or Telegram, sending the regular Civitai link drops them onto a busy page where they have to click through cards one by one.

With v2.2, just press **`Shift + C`** (or click the **Share via Decomfy** button in the top bar or inspector).

It copies a clean link formatted like this:
`https://decomfy.com/theater?url=https://civitai.com/images/143363839`

![1-Click Universal Sharing via Decomfy](https://raw.githubusercontent.com/HoangYell/civitai-theater/main/store-assets/screenshot_2_share_decomfy_1280x800.png)

### Why this is huge:
- **Zero installation required for the recipient**: Anyone who opens that link gets a fullscreen theater slideshow running directly in their browser at `decomfy.com/theater`.
- **Works everywhere**: Desktop, iPhone, iPad, Android. No extensions, no userscripts, and no accounts needed.
- **Full album playback**: It fetches the complete post album with smooth keyboard navigation, full image resolution, and prompt specs intact.

---

## Core Features Breakdown

### 1. 3-Panel Widescreen Stage
When viewing vertical portraits on a widescreen monitor, most media viewers leave empty black voids on both sides. Civitai Theater automatically places **dynamic Before and After cards** on the left and right. They show the previous and next images in the album with subtle depth blur. You can click either side to jump straight to that artwork.

### 2. Full Generation Telemetry & AutoV2 LoRA Hashes (`I` key)
No more digging through Civitai accordions to find out how an image was made. Hit the **`I`** key to pull up an Xcode-style side drawer:
- **Base Checkpoint**: Instantly identifies if it is Flux.1, SDXL, Illustrious, or SD 1.5.
- **Positive & Negative Prompts**: Formatted in high-contrast monospace with individual 1-click copy buttons.
- **Active LoRA Stack**: Automatically parses embedded AutoV2 hashes and weights (e.g., `korean_beauty_v2: 0.85`).
- **Generation Settings**: Steps, Sampler, Seed, CFG Scale, and original dimensions.
- **Decompile on Decomfy**: If the image contains ComfyUI workflow metadata, one click takes you to Decomfy Lab to inspect the node graph and download the JSON.

![Full Generation Specs and LoRA Weights](https://raw.githubusercontent.com/HoangYell/civitai-theater/main/store-assets/screenshot_3_specs_1280x800.png)

### 3. Interactive 4x Pan & Zoom
AI art is all about the fine details: eye reflections, hair strands, fabric textures, and hands.
- Double-click or use your mouse scroll wheel to zoom anywhere from 1x to 4x.
- Click and drag to pan across the canvas.
- Double-click again or press `Esc` to reset back to normal view.

### 4. Bottom Filmstrip Scrubber (`T` key)
Press **`T`** to toggle the bottom thumbnail scrubber. It displays upcoming images in the album with an active cyan glow on the current slide, letting you jump to any picture without having to step through them sequentially.

![Interactive 4x Pan-Zoom and Filmstrip Scrubber](https://raw.githubusercontent.com/HoangYell/civitai-theater/main/store-assets/screenshot_4_filmstrip_zoom_1280x800.png)

### 5. Automatic 4K CDN Resolution Elevation
Civitai feeds downscale image URLs with parameters like `/width=450/` or `/width=800/`. When Theater opens an item, it strips those downscaling constraints in real time and pulls the uncompressed 2048px or raw source file directly from the origin CDN.

### 6. Floating Glass Dock
A clean pill dock inspired by VisionOS glassmorphism sits at the bottom of the screen:
- Play / Pause (`Space`)
- Speed presets (`3s`, `5s`, `8s`, `12s`, or `Manual`)
- Shuffle mode (`S`)
- Video mute toggle (`M`)
- Zen mode (`H`): Hides every button and HUD element for an uninterrupted viewing session

![Instant Extension Popup and Feed Scanner](https://raw.githubusercontent.com/HoangYell/civitai-theater/main/store-assets/screenshot_5_feed_popup_1280x800.png)

---

## 4 Ways to Use It

Pick whichever method fits your setup best:

### 1. Chrome Web Store Extension (Official)
The easiest way if you use Chrome, Brave, or Chromium:
👉 **[Civitai Theater on Chrome Web Store](https://chromewebstore.google.com/detail/civitai-theater-fullscree/ccfibckanaokflmicjfginfkadhgcnif)**

- Works automatically on `civitai.com` and `civitai.red`.
- Adds a toolbar popup and a floating "Theater" pill at the bottom-right of feeds.
- Supports keyboard shortcut `Alt + S` to launch anytime.

### 2. 1-Click Bookmarklet (Zero Extension)
If you use Safari, Firefox, Edge, or are on a work laptop where you cannot install extensions:
1. Open the **[Bookmarklet Page](https://raw.githubusercontent.com/HoangYell/civitai-theater/main/dist/bookmarklet.html)**.
2. Drag the **Civitai Theater** button to your Bookmarks Bar.
3. When you are on any Civitai page, click the bookmark to start the theater slideshow immediately.

### 3. Userscript (Tampermonkey / Violentmonkey)
If you prefer userscripts:
- Install the script directly: **[civitai-theater.user.js](https://raw.githubusercontent.com/HoangYell/civitai-theater/main/dist/civitai-theater.user.js)**
- Works with Tampermonkey, Violentmonkey, or Greasemonkey on all major browsers.

### 4. Direct Web Player (No Install)
If you just want to view a specific Civitai link without installing anything:
- Go to **[decomfy.com/theater](https://decomfy.com/theater/)**.
- Paste any Civitai post URL, image link, or ID.
- Hit Enter to stream the slideshow directly.

---

## Keyboard Shortcuts Cheat Sheet

| Key | Action | What it does |
|---|---|---|
| `Alt + S` | **Launch** | Opens theater mode from any Civitai page |
| `Space` | **Play / Pause** | Toggle auto-advancing slideshow |
| `Right` / `J` / `Enter` | **Next** | Go to next artwork |
| `Left` / `K` | **Previous** | Go to previous artwork |
| `Shift + C` | **Share Link** | Copy universal Decomfy web link |
| `I` | **Inspector** | Toggle prompt & LoRA specs drawer |
| `T` | **Filmstrip** | Toggle bottom thumbnail scrubber |
| `H` | **Zen Mode** | Hide all UI controls and docks |
| `Double-Click` / `Scroll` | **Zoom** | Zoom from 1x to 4x |
| `Click + Drag` | **Pan** | Move around when zoomed in |
| `F` | **Fullscreen** | Enter native browser fullscreen |
| `S` | **Shuffle** | Randomize playback order |
| `M` | **Audio** | Toggle video sound on or off |
| `D` | **Download** | Save current image or video in 4K |
| `O` or `V` | **Open Post** | Open original Civitai post in new tab |
| `1` - `5` | **Speed** | Set speed preset: 3s, 5s, 8s, 12s, or Manual |
| `Esc` | **Exit** | Reset zoom, close drawers, or exit theater |

---

## Privacy & Open Source

This project is completely client-side and open-source:
- **Zero data collection**: No telemetry, no external tracking servers, no analytics scripts.
- **Strict permissions**: It does not ask for or use background storage permissions.
- **Inert when closed**: When closed, the overlay is completely removed from the active tab focus so it never breaks native Civitai menus or dropdowns.
- **Platforms**: Verified on both `civitai.com` and `civitai.red`.

Source code, issue tracking, and contributions:
👉 **[GitHub: HoangYell/civitai-theater](https://github.com/HoangYell/civitai-theater)**
