import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import '../../../components/organisms/cw-chat-panel.js';
import { CwChatPanel } from '../../../components/organisms/cw-chat-panel.js';

describe('CwChatPanel Organism Component', () => {
  let element: CwChatPanel;

  beforeEach(async () => {
    document.body.innerHTML = '';
    element = new CwChatPanel();
    element.chatState = {
      state: 'active',
      messages: [],
      draft: '',
      panelOpen: true,
      unreadCount: 0,
      isExpanded: false,
      isMobile: false,
      clientName: 'Support Panel',
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
      widgetWidth: 380,
      widgetHeight: 600,
      animationOpeningSec: 0.01,
      animationClosingSec: 0.01,
    };
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should instantiate and mount cw-chat-panel element', () => {
    expect(element).toBeDefined();
    expect(element.tagName.toLowerCase()).toBe('cw-chat-panel');
  });

  it('should render header and body when panelOpen is true', async () => {
    vi.useFakeTimers();
    element.panelOpen = true;
    await element.updateComplete;
    vi.advanceTimersByTime(100);

    const header = element.shadowRoot?.querySelector('cw-chat-header');
    expect(header).not.toBeNull();

    const body = element.shadowRoot?.querySelector('cw-chat-body');
    expect(body).not.toBeNull();
  });

  it('renders confirm dialog overlay and reconnecting banner', async () => {
    element.panelOpen = true;
    element.chatState = {
      ...element.chatState!,
      reconnecting: true,
      confirmBox: { message: 'End chat?' },
    };
    await element.updateComplete;

    const confirmDialog = element.shadowRoot?.querySelector('cw-confirm-dialog');
    expect(confirmDialog).not.toBeNull();

    const reconnecting = element.shadowRoot?.querySelector('.reconnecting');
    expect(reconnecting).not.toBeNull();
  });
});
