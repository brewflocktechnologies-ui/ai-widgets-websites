import { describe, it, expect } from 'vitest';
import { mountChatWidget, mountChatWidgetWithToken } from '../index.js';

describe('index entry point', () => {
  it('mounts chat widget into body if no container provided', () => {
    const root = mountChatWidget();
    expect(root).toBeDefined();
    expect(root.tagName.toLowerCase()).toBe('cw-widget-root');
    expect(document.body.contains(root)).toBe(true);
  });

  it('reuses existing widget root if present in container', () => {
    const container = document.createElement('div');
    const existing = document.createElement('cw-widget-root');
    container.appendChild(existing);

    const root = mountChatWidget(container);
    expect(root).toBe(existing);
  });

  it('mounts chat widget with token hydration and handles empty token', () => {
    const container = document.createElement('div');
    const token = {
      clientName: 'Hydrated Client',
      features: { voiceCallEnabled: true },
    };

    const root = mountChatWidgetWithToken(token, container);
    expect(root).toBeDefined();
    expect(container.contains(root)).toBe(true);

    const root2 = mountChatWidgetWithToken(null as any, container);
    expect(root2).toBeDefined();
  });

  it('handles DOMContentLoaded listener when document is loading', () => {
    Object.defineProperty(document, 'readyState', {
      value: 'loading',
      configurable: true,
    });

    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
  });
});
