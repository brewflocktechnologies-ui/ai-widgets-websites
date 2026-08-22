import html from '../index.html?raw';
import appStyles from '../styles.css?inline';
import litStyles from '../../chatwidget_components_lit/public/style.css?inline';
import scriptsSource from '../scripts.js?raw';

// Origin this remote is served from (e.g. http://localhost:5001). Used so
// preset/config fetches resolve against the remote, not the host page origin.
const REMOTE_ORIGIN = new URL(import.meta.url).origin;

const CDN = {
  fonts:
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;600;700;800&family=Fira+Code:wght@400;500&display=swap',
  tailwind: 'https://cdn.tailwindcss.com',
  lucide: 'https://unpkg.com/lucide@latest',
  alpine: 'https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js',
  chatWidget:
    'https://brewflocktechnologies-ui.github.io/ai-widgets-websites/dist/chat-widget.js',
};

function runInFrameClassic(doc, code) {
  const s = doc.createElement('script');
  s.textContent = code;
  doc.head.appendChild(s);
}

/**
 * Mounts the full customization UI into `el`, entirely inside an <iframe>.
 *
 * Everything (project CSS, Tailwind Preflight, Alpine, fonts, lucide, the chat
 * widget, scripts.js) runs in the iframe's own document, so nothing leaks into
 * or overrides the host Next.js page (this fixes the sidebar's active button
 * background turning transparent). The iframe is built from a single srcdoc
 * document and scripts.js is executed exactly once on `load`, which avoids the
 * double-evaluation race that happens when mount() is async under React's
 * StrictMode (otherwise `const MSG_LABELS` etc. throw "already declared").
 */
export async function mount(el) {
  if (!el || el.dataset.cwMounted === 'true') return;
  el.dataset.cwMounted = 'true';

  // Parse the FULL document and rebuild only the <head> with our inlined CSS
  // and CDN deps. The <html>/<body> elements (especially the body's
  // `chatwidget-customization-app` class, which carries the CSS variables and
  // `height:100vh; overflow:hidden`) MUST be preserved, otherwise the layout
  // falls back to natural document height and the page scrolls slightly.
  const doc = new DOMParser().parseFromString(html, 'text/html');

  doc.head.innerHTML = `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Widget Customization</title>
    <style>${litStyles}</style>
    <style>${appStyles}</style>
    <link rel="stylesheet" href="${CDN.fonts}">
    <script>window.tailwind = window.tailwind || {}; window.tailwind.config = { darkMode: 'class', theme: { extend: { colors: { primary: '#0b5fff' } } } };</script>
    <script src="${CDN.tailwind}"></script>
    <script src="${CDN.lucide}"></script>
    <script defer src="${CDN.chatWidget}"></script>
    <script defer src="${CDN.alpine}"></script>
  `;

  const frameHtml = '<!DOCTYPE html>\n' + doc.documentElement.outerHTML;

  const iframe = document.createElement('iframe');
  iframe.className = 'cw-customization-frame';
  iframe.setAttribute('title', 'Widget Customization');
  iframe.style.cssText = 'width:100%;height:100%;border:0;display:block;background:#fff;';

  iframe.onload = () => {
    const doc = iframe.contentDocument;
    const win = iframe.contentWindow;
    if (!doc || !win || win.__CW_INITIALIZED__) return;
    win.__CW_INITIALIZED__ = true;
    win.__CUSTOMIZATION_ASSET_BASE__ = `${REMOTE_ORIGIN}/`;

    try {
      win.lucide && win.lucide.createIcons();
    } catch (e) {
      /* non-fatal */
    }

    // scripts.js runs as a classic script so its top-level functions
    // (triggerNotifPreviewUpdate, updateNotifCounter, etc.) are global on the
    // iframe window and the markup's inline handlers can find them.
    runInFrameClassic(doc, scriptsSource);
  };

  iframe.srcdoc = frameHtml;
  el.appendChild(iframe);
}

export function unmount(el) {
  if (!el) return;
  el.innerHTML = '';
  delete el.dataset.cwMounted;
}
