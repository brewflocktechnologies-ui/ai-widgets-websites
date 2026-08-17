import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../../../components/organisms/cw-chat-body.js';
import { CwChatBody } from '../../../components/organisms/cw-chat-body.js';

describe('CwChatBody Organism Component', () => {
  let element: CwChatBody;

  beforeEach(async () => {
    document.body.innerHTML = '';
    element = new CwChatBody();
    element.chatState = {
      state: 'active',
      messages: [],
      draft: '',
      panelOpen: true,
      unreadCount: 0,
      isExpanded: false,
      isMobile: false,
      clientName: 'Test Support',
      agentName: 'Sarah',
      agentsOnline: true,
      token: '123',
      position: 1,
      menuOpen: false,
      attachOpen: false,
      emojiOpen: false,
      confirmBox: null,
      reconnecting: false,
      soundsOn: true,
      consentDismissed: false,
      flags: {},
    };
    element.chatWindowConfig = {
      accentColor: '#0b5fff',
      bodyBg: '#ffffff',
      modernUi: true,
    };
    document.body.appendChild(element);
    await element.updateComplete;
  });

  it('should instantiate and mount cw-chat-body element', () => {
    expect(element).toBeDefined();
    expect(element.tagName.toLowerCase()).toBe('cw-chat-body');
  });

  it('should render message list and composer in active state', async () => {
    element.chatState = {
      ...element.chatState,
      state: 'active',
      messages: [
        { key: '1', senderType: 'VISITOR', body: 'Hello', created: new Date().toISOString() },
      ],
    };
    await element.updateComplete;

    const bubble = element.shadowRoot?.querySelector('cw-message-bubble');
    expect(bubble).not.toBeNull();

    const composer = element.shadowRoot?.querySelector('cw-composer');
    expect(composer).not.toBeNull();
  });

  it('renders welcome, prechat, offline, postchat, offline-sent, queued, closed states', async () => {
    const prechatSpy = vi.fn();
    const offlineSpy = vi.fn();
    const postchatSpy = vi.fn();
    const startNewSpy = vi.fn();

    element.addEventListener('cw:submit-prechat', prechatSpy);
    element.addEventListener('cw:submit-offline', offlineSpy);
    element.addEventListener('cw:submit-postchat', postchatSpy);
    element.addEventListener('cw:start-new', startNewSpy);

    // Welcome state
    element.chatState = { ...element.chatState, state: 'welcome' };
    await element.updateComplete;
    expect(element.shadowRoot?.querySelector('cw-welcome-card')).not.toBeNull();

    // Prechat state
    element.chatState = { ...element.chatState, state: 'prechat' };
    await element.updateComplete;
    const prechatForm = element.shadowRoot?.querySelector('cw-chat-form');
    expect(prechatForm).not.toBeNull();
    prechatForm?.dispatchEvent(new CustomEvent('cw:form-submit', { detail: { values: { name: 'A' } } }));
    expect(prechatSpy).toHaveBeenCalled();

    // Offline state
    element.chatState = { ...element.chatState, state: 'offline' };
    await element.updateComplete;
    const offlineForm = element.shadowRoot?.querySelector('cw-chat-form');
    expect(offlineForm).not.toBeNull();
    offlineForm?.dispatchEvent(new CustomEvent('cw:form-submit', { detail: { values: { name: 'A' } } }));
    expect(offlineSpy).toHaveBeenCalled();

    // Postchat state
    element.chatState = { ...element.chatState, state: 'postchat' };
    await element.updateComplete;
    const postchatForm = element.shadowRoot?.querySelector('cw-chat-form');
    expect(postchatForm).not.toBeNull();
    postchatForm?.dispatchEvent(new CustomEvent('cw:form-submit', { detail: { values: { rating: '5' } } }));
    expect(postchatSpy).toHaveBeenCalled();

    // Offline-sent state
    element.chatState = { ...element.chatState, state: 'offline-sent' };
    await element.updateComplete;
    expect(element.shadowRoot?.querySelector('.offline-done')).not.toBeNull();

    // Queued state
    element.chatState = { ...element.chatState, state: 'queued' };
    await element.updateComplete;
    expect(element.shadowRoot?.querySelector('.ticket-number')).not.toBeNull();

    // Closed state
    element.chatState = { ...element.chatState, state: 'closed' };
    await element.updateComplete;
    const closedBtn = element.shadowRoot?.querySelector('.closed-note button') as HTMLElement;
    closedBtn?.click();
    expect(startNewSpy).toHaveBeenCalled();
  });

  it('handles image cropper events and file selection', async () => {
    const sendSpy = vi.fn();
    element.addEventListener('cw:send', sendSpy);

    const cropper = element.shadowRoot?.querySelector('cw-image-cropper');
    expect(cropper).not.toBeNull();

    cropper?.dispatchEvent(
      new CustomEvent('cw:image-cropped', { detail: { dataUrl: 'data:image/png;base64,123' } })
    );
    expect(sendSpy).toHaveBeenCalled();

    cropper?.dispatchEvent(new CustomEvent('cw:close'));

    // Test file input selection (Document PDF)
    const fileInput = element.shadowRoot?.querySelector('#cw-file-input') as HTMLInputElement;
    if (fileInput) {
      const docFile = new File([''], 'doc.pdf', { type: 'application/pdf' });
      Object.defineProperty(fileInput, 'files', {
        value: [docFile],
        writable: true,
        configurable: true,
      });
      const attachSpy = vi.fn();
      element.addEventListener('cw:attach-files', attachSpy);
      fileInput.dispatchEvent(new Event('change'));
      expect(attachSpy).toHaveBeenCalled();
    }

    // Test file input selection (Image PNG with FileReader onload)
    if (fileInput) {
      class MockFileReader {
        onload: ((e: any) => void) | null = null;
        readAsDataURL() {
          if (this.onload) {
            this.onload({ target: { result: 'data:image/png;base64,abc' } });
          }
        }
      }
      vi.stubGlobal('FileReader', MockFileReader as any);

      const imgFile = new File(['img'], 'photo.png', { type: 'image/png' });
      Object.defineProperty(fileInput, 'files', {
        value: [imgFile],
        writable: true,
        configurable: true,
      });
      fileInput.dispatchEvent(new Event('change'));
      vi.unstubAllGlobals();
    }

    // Test attach menu file selector trigger
    element.chatState = { ...element.chatState, attachOpen: true };
    await element.updateComplete;
    const attachMenu = element.shadowRoot?.querySelector('cw-attach-menu');
    expect(attachMenu).not.toBeNull();
    attachMenu?.dispatchEvent(new CustomEvent('cw:trigger-file-select'));

    // Test focusInput and consent dismiss
    element.focusInput();
    const consentX = element.shadowRoot?.querySelector('.consent-x') as HTMLElement;
    const consentSpy = vi.fn();
    element.addEventListener('cw:dismiss-consent', consentSpy);
    consentX?.click();
    expect(consentSpy).toHaveBeenCalled();
  });
});
