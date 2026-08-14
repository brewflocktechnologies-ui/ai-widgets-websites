import { describe, it, expect, beforeEach } from 'vitest';
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
      flags: {},
    };
    element.chatWindowConfig = {
      accentColor: '#0b5fff',
      bodyBg: '#ffffff',
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
});
