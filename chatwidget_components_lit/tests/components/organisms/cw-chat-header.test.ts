import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../../../components/organisms/cw-chat-header.js';
import { CwChatHeader } from '../../../components/organisms/cw-chat-header.js';

describe('CwChatHeader Organism Component', () => {
  let element: CwChatHeader;

  beforeEach(async () => {
    document.body.innerHTML = '';
    element = new CwChatHeader();
    document.body.appendChild(element);
    await element.updateComplete;
  });

  it('should instantiate and mount cw-chat-header element', () => {
    expect(element).toBeDefined();
    expect(element.tagName.toLowerCase()).toBe('cw-chat-header');
  });

  it('should render agent & client title text', async () => {
    element.clientName = 'Acme Corp';
    element.agentName = 'Sarah';
    await element.updateComplete;

    const title = element.shadowRoot?.querySelector('.title-text');
    expect(title?.textContent?.trim()).toContain('Acme Corp');
  });

  it('handles non-active state and modernUi false layout', async () => {
    element.state = 'offline';
    element.config = { modernUi: false, headerTextColor: '#18181b', headerBorderColor: '#e4e4e7' };
    await element.updateComplete;

    const subtitle = element.shadowRoot?.querySelector('.subtitle-text');
    expect(subtitle?.textContent?.trim()).toBe('Online');
  });

  it('should dispatch header events (expand, menu, end-chat, voice, video, close)', async () => {
    const expandSpy = vi.fn();
    const menuSpy = vi.fn();
    const endSpy = vi.fn();
    const voiceSpy = vi.fn();
    const videoSpy = vi.fn();
    const closeSpy = vi.fn();

    element.addEventListener('cw:toggle-expand', expandSpy);
    element.addEventListener('cw:open-menu', menuSpy);
    element.addEventListener('cw:end-chat', endSpy);
    element.addEventListener('cw:voice-call', voiceSpy);
    element.addEventListener('cw:video-call', videoSpy);
    element.addEventListener('cw:close-panel', closeSpy);

    element.config = {
      modernUi: true,
      features: {
        voiceCallEnabled: true,
        videoCallEnabled: true,
        closeChatVisitor: true,
      },
    };
    element.features = {
      voiceCallEnabled: true,
      videoCallEnabled: true,
      closeChatVisitor: true,
    };
    await element.updateComplete;

    const buttons = element.shadowRoot?.querySelectorAll('cw-button');
    buttons?.forEach((btn) => btn.click());

    expect(expandSpy).toHaveBeenCalled();
    expect(closeSpy).toHaveBeenCalled();
  });

  it('renders empty when state is welcome', async () => {
    element.state = 'welcome';
    element.config = { welcome: { enabled: true } };
    await element.updateComplete;

    expect(element.shadowRoot?.querySelector('header')).toBeNull();
  });
});
