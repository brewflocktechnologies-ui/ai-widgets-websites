/**
 * utils/theme.ts
 * Port of window.ZotlyUtils from utils.js
 */
/**
 * Reads --primary-color and --secondary-color CSS variables from the host page,
 * falling back to the data-accent attribute on the widget script tag.
 */
export function getParentTheme() {
    const rootStyle = getComputedStyle(document.documentElement);
    const bodyStyle = document.body ? getComputedStyle(document.body) : null;
    let primary = rootStyle.getPropertyValue('--primary-color').trim() ||
        (bodyStyle ? bodyStyle.getPropertyValue('--primary-color').trim() : '');
    let secondary = rootStyle.getPropertyValue('--secondary-color').trim() ||
        (bodyStyle ? bodyStyle.getPropertyValue('--secondary-color').trim() : '');
    // Fall back to data-accent on the widget script tag
    const scriptTag = document.querySelector('script[data-client-id]') ||
        document.querySelector('script[src*="index.es.js"]') ||
        document.querySelector('script[src*="index.js"]') ||
        document.querySelector('script[src*="widget.js"]');
    const dataAccent = scriptTag ? scriptTag.getAttribute('data-accent') : null;
    if (!primary && dataAccent)
        primary = dataAccent;
    if (!primary)
        primary = '#0b5fff';
    if (!secondary)
        secondary = primary;
    return { primary, secondary };
}
/**
 * Determines the base URL for the widget's assets (JSON configs, etc.)
 * by inspecting the loaded script's src.
 */
export function getWidgetBaseUrl() {
    const scriptTag = document.querySelector('script[src*="index.es.js"]') ||
        document.querySelector('script[src*="index.umd.js"]') ||
        document.querySelector('script[src*="index.js"]') ||
        document.querySelector('script[src*="widget.js"]');
    if (scriptTag && scriptTag.src) {
        try {
            const scriptUrl = new URL(scriptTag.src, window.location.href);
            if (scriptUrl.pathname.includes('/dist/')) {
                return new URL('../', scriptUrl).href;
            }
            return new URL('./', scriptUrl).href;
        }
        catch (_) {
            /* ignore */
        }
    }
    if (window.location.pathname.includes('/chatwidget_components_lit/')) {
        return './';
    }
    return './chatwidget_components_lit/';
}
/**
 * Returns true when the host page currently has the dark class on <html>.
 */
export function isHostDark() {
    return document.documentElement.classList.contains('dark');
}
/**
 * Observes the host page's <html> class changes and fires a callback
 * whenever dark mode toggles. Returns an unsubscribe function.
 */
export function observeDarkMode(callback) {
    const observer = new MutationObserver(() => callback(isHostDark()));
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
    });
    return () => observer.disconnect();
}
//# sourceMappingURL=theme.js.map