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
import { CHATBAR_BAR_PRESET, CHATBAR_CARD_PRESET } from '../../tokens/chatbar-presets.js';
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
  // -------------------------------------------------------------------------
  // 1. Widget & Layout
  // -------------------------------------------------------------------------
  @property({ type: String }) clientName?: string;
  @property({ type: String }) agentName?: string;
  @property({ type: Number }) widgetWidth?: number;
  @property({ type: Number }) widgetHeight?: number;
  @property({ type: Number }) expandedWidth?: number;
  @property({ type: Number }) widgetBorderRadius?: number;
  @property({ type: String }) accentColor?: string;

  // -------------------------------------------------------------------------
  // 2. Trigger & Positioning (Bubble)
  // -------------------------------------------------------------------------
  @property({ type: String }) triggerType?: 'bubble' | 'chatbar' | 'chatcard';
  @property({ type: Number }) bubbleOffsetRight?: number;
  @property({ type: Number }) bubbleOffsetBottom?: number;
  @property({ type: Number }) barOffsetRight?: number;
  @property({ type: Number }) barOffsetBottom?: number;
  @property({ type: Number }) cardOffsetRight?: number;
  @property({ type: Number }) cardOffsetBottom?: number;
  @property({ type: Number }) bubbleWidth?: number;
  @property({ type: Number }) bubbleHeight?: number;
  @property({ type: Boolean }) bubbleHideOnOpen?: boolean;
  @property({ type: String }) bubbleBg?: string;
  @property({ type: String }) bubbleGradientType?: 'none' | 'linear' | 'radial';
  @property({ type: Number }) bubbleGradientAngle?: number;
  @property({ type: String }) bubbleGradientStart?: string;
  @property({ type: String }) bubbleGradientEnd?: string;
  @property({ type: Number }) bubbleBorderWidth?: number;
  @property({ type: String }) bubbleBorderStyle?: 'solid' | 'dashed' | 'dotted';
  @property({ type: String }) bubbleBorderColor?: string;
  @property({ type: Boolean }) bubbleOutlineRingEnabled?: boolean;
  @property({ type: Number }) bubbleOutlineRingWidth?: number;
  @property({ type: String }) bubbleOutlineRingColor?: string;
  @property({ type: Number }) bubbleBoxShadowBlur?: number;
  @property({ type: Number }) bubbleBoxShadowOffsetY?: number;
  @property({ type: Number }) bubbleBoxShadowOpacity?: number;
  @property({ type: Boolean }) bubbleInnerShadowEnabled?: boolean;
  @property({ type: Boolean }) bubbleGlassEnabled?: boolean;
  @property({ type: Number }) bubbleGlassBlur?: number;
  @property({ type: Boolean }) bubbleNeonEnabled?: boolean;
  @property({ type: String }) bubbleNeonColor?: string;
  @property({ type: String }) bubbleLucideIcon?: string;
  @property({ type: Number }) bubbleLucideSize?: number;
  @property({ type: String }) bubbleIconColor?: string;
  @property({ type: Number }) bubbleHoverScale?: number;
  @property({ type: Boolean }) bubbleIdleAnimEnabled?: boolean;
  @property({ type: String }) bubbleIdleAnimType?: 'none' | 'bounce' | 'pulse' | 'float';
  @property({ type: Boolean }) bubbleTooltipEnabled?: boolean;
  @property({ type: String }) bubbleTooltipText?: string;
  @property({ type: String }) bubbleTooltipPosition?: string;
  @property({ type: String }) bubbleTooltipBg?: string;
  @property({ type: String }) bubbleTooltipTextColor?: string;
  @property({ type: String }) bubbleBadgePosition?: 'top-right' | 'top-left' | 'bottom-right';
  @property({ type: String }) bubbleBadgeBg?: string;
  @property({ type: String }) bubbleBadgeTextColor?: string;

  // -------------------------------------------------------------------------
  // 3. Chatbar Trigger Layout
  // -------------------------------------------------------------------------
  @property({ type: String }) chatbarLayout?: 'bar' | 'card';
  @property({ type: Number }) chatbarWidth?: number;
  @property({ type: Number }) chatbarHeight?: number;
  @property({ type: String }) chatbarBg?: string;
  @property({ type: Boolean }) chatbarGradientEnabled?: boolean;
  @property({ type: String }) chatbarGradientStart?: string;
  @property({ type: String }) chatbarGradientEnd?: string;
  @property({ type: Number }) chatbarBorderRadius?: number;
  @property({ type: String }) chatbarText?: string;
  @property({ type: String }) chatcardText?: string;
  @property({ type: Number }) chatbarTextSize?: number;
  @property({ type: String }) chatbarTextColor?: string;
  @property({ type: String }) chatbarLucideIcon?: string;
  @property({ type: Number }) chatbarIconSize?: number;
  @property({ type: String }) chatbarIconColor?: string;

  // -------------------------------------------------------------------------
  // 4. Proactive Greet Window
  // -------------------------------------------------------------------------
  @property({ type: Boolean }) enableGreetWindow?: boolean;
  @property({ type: String }) greetTitle?: string;
  @property({ type: String }) greetTitleColor?: string;
  @property({ type: Number }) greetTitleFontSize?: number;
  @property({ type: String }) greetDescription?: string;
  @property({ type: String }) greetDescriptionColor?: string;
  @property({ type: Number }) greetDescriptionFontSize?: number;
  @property({ type: String }) greetBg?: string;
  @property({ type: Number }) greetWidth?: number;
  @property({ type: Number }) greetBorderRadius?: number;
  @property({ type: Number }) greetSpacing?: number;
  @property({ type: Number }) greetOpeningDelaySec?: number;
  @property({ type: Number }) greetFadeInSpeedSec?: number;
  @property({ type: String }) greetIconType?: 'lucide' | 'image' | 'customSvg';
  @property({ type: String }) greetIconAlign?: 'center' | 'left' | 'right';
  @property({ type: String }) greetLucideIcon?: string;
  @property({ type: Number }) greetIconSize?: number;
  @property({ type: String }) greetIconColor?: string;
  @property({ type: String }) greetIconAnimation?: 'none' | 'wiggle' | 'pulse' | 'bounce';
  @property({ type: String }) greetImageUrl?: string;
  @property({ type: Boolean }) enableInputCard?: boolean;
  @property({ type: Number }) greetInputOpeningDelaySec?: number;
  @property({ type: String }) greetInputLayout?: 'separated' | 'integrated';
  @property({ type: String }) greetInputPlaceholder?: string;
  @property({ type: String }) greetInputBg?: string;
  @property({ type: String }) greetInputTextColor?: string;
  @property({ type: Number }) greetInputBorderRadius?: number;
  @property({ type: String }) greetInputButtonColor?: string;
  @property({ type: String }) greetInputButtonIconColor?: string;

  // -------------------------------------------------------------------------
  // 5. Welcome Dashboard Card
  // -------------------------------------------------------------------------
  @property({ type: Boolean }) enableWelcomeCard?: boolean;
  @property({ type: String }) welcomeCardLayout?: 'glassy' | 'normal';
  @property({ type: String }) welcomeTitle?: string;
  @property({ type: String }) welcomeDescription?: string;
  @property({ type: String }) welcomeBgGradient?: string;
  @property({ type: String }) welcomeButtonText?: string;
  @property({ type: String }) welcomeButtonSubtext?: string;
  @property({ type: String }) welcomeButtonBg?: string;
  @property({ type: String }) welcomeButtonTextColor?: string;
  @property({ type: String }) welcomeLogoUrl?: string;
  @property({ type: Number }) welcomeCardBorderRadius?: number;
  @property({ type: Number }) welcomeCardBlur?: number;

  // -------------------------------------------------------------------------
  // 6. Header & Features
  // -------------------------------------------------------------------------
  @property({ type: String }) headerBg?: string;
  @property({ type: String }) headerTextColor?: string;
  @property({ type: String }) headerBorderColor?: string;
  @property({ type: String }) headerAvatarBg?: string;
  @property({ type: String }) headerAvatarColor?: string;
  @property({ type: String }) activeDotColor?: string;
  @property({ type: Boolean }) activeDotAnimate?: boolean;
  @property({ type: Boolean }) enableVoiceCall?: boolean;
  @property({ type: Boolean }) enableVideoCall?: boolean;
  @property({ type: Boolean }) enableCloseChatVisitor?: boolean;

  // -------------------------------------------------------------------------
  // 7. Messages & Bubbles
  // -------------------------------------------------------------------------
  @property({ type: String }) bodyBg?: string;
  @property({ type: String }) visitorBubbleBg?: string;
  @property({ type: String }) visitorBubbleTextColor?: string;
  @property({ type: Number }) visitorBubbleFontSize?: number;
  @property({ type: Number }) visitorBubbleBorderRadius?: number;
  @property({ type: String }) agentBubbleBg?: string;
  @property({ type: String }) agentBubbleTextColor?: string;
  @property({ type: String }) agentBubbleBorderColor?: string;
  @property({ type: Number }) agentBubbleFontSize?: number;
  @property({ type: Number }) agentBubbleBorderRadius?: number;
  @property({ type: String }) agentAvatarBg?: string;
  @property({ type: String }) agentAvatarColor?: string;
  @property({ type: String }) agentAvatarUrl?: string;

  // -------------------------------------------------------------------------
  // 8. Composer & Input Field Controls
  // -------------------------------------------------------------------------
  @property({ type: String }) inputBg?: string;
  @property({ type: String }) inputTextColor?: string;
  @property({ type: String }) inputPlaceholderColor?: string;
  @property({ type: String }) inputBorderColor?: string;
  @property({ type: String }) inputFocusBorderColor?: string;
  @property({ type: Number }) inputBorderRadius?: number;
  @property({ type: Number }) textareaFontSize?: number;
  @property({ type: String }) attachButtonBg?: string;
  @property({ type: String }) attachButtonColor?: string;
  @property({ type: String }) emojiButtonColor?: string;
  @property({ type: String }) sendIconType?: 'arrow' | 'send';
  @property({ type: String }) sendButtonBgActive?: string;
  @property({ type: String }) sendButtonColorActive?: string;
  @property({ type: String }) sendButtonBgInactive?: string;
  @property({ type: String }) sendButtonColorInactive?: string;
  @property({ type: Boolean }) modernUi?: boolean;
  @property({ type: Boolean }) typingIndicator?: boolean;
  @property({ type: Boolean }) attachmentsEnabled?: boolean;
  @property({ type: Boolean }) ticksEnabled?: boolean;
  @property({ type: String }) sentTickColor?: string;
  @property({ type: String }) readTickColor?: string;

  // -------------------------------------------------------------------------
  // 9. Footer, Frame & Modals
  // -------------------------------------------------------------------------
  @property({ type: String }) footerBg?: string;
  @property({ type: String }) footerTextColor?: string;
  @property({ type: String }) poweredByText?: string;
  @property({ type: String }) poweredByLink?: string;
  @property({ type: String }) poweredByColor?: string;
  @property({ type: Boolean }) widgetShadow?: boolean;
  @property({ type: Number }) widgetShadowBlur?: number;
  @property({ type: String }) widgetShadowColor?: string;
  @property({ type: Boolean }) widgetBorderEnabled?: boolean;
  @property({ type: Number }) widgetBorderWidth?: number;
  @property({ type: String }) widgetBorderColor?: string;
  @property({ type: String }) endChatConfirmMessage?: string;
  @property({ type: String }) endChatConfirmLabel?: string;
  @property({ type: String }) endChatCancelLabel?: string;
  @property({ type: String }) modalCardBg?: string;
  @property({ type: String }) modalMessageColor?: string;
  @property({ type: Number }) modalBorderRadius?: number;
  @property({ type: String }) endChatConfirmBg?: string;
  @property({ type: String }) endChatConfirmTextColor?: string;

  @state() panelOpen = false;
  @state() initialized = false;
  @state() private userHasSentMessage = false;
  @state() private activeTriggerOverride?: 'bubble' | 'chatbar' | 'chatcard';
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

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    if (changedProperties.has('triggerType')) {
      this.activeTriggerOverride = undefined;
      this.userHasSentMessage = false;
    }
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
      ['cw:greet-submit', (e) => {
        this.userHasSentMessage = true;
        this.handleGreetSubmit((e.detail as string) || '');
      }],
      ['cw:draft-change', (e) => { chatStore.get().draft = e.detail; }],
      ['cw:send', () => {
        this.userHasSentMessage = true;
        chatStore.send();
      }],
      ['cw:toggle-attach', () => chatStore.toggleAttach()],
      ['cw:toggle-emoji', () => chatStore.toggleEmoji()],
      ['cw:attach-files', (e) => this.handleAttachFiles(e.detail as HTMLInputElement)],
      ['cw:capture-screenshot', () => chatStore.captureScreenshot()],
      ['cw:dismiss-consent', () => chatStore.dismissConsent()],
      ['cw:download-transcript', () => chatStore.downloadTranscript()],
      ['cw:toggle-sounds', () => chatStore.toggleSounds()],
      ['cw:insert-emoji', (e) => chatStore.insertEmoji(e.detail as string)],
      ['cw:submit-offline', (e) => {
        this.userHasSentMessage = true;
        this.handleSubmitOffline(e.detail);
      }],
      ['cw:start-new', () => chatStore.startNew()],
      ['cw:toggle-expand', () => chatStore.toggleExpand()],
      ['cw:open-menu', () => chatStore.toggleMenu()],
      ['cw:close-popups', () => chatStore.closePopups()],
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

  private checkCardToBarCollapse() {
    const cbs = chatbarStore.get();
    const currentTrigger = this.activeTriggerOverride || this.triggerType || (cbs?.enabled ? (cbs.layout === 'card' ? 'chatcard' : 'chatbar') : 'bubble');
    const hasVisitorMsg = this.userHasSentMessage || chatStore.get()?.messages?.some(m => m.senderType === 'VISITOR');
    if (hasVisitorMsg && currentTrigger === 'chatcard') {
      this.activeTriggerOverride = 'chatbar';
      if (cbs) cbs.layout = 'bar';
    }
  }

  private handleToggleWidget() {
    this.panelOpen = !this.panelOpen;
    chatStore.get().panelOpen = this.panelOpen;
    if (this.panelOpen) {
      chatStore.get().unreadCount = 0;
    } else {
      this.checkCardToBarCollapse();
      this.focusLauncher();
    }
    this.requestUpdate();
  }

  private handleCloseWidget() {
    this.panelOpen = false;
    chatStore.get().panelOpen = false;
    this.checkCardToBarCollapse();
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

    const activeTrigger = this.activeTriggerOverride || this.triggerType || (cbs.enabled ? (cbs.layout === 'card' ? 'chatcard' : 'chatbar') : 'bubble');
    const isChatbarTrigger = activeTrigger === 'chatbar' || activeTrigger === 'chatcard';

    const barRight = this.barOffsetRight !== undefined ? this.barOffsetRight : (cbs.barOffsetRight ?? cbs.offsetRight ?? 16);
    const barBottom = this.barOffsetBottom !== undefined ? this.barOffsetBottom : (cbs.barOffsetBottom ?? cbs.offsetBottom ?? 12);
    const cardRight = this.cardOffsetRight !== undefined ? this.cardOffsetRight : (cbs.cardOffsetRight ?? cbs.offsetRight ?? 16);
    const cardBottom = this.cardOffsetBottom !== undefined ? this.cardOffsetBottom : (cbs.cardOffsetBottom ?? cbs.offsetBottom ?? 12);

    const isCardLayout = (this.chatbarLayout || (activeTrigger === 'chatcard' ? 'card' : 'bar')) === 'card';
    const preset = isCardLayout ? CHATBAR_CARD_PRESET : CHATBAR_BAR_PRESET;

    const effectiveCbs = {
      ...preset,
      ...cbs,
      enabled: isChatbarTrigger,
      layout: isCardLayout ? 'card' : 'bar',
      width: (this.chatbarWidth !== undefined && this.chatbarWidth !== CHATBAR_BAR_PRESET.width)
        ? this.chatbarWidth
        : preset.width,
      height: (this.chatbarHeight !== undefined && this.chatbarHeight !== CHATBAR_BAR_PRESET.height)
        ? this.chatbarHeight
        : preset.height,
      bgColor: this.chatbarBg || cbs.bgColor,
      gradientEnabled: this.chatbarGradientEnabled !== undefined ? this.chatbarGradientEnabled : cbs.gradientEnabled,
      gradientStops: (this.chatbarGradientStart || this.chatbarGradientEnd)
        ? [
            { color: this.chatbarGradientStart || cbs.gradientStops?.[0]?.color || cbs.bgColor, pos: 0 },
            { color: this.chatbarGradientEnd || cbs.gradientStops?.[1]?.color || cbs.bgColor, pos: 100 },
          ]
        : cbs.gradientStops,
      borderRadius: (this.chatbarBorderRadius !== undefined && this.chatbarBorderRadius !== 20)
        ? { tl: this.chatbarBorderRadius, tr: this.chatbarBorderRadius, bl: this.chatbarBorderRadius, br: this.chatbarBorderRadius }
        : preset.borderRadius,
      padding: isCardLayout ? CHATBAR_CARD_PRESET.padding : (cbs.padding || CHATBAR_BAR_PRESET.padding),
      gap: isCardLayout ? CHATBAR_CARD_PRESET.gap : (cbs.gap ?? CHATBAR_BAR_PRESET.gap),
      text: this.chatbarText || cbs.text,
      cardText: this.chatcardText || cbs.cardText,
      textSize: this.chatbarTextSize || cbs.textSize,
      textColor: this.chatbarTextColor || cbs.textColor,
      lucideIcon: this.chatbarLucideIcon || cbs.lucideIcon,
      iconWidth: this.chatbarIconSize || cbs.iconWidth || preset.iconWidth || 36,
      iconHeight: this.chatbarIconSize || cbs.iconHeight || preset.iconHeight || 36,
      iconColor: this.chatbarIconColor || cbs.iconColor,
      barOffsetRight: barRight,
      barOffsetBottom: barBottom,
      cardOffsetRight: cardRight,
      cardOffsetBottom: cardBottom,
      offsetRight: activeTrigger === 'chatcard' ? cardRight : barRight,
      offsetBottom: activeTrigger === 'chatcard' ? cardBottom : barBottom,
    };

    const effectiveBs = {
      ...bs,
      width: this.bubbleWidth || bs.width,
      height: this.bubbleHeight || bs.height,
      hideOnOpen: this.bubbleHideOnOpen !== undefined ? this.bubbleHideOnOpen : bs.hideOnOpen,
      backgroundColor: this.bubbleBg || bs.backgroundColor,
      gradientType: this.bubbleGradientType || bs.gradientType,
      gradientAngle: this.bubbleGradientAngle !== undefined ? this.bubbleGradientAngle : bs.gradientAngle,
      gradientStops: (this.bubbleGradientStart || this.bubbleGradientEnd)
        ? [
            { color: this.bubbleGradientStart || bs.gradientStops?.[0]?.color || bs.backgroundColor, pos: 0 },
            { color: this.bubbleGradientEnd || bs.gradientStops?.[1]?.color || bs.backgroundColor, pos: 100 },
          ]
        : bs.gradientStops,
      border: {
        ...(bs.border || {}),
        width: this.bubbleBorderWidth !== undefined ? this.bubbleBorderWidth : bs.border?.width,
        style: this.bubbleBorderStyle || bs.border?.style || 'solid',
        color: this.bubbleBorderColor || bs.border?.color,
      },
      outlineRing: {
        ...(bs.outlineRing || {}),
        enabled: this.bubbleOutlineRingEnabled !== undefined ? this.bubbleOutlineRingEnabled : bs.outlineRing?.enabled,
        width: this.bubbleOutlineRingWidth !== undefined ? this.bubbleOutlineRingWidth : bs.outlineRing?.width,
        color: this.bubbleOutlineRingColor || bs.outlineRing?.color,
      },
      boxShadowBlur: this.bubbleBoxShadowBlur !== undefined ? this.bubbleBoxShadowBlur : bs.boxShadowBlur,
      boxShadowOffsetY: this.bubbleBoxShadowOffsetY !== undefined ? this.bubbleBoxShadowOffsetY : bs.boxShadowOffsetY,
      boxShadowOpacity: this.bubbleBoxShadowOpacity !== undefined ? this.bubbleBoxShadowOpacity : bs.boxShadowOpacity,
      innerShadow: {
        ...(bs.innerShadow || {}),
        enabled: this.bubbleInnerShadowEnabled !== undefined ? this.bubbleInnerShadowEnabled : bs.innerShadow?.enabled,
      },
      glass: {
        ...(bs.glass || {}),
        enabled: this.bubbleGlassEnabled !== undefined ? this.bubbleGlassEnabled : bs.glass?.enabled,
        blur: this.bubbleGlassBlur !== undefined ? this.bubbleGlassBlur : bs.glass?.blur,
      },
      neon: {
        ...(bs.neon || {}),
        enabled: this.bubbleNeonEnabled !== undefined ? this.bubbleNeonEnabled : bs.neon?.enabled,
        color: this.bubbleNeonColor || bs.neon?.color,
      },
      lucideIcon: this.bubbleLucideIcon || bs.lucideIcon,
      lucideSize: this.bubbleLucideSize || bs.lucideSize,
      iconColor: this.bubbleIconColor || bs.iconColor,
      hoverScale: this.bubbleHoverScale !== undefined ? this.bubbleHoverScale : bs.hoverScale,
      idleAnim: {
        ...(bs.idleAnim || {}),
        enabled: this.bubbleIdleAnimEnabled !== undefined ? this.bubbleIdleAnimEnabled : bs.idleAnim?.enabled,
        type: this.bubbleIdleAnimType || bs.idleAnim?.type,
      },
      tooltip: {
        ...(bs.tooltip || {}),
        enabled: this.bubbleTooltipEnabled !== undefined ? this.bubbleTooltipEnabled : bs.tooltip?.enabled,
        text: this.bubbleTooltipText || bs.tooltip?.text,
        position: this.bubbleTooltipPosition || bs.tooltip?.position,
        backgroundColor: this.bubbleTooltipBg || bs.tooltip?.backgroundColor,
        textColor: this.bubbleTooltipTextColor || bs.tooltip?.textColor,
      },
      badge: {
        ...(bs.badge || {}),
        position: this.bubbleBadgePosition || bs.badge?.position,
        backgroundColor: this.bubbleBadgeBg || bs.badge?.backgroundColor,
        textColor: this.bubbleBadgeTextColor || bs.badge?.textColor,
      },
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
      titleColor: this.greetTitleColor || gws.titleColor,
      titleFontSize: this.greetTitleFontSize || gws.titleFontSize,
      description: this.greetDescription || gws.description,
      descriptionColor: this.greetDescriptionColor || gws.descriptionColor,
      descriptionFontSize: this.greetDescriptionFontSize || gws.descriptionFontSize,
      backgroundColor: this.greetBg || gws.backgroundColor,
      width: this.greetWidth || gws.width,
      borderRadius: this.greetBorderRadius || gws.borderRadius,
      spacing: this.greetSpacing !== undefined ? this.greetSpacing : gws.spacing,
      openingTimeAfterInitialLoadSec: this.greetOpeningDelaySec !== undefined ? this.greetOpeningDelaySec : gws.openingTimeAfterInitialLoadSec,
      animationOpeningSec: this.greetFadeInSpeedSec !== undefined ? this.greetFadeInSpeedSec : gws.animationOpeningSec,
      iconType: this.greetIconType || gws.iconType,
      iconAlign: this.greetIconAlign || gws.iconAlign,
      lucideIcon: this.greetLucideIcon || gws.lucideIcon,
      iconSize: this.greetIconSize || gws.iconSize,
      iconColor: this.greetIconColor || gws.iconColor,
      iconAnimation: this.greetIconAnimation || gws.iconAnimation,
      imageUrl: this.greetImageUrl || gws.imageUrl,
      inputBox: {
        ...(gws.inputBox || {}),
        enabled: this.enableInputCard !== undefined ? this.enableInputCard : gws.inputBox?.enabled ?? true,
        openingTimeAfterInitialLoadSec: this.greetInputOpeningDelaySec !== undefined ? this.greetInputOpeningDelaySec : gws.inputBox?.openingTimeAfterInitialLoadSec,
        layout: this.greetInputLayout || gws.inputBox?.layout,
        placeholder: this.greetInputPlaceholder || gws.inputBox?.placeholder,
        backgroundColor: this.greetInputBg || gws.inputBox?.backgroundColor,
        textColor: this.greetInputTextColor || gws.inputBox?.textColor,
        borderRadius: this.greetInputBorderRadius || gws.inputBox?.borderRadius,
        buttonColor: this.greetInputButtonColor || gws.inputBox?.buttonColor,
        buttonIconColor: this.greetInputButtonIconColor || gws.inputBox?.buttonIconColor,
      },
    };

    const effectiveCws = {
      ...cws,
      clientName: this.clientName || cws.clientName,
      agentName: this.agentName || cws.agentName,
      widgetWidth: this.widgetWidth || cws.widgetWidth,
      widgetHeight: this.widgetHeight || cws.widgetHeight,
      expandedWidth: this.expandedWidth || cws.expandedWidth,
      widgetBorderRadius: this.widgetBorderRadius || cws.widgetBorderRadius,
      accentColor: this.accentColor || cws.accentColor,
      headerBg: this.headerBg || cws.headerBg,
      headerTextColor: this.headerTextColor || cws.headerTextColor,
      headerBorderColor: this.headerBorderColor || cws.headerBorderColor,
      headerAvatarBg: this.headerAvatarBg || cws.headerAvatarBg,
      headerAvatarColor: this.headerAvatarColor || cws.headerAvatarColor,
      activeDot: {
        ...(cws.activeDot || {}),
        color: this.activeDotColor || cws.activeDot?.color,
        animate: this.activeDotAnimate !== undefined ? this.activeDotAnimate : cws.activeDot?.animate,
      },
      bodyBg: this.bodyBg || cws.bodyBg,
      visitorBubbleBg: this.visitorBubbleBg || cws.visitorBubbleBg,
      visitorBubbleColor: this.visitorBubbleTextColor || cws.visitorBubbleColor,
      visitorBubbleFontSize: this.visitorBubbleFontSize || cws.visitorBubbleFontSize,
      visitorBubbleBorderRadius: this.visitorBubbleBorderRadius || cws.visitorBubbleBorderRadius,
      agentBubbleBg: this.agentBubbleBg || cws.agentBubbleBg,
      agentBubbleColor: this.agentBubbleTextColor || cws.agentBubbleColor,
      agentBubbleBorderColor: this.agentBubbleBorderColor || cws.agentBubbleBorderColor,
      agentBubbleFontSize: this.agentBubbleFontSize || cws.agentBubbleFontSize,
      agentBubbleBorderRadius: this.agentBubbleBorderRadius || cws.agentBubbleBorderRadius,
      agentAvatarBg: this.agentAvatarBg || cws.agentAvatarBg,
      agentAvatarColor: this.agentAvatarColor || cws.agentAvatarColor,
      agentAvatarUrl: this.agentAvatarUrl || cws.agentAvatarUrl,
      inputBg: this.inputBg || cws.inputBg,
      inputTextColor: this.inputTextColor || cws.inputTextColor,
      inputPlaceholderColor: this.inputPlaceholderColor || cws.inputPlaceholderColor,
      inputBorderColor: this.inputBorderColor || cws.inputBorderColor,
      inputFocusBorderColor: this.inputFocusBorderColor || cws.inputFocusBorderColor,
      inputBorderRadius: this.inputBorderRadius || cws.inputBorderRadius,
      textareaFontSize: this.textareaFontSize || cws.textareaFontSize,
      attachButtonBg: this.attachButtonBg || cws.attachButtonBg,
      attachButtonColor: this.attachButtonColor || cws.attachButtonColor,
      emojiButtonColor: this.emojiButtonColor || cws.emojiButtonColor,
      sendIconType: this.sendIconType || cws.sendIconType,
      sendButtonBgActive: this.sendButtonBgActive || cws.sendButtonBgActive,
      sendButtonColorActive: this.sendButtonColorActive || cws.sendButtonColorActive,
      sendButtonBgInactive: this.sendButtonBgInactive || cws.sendButtonBgInactive,
      sendButtonColorInactive: this.sendButtonColorInactive || cws.sendButtonColorInactive,
      footerBg: this.footerBg || cws.footerBg,
      footerTextColor: this.footerTextColor || cws.footerTextColor,
      poweredByText: this.poweredByText || cws.poweredByText,
      poweredByLink: this.poweredByLink || cws.poweredByLink,
      poweredByColor: this.poweredByColor || cws.poweredByColor,
      modernUi: this.modernUi !== undefined ? this.modernUi : cws.modernUi,
      typingIndicator: this.typingIndicator !== undefined ? this.typingIndicator : cws.typingIndicator,
      attachmentsEnabled: this.attachmentsEnabled !== undefined ? this.attachmentsEnabled : cws.attachmentsEnabled,
      ticksEnabled: this.ticksEnabled !== undefined ? this.ticksEnabled : cws.ticksEnabled,
      sentTickColor: this.sentTickColor || cws.sentTickColor,
      readTickColor: this.readTickColor || cws.readTickColor,
      widgetShadow: this.widgetShadow !== undefined ? this.widgetShadow : cws.widgetShadow,
      widgetShadowBlur: this.widgetShadowBlur || cws.widgetShadowBlur,
      widgetShadowColor: this.widgetShadowColor || cws.widgetShadowColor,
      widgetBorderEnabled: this.widgetBorderEnabled !== undefined ? this.widgetBorderEnabled : cws.widgetBorderEnabled,
      widgetBorderWidth: this.widgetBorderWidth || cws.widgetBorderWidth,
      widgetBorderColor: this.widgetBorderColor || cws.widgetBorderColor,
      endChatConfirmMessage: this.endChatConfirmMessage || cws.endChatConfirmMessage,
      endChatConfirmLabel: this.endChatConfirmLabel || cws.endChatConfirmLabel,
      endChatCancelLabel: this.endChatCancelLabel || cws.endChatCancelLabel,
      modalCardBg: this.modalCardBg || cws.modalCardBg,
      modalMessageColor: this.modalMessageColor || cws.modalMessageColor,
      modalBorderRadius: this.modalBorderRadius || cws.modalBorderRadius,
      endChatConfirmBg: this.endChatConfirmBg || cws.endChatConfirmBg,
      endChatConfirmTextColor: this.endChatConfirmTextColor || cws.endChatConfirmTextColor,
      offsetRight: 16,
      offsetBottom: activeOffsetBottom,
      welcome: {
        ...(cws.welcome || {}),
        enabled: this.enableWelcomeCard !== undefined ? this.enableWelcomeCard : cws.welcome?.enabled ?? true,
        cardLayout: this.welcomeCardLayout || cws.welcome?.cardLayout,
        title: this.welcomeTitle || cws.welcome?.title,
        description: this.welcomeDescription || cws.welcome?.description,
        bgGradient: this.welcomeBgGradient || cws.welcome?.bgGradient,
        buttonText: this.welcomeButtonText || cws.welcome?.buttonText,
        buttonSubtext: this.welcomeButtonSubtext || cws.welcome?.buttonSubtext,
        buttonBg: this.welcomeButtonBg || cws.welcome?.buttonBg,
        buttonTextColor: this.welcomeButtonTextColor || cws.welcome?.buttonTextColor,
        logoUrl: this.welcomeLogoUrl || cws.welcome?.logoUrl,
        cardBorderRadius: this.welcomeCardBorderRadius || cws.welcome?.cardBorderRadius,
        cardBlur: this.welcomeCardBlur || cws.welcome?.cardBlur,
      },
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