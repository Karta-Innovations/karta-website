/**
 * Runs before first paint, ahead of hydration. `data-js` lets the stylesheet
 * hold scroll reveals back only when script is actually running, so nothing
 * stays hidden without it.
 */
const SCRIPT = `document.documentElement.setAttribute('data-js','');`;

export function BootScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} suppressHydrationWarning />;
}
