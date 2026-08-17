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

  describe('chatStore.send', () => {
    it('handles send with draft and explicit text override', () => {
      const cs = chatStore.get();
      cs.draft = 'Draft message';
      chatStore.send();
      expect(cs.messages[cs.messages.length - 1].body).toBe('Draft message');
      expect(cs.hasSentMessage).toBe(true);

      chatStore.send('Text override');
      expect(cs.messages[cs.messages.length - 1].body).toBe('Text override');
    });

    it('ignores empty send', () => {
      const cs = chatStore.get();
      cs.draft = '   ';
      const len = cs.messages.length;
      chatStore.send();
      expect(cs.messages.length).toBe(len);
      chatStore.send('  ');
      expect(cs.messages.length).toBe(len);
    });

    it('dismisses greetWindow on send if present', () => {
      const gw = greetWindowStore.get();
      gw.visible = true;
      gw.dismissed = false;
      if (gw.inputBox) gw.inputBox.visible = true;

      chatStore.send('Hello');
      expect(gw.dismissed).toBe(true);
      expect(gw.visible).toBe(false);
      expect(gw.inputBox?.visible).toBe(false);
    });

    it('executes async status transitions (delivered, read, bot reply) with panel closed', () => {
      vi.useFakeTimers();
      const cs = chatStore.get();
      cs.panelOpen = false;
      cs.unreadCount = 0;
      cs.agentName = 'Sarah';

      chatStore.send('Async test message');
      const sentMsg = cs.messages[cs.messages.length - 1];
      expect(sentMsg.status).toBe('sent');

      // 1500ms: status delivered
      vi.advanceTimersByTime(1500);
      expect(cs.messages.find((m) => m.key === sentMsg.key)?.status).toBe('delivered');

      // 2800ms (1300ms more): status read, typingName set
      vi.advanceTimersByTime(1300);
      expect(cs.messages.find((m) => m.key === sentMsg.key)?.status).toBe('read');
      expect(cs.typingName).toBe('Sarah');

      // 4500ms (1700ms more): typingName cleared, bot reply added, unreadCount incremented
      vi.advanceTimersByTime(1700);
      expect(cs.typingName).toBe('');
      expect(cs.unreadCount).toBe(1);
      expect(cs.messages[cs.messages.length - 1].senderType).toBe('AGENT');

      vi.useRealTimers();
    });

    it('executes bot reply with panel open (unreadCount not incremented)', () => {
      vi.useFakeTimers();
      const cs = chatStore.get();
      cs.panelOpen = true;
      cs.unreadCount = 0;

      chatStore.send('Panel open test');
      vi.advanceTimersByTime(5000);

      expect(cs.unreadCount).toBe(0);
      vi.useRealTimers();
    });
  });

  describe('resetChatbarLayout', () => {
    it('resets card layout to bar layout with fallbacks when offsets are null/undefined', () => {
      const cbs = chatbarStore.get();
      cbs.enabled = true;
      cbs.layout = 'card';
      cbs.barOffsetRight = undefined as any;
      cbs.barOffsetBottom = null as any;

      chatStore.resetChatbarLayout();
      expect(cbs.layout).toBe('bar');
      expect(cbs.offsetRight).toBe(16);
      expect(cbs.offsetBottom).toBe(12);
    });

    it('resets card layout using custom bar offsets when set', () => {
      const cbs = chatbarStore.get();
      cbs.enabled = true;
      cbs.layout = 'card';
      cbs.barOffsetRight = 24;
      cbs.barOffsetBottom = 20;

      chatStore.resetChatbarLayout();
      expect(cbs.layout).toBe('bar');
      expect(cbs.offsetRight).toBe(24);
      expect(cbs.offsetBottom).toBe(20);
    });
  });

  describe('askEndChat, cancelEndChat, confirmEnd', () => {
    it('uses fallback labels when chatWindow confirm config is missing', () => {
      const cws = chatWindowStore.get();
      cws.endChatConfirmMessage = '';
      cws.endChatConfirmLabel = '';
      cws.endChatCancelLabel = '';

      chatStore.askEndChat();
      const confirmBox = chatStore.get().confirmBox;
      expect(confirmBox?.message).toBe('Are you sure you want to end this chat session?');
      expect(confirmBox?.confirmLabel).toBe('End chat');
      expect(confirmBox?.cancelLabel).toBe('Cancel');
    });

    it('uses feature postchatEnabled fallback when override is undefined', () => {
      featuresStore.get().postchatEnabled = true;
      chatStore.confirmEnd();
      expect(chatStore.get().state).toBe('postchat');

      featuresStore.get().postchatEnabled = false;
      chatStore.confirmEnd();
      expect(chatStore.get().state).toBe('closed');
    });
  });

  describe('startFromWelcome and startNew', () => {
    it('uses feature prechatEnabled fallback when override is undefined', () => {
      featuresStore.get().prechatEnabled = true;
      chatStore.startFromWelcome();
      expect(chatStore.get().state).toBe('prechat');

      featuresStore.get().prechatEnabled = false;
      chatStore.startFromWelcome();
      expect(chatStore.get().state).toBe('active');
    });

    it('restarts chat with default agent name fallback', () => {
      chatStore.get().agentName = '';
      chatStore.startNew();
      expect(chatStore.get().messages[0].senderName).toBe('Sarah');
    });
  });

  describe('UI toggles and popups', () => {
    it('closes popups when any popup is open', () => {
      const cs = chatStore.get();
      cs.menuOpen = true;
      chatStore.closePopups();
      expect(cs.menuOpen).toBe(false);

      cs.attachOpen = true;
      chatStore.closePopups();
      expect(cs.attachOpen).toBe(false);

      cs.emojiOpen = true;
      chatStore.closePopups();
      expect(cs.emojiOpen).toBe(false);
    });

    it('does nothing in closePopups when no popups are open', () => {
      const cs = chatStore.get();
      cs.menuOpen = false;
      cs.attachOpen = false;
      cs.emojiOpen = false;

      const fn = vi.fn();
      const unsub = subscribe('store:chat', fn);
      chatStore.closePopups();
      expect(fn).not.toHaveBeenCalled();
      unsub();
    });

    it('toggles menu, attach, and emoji state cleanly', () => {
      chatStore.toggleMenu();
      expect(chatStore.get().menuOpen).toBe(true);

      chatStore.toggleAttach();
      expect(chatStore.get().attachOpen).toBe(true);
      expect(chatStore.get().emojiOpen).toBe(false);

      chatStore.toggleEmoji();
      expect(chatStore.get().emojiOpen).toBe(true);
      expect(chatStore.get().attachOpen).toBe(false);
    });

    it('handles closePanel and toggleExpand', () => {
      const cs = chatStore.get();
      chatStore.toggleExpand();
      expect(cs.isExpanded).toBe(true);

      const closeListener = vi.fn();
      window.addEventListener('close-contact-widget', closeListener);

      chatStore.closePanel();
      expect(cs.panelOpen).toBe(false);
      expect(cs.isExpanded).toBe(false);
      expect(closeListener).toHaveBeenCalled();

      window.removeEventListener('close-contact-widget', closeListener);
    });

    it('handles insertEmoji', () => {
      const cs = chatStore.get();
      cs.draft = 'Hello ';
      chatStore.insertEmoji('👋');
      expect(cs.draft).toBe('Hello 👋');
    });
  });

  describe('postchat submit & offline submission', () => {
    it('submits postchat feedback and sets state based on welcome card configuration', () => {
      const cws = chatWindowStore.get();
      if (!cws.welcome) cws.welcome = { enabled: true } as any;

      if (cws.welcome) {
        cws.welcome.enabled = false;
        chatStore.submitPostchat({ comment: 'Great' });
        expect(chatStore.get().state).toBe('active');

        cws.welcome.enabled = true;
        chatStore.submitPostchat({ comment: 'Awesome' });
        expect(chatStore.get().state).toBe('welcome');
      }
    });

    it('handles submitPrechat', () => {
      const cs = chatStore.get();
      chatStore.submitPrechat({ name: 'Jane', email: 'jane@example.com' });
      expect(cs.offlineName).toBe('Jane');
      expect(cs.offlineEmail).toBe('jane@example.com');
      expect(cs.panelOpen).toBe(true);
      expect(cs.state).toBe('active');
    });

    it('handles submitOfflinePayload with fake timer', () => {
      vi.useFakeTimers();
      chatStore.submitOfflinePayload({ name: 'Bob', email: 'bob@example.com', message: 'Hello' });
      expect(chatStore.get().offlineSending).toBe(true);

      vi.advanceTimersByTime(1000);
      expect(chatStore.get().offlineSending).toBe(false);
      expect(chatStore.get().state).toBe('offline-sent');
      vi.useRealTimers();
    });

    it('handles submitOffline with fake timer and missing fields condition', () => {
      vi.useFakeTimers();
      const cs = chatStore.get();
      cs.offlineEmail = '';
      cs.offlineMessage = '';
      chatStore.submitOffline();
      expect(cs.offlineSending).toBe(false);

      cs.offlineEmail = 'test@example.com';
      cs.offlineMessage = 'Test msg';
      chatStore.submitOffline();
      expect(cs.offlineSending).toBe(true);

      vi.advanceTimersByTime(1200);
      expect(cs.offlineSending).toBe(false);
      expect(cs.state).toBe('offline-sent');
      vi.useRealTimers();
    });
  });

  describe('uploadImage & captureScreenshot', () => {
    it('handles uploadImage when no file is selected', () => {
      const emptyInput = { files: null } as unknown as HTMLInputElement;
      chatStore.uploadImage(emptyInput);

      const emptyInput2 = { files: [] } as unknown as HTMLInputElement;
      chatStore.uploadImage(emptyInput2);
    });

    it('handles uploadImage async status flow and bot response', () => {
      vi.useFakeTimers();
      URL.createObjectURL = vi.fn().mockReturnValue('blob:test');

      const file = new File(['data'], 'photo.png', { type: 'image/png' });
      const input = { files: [file] } as unknown as HTMLInputElement;

      const cs = chatStore.get();
      cs.panelOpen = false;
      cs.unreadCount = 0;
      chatStore.uploadImage(input);

      const imgMsg = cs.messages[cs.messages.length - 1];
      expect(imgMsg.attachment).toBe(true);

      vi.advanceTimersByTime(2000);
      expect(cs.messages.find((m) => m.key === imgMsg.key)?.status).toBe('delivered');

      vi.advanceTimersByTime(2000);
      expect(cs.messages.find((m) => m.key === imgMsg.key)?.status).toBe('read');

      vi.advanceTimersByTime(1000);
      expect(cs.unreadCount).toBe(1);
      expect(cs.messages[cs.messages.length - 1].senderType).toBe('AGENT');

      vi.useRealTimers();
    });

    it('handles captureScreenshot and downloadTranscript and toggleSounds and dismissConsent', () => {
      // captureScreenshot: verify window event is dispatched (no alert)
      const screenshotEvents: Event[] = [];
      const screenshotHandler = (e: Event) => screenshotEvents.push(e);
      window.addEventListener('cw:capture-screenshot-request', screenshotHandler);
      chatStore.captureScreenshot();
      window.removeEventListener('cw:capture-screenshot-request', screenshotHandler);
      expect(screenshotEvents).toHaveLength(1);

      // downloadTranscript: verify Blob URL is created (no alert)
      const createSpy = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:test');
      vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});
      const origCreate = document.createElement.bind(document);
      vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
        const el = origCreate(tag);
        if (tag === 'a') vi.spyOn(el as HTMLAnchorElement, 'click').mockImplementation(() => {});
        return el;
      });
      chatStore.downloadTranscript();
      expect(createSpy).toHaveBeenCalledWith(expect.any(Blob));

      const initialSounds = chatStore.get().soundsOn;
      chatStore.toggleSounds();
      expect(chatStore.get().soundsOn).toBe(!initialSounds);

      chatStore.dismissConsent();
      expect(chatStore.get().consentDismissed).toBe(true);
    });
  });

  describe('message helpers: groupStart and groupEnd', () => {
    it('evaluates groupStart and groupEnd across list boundaries and sender transitions', () => {
      const cs = chatStore.get();
      cs.messages = [
        { key: '1', senderType: 'VISITOR', body: 'Msg 1' },
        { key: '2', senderType: 'VISITOR', body: 'Msg 2' },
        { key: '3', senderType: 'AGENT', body: 'Msg 3' },
      ];

      expect(chatStore.groupStart(0)).toBe(true);
      expect(chatStore.groupStart(1)).toBe(false);
      expect(chatStore.groupStart(2)).toBe(true);

      expect(chatStore.groupEnd(0)).toBe(false);
      expect(chatStore.groupEnd(1)).toBe(true);
      expect(chatStore.groupEnd(2)).toBe(true);

      expect(chatStore.dividerBefore(0)).toBe(true);
      expect(chatStore.dividerBefore(1)).toBe(false);
      expect(chatStore.dayLabel()).toBe('Today');
      expect(chatStore.timeLabel(cs.messages[0])).toBeDefined();
      expect(chatStore.attachmentUrl(cs.messages[0])).toBe('');
    });
  });

  describe('updateStoreConfig and applyStoreConfig', () => {
    it('handles overrides when sub-objects like welcome or inputBox are null/undefined', () => {
      const cws = chatWindowStore.get();
      const gws = greetWindowStore.get();
      (cws as any).welcome = undefined;
      (gws as any).inputBox = undefined;

      expect(() => {
        updateStoreConfig({
          enableWelcomeCard: true,
          enableInputCard: true,
          inputBoxDelaySec: 5,
          inputBoxAnimOpenSec: 2,
        });
      }).not.toThrow();
    });

    it('handles all numeric animation and delay overrides', () => {
      updateStoreConfig({
        greetDelaySec: 4,
        greetAnimOpenSec: 0.8,
        greetAnimCloseSec: 0.4,
        inputBoxDelaySec: 6,
        inputBoxAnimOpenSec: 0.9,
        chatAnimStyle: 'slide-up',
        chatAnimOpenSec: 0.6,
        chatAnimCloseSec: 0.5,
      });

      const gw = greetWindowStore.get();
      const cw = chatWindowStore.get();
      expect(gw.openingTimeAfterInitialLoadSec).toBe(4);
      expect(gw.animationOpeningSec).toBe(0.8);
      expect(gw.animationClosingSec).toBe(0.4);
      expect(gw.inputBox?.openingTimeAfterInitialLoadSec).toBe(6);
      expect(gw.inputBox?.animationOpeningSec).toBe(0.9);
      expect(cw.animationStyle).toBe('slide-up');
      expect(cw.animationOpeningSec).toBe(0.6);
      expect(cw.animationClosingSec).toBe(0.5);
    });

    it('handles triggerType options', () => {
      updateStoreConfig({ triggerType: 'chatbar' });
      expect(chatbarStore.get().enabled).toBe(true);
      expect(bubbleStore.get().enabled).toBe(false);

      updateStoreConfig({ triggerType: 'chatcard' });
      expect(chatbarStore.get().enabled).toBe(true);

      updateStoreConfig({ triggerType: 'bubble' });
      expect(bubbleStore.get().enabled).toBe(true);
      expect(chatbarStore.get().enabled).toBe(false);

      updateStoreConfig({ triggerType: 'unknown' as any });
    });

    it('handles explicit bubble, chatbar, greetWindow, chatWindow, chat, and features overrides', () => {
      updateStoreConfig({
        bubble: { width: 55 },
        chatbar: { text: 'Custom Chatbar' },
        greetWindow: { title: 'Custom Greet', inputBox: { placeholder: 'Type...' } },
        chatWindow: { welcome: { title: 'Custom Welcome' }, clientName: 'Custom Client' },
        chat: { draft: 'Custom Draft' },
        features: { voiceCallEnabled: true, videoCallEnabled: true },
      });

      expect(bubbleStore.get().width).toBe(55);
      expect(chatbarStore.get().text).toBe('Custom Chatbar');
      expect(greetWindowStore.get().title).toBe('Custom Greet');
      expect(greetWindowStore.get().inputBox?.placeholder).toBe('Type...');
      expect(chatWindowStore.get().welcome?.title).toBe('Custom Welcome');
      expect(chatWindowStore.get().clientName).toBe('Custom Client');
      expect(chatStore.get().draft).toBe('Custom Draft');
      expect(featuresStore.get().voiceCallEnabled).toBe(true);
    });

    it('triggers setupGreetTimers when touchedGreetTimers condition is met via greetWindow object', () => {
      vi.useFakeTimers();
      updateStoreConfig({
        greetWindow: {
          openingTimeAfterInitialLoadSec: 1,
          enabled: true,
          inputBox: {
            openingTimeAfterInitialLoadSec: 2,
            enabled: true,
          },
        },
      });

      vi.advanceTimersByTime(2500);
      expect(greetWindowStore.get().visible).toBe(true);
      vi.useRealTimers();
    });
  });

  describe('exportFullStoreConfig and injectStoreConfig', () => {
    it('uses fallbacks in exportFullStoreConfig when clientName is missing', () => {
      chatStore.get().clientName = '';
      const exp = exportFullStoreConfig();
      expect(exp.clientId).toBe('default');
      expect(exp.clientName).toBe('Default Widget');
    });

    it('handles injectStoreConfig with partial tokens and chatConfig alias', () => {
      injectStoreConfig({
        features: { voiceCallEnabled: true },
        chatConfig: { agentName: 'Custom Agent' },
        messages: [{ key: '1', senderType: 'AGENT', body: 'Injected' }],
        clientName: 'Injected Client',
      });

      expect(featuresStore.get().voiceCallEnabled).toBe(true);
      expect(chatStore.get().clientName).toBe('Injected Client');
    });
  });

  describe('setupGreetTimers', () => {
    it('returns early when greetWindow is disabled', () => {
      const gw = greetWindowStore.get();
      gw.enabled = false;
      setupGreetTimers();
      expect(gw.visible).toBe(false);
    });

    it('early terminates timers if greetWindow is dismissed or message is sent', () => {
      vi.useFakeTimers();
      const gw = greetWindowStore.get();
      gw.enabled = true;
      gw.dismissed = false;
      gw.openingTimeAfterInitialLoadSec = 1;
      if (gw.inputBox) {
        gw.inputBox.enabled = true;
        gw.inputBox.openingTimeAfterInitialLoadSec = 2;
      }

      setupGreetTimers();

      // Dismiss before timer fires
      gw.dismissed = true;
      vi.advanceTimersByTime(2500);
      expect(gw.visible).toBe(false);
      expect(gw.inputBox?.visible).toBe(false);

      vi.useRealTimers();
    });
  });

  describe('initStore & remote configuration processing', () => {
    it('processes remote config with rootAccentColor (without website theme)', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          accentColor: '#ff5500',
          bubble: { useWebsiteTheme: false, backgroundColor: '', outlineRing: {} },
          greetWindow: {
            useWebsiteTheme: false,
            inputBox: { layout: 'separated', buttonIconColor: '' },
          },
          chatbar: { useWebsiteTheme: false, layout: 'bar', barOffsetRight: 30, barOffsetBottom: 20 },
          chatWindow: {
            useWebsiteTheme: false,
            welcome: { useWebsiteTheme: false, bgGradient: '' },
            clientName: 'Accent Client',
            agentName: 'Accent Agent',
          },
          features: { videoCallEnabled: true },
        }),
      });

      await initStore();

      expect(bubbleStore.get().backgroundColor).toBe('#ff5500');
      expect(greetWindowStore.get().iconColor).toBe('#ff5500');
      expect(chatbarStore.get().bgColor).toBe('#ff5500');
      expect(chatWindowStore.get().accentColor).toBe('#ff5500');
      expect(featuresStore.get().videoCallEnabled).toBe(true);
      expect(chatStore.get().agentName).toBe('Accent Agent');
      if (chatStore.get().messages[0]) {
        expect(chatStore.get().messages[0].senderName).toBe('Accent Agent');
      }
    });

    it('processes remote config with non-separated inputBox layout using rootAccentColor', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          accentColor: '#00aa55',
          greetWindow: {
            useWebsiteTheme: false,
            inputBox: { layout: 'inline', buttonColor: '' },
          },
          chatbar: {
            useWebsiteTheme: false,
            layout: 'card',
            cardOffsetRight: 15,
            cardOffsetBottom: 25,
          },
        }),
      });

      await initStore();
      expect(greetWindowStore.get().inputBox?.buttonColor).toBe('#00aa55');
      expect(chatbarStore.get().offsetRight).toBe(15);
    });

    it('processes remote config with website theme when secondary theme differs from primary', async () => {
      document.documentElement.style.setProperty('--primary-color', '#112233');
      document.documentElement.style.setProperty('--secondary-color', '#445566');

      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          chatWindow: {
            useWebsiteTheme: true,
            welcome: { useWebsiteTheme: true },
          },
          greetWindow: {
            useWebsiteTheme: true,
            inputBox: { layout: 'inline' },
          },
        }),
      });

      await initStore();
      expect(greetWindowStore.get().inputBox?.buttonColor).toBe('#112233');
      expect(chatWindowStore.get().welcome?.bgGradient).toContain('#445566');

      document.documentElement.style.removeProperty('--primary-color');
      document.documentElement.style.removeProperty('--secondary-color');
    });

    it('processes chatConfig dark overrides when host is in dark mode', async () => {
      document.documentElement.classList.add('dark');

      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          chatWindow: {
            useWebsiteTheme: true,
            dark: { visitorBubbleFontSize: '16px' },
          },
        }),
      });

      await initStore();
      expect(chatWindowStore.get().visitorBubbleFontSize).toBe('16px');

      document.documentElement.classList.remove('dark');
    });
  });

  // ---------------------------------------------------------------------------
  // downloadTranscript — real Blob-based file download (no alert)
  // ---------------------------------------------------------------------------
  describe('chatStore.downloadTranscript', () => {
    it('closes the menu and emits store:chat', () => {
      const s = chatStore.get();
      s.menuOpen = true;
      const listener = vi.fn();
      const unsub = subscribe('store:chat', listener);
      chatStore.downloadTranscript();
      expect(s.menuOpen).toBe(false);
      expect(listener).toHaveBeenCalled();
      unsub();
    });

    it('creates a Blob URL and triggers an anchor download click', () => {
      // Install fake timers BEFORE calling downloadTranscript so the
      // internal setTimeout(100ms) is captured and can be flushed.
      vi.useFakeTimers();

      const mockUrl = 'blob:mock-url';
      const createSpy = vi.spyOn(URL, 'createObjectURL').mockReturnValue(mockUrl);
      const revokeSpy = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});

      const clickSpy = vi.fn();
      const originalCreate = document.createElement.bind(document);
      vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
        const el = originalCreate(tag);
        if (tag === 'a') {
          vi.spyOn(el as HTMLAnchorElement, 'click').mockImplementation(clickSpy);
        }
        return el;
      });

      chatStore.downloadTranscript();

      expect(createSpy).toHaveBeenCalledWith(expect.any(Blob));
      expect(clickSpy).toHaveBeenCalled();

      // Flush the 100ms revoke timer
      vi.runAllTimers();
      expect(revokeSpy).toHaveBeenCalledWith(mockUrl);

      vi.useRealTimers();
    });

    it('includes message bodies in the downloaded transcript text', () => {
      const s = chatStore.get();
      s.messages = [
        { key: 'm1', senderType: 'AGENT', senderName: 'Sarah', body: 'Hello there', created: new Date().toISOString() },
        { key: 'm2', senderType: 'VISITOR', body: 'Hi, I need help', created: new Date().toISOString() },
      ];

      let capturedBlob: Blob | undefined;
      vi.spyOn(URL, 'createObjectURL').mockImplementation((b) => {
        capturedBlob = b as Blob;
        return 'blob:mock';
      });
      vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});
      const originalCreate = document.createElement.bind(document);
      vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
        const el = originalCreate(tag);
        if (tag === 'a') vi.spyOn(el as HTMLAnchorElement, 'click').mockImplementation(() => {});
        return el;
      });

      chatStore.downloadTranscript();

      expect(capturedBlob).toBeDefined();
      // Read the Blob text to confirm messages are included
      return capturedBlob!.text().then((text) => {
        expect(text).toContain('Hello there');
        expect(text).toContain('Hi, I need help');
        expect(text).toContain('You');
        expect(text).toContain('Sarah');
      });
    });

    it('labels attachment messages correctly in the transcript', () => {
      const s = chatStore.get();
      s.messages = [
        { key: 'img1', senderType: 'VISITOR', body: '', attachment: true, created: new Date().toISOString() },
      ];

      let capturedBlob: Blob | undefined;
      vi.spyOn(URL, 'createObjectURL').mockImplementation((b) => { capturedBlob = b as Blob; return 'blob:mock'; });
      vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});
      const originalCreate = document.createElement.bind(document);
      vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
        const el = originalCreate(tag);
        if (tag === 'a') vi.spyOn(el as HTMLAnchorElement, 'click').mockImplementation(() => {});
        return el;
      });

      chatStore.downloadTranscript();

      return capturedBlob!.text().then((text) => {
        expect(text).toContain('[Image attachment]');
      });
    });
  });

  // ---------------------------------------------------------------------------
  // captureScreenshot — dispatches window event, no alert
  // ---------------------------------------------------------------------------
  describe('chatStore.captureScreenshot', () => {
    it('closes the attach panel and emits store:chat', () => {
      const s = chatStore.get();
      s.attachOpen = true;
      const listener = vi.fn();
      const unsub = subscribe('store:chat', listener);
      chatStore.captureScreenshot();
      expect(s.attachOpen).toBe(false);
      expect(listener).toHaveBeenCalled();
      unsub();
    });

    it('dispatches a cw:capture-screenshot-request window event with a timestamp', () => {
      const received: CustomEvent[] = [];
      const handler = (e: Event) => received.push(e as CustomEvent);
      window.addEventListener('cw:capture-screenshot-request', handler);

      chatStore.captureScreenshot();

      window.removeEventListener('cw:capture-screenshot-request', handler);
      expect(received).toHaveLength(1);
      expect(received[0].detail).toHaveProperty('timestamp');
      expect(typeof received[0].detail.timestamp).toBe('string');
    });

    it('does not call alert() — dispatches window event instead', () => {
      // Happy-DOM does not expose window.alert, so we confirm behaviour by
      // verifying the window event is dispatched (which only happens in the
      // new non-alert implementation).
      const received: Event[] = [];
      const handler = (e: Event) => received.push(e);
      window.addEventListener('cw:capture-screenshot-request', handler);
      chatStore.captureScreenshot();
      window.removeEventListener('cw:capture-screenshot-request', handler);
      expect(received).toHaveLength(1);
    });
  });
});
