/**
 * scripts/widget-injector.ts
 * Standalone injection script for Zotly Lit Chat Widget.
 * Allows embedding and hydrating the chat widget using a full JSON design token.
 */

import { mountChatWidget, injectStoreConfig, exportFullStoreConfig } from '../index.js';

export interface ZotlyWidgetApi {
  inject: (
    tokenOrUrl?: Record<string, any> | string,
    container?: HTMLElement
  ) => Promise<HTMLElement>;
  exportToken: () => Record<string, any>;
  mount: (container?: HTMLElement) => HTMLElement;
}

declare global {
  interface Window {
    ZotlyWidget?: ZotlyWidgetApi;
  }
}

/**
 * Main Injection function.
 */
export async function injectWidget(
  tokenOrUrl?: Record<string, any> | string,
  container: HTMLElement = document.body
): Promise<HTMLElement> {
  if (typeof tokenOrUrl === 'string' && tokenOrUrl !== 'storybook' && tokenOrUrl !== 'active') {
    try {
      const res = await fetch(tokenOrUrl);
      if (res.ok) {
        const token = await res.json();
        injectStoreConfig(token);
      } else {
        console.warn(`ZotlyWidget: Failed to fetch JSON token from ${tokenOrUrl}`);
      }
    } catch (err) {
      console.error('ZotlyWidget: Error loading remote JSON token:', err);
    }
  } else if (tokenOrUrl && typeof tokenOrUrl === 'object') {
    injectStoreConfig(tokenOrUrl);
  }

  return mountChatWidget(container);
}

// Attach global API on window
window.ZotlyWidget = {
  inject: injectWidget,
  exportToken: exportFullStoreConfig,
  mount: mountChatWidget
};

// Auto-initialize if script tag specifies attributes
if (typeof document !== 'undefined') {
  const currentScript =
    document.currentScript ||
    document.querySelector<HTMLScriptElement>('script[data-token-url]') ||
    document.querySelector<HTMLScriptElement>('script[data-token-json]');

  if (currentScript) {
    const tokenUrl = currentScript.getAttribute('data-token-url');
    const rawJson = currentScript.getAttribute('data-token-json');

    if (tokenUrl) {
      injectWidget(tokenUrl);
    } else if (rawJson) {
      try {
        const parsed = JSON.parse(rawJson);
        injectWidget(parsed);
      } catch (e) {
        console.error('ZotlyWidget: Failed to parse data-token-json attribute:', e);
        injectWidget();
      }
    }
  }
}
