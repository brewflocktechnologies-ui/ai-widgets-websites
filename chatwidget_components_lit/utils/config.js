/**
 * utils/config.ts
 * Port of window.ZotlyConfig from config.js
 */
import { getWidgetBaseUrl } from './theme.js';
/**
 * Reads the client ID from window.ZOTLY_CLIENT_ID or from the widget
 * script tag's data-client-id attribute / URL query param.
 */
export function getClientId() {
    if (window.ZOTLY_CLIENT_ID)
        return window.ZOTLY_CLIENT_ID;
    const scriptTag = document.querySelector('script[data-client-id]') ||
        document.querySelector('script[src*="index.es.js"]') ||
        document.querySelector('script[src*="index.umd.js"]') ||
        document.querySelector('script[src*="index.js"]') ||
        document.querySelector('script[src*="widget.js"]');
    if (scriptTag) {
        const dataId = scriptTag.getAttribute('data-client-id');
        if (dataId)
            return dataId;
        try {
            const url = new URL(scriptTag.src, window.location.href);
            const paramId = url.searchParams.get('client_id') || url.searchParams.get('clientId');
            if (paramId)
                return paramId;
        }
        catch (_) {
            /* ignore */
        }
    }
    return 'default';
}
/**
 * Fetches the client configuration from the server (or local storage if
 * ?test=true is present in the URL for the editor preview flow).
 */
export async function fetchClientConfig(clientId) {
    // Editor preview mode: read from localStorage
    if (window.location.search.includes('test=true')) {
        const temp = localStorage.getItem('zotly_temp_preview_config');
        if (temp) {
            try {
                const data = JSON.parse(temp);
                return {
                    bubbleConfig: data.bubble || {},
                    chatConfig: data.chatWindow || data.chat || {},
                    chatbarConfig: data.chatbar || {},
                    greetWindowConfig: data.greetWindow || {},
                };
            }
            catch (err) {
                console.warn('Failed to parse temporary preview configuration:', err);
            }
        }
    }
    const baseUrl = getWidgetBaseUrl();
    const candidateUrls = [
        `${baseUrl}public/clients/${clientId}.json`,
        `${baseUrl}public/clients/default.json`,
        `./chatwidget_components_lit/public/clients/${clientId}.json`,
        `./chatwidget_components_lit/public/clients/default.json`,
        `./public/clients/${clientId}.json`,
        `./public/clients/default.json`
    ];
    for (const url of candidateUrls) {
        try {
            const res = await fetch(url);
            if (res.ok) {
                const data = await res.json();
                if (data && typeof data === 'object') {
                    return {
                        bubbleConfig: data.bubble || {},
                        chatConfig: data.chatWindow || data.chat || {},
                        chatbarConfig: data.chatbar || {},
                        greetWindowConfig: data.greetWindow || {},
                    };
                }
            }
        }
        catch (_) {
            /* try next candidate URL */
        }
    }
    return { bubbleConfig: {}, chatConfig: {}, chatbarConfig: {}, greetWindowConfig: {} };
}
//# sourceMappingURL=config.js.map