## Overview: The Problem with Infinite Masonry Feeds

Civitai is home to the most jaw-dropping generative art in the world. Whether you are studying intricate Flux.1 details, SDXL anime line art, or cinematic Wan 2.1 video loops, you inevitably hit the same friction points:

1. **CDN Thumbnail Downscaling**: Feeds serve aggressive CDN downscaled thumbnails (`/width=450/` or `/width=800/`). To see the true uncompressed quality, you have to click every single image into a modal.
2. **Modal Fatigue & Context Loss**: Opening individual image modals interrupts your browsing flow, breaks your scroll position, and clutters your history.
3. **Buried Generation Telemetry**: Finding positive prompts, negative prompts, CFG scales, and active LoRA hashes requires digging through nested Mantine accordions.
4. **The Sharing Dilemma**: When you find a stunning multi-image album and want to share it with a collaborator on Discord, X, or Telegram, sending the raw Civitai URL drops them into a cluttered feed view rather than a clean, hands-free slideshow.

**Civitai Theater v2.2 Pro** solves all of these bottlenecks. It transforms any Civitai feed, profile showcase, or model gallery into an immersive, cinema-grade 4K fullscreen slideshow with dynamic 3-panel widescreen stages, prompt telemetry, 4x pan-zoom, and 1-click universal web sharing via Decomfy.

