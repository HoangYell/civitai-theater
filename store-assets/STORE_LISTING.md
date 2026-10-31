# Chrome Web Store Listing Submission Kit (v2.1 Pro)

Ready-to-copy fields and answers for submitting **Civitai Theater** to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole).

---

## 1. Package File

Upload the pre-packaged zip archive:
- **File**: `dist/civitai-theater-extension.zip`
- **Relative Path**: `./dist/civitai-theater-extension.zip`

---

## 2. Store Listing Details

### Extension Name (Max 45 chars)
```
Civitai Theater: Fullscreen Media Slideshow
```
*(Character count: 43 / 45)*

### Summary / Short Description (Max 132 chars)
```
Fullscreen cinema slideshow & 4K viewer for Civitai & Decomfy with 3-panel stage, pan-zoom, filmstrip, and prompt inspector.
```
*(Character count: 124 / 132)*

### Category
```
Photos
```
*(Alternative: Productivity)*

### Detailed Description
```markdown
Civitai Theater transforms the scattered masonry feeds of Civitai and Decomfy into an ultra-smooth, cinema-grade 4K fullscreen slideshow. Browse community artworks, model showcases, and videos without tedious clicking, enjoy uncompressed 2048px/4K resolution upscaling, zoom into intricate generation details, copy positive/negative prompts, and decompile ComfyUI workflows in 1 click.

Whether you are exploring trending Stable Diffusion XL, Flux.1, SD 1.5, or Pony creations, Civitai Theater provides the ultimate distraction-free presentation.

KEY CAPABILITIES:

- 3-Panel Widescreen Cinema Stage: When viewing portrait artworks on desktop displays (>=1024px), dynamic Before and After flanking cards fill side negative space with preceding and subsequent creations. Click either flank to step through the collection with continuous context.
- Zero-Empty Preloader & Memory Cache: Bidirectional caching (+3/-2 slides) with an LRU memory cache and instant thumbnail preview fallback eliminate empty blank loading screens during network fetches.
- True 4K & Uncompressed Resolution Elevation: Automatically strips Civitai CDN downscale constraints (/width=450/, /width=800/) and upgrades media URLs to crisp 2048px high-DPI or raw uncompressed quality.
- Interactive Pan & Zoom (1x to 4x): Double-click or mouse-wheel zoom into intricate details, anime line art, and textures. Click and drag to pan smoothly across the canvas.
- Generation Specs & Prompt Telemetry (I Key): Xcode-inspired dark side drawer displaying positive prompt, negative prompt, checkpoint model, steps, sampler, seed, and CFG scale with 1-click token copy buttons.
- 1-Click ComfyUI Decompilation (Decomfy.com): Directly inspect and decompile embedded PNG workflows on Decomfy Lab. Extract node DAG execution graphs and resolve missing custom node packages with 1 click.
- VisionOS Floating Glass Dock: Minimalist pill dock with glassmorphism blur and dual-layer ambient lighting diffusing artwork colors into the background.
- Collapsible Filmstrip Scrubber (T Key): Interactive thumbnail carousel to jump to any slide instantly or preview upcoming creations.
- Zen Mode (H Key): Completely hides all HUD overlays, docks, and top bars for an unobstructed art exhibition.
- Native Video & Audio Engine: Autoplays video creations (.mp4, .webm) with volume toggle (M), looping controls, and intelligent slide advancement when clips finish.
- Infinite Feed Auto-Harvesting: Observes the page with a debounced MutationObserver. As you approach the end of loaded items, it triggers background viewport scrolling so your slideshow never ends.
- Non-Invasive Integration: When closed, the overlay is completely inert (display: none !important) and will never trap focus or interfere with native Civitai profile menus, popovers, or floating dropdowns.
- 100% Vector Iconography: Pure Lucide SVG vector icons throughout. Zero raw emojis or pixelated glyphs.

PRO KEYBOARD & TOUCH HOTKEYS:

- Alt + S: Launch Civitai Theater from any Civitai or Decomfy page
- Space: Play / Pause slideshow
- Right Arrow / J / Enter: Next Slide
- Left Arrow / K: Previous Slide
- T: Toggle Bottom Filmstrip Carousel
- I: Toggle Generation Specs & Prompt Telemetry Drawer
- H: Toggle Zen Mode (Hide all HUD overlays)
- Double-Click / Scroll: Zoom In / Out (1x to 4x)
- Click & Drag: Pan around when zoomed in
- F: Toggle True Browser Fullscreen
- S: Toggle Shuffle (Randomized Playback)
- M: Toggle Video Sound Mute / Unmute
- D: Download Current Media in Highest Resolution
- O or V: Open Original Civitai Post or Decomfy Recipe in New Tab
- 1 to 5: Speed Presets (3s, 5s, 8s, 12s, Manual)
- Esc: Reset Zoom / Close Drawers / Exit Theater Mode
- Swipe Left / Right: Touch Navigation on Tablets & Mobile Devices

FREQUENTLY ASKED QUESTIONS:

Q: How do I launch Civitai Theater?
A: Simply click the floating "Theater" pill at the bottom-right corner of any Civitai or Decomfy page, click the extension toolbar icon, or press Alt + S on your keyboard.

Q: Does it work with adult or NSFW content?
A: Yes. Civitai Theater respects your personal Civitai account display settings. Whatever images or videos are loaded in your current session will appear in the slideshow.

Q: Can I copy generation prompts?
A: Yes. Press the "I" key to open the Inspector drawer and click "Copy" next to positive or negative prompts.

Q: Does this extension send my data anywhere?
A: No. Civitai Theater is 100% client-side and open-source. Zero telemetry, zero analytics, zero external servers. All operations happen locally in your browser.

SUPPORTED PLATFORMS:
- Civitai.com
- Civitai.red
- Civitai.blue
- Decomfy.com (ComfyUI Workflow Lab)
```

