# Contributing to Civitai Theater

Thank you for your interest in contributing to **Civitai Theater**! We welcome bug fixes, performance improvements, and feature proposals that adhere to our design and architectural invariants.

---

## 🛠️ Development Setup

The repository is lightweight and requires zero npm dependencies. Node.js 18+ is recommended.

```bash
# 1. Clone the repository
git clone https://github.com/HoangYell/civitai-theater.git
cd civitai-theater

# 2. Run repository syntax & hygiene audit
npm test

# 3. Build distributions (userscript, extension, bookmarklet)
npm run build
```

---

## 📦 Single-Source Distribution Pattern

- The primary source of truth is `userscript/civitai-theater.user.js`.
- Running `npm run build` synchronizes:
  - `dist/civitai-theater.user.js` (standalone userscript)
  - `extension/content.js` (Chrome extension content script)
  - `dist/bookmarklet.js` & `dist/bookmarklet.html` (1-click bookmarklet)
  - `dist/civitai-theater-extension.zip` (Chrome Web Store submission bundle)
  - `test/index.html` (inline test harness)

Always edit `userscript/civitai-theater.user.js`, then run `npm run build` to update all downstream targets.

---

## 🎨 UI/UX Standards

- **Minimalist Aesthetic**: Deep neutral slates, subtle 1px borders, zero gaudy neon glows.
- **100% Vector Iconography**: Pure Lucide SVG vector paths. Never use raw emojis in UI buttons, docks, or navigation controls.
- **Responsive Viewports**: All components must cleanly adapt to Mobile (375-390px), Tablet (768px), and Desktop (1440px). Zero horizontal overflow or text clipping.
- **Non-Invasive Integration**: When closed, theater mode must remain completely inert (`display: none !important; pointer-events: none !important;`) and never interfere with Civitai's native navigation, modals, or user profile dropdowns.

---

## 🧪 Testing

```bash
# Fast syntax & hygiene audit
npm test

# Full Chrome CDP visual & functional verification suite
npm run test:visual
```

---

## 📜 Pull Request Guidelines

1. Ensure `npm test` passes before submitting.
2. Avoid introducing third-party runtime npm dependencies.
3. Keep commit messages descriptive (e.g. `feat(stage): ...`, `fix(preloader): ...`).