![Civitai Theater 3-Panel Cinema Slideshow](https://raw.githubusercontent.com/HoangYell/civitai-theater/main/store-assets/screenshot_1_theater_1280x800.png)

---

## 45-Word Quick Answer (Civitai Theater)

Civitai Theater transforms scattered Civitai feeds into a cinema-grade fullscreen slideshow. Press `Alt + S` or click the floating pill to launch uncompressed 4K viewing, inspect prompt telemetry and AutoV2 LoRAs (`I`), scrub thumbnails (`T`), or press `Shift + C` to share instantly via Decomfy.

---

## Key Capabilities & Architectural Breakthroughs

### 1. 3-Panel Widescreen Cinema Stage
When viewing portrait creations on desktop monitors (>=1024px), conventional viewers leave ugly black bars on the sides. Civitai Theater automatically deploys **dynamic Before and After flanking cards** on the left and right. Flanks display the preceding and subsequent artworks with subtle backdrop blur, providing continuous album context. Clicking either flank immediately steps to that slide.

### 2. Universal 1-Click Sharing via Decomfy (`Shift + C`)
The marquee capability of v2.2 Pro is **Zero-Install Web Sharing**. When you press `Shift + C` or click **Share via Decomfy**:
- It instantly generates a universal web link formatted as `https://decomfy.com/theater?url=<civitai_url>`.
- The link is automatically copied to your clipboard.
- Anyone who opens your link (colleagues, friends on mobile or tablet) immediately watches the full album in fullscreen cinema mode with zero extensions or plugins required.

![1-Click Universal Sharing via Decomfy](https://raw.githubusercontent.com/HoangYell/civitai-theater/main/store-assets/screenshot_2_share_decomfy_1280x800.png)

### 3. Generation Specs & AutoV2 LoRA Telemetry (`I Key`)
No more clicking through nested accordions. Pressing `I` opens an Xcode-inspired dark side drawer directly overlaying the stage:
- **Base Checkpoint**: Cleanly identifies base architectures (Flux.1 Dev/Schnell, SDXL, SD 1.5, Illustrious).
- **Positive & Negative Prompts**: Formatted in high-contrast monospace with 1-click clipboard copy buttons.
- **Active LoRA Stack**: Automatically parses embedded AutoV2 hashes and weights (e.g. `<lora:name:0.85>`).
- **Technical Sampler Grid**: Steps, Sampler, Seed, CFG Scale, and Resolution at a glance.
- **Decompile on Decomfy**: 1-click button to jump directly to Decomfy Lab, inspect embedded ComfyUI node graphs, and resolve missing custom nodes.

![Full Generation Specs and LoRA Weights](https://raw.githubusercontent.com/HoangYell/civitai-theater/main/store-assets/screenshot_3_specs_1280x800.png)

### 4. Interactive 4x Pan-Zoom & Filmstrip Scrubber (`T Key`)
- **Deep Pixel Inspection**: Double-click or roll your mouse wheel to zoom smoothly from 1x to 4x. Click and drag to pan across high-frequency details, eye reflections, and skin micro-textures.
- **Collapsible Filmstrip**: Press `T` to toggle the bottom thumbnail carousel. Browse up to 100+ album items with an active electric-cyan glow indicator and jump to any slide instantly.

![Interactive 4x Pan-Zoom and Filmstrip Scrubber](https://raw.githubusercontent.com/HoangYell/civitai-theater/main/store-assets/screenshot_4_filmstrip_zoom_1280x800.png)

### 5. Automatic CDN Resolution Elevation
Civitai thumbnails are restricted by CDN query parameters. Civitai Theater inspects media URLs in real-time, strips downscaling constraints (`/width=450/`, `/width=800/`), and requests uncompressed 2048px or original raw quality assets directly from the origin CDN.

### 6. VisionOS Floating Glass Dock
Floating pill dock engineered with Apple VisionOS glassmorphism:
- Play/Pause toggle (`Space`)
- Step Forward/Backward (`J` / `K` or Arrow keys)
- Speed Presets (`3s`, `5s`, `8s`, `12s`, `Manual`)
- Shuffle Mode (`S`)
- Video Audio Toggle (`M`)
- Zen Mode (`H`): Hides all HUD controls for pure exhibition viewing

![Instant Extension Popup and Feed Scanner](https://raw.githubusercontent.com/HoangYell/civitai-theater/main/store-assets/screenshot_5_feed_popup_1280x800.png)

---

## 4 Ways to Use Civitai Theater

Choose the delivery method that best fits your workflow:

### Option A: Official Chrome Web Store Extension (Recommended)
Install the certified, 1-click extension directly from Google:
👉 **[Civitai Theater on Chrome Web Store](https://chromewebstore.google.com/detail/civitai-theater-fullscree/ccfibckanaokflmicjfginfkadhgcnif)**

- Auto-activates on `civitai.com`, `civitai.red`, and `decomfy.com`.
- Adds toolbar launcher popup and floating feed button.
- Global browser hotkeys enabled (`Alt + Shift + S`).

### Option B: 1-Click Drag-and-Drop Bookmarklet (Zero Extension)
If you are on Safari, Firefox, Edge, or a locked-down workstation:
1. Open the **[Bookmarklet Installer](https://raw.githubusercontent.com/HoangYell/civitai-theater/main/dist/bookmarklet.html)**.
2. Drag the **Civitai Theater** button to your Bookmarks Bar.
3. On any Civitai page, click the bookmark to trigger the fullscreen player instantly.

### Option C: Userscript (Tampermonkey / Violentmonkey)
Prefer managing scripts via a userscript manager?
- Install directly from GitHub: **[civitai-theater.user.js](https://raw.githubusercontent.com/HoangYell/civitai-theater/main/dist/civitai-theater.user.js)**
- Works with Tampermonkey, Violentmonkey, and Greasemonkey across all desktop browsers.

### Option D: Zero-Install Web Player at Decomfy.com
Want to view any Civitai post album without installing anything at all?
- Navigate to **[decomfy.com/theater](https://decomfy.com/theater/)**.
- Paste any Civitai image URL, post album link, or ID.
- Hit Enter to launch the cinema slideshow directly in your browser.

---

## Pro Keyboard & Touch Hotkey Reference

| Hotkey | Action | Description |
|---|---|---|
| `Alt + S` | **Launch Theater** | Open slideshow from any Civitai page |
| `Space` | **Play / Pause** | Toggle auto-advancing slideshow |
| `Right Arrow` / `J` / `Enter` | **Next Slide** | Advance to next artwork |
| `Left Arrow` / `K` | **Previous Slide** | Return to previous artwork |
| `Shift + C` | **Share via Decomfy** | Copy universal web link to clipboard |
| `I` | **Toggle Inspector** | Open generation telemetry and LoRA drawer |
| `T` | **Toggle Filmstrip** | Open or close bottom thumbnail scrubber |
| `H` | **Zen Mode** | Hide all HUD overlays, docks, and counters |
| `Double-Click` / `Scroll` | **Pan & Zoom** | Zoom from 1x to 4x into image details |
| `Click & Drag` | **Pan Canvas** | Navigate across zoomed canvas |
| `F` | **Fullscreen** | Toggle native browser fullscreen |
| `S` | **Shuffle** | Toggle randomized slide playback |
| `M` | **Mute / Unmute** | Toggle audio on video creations |
| `D` | **Download** | Save current image or video in 4K resolution |
| `O` or `V` | **Open Post** | Open original Civitai post in a new tab |
| `1` to `5` | **Speed Presets** | Set interval to 3s, 5s, 8s, 12s, or Manual |
| `Esc` | **Exit / Close** | Reset zoom, close drawers, or exit player |
| `Swipe Left / Right` | **Touch Nav** | Gesture navigation on iPads and tablets |

---

## Privacy, Security & Open Source Standard

Civitai Theater is built on zero-trust, client-side engineering:
- **100% Client-Side**: Operates entirely within your local browser context.
- **Zero Tracking**: Zero analytics, zero telemetries, zero third-party tracking pixels.
- **Strict Permission Hygiene**: Requests zero background storage or unnecessary browser permissions.
- **Clean Focus**: When closed, the overlay is completely inert (`display: none !important`), never trapping tab focus or breaking native Civitai profile menus.

Contribute, inspect source code, or report issues on GitHub:
👉 **[GitHub Repository: HoangYell/civitai-theater](https://github.com/HoangYell/civitai-theater)**

---

## Supported Ecosystem Platforms

- **Civitai.com** (Main Showcase Feed)
- **Civitai.red** (Mature & Unfiltered Community Creations)
- **Civitai.blue** (Civitai Development Mirrors)
- **Decomfy.com** (ComfyUI Workflow Lab & Universal Theater Hub)
