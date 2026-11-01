# Chrome Web Store Listing — Civitai Theater

> **Current Status**: `Pending review`  
> **Item ID**: `ccfibckanaokflmicjfginfkadhgcnif`  
> **Version**: `2.1.1`  
> **Last Updated**: 2026-11-01

---

## Store Listing

**Extension Name**
Civitai Theater - Fullscreen Media Slideshow

**Short Description**
Fullscreen cinema slideshow & 4K viewer for Civitai & Decomfy with 3-panel stage, pan-zoom, filmstrip, and prompt inspector.

**Category**
Art & Design (Lifestyle)

**Language**
English (United States)

**Detailed Description**
Civitai Theater transforms the traditional masonry feed of Civitai into a cinema-grade fullscreen media slideshow. Browse artwork and videos without manual clicking, enjoy pristine 2K/4K resolution upscaling, zoom into delicate details, and inspect generation prompts on the fly.

KEY CAPABILITIES:
- 3-Panel Widescreen Cinema Stage: When viewing portrait artworks on desktop screens, dynamic Before and After preview cards fill side negative space with preceding and subsequent creations.
- Zero-Empty Preloader & Memory Cache: Bidirectional caching (+3/-2) and instant thumbnail preview fallback eliminate empty blank loading states.
- VisionOS Floating Glass Dock: Floating pill dock with glassmorphism blur and ambient lighting diffusing artwork colors into the background.
- Interactive Pan & Zoom (1x to 4x): Double-click or mouse-wheel zoom into intricate details, anime line art, and textures. Click and drag to pan across the canvas.
- Collapsible Filmstrip Scrubber (T Key): Interactive bottom thumbnail carousel to jump to any slide instantly or preview upcoming creations.
- Zen Mode (H Key): Completely hides all HUD overlays and docks for a pure, distraction-free digital art exhibition.
- Automatic CDN Resolution Elevation: Strips thumbnail constraints (/width=450/, /width=800/) and upgrades URLs to crisp 2048px or uncompressed quality.
- Native Video and Audio Engine: Autoplays video creations (.mp4, .webm) with volume toggle (M) and intelligent slide advance when clips finish.
- Infinite Feed Auto-Harvesting: Automatically scrolls and loads subsequent feed batches so your slideshow never stops.
- Strict Artwork Filtering: Automatically purges junk badges, avatars, reactions, and decorative flairs to focus 100% on genuine creations.
- Live Generation Specs Inspector (I Key): Xcode-inspired dark side drawer displaying positive prompt, negative prompt, checkpoint model, steps, sampler, seed, and CFG scale with 1-click token copy buttons.
- 100% Vector Iconography: Pure Lucide SVG vector icons throughout. Zero raw emojis or pixelated glyphs.

KEYBOARD SHORTCUTS:
- Alt + Shift + S: Open Civitai Theater launcher popup
- Alt + S: Launch Civitai Theater from any Civitai page
- Space: Play / Pause
- Right Arrow / J / Enter: Next Slide
- Left Arrow / K: Previous Slide
- T: Toggle Bottom Filmstrip Scrubber
- I: Toggle Generation Specs & Telemetry Drawer
- H: Toggle Zen Mode (Hide all HUD overlays)
- Double-Click / Scroll: Zoom In / Out (1x to 4x)
- Click & Drag: Pan around when zoomed in
- F: Toggle True Browser Fullscreen
- S: Toggle Shuffle (Randomized Order)
- M: Toggle Video Sound Mute / Unmute
- D: Download Current Media in Highest Resolution
- O or V: Open Original Civitai Post in New Tab
- 1 to 5: Speed Presets (3s, 5s, 8s, 12s, Manual)
- Esc: Reset Zoom / Close Drawers / Exit Theater Mode
- Swipe Left / Right: Touch Navigation on Tablets & Mobile

PRIVACY COMMITMENT:
Civitai Theater is 100% client-side and open-source. It does NOT collect, track, or transmit any user data, cookies, or history. Zero third-party trackers, zero analytics.

---

## Graphic Assets

1. **Store Icon (128x128 PNG)**: `store-assets/icon_128x128.png`
2. **Screenshots (1280x800 PNG)**:
   - `store-assets/screenshot_1_theater_1280x800.png`
   - `store-assets/screenshot_2_specs_1280x800.png`
   - `store-assets/screenshot_3_feed_1280x800.png`
3. **Small Promo Tile (440x280 PNG)**: `store-assets/promo_tile_440x280.png`
4. **Marquee Promo Banner (1400x560 PNG)**: `store-assets/marquee_tile_1400x560.png`

---

## Privacy Practices Declarations

- **Single Purpose**: Browse Civitai images and videos in an uninterrupted fullscreen slideshow with high-resolution CDN upscaling, pan-zoom, filmstrip scrubber, and generation parameter inspection.
- **activeTab justification**: Required to detect loaded artwork elements on the currently active Civitai browser tab and trigger the fullscreen theater overlay.
- **Host permissions justification**: Required to inject the theater player on Civitai and Decomfy domains, upgrade image CDN thumbnail URLs to 2048px/raw resolution, and query public generation parameters from Civitai's API.
- **Remote Code**: None ("No, I am not using remote code").
- **Data Collection**: None.
- **Privacy Policy URL**: `https://decomfy.com/privacy/`
- **Developer Policies Certifications**: All 3 certified.

---

## Version History & Review Rectification

- **v2.1.0** (2026-10-31): Rejected under Purple Potassium policy due to requesting but not actively using `storage` permission.
- **v2.1.1** (2026-11-01): Rectified by completely removing the unused `storage` permission from `manifest.json`. Added `commands` shortcut (`Alt+Shift+S`) and updated prompt inspector with LoRA metadata extraction. Resubmitted for review (Status: `Pending review`).
