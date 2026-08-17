import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import {
  bubbleStore,
  greetWindowStore,
  chatWindowStore,
  featuresStore,
  chatbarStore,
  chatStore,
  subscribe,
  subscribeAll,
  initStore,
  setupGreetTimers,
  updateStoreConfig,
  exportFullStoreConfig,
  injectStoreConfig,
} from '../../store/chat-store.js';

describe('chat-store', () => {
  beforeEach(async () => {
    window.alert = vi.fn();
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('No fetch in test'));
    await initStore();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('provides store accessors and initial states', () => {
    expect(bubbleStore.get()).toBeDefined();
    expect(greetWindowStore.get()).toBeDefined();
    expect(chatWindowStore.get()).toBeDefined();
    expect(featuresStore.get()).toBeDefined();
    expect(chatbarStore.get()).toBeDefined();
    expect(chatStore.get()).toBeDefined();
  });

  it('subscribes to single and all events', () => {
    const fnSingle = vi.fn();
    const fnAll = vi.fn();

    const unsubSingle = subscribe('store:chat', fnSingle);
    const unsubAll = subscribeAll(fnAll);

    chatStore.toggleExpand();

    expect(fnSingle).toHaveBeenCalled();
    expect(fnAll).toHaveBeenCalled();

    unsubSingle();
    unsubAll();
  });

  it('handles chatStore.flag', () => {
    const cs = chatStore.get();
    cs.flags = { testFlag: false };
    expect(chatStore.flag('testFlag', true)).toBe(false);
    expect(chatStore.flag('nonExistent', true)).toBe(true);
    expect(chatStore.flag('nonExistent')).toBe(true);
  });

  it('handles chatStore.send with draft and simulates message statuses', () => {
    const cs = chatStore.get();
    cs.draft = 'Hello world';
    const initialLen = cs.messages.length;

    chatStore.send();

    expect(cs.messages.length).toBe(initialLen + 1);
    expect(cs.hasSentMessage).toBe(true);
    expect(cs.draft).toBe('');
  });

  it('handles chatStore.send when text is empty', () => {
    const cs = chatStore.get();
    cs.draft = '   ';
    const len = cs.messages.length;
    chatStore.send();
    expect(cs.messages.length).toBe(len);
  });

  it('handles resetChatbarLayout, askEndChat, confirmEnd, startNew, startFromWelcome', () => {
    const cbs = chatbarStore.get();
    cbs.enabled = true;
    cbs.layout = 'card';
    cbs.barOffsetRight = 20;
    cbs.barOffsetBottom = 15;
    chatStore.resetChatbarLayout();
    expect(cbs.layout).toBe('bar');

    chatStore.askEndChat();
    expect(chatStore.get().confirmBox).not.toBeNull();

    chatStore.cancelEndChat();
    expect(chatStore.get().confirmBox).toBeNull();

    chatStore.askEndChat();
    chatStore.confirmEnd(true);
    expect(chatStore.get().state).toBe('postchat');

    chatStore.confirmEnd(false);
    expect(chatStore.get().state).toBe('closed');

    chatStore.startNew();
    expect(chatStore.get().state).toBe('active');

    chatStore.startFromWelcome(true);
    expect(chatStore.get().state).toBe('prechat');

    chatStore.startFromWelcome(false);
    expect(chatStore.get().state).toBe('active');
  });

  it('handles UI toggles: closePanel, toggleExpand, toggleMenu, closePopups, toggleAttach, toggleEmoji, insertEmoji', () => {
    const closeListener = vi.fn();
    window.addEventListener('close-contact-widget', closeListener);

    chatStore.toggleExpand();
    expect(chatStore.get().isExpanded).toBeDefined();

    chatStore.toggleMenu();
    expect(chatStore.get().menuOpen).toBeDefined();

    chatStore.toggleAttach();
    expect(chatStore.get().attachOpen).toBeDefined();

    chatStore.toggleEmoji();
    expect(chatStore.get().emojiOpen).toBeDefined();

    chatStore.insertEmoji('😊');

    chatStore.closePopups();
    expect(chatStore.get().emojiOpen).toBe(false);

    chatStore.closePanel();
    expect(chatStore.get().panelOpen).toBe(false);
    expect(closeListener).toHaveBeenCalled();

    window.removeEventListener('close-contact-widget', closeListener);
  });

  it('handles greetWindow dismissal, transcript download, sounds, consent, prechat and postchat submit', () => {
    const feedbackListener = vi.fn();
    window.addEventListener('postchat-feedback', feedbackListener);

    chatStore.dismissGreetWindow();
    expect(greetWindowStore.get().dismissed).toBe(true);

    chatStore.downloadTranscript();
    expect(window.alert).toHaveBeenCalledWith('Downloading transcript...');

    chatStore.toggleSounds();
    expect(chatStore.get().soundsOn).toBeDefined();

    chatStore.dismissConsent();
    expect(chatStore.get().consentDismissed).toBe(true);

    chatStore.submitPrechat({ name: 'John', email: 'john@example.com' });
    expect(chatStore.get().offlineName).toBe('John');
    expect(chatStore.get().state).toBe('active');

    chatStore.submitPostchat({ rating: '5' });

    window.removeEventListener('postchat-feedback', feedbackListener);
  });

  it('handles offline payload and offline submit', () => {
    chatStore.submitOfflinePayload({ name: 'Alice', email: 'alice@example.com', message: 'Help me' });

    chatStore.get().offlineEmail = 'test@test.com';
    chatStore.get().offlineMessage = 'Test message';
    chatStore.submitOffline();
  });

  it('handles uploadImage and captureScreenshot', () => {
    URL.createObjectURL = vi.fn().mockReturnValue('blob:http://localhost/test');

    const fakeFile = new File([''], 'test.png', { type: 'image/png' });
    const fakeInput = { files: [fakeFile] } as unknown as HTMLInputElement;

    chatStore.uploadImage(fakeInput);
    expect(chatStore.get().hasSentMessage).toBe(true);

    chatStore.captureScreenshot();
    expect(window.alert).toHaveBeenCalledWith('Screenshot captured!');
  });

  it('handles message helpers: dividerBefore, dayLabel, timeLabel, groupStart, groupEnd, attachmentUrl', () => {
    expect(chatStore.dividerBefore(0)).toBe(true);
    expect(chatStore.dividerBefore(1)).toBe(false);

    expect(chatStore.dayLabel()).toBe('Today');

    const msg = { created: new Date().toISOString(), key: '1', senderType: 'VISITOR' as const };
    expect(chatStore.timeLabel(msg)).toBeDefined();
    expect(chatStore.timeLabel({ key: '2', senderType: 'AGENT' })).toBeDefined();

    chatStore.get().messages = [
      { key: 'm1', senderType: 'VISITOR', body: 'hi' },
      { key: 'm2', senderType: 'VISITOR', body: 'there' },
      { key: 'm3', senderType: 'AGENT', body: 'hello' },
    ];

    expect(chatStore.groupStart(0)).toBe(true);
    expect(chatStore.groupStart(1)).toBe(false);

    expect(chatStore.groupEnd(0)).toBe(false);

    expect(chatStore.attachmentUrl({ key: '1', senderType: 'VISITOR', localUrl: 'blob:123' })).toBe('blob:123');
    expect(chatStore.attachmentUrl({ key: '1', senderType: 'VISITOR', url: 'http://img' })).toBe('http://img');
    expect(chatStore.attachmentUrl({ key: '1', senderType: 'VISITOR' })).toBe('');
  });

  it('handles updateStoreConfig with all override options', () => {
    updateStoreConfig({
      enableWelcomeCard: true,
      enableGreetWindow: true,
      enableInputCard: true,
      greetDelaySec: 3,
      greetAnimOpenSec: 0.4,
      greetAnimCloseSec: 0.2,
      inputBoxDelaySec: 5,
      inputBoxAnimOpenSec: 0.4,
      chatAnimStyle: 'pop-in',
      chatAnimOpenSec: 0.5,
      chatAnimCloseSec: 0.3,
      bubble: { width: 70 },
      chatbar: { text: 'New Bar Text' },
      greetWindow: {
        title: 'New Title',
        enabled: true,
        openingTimeAfterInitialLoadSec: 2,
        inputBox: { placeholder: 'Type here', enabled: true, openingTimeAfterInitialLoadSec: 3 },
      },
      chatWindow: { clientName: 'New Client', welcome: { title: 'Welcome!' } },
      chat: { draft: 'New draft' },
      features: { voiceCallEnabled: true },
    });

    expect(chatbarStore.get().text).toBe('New Bar Text');

    updateStoreConfig({ triggerType: 'chatbar' });
    expect(chatbarStore.get().enabled).toBe(true);

    updateStoreConfig({ triggerType: 'chatcard' });
    expect(chatbarStore.get().enabled).toBe(true);

    updateStoreConfig({ triggerType: 'bubble' });
    expect(bubbleStore.get().enabled).toBe(true);
  });

  it('handles exportFullStoreConfig and injectStoreConfig', () => {
    const exported = exportFullStoreConfig();
    expect(exported).toHaveProperty('bubble');
    expect(exported).toHaveProperty('chatWindow');

    injectStoreConfig(exported);
    expect(chatStore.get()).toBeDefined();

    injectStoreConfig(null as any);
  });

  it('triggers greet window and input box timers in setupGreetTimers', () => {
    vi.useFakeTimers();
    const gw = greetWindowStore.get();
    gw.enabled = true;
    gw.dismissed = false;
    gw.openingTimeAfterInitialLoadSec = 0.1;
    if (gw.inputBox) {
      gw.inputBox.enabled = true;
      gw.inputBox.openingTimeAfterInitialLoadSec = 0.2;
    }

    setupGreetTimers();
    vi.advanceTimersByTime(500);

    expect(greetWindowStore.get().visible).toBe(true);
    expect(greetWindowStore.get().inputBox?.visible).toBe(true);
    vi.useRealTimers();
  });

  it('handles initStore with remote configuration fetching and dark mode', async () => {
    document.documentElement.classList.add('dark');

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        accentColor: '#123456',
        bubbleConfig: { useWebsiteTheme: true, position: 'bottom-left' },
        greetWindowConfig: { useWebsiteTheme: true, inputBox: { layout: 'separated' } },
        chatbarConfig: { useWebsiteTheme: true, layout: 'card', cardOffsetRight: 10, cardOffsetBottom: 10 },
        chatConfig: {
          useWebsiteTheme: true,
          clientName: 'Remote Client',
          agentName: 'Remote Agent',
          welcome: { enabled: true },
          dark: { bodyBg: '#000000' },
        },
      }),
    });

    await initStore();

    expect(chatWindowStore.get()).toBeDefined();
    document.documentElement.classList.remove('dark');
  });

  it('handles initStore error handling', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
    await expect(initStore()).resolves.not.toThrow();
  });
});
