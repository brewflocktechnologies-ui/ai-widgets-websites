import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  initStore,
  subscribeAll,
  chatStore,
  bubbleStore,
  chatbarStore,
  greetWindowStore,
  chatWindowStore,
  featuresStore
} from '../../store/chat-store.js';
import { KEYFRAMES_CSS } from '../../tokens/design-tokens.js';
import '../organisms/cw-bubble.js';
import '../organisms/cw-chatbar.js';
import '../organisms/cw-greet-window.js';
import '../organisms/cw-chat-panel.js';

/**
 * cw-widget-root
 * The single "smart" container in the atomic hierarchy. It connects to the store
 * and also accepts reactive Lit properties for direct customization.
 */
@customElement('cw-widget-root')
export class CwWidgetRoot extends LitElement {
  @property({ type: String }) triggerType?: 'bubble' | 'chatbar' | 'chatcard';
  @property({ type: Boolean }) enableWelcomeCard?: boolean;
  @property({ type: Boolean }) enableGreetWindow?: boolean;
  @property({ type: Boolean }) enableInputCard?: boolean;

  // Individual trigger offsets
  @property({ type: Number }) bubbleOffsetRight?: number;
  @property({ type: Number }) bubbleOffsetBottom?: number;
  @property({ type: Number }) barOffsetRight?: number;
  @property({ type: Number }) barOffsetBottom?: number;
  @property({ type: Number }) cardOffsetRight?: number;
  @property({ type: Number }) cardOffsetBottom?: number;

  // Theme & Layout
  @property({ type: String }) clientName?: string;
  @property({ type: String }) agentName?: string;
  @property({ type: Number }) widgetWidth?: number;
  @property({ type: Number }) widgetHeight?: number;
  @property({ type: String }) accentColor?: string;

  // Trigger Customizations
  @property({ type: String }) bubbleBg?: string;
  @property({ type: String }) bubbleLucideIcon?: string;
  @property({ type: String }) bubbleIconColor?: string;
  @property({ type: String }) chatbarBg?: string;
  @property({ type: String }) chatbarText?: string;
  @property({ type: String }) chatcardText?: string;

  // Header & Actions
  @property({ type: String }) headerBg?: string;
  @property({ type: String }) headerTextColor?: string;
  @property({ type: Boolean }) enableVoiceCall?: boolean;
  @property({ type: Boolean }) enableVideoCall?: boolean;
  @property({ type: Boolean }) enableCloseChatVisitor?: boolean;

  // Welcome Card
  @property({ type: String }) welcomeTitle?: string;
  @property({ type: String }) welcomeDescription?: string;
  @property({ type: String }) welcomeBgGradient?: string;
  @property({ type: String }) welcomeButtonText?: string;

  // Proactive Greet Window
  @property({ type: String }) greetTitle?: string;
  @property({ type: String }) greetDescription?: string;
  @property({ type: String }) greetBg?: string;
  @property({ type: String }) greetLucideIcon?: string;
  @property({ type: String }) greetInputPlaceholder?: string;

  // Chat Body & Messages
  @property({ type: String }) bodyBg?: string;
  @property({ type: String }) visitorBubbleBg?: string;
  @property({ type: String }) visitorBubbleTextColor?: string;
  @property({ type: String }) agentBubbleBg?: string;
  @property({ type: String }) agentBubbleTextColor?: string;

  // Composer / Input
  @property({ type: String }) inputBg?: string;
  @property({ type: String }) inputTextColor?: string;
  @property({ type: String }) sendButtonBgActive?: string;
  @property({ type: Boolean }) attachmentsEnabled?: boolean;
  @property({ type: Boolean }) modernUi?: boolean;

  @state() panelOpen = false;
  @state() initialized = false;
  /** Increment on every store event so presentational children re-render. */
  @state() private rev = 0;

  private unsubAll?: () => void;
  private eventListeners: Array<[string, EventListener]> = [];

  private toggleListener = () => this.handleToggleWidget();
  private closeListener = () => this.handleCloseWidget();
  private onKeydown = (e: KeyboardEvent) => this.handleKeydown(e);

