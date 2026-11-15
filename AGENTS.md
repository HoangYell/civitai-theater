# Civitai Theater Agent Directives

## Modern Web Guidance Standard
- **Native Platform Primitives**: Strictly enforce native browser standards over custom JS wrappers and polyfills:
  - `<dialog>` with `.showModal()`, `::backdrop`, and native Escape cancellation for theater settings and prompt inspectors.
  - Popover API (`popover="auto"` or `popover="hint"`) with `popovertarget` for overlay tooltips and quick actions.
  - CSS Anchor Positioning (`anchor-name`, `position-anchor`) for floating action badges.
  - `@starting-style` and `transition-behavior: allow-discrete` for zero-JS entrance/exit transitions.
  - Zero `role="button"` or `tabindex="0"` on non-semantic `div` or `span` elements.
  - Zero manual `getBoundingClientRect()` loops in scroll listeners.
- **Guidance Retrieval**: Run `DISABLE_TELEMETRY=1 npx -y modern-web-guidance search "<query>"` before writing ad-hoc web UI components.
- **Audit Tooling**: Run `DISABLE_TELEMETRY=1 npx -y modern-web-guidance legacy-scan` to audit components.