---

## 3. Graphic Assets

All required graphics are pre-rendered to Google Chrome Web Store pixel-perfect specifications in `store-assets/`:

1. **Store Icon (128x128 PNG)**:
   - `store-assets/icon_128x128.png`
2. **Store Screenshots (Mandatory 1280x800 PNG)**:
   - `store-assets/screenshot_1_theater_1280x800.png` (Fullscreen Theater Slide with Filmstrip & Dock)
   - `store-assets/screenshot_2_specs_1280x800.png` (Generation Specs & Prompt Telemetry Drawer)
   - `store-assets/screenshot_3_feed_1280x800.png` (Civitai Feed with Floating Launcher Pill)
3. **Small Promo Tile (440x280 PNG)**:
   - `store-assets/promo_tile_440x280.png`
4. **Marquee Banner (1400x560 PNG)**:
   - `store-assets/marquee_tile_1400x560.png`

---

## 4. Privacy Practices Tab Declarations

When Google prompts for Privacy Declarations in the Developer Console, use these exact answers:

### Single Purpose Declaration
```
Browse Civitai images and videos in an uninterrupted fullscreen slideshow with high-resolution CDN upscaling, pan-zoom, filmstrip scrubber, and generation parameter inspection.
```

### Permission Justifications

- **`activeTab`**:
  ```
  Required to detect loaded artwork elements on the currently active Civitai browser tab and trigger the fullscreen theater overlay.
  ```

- **`storage`**:
  ```
  Used strictly to persist the user's playback preferences locally, such as slide duration, shuffle state, and video audio mute settings.
  ```

- **Host Permissions (`https://civitai.com/*`, `https://civitai.red/*`, etc.)**:
  ```
  Required to inject the theater player on Civitai domains, upgrade image CDN thumbnail URLs to 2048px/raw resolution, and query public generation parameters from Civitai's API.
  ```

### Data Usage
- Does the extension collect user data? **No** (Check all boxes as "Not collected").
- Does the extension sell user data? **No**.
- Does the extension use data for unrelated purposes? **No**.