  async connectedCallback() {
    super.connectedCallback();

    try {
      await initStore();
    } catch (err) {
      console.warn('CwWidgetRoot initStore warning:', err);
    } finally {
      this.unsubAll = subscribeAll(() => {
        this.rev++;
      });

      window.addEventListener('toggle-contact-widget', this.toggleListener);
      window.addEventListener('close-contact-widget', this.closeListener);

      this.addEventListener('keydown', this.onKeydown);

      this.registerLeafEvents();
      this.initialized = true;
      this.requestUpdate();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubAll?.();
    window.removeEventListener('toggle-contact-widget', this.toggleListener);
    window.removeEventListener('close-contact-widget', this.closeListener);
    this.removeEventListener('keydown', this.onKeydown);
    for (const [name, fn] of this.eventListeners) {
      this.removeEventListener(name, fn);
    }
    this.eventListeners = [];
  }

  static styles = css`
    :host {
      display: block;
      font-family: inherit;
    }
  `;

  // -------------------------------------------------------------------------
  // Event wiring from presentational leaves → store actions
  // -------------------------------------------------------------------------
  private registerLeafEvents() {
    const handlers = new Map<string, (e: CustomEvent) => void>([
      ['cw:toggle', () => this.handleToggleWidget()],
      ['cw:close-panel', () => this.handleCloseWidget()],
      ['cw:start-chat', () => chatStore.startFromWelcome()],
      ['cw:greet-dismiss', () => chatStore.dismissGreetWindow()],
      ['cw:greet-input', (e) => { chatStore.get().draft = e.detail; }],
      ['cw:greet-submit', (e) => this.handleGreetSubmit((e.detail as string) || '')],
      ['cw:draft-change', (e) => { chatStore.get().draft = e.detail; }],
      ['cw:send', () => chatStore.send()],
      ['cw:toggle-attach', () => chatStore.toggleAttach()],
      ['cw:toggle-emoji', () => chatStore.toggleEmoji()],
      ['cw:attach-files', (e) => this.handleAttachFiles(e.detail as HTMLInputElement)],
      ['cw:capture-screenshot', () => chatStore.captureScreenshot()],
      ['cw:dismiss-consent', () => chatStore.dismissConsent()],
      ['cw:download-transcript', () => chatStore.downloadTranscript()],
      ['cw:toggle-sounds', () => chatStore.toggleSounds()],
      ['cw:insert-emoji', (e) => chatStore.insertEmoji(e.detail as string)],
      ['cw:submit-offline', (e) => this.handleSubmitOffline(e.detail)],
      ['cw:start-new', () => chatStore.startNew()],
      ['cw:toggle-expand', () => chatStore.toggleExpand()],
      ['cw:open-menu', () => chatStore.toggleMenu()],
      ['cw:end-chat', () => chatStore.askEndChat()],
      ['cw:confirm-end', () => chatStore.confirmEnd()],
      ['cw:confirm-cancel', () => chatStore.cancelEndChat()],
    ]);

    for (const [name, fn] of handlers) {
      const listener = ((e: Event) => fn(e as CustomEvent)) as EventListener;
      this.addEventListener(name, listener);
      this.eventListeners.push([name, listener]);
    }
  }

  private handleAttachFiles(input: HTMLInputElement) {
    if (input?.files?.length) {
      chatStore.uploadImage(input);
    }
  }

  private handleGreetSubmit(text: string) {
    this.panelOpen = true;
    chatStore.get().panelOpen = true;
    chatStore.startFromWelcome();
    if (text) {
      chatStore.get().draft = text;
      setTimeout(() => chatStore.send(), 0);
    }
    this.requestUpdate();
  }

  private handleSubmitOffline(d?: { name?: string; email?: string; message?: string }) {
    const s = chatStore.get();
    if (!d) return chatStore.submitOffline();
    if (d.name !== undefined) s.offlineName = d.name;
    if (d.email !== undefined) s.offlineEmail = d.email;
    if (d.message !== undefined) s.offlineMessage = d.message;
    chatStore.submitOffline();
  }

  // -------------------------------------------------------------------------
  // Keyboard accessibility (Escape to close + focus trap while open)
  // -------------------------------------------------------------------------

  private handleKeydown(e: KeyboardEvent) {
    if (!this.panelOpen) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      const cs = chatStore.get();
      if (cs.confirmBox) {
        chatStore.cancelEndChat();
      } else {
        this.handleCloseWidget();
      }
      return;
    }

    if (e.key === 'Tab') {
      const focusables = this.collectFocusables();
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const path = e.composedPath();
      const target = (path[0] as HTMLElement) || null;

      if (!path.includes(this)) {
        // Focus escaped the widget — pull it back to the first control.
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && target === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && target === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  /** Collects every native focusable control across nested shadow roots, in DOM order. */
  private collectFocusables(): HTMLElement[] {
    const sel = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const out: HTMLElement[] = [];
    const visit = (root: ShadowRoot) => {
      root.querySelectorAll<HTMLElement>('*').forEach((el) => {
        if (el.shadowRoot) visit(el.shadowRoot);
        if (el.matches(sel)) out.push(el);
      });
    };
    if (this.shadowRoot) visit(this.shadowRoot);
    return out;
  }

  /** Returns keyboard focus to the launcher after the panel closes. */
  private focusLauncher() {
    setTimeout(() => {
      const launcher = this.renderRoot?.querySelector<HTMLElement>('cw-bubble, cw-chatbar');
      (launcher as unknown as { focus?: () => void })?.focus?.();
    }, 60);
  }

  private handleToggleWidget() {
    this.panelOpen = !this.panelOpen;
    chatStore.get().panelOpen = this.panelOpen;
    if (this.panelOpen) {
      chatStore.get().unreadCount = 0;
    } else {
      this.focusLauncher();
    }
    this.requestUpdate();
  }

  private handleCloseWidget() {
    this.panelOpen = false;
    chatStore.get().panelOpen = false;
    this.focusLauncher();
    this.requestUpdate();
  }

  render() {
    if (!this.initialized) return html``;

    const bs = bubbleStore.get();
    const cbs = chatbarStore.get();
    const gws = greetWindowStore.get();
    const cws = chatWindowStore.get();
    const fs = featuresStore.get();
    const cs = chatStore.get();

    const activeTrigger = this.triggerType || (cbs.enabled ? (cbs.layout === 'card' ? 'chatcard' : 'chatbar') : 'bubble');
    const isChatbarTrigger = activeTrigger === 'chatbar' || activeTrigger === 'chatcard';

    const barRight = this.barOffsetRight !== undefined ? this.barOffsetRight : (cbs.barOffsetRight ?? cbs.offsetRight ?? 16);
    const barBottom = this.barOffsetBottom !== undefined ? this.barOffsetBottom : (cbs.barOffsetBottom ?? cbs.offsetBottom ?? 12);
    const cardRight = this.cardOffsetRight !== undefined ? this.cardOffsetRight : (cbs.cardOffsetRight ?? cbs.offsetRight ?? 16);
    const cardBottom = this.cardOffsetBottom !== undefined ? this.cardOffsetBottom : (cbs.cardOffsetBottom ?? cbs.offsetBottom ?? 12);

    const effectiveCbs = {
      ...cbs,
      enabled: isChatbarTrigger,
      layout: activeTrigger === 'chatcard' ? ('card' as const) : ('bar' as const),
      bgColor: this.chatbarBg || cbs.bgColor,
      text: this.chatbarText || cbs.text,
      cardText: this.chatcardText || cbs.cardText,
      barOffsetRight: barRight,
      barOffsetBottom: barBottom,
      cardOffsetRight: cardRight,
      cardOffsetBottom: cardBottom,
      offsetRight: activeTrigger === 'chatcard' ? cardRight : barRight,
      offsetBottom: activeTrigger === 'chatcard' ? cardBottom : barBottom,
    };

    const effectiveBs = {
      ...bs,
      backgroundColor: this.bubbleBg || bs.backgroundColor,
      lucideIcon: this.bubbleLucideIcon || bs.lucideIcon,
      iconColor: this.bubbleIconColor || bs.iconColor,
      offsetRight: this.bubbleOffsetRight !== undefined ? this.bubbleOffsetRight : (bs.offsetRight ?? 16),
      offsetBottom: this.bubbleOffsetBottom !== undefined ? this.bubbleOffsetBottom : (bs.offsetBottom ?? 12),
    };

    const activeOffsetRight = activeTrigger === 'bubble'
      ? effectiveBs.offsetRight
      : effectiveCbs.offsetRight;
    const activeOffsetBottom = activeTrigger === 'bubble'
      ? effectiveBs.offsetBottom
      : effectiveCbs.offsetBottom;

    const effectiveGws = {
      ...gws,
      enabled: this.enableGreetWindow !== undefined ? this.enableGreetWindow : gws.enabled,
      title: this.greetTitle || gws.title,
      description: this.greetDescription || gws.description,
      backgroundColor: this.greetBg || gws.backgroundColor,
      lucideIcon: this.greetLucideIcon || gws.lucideIcon,
      inputBox: {
        ...(gws.inputBox || {}),
        enabled: this.enableInputCard !== undefined ? this.enableInputCard : gws.inputBox?.enabled ?? true,
        placeholder: this.greetInputPlaceholder || gws.inputBox?.placeholder,
      },
    };

    const effectiveCws = {
      ...cws,
      clientName: this.clientName || cws.clientName,
      agentName: this.agentName || cws.agentName,
      widgetWidth: this.widgetWidth || cws.widgetWidth,
      widgetHeight: this.widgetHeight || cws.widgetHeight,
      accentColor: this.accentColor || cws.accentColor,
      headerBg: this.headerBg || cws.headerBg,
      headerTextColor: this.headerTextColor || cws.headerTextColor,
      bodyBg: this.bodyBg || cws.bodyBg,
      visitorBubbleBg: this.visitorBubbleBg || cws.visitorBubbleBg,
      visitorBubbleColor: this.visitorBubbleTextColor || cws.visitorBubbleColor,
      agentBubbleBg: this.agentBubbleBg || cws.agentBubbleBg,
      agentBubbleColor: this.agentBubbleTextColor || cws.agentBubbleColor,
      inputBg: this.inputBg || cws.inputBg,
      inputTextColor: this.inputTextColor || cws.inputTextColor,
      sendButtonBgActive: this.sendButtonBgActive || cws.sendButtonBgActive,
      attachmentsEnabled: this.attachmentsEnabled !== undefined ? this.attachmentsEnabled : cws.attachmentsEnabled,
      modernUi: this.modernUi !== undefined ? this.modernUi : cws.modernUi,
      offsetRight: activeOffsetRight,
      offsetBottom: activeOffsetBottom,
      welcome: cws.welcome
        ? {
            ...cws.welcome,
            enabled: this.enableWelcomeCard !== undefined ? this.enableWelcomeCard : cws.welcome.enabled ?? true,
            title: this.welcomeTitle || cws.welcome.title,
            description: this.welcomeDescription || cws.welcome.description,
            bgGradient: this.welcomeBgGradient || cws.welcome.bgGradient,
            buttonText: this.welcomeButtonText || cws.welcome.buttonText,
          }
        : undefined,
    };

    const effectiveFs = {
      ...fs,
      voiceCallMaster: this.enableVoiceCall !== undefined ? this.enableVoiceCall : fs.voiceCallMaster,
      voiceCallAgents: this.enableVoiceCall !== undefined ? this.enableVoiceCall : fs.voiceCallAgents,
      videoCallMaster: this.enableVideoCall !== undefined ? this.enableVideoCall : fs.videoCallMaster,
      videoCallAgents: this.enableVideoCall !== undefined ? this.enableVideoCall : fs.videoCallAgents,
      closeChatVisitor: this.enableCloseChatVisitor !== undefined ? this.enableCloseChatVisitor : fs.closeChatVisitor,
    };

    return html`
      <style>
        ${KEYFRAMES_CSS}
      </style>

      <!-- FLOATING TRIGGER (BUBBLE OR CHATBAR OR CHATCARD) -->
      ${isChatbarTrigger
        ? html`
            <cw-chatbar
              .config="${effectiveCbs}"
              .panelOpen="${this.panelOpen}"
              .unreadCount="${cs.unreadCount}"
              .rev="${this.rev}"
            ></cw-chatbar>
          `
        : html`
            <cw-bubble
              .config="${effectiveBs}"
              .panelOpen="${this.panelOpen}"
              .unreadCount="${cs.unreadCount}"
              .hasSentMessage="${cs.hasSentMessage}"
              .rev="${this.rev}"
            ></cw-bubble>
          `
      }

      <!-- FLOATING GREET WINDOW -->
      <cw-greet-window
        .config="${effectiveGws}"
        .chatbarConfig="${effectiveCbs}"
        .bubbleConfig="${bs}"
        .panelOpen="${this.panelOpen}"
        .hasSentMessage="${cs.hasSentMessage}"
        .visible="${effectiveGws.visible}"
        .dismissed="${effectiveGws.dismissed}"
        .rev="${this.rev}"
      ></cw-greet-window>

      <!-- MAIN CHAT PANEL -->
      <cw-chat-panel
        .chatWindowConfig="${effectiveCws}"
        .chatState="${cs}"
        .features="${effectiveFs}"
        .chatbarConfig="${effectiveCbs}"
        .bubbleConfig="${effectiveBs}"
        .panelOpen="${this.panelOpen}"
        .rev="${this.rev}"
      ></cw-chat-panel>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cw-widget-root': CwWidgetRoot;
  }
}