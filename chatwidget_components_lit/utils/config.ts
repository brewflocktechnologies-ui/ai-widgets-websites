/**
 * utils/config.ts
 * Port of window.ZotlyConfig from config.js
 */

import { getWidgetBaseUrl } from './theme.js';

export interface ClientConfigs {
  bubbleConfig: Record<string, unknown>;
  chatConfig: Record<string, unknown>;
  chatbarConfig: Record<string, unknown>;
  greetWindowConfig: Record<string, unknown>;
}

/**
 * Reads the client ID from window.ZOTLY_CLIENT_ID or from the widget
 * script tag's data-client-id attribute / URL query param.
 */
export function getClientId(): string {
  if ((window as any).ZOTLY_CLIENT_ID) return (window as any).ZOTLY_CLIENT_ID;

  const scriptTag =
    document.querySelector<HTMLScriptElement>('script[data-client-id]') ||
    document.querySelector<HTMLScriptElement>('script[src*="index.es.js"]') ||
    document.querySelector<HTMLScriptElement>('script[src*="index.umd.js"]') ||
    document.querySelector<HTMLScriptElement>('script[src*="index.js"]') ||
    document.querySelector<HTMLScriptElement>('script[src*="widget.js"]');

  if (scriptTag) {
    const dataId = scriptTag.getAttribute('data-client-id');
    if (dataId) return dataId;
    try {
      const url = new URL(scriptTag.src, window.location.href);
      const paramId = url.searchParams.get('client_id') || url.searchParams.get('clientId');
      if (paramId) return paramId;
    } catch (_) {
      /* ignore */
    }
  }
  return 'default';
}

/**
 * Fetches the client configuration from the server (or local storage if
 * ?test=true is present in the URL for the editor preview flow).
 */
export async function fetchClientConfig(clientId: string): Promise<ClientConfigs> {
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
      } catch (err) {
        console.warn('Failed to parse temporary preview configuration:', err);
      }
    }
  }

  const baseUrl = getWidgetBaseUrl();
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const candidateUrls = [
    `${normalizedBase}public/clients/${clientId}.json`,
    `./public/clients/${clientId}.json`,
    `${normalizedBase}clients/${clientId}.json`,
    `./clients/${clientId}.json`,
    `${normalizedBase}public/clients/default.json`,
    `./public/clients/default.json`,
    `${normalizedBase}clients/default.json`,
    `./clients/default.json`,
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
    } catch (_) {
      /* try next candidate URL */
    }
  }

  return { bubbleConfig: {}, chatConfig: {}, chatbarConfig: {}, greetWindowConfig: {} };
}
