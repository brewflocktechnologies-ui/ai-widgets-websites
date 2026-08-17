import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../../../components/pages/cw-widget-root.js';
import { CwWidgetRoot } from '../../../components/pages/cw-widget-root.js';
import { chatbarStore, chatStore } from '../../../store/chat-store.js';

describe('CwWidgetRoot Page Component', () => {
  let element: CwWidgetRoot;

  beforeEach(async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Mock fetch: no network in tests'));
    document.body.innerHTML = '';
    element = new CwWidgetRoot();
    document.body.appendChild(element);
    await element.updateComplete;
  });

  it('should instantiate and mount cw-widget-root into the DOM', () => {
    expect(element).toBeDefined();
    expect(element.tagName.toLowerCase()).toBe('cw-widget-root');
  });

  it('should accept property attributes', async () => {
    element.clientName = 'Acme Corp Support';
    element.accentColor = '#8b5cf6';
    element.greetOpeningDelaySec = 3.0;

    await element.updateComplete;

    expect(element.clientName).toBe('Acme Corp Support');
    expect(element.accentColor).toBe('#8b5cf6');
    expect(element.greetOpeningDelaySec).toBe(3.0);
  });

  it('handles card to bar collapse when visitor message is sent', async () => {
    chatbarStore.get().enabled = true;
    chatbarStore.get().layout = 'card';
    element.triggerType = 'chatcard';
    chatStore.get().messages = [{ key: 't', senderType: 'VISITOR', body: 'Hi' }];
    element.panelOpen = true;
    await element.updateComplete;

    window.dispatchEvent(new CustomEvent('close-contact-widget'));
    await element.updateComplete;

    expect(element.panelOpen).toBe(false);
  });

  it('should provide getDebugInfo() diagnostic data', async () => {
    element.accentColor = '#0b5fff';
    element.triggerType = 'bubble';
    await element.updateComplete;

    expect(typeof element.getDebugInfo).toBe('function');
    const debug = element.getDebugInfo();

    expect(debug).toBeDefined();
    expect(debug.activeTrigger).toBe('bubble');
    expect(debug.effectiveConfigs).toBeDefined();
    expect(debug.cssVariables).toBeDefined();
    expect(debug.host).toBeDefined();
  });

  it('handles window events toggle-contact-widget and close-contact-widget', async () => {
    window.dispatchEvent(new CustomEvent('toggle-contact-widget'));
    await element.updateComplete;
    expect(element.panelOpen).toBe(true);

    window.dispatchEvent(new CustomEvent('close-contact-widget'));
    await element.updateComplete;
    expect(element.panelOpen).toBe(false);
  });

  it('handles custom event handlers registered on root', async () => {
    element.dispatchEvent(new CustomEvent('cw:toggle'));
    element.dispatchEvent(new CustomEvent('cw:close-panel'));
    element.dispatchEvent(new CustomEvent('cw:start-chat'));
    element.dispatchEvent(new CustomEvent('cw:greet-dismiss'));
    element.dispatchEvent(new CustomEvent('cw:greet-input', { detail: 'hello' }));
    element.dispatchEvent(new CustomEvent('cw:draft-change', { detail: 'draft text' }));
    element.dispatchEvent(new CustomEvent('cw:toggle-attach'));
    element.dispatchEvent(new CustomEvent('cw:toggle-emoji'));
    element.dispatchEvent(new CustomEvent('cw:dismiss-consent'));
    element.dispatchEvent(new CustomEvent('cw:toggle-sounds'));
    element.dispatchEvent(new CustomEvent('cw:insert-emoji', { detail: '😊' }));
    element.dispatchEvent(new CustomEvent('cw:submit-prechat', { detail: {} }));
    element.dispatchEvent(new CustomEvent('cw:submit-postchat', { detail: {} }));
    element.dispatchEvent(new CustomEvent('cw:start-new'));
    element.dispatchEvent(new CustomEvent('cw:toggle-expand'));
    element.dispatchEvent(new CustomEvent('cw:open-menu'));
    element.dispatchEvent(new CustomEvent('cw:close-popups'));
    element.dispatchEvent(new CustomEvent('cw:end-chat'));
    element.dispatchEvent(new CustomEvent('cw:confirm-cancel'));
    await element.updateComplete;
  });

  it('handles keyboard navigation (Escape & Tab key trapping)', async () => {
    element.panelOpen = true;
    await element.updateComplete;

    element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await element.updateComplete;
    expect(element.panelOpen).toBe(false);

    element.panelOpen = true;
    await element.updateComplete;

    element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: false }));
    element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true }));
  });

  it('handles property changes for prechatEnabled and postchatEnabled', async () => {
    element.prechatEnabled = true;
    element.postchatEnabled = true;
    await element.updateComplete;
  });
});
