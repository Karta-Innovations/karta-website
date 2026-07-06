/**
 * Pre-paint boot script.
 *
 * Renders an inline <script> in <head> that runs BEFORE React hydration and
 * before the first paint. It marks <html data-js> so CSS can hide the
 * anime.js boot-choreography targets (.boot-scope [data-boot]) without ever
 * hiding content from no-JS visitors - they never get the attribute, so
 * they never get the hidden state.
 *
 * The site is dark-only: `data-theme="dark"` is set statically on <html> in
 * layout.tsx, so no theme logic runs here anymore.
 */
const SCRIPT = `document.documentElement.setAttribute('data-js','');`;

export function BootScript() {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: SCRIPT }}
      // Avoid Next's hydration tracking for inline scripts.
      suppressHydrationWarning
    />
  );
}
