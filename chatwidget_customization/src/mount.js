import html from '../index.html?raw';
import '../styles.css';
import scriptsSource from '../scripts.js?raw';

// Origin this remote is served from (e.g. http://localhost:5001). Used so
// preset/config fetches resolve against the remote, not the host page origin.
const REMOTE_ORIGIN = new URL(import.meta.url).origin;
window.__CUSTOMIZATION_ASSET_BASE__ = `${REMOTE_ORIGIN}/`;

const CDN = {
  fonts:
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;600;700;800&family=Fira+Code:wght@400;500&display=swap',
  tailwind: 'https://cdn.tailwindcss.com',
  lucide: 'https://unpkg.com/lucide@latest',
  alpine: 'https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js',
  chatWidget:
    'https://brewflocktechnologies-ui.github.io/ai-widgets-websites/dist/chat-widget.js',
};

function loadScript(src, attrs = {}) {
  return new Promise((resolve) => {
    if (document.querySelector(`script[data-cw="${src}"]`)) return resolve();
    const s = document.createElement('script');
    s.src = src;
    s.defer = true;
    s.setAttribute('data-cw', src);
    Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
    s.onload = () => resolve();
    s.onerror = () => resolve();
    document.head.appendChild(s);
  });
}

function loadLink(href) {
  return new Promise((resolve) => {
    if (document.querySelector(`link[data-cw="${href}"]`)) return resolve();
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = href;
    l.setAttribute('data-cw', href);
    l.onload = () => resolve();
    l.onerror = () => resolve();
    document.head.appendChild(l);
  });
}

// The injected markup relies on inline handlers (onclick/onchange/...) that
// execute in the global scope, so scripts.js MUST run as a classic script
// (not an ES module) to expose its top-level functions on `window`.
function runClassicScript(code) {
  const s = document.createElement('script');
  s.textContent = code;
  document.head.appendChild(s);
}

function setTailwindConfig() {
  window.tailwind = window.tailwind || {};
  window.tailwind.config = {
    darkMode: 'class',
    theme: {
      extend: {
        colors: { primary: '#0b5fff' },
      },
    },
  };
}

/**
 * Mounts the full customization UI into `el`.
 * All assets (CSS, scripts.js, CDN deps) are pulled through this module's
 * own graph, so no root-level /scripts.js or /styles.css copies are needed.
 */
export async function mount(el) {
  if (!el || el.dataset.cwMounted === 'true') return;
  el.dataset.cwMounted = 'true';

  el.innerHTML = html;

  // Anti-flash rule for the auto-mounted body element
  if (!document.getElementById('widget-anti-flash-style')) {
    const style = document.createElement('style');
    style.id = 'widget-anti-flash-style';
    style.textContent = `
      body > cw-widget-root { display: none !important; }
      #preview-viewport-wrapper cw-widget-root { display: block !important; }
    `;
    document.head.appendChild(style);
  }

  // CDN dependencies the injected markup relies on
  await loadLink(CDN.fonts);
  await loadScript(CDN.tailwind);
  setTailwindConfig();
  await loadScript(CDN.lucide);
  await loadScript(CDN.chatWidget);
  await loadScript(CDN.alpine);

  try {
    window.lucide && window.lucide.createIcons();
  } catch (e) {
    /* non-fatal */
  }

  // scripts.js runs as a classic script so its top-level functions
  // (triggerNotifPreviewUpdate, updateNotifCounter, etc.) are global and the
  // markup's inline handlers can find them. The bottom of scripts.js
  // auto-runs initCustomizationApp() now that the DOM is present.
  runClassicScript(scriptsSource);
}

export function unmount(el) {
  if (!el) return;
  el.innerHTML = '';
  delete el.dataset.cwMounted;
}
