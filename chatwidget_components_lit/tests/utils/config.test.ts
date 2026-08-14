import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getClientId, fetchClientConfig } from '../../utils/config.js';

describe('utils/config.ts', () => {
  beforeEach(() => {
    delete (window as any).ZOTLY_CLIENT_ID;
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return ZOTLY_CLIENT_ID if set on global window', () => {
    (window as any).ZOTLY_CLIENT_ID = 'client_123';
    expect(getClientId()).toBe('client_123');
  });

  it('should read data-client-id from script tag if set', () => {
    const script = document.createElement('script');
    script.setAttribute('data-client-id', 'client_script_456');
    document.body.appendChild(script);

    expect(getClientId()).toBe('client_script_456');
  });

  it('should fall back to default if no client ID is found', () => {
    expect(getClientId()).toBe('default');
  });

  it('should return client configs from server on successful fetch', async () => {
    const mockData = {
      bubble: { width: 60 },
      chatWindow: { accentColor: '#0b5fff' },
      chatbar: { text: 'Help' },
      greetWindow: { enabled: true },
      features: { voiceCallEnabled: true },
    };

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    const configs = await fetchClientConfig('client_123');
    expect(configs.bubbleConfig).toEqual({ width: 60 });
    expect(configs.chatConfig).toEqual({ accentColor: '#0b5fff' });
    expect(configs.chatbarConfig).toEqual({ text: 'Help' });
  });
});
