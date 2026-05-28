/**
 * Pre-paint theme script.
 *
 * Renders an inline <script> in <head> that runs BEFORE React hydration and
 * before the first paint. Reads the saved theme from localStorage and sets
 * `data-theme` on <html> so the CSS-variable cascade applies the correct
 * palette on the very first frame - no flash-of-wrong-theme.
 *
 * Defaults to DARK if nothing is stored (intentional - preserves the brand's
 * canonical register on first visit; prefers-color-scheme is ignored by
 * design per the plan).
 */
export const THEME_STORAGE_KEY = "karta-theme";

const SCRIPT = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='light'){document.documentElement.setAttribute('data-theme','light')}else{document.documentElement.setAttribute('data-theme','dark')}}catch(e){document.documentElement.setAttribute('data-theme','dark')}})();`;

export function ThemeScript() {
  return (
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: SCRIPT }}
      // Avoid Next's hydration tracking for inline scripts.
      suppressHydrationWarning
    />
  );
}
