import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
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
 * The single "smart" container in the atomic hierarchy. It is the ONLY
 * component that talks to the store. It owns state, passes config down to
 * presentational organisms via properties, and handles all `cw:*` events
 * bubbled up from the leaves by dispatching the corresponding store action.
 */
@customElement('cw-widget-root')
export class CwWidgetRoot extends LitElement {
  @state() panelOpen = false;
  @state() initialized = false;
  /** Increment on every store event so presentational children re-render. */
  @state() private rev = 0;

  private unsubAll?: () => void;
  private eventListeners: Array<[string, EventListener]> = [];

  private toggleListener = () => this.handleToggleWidget();
  private closeListener = () => this.handleCloseWidget();

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

  private handleToggleWidget() {
    this.panelOpen = !this.panelOpen;
    chatStore.get().panelOpen = this.panelOpen;
    if (this.panelOpen) {
      chatStore.get().unreadCount = 0;
    }
    this.requestUpdate();
  }

  private handleCloseWidget() {
    this.panelOpen = false;
    chatStore.get().panelOpen = false;
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

    return html`
      <style>
        ${KEYFRAMES_CSS}
      </style>

      <!-- FLOATING TRIGGER (BUBBLE OR CHATBAR) -->
      ${cbs.enabled
        ? html`
            <cw-chatbar
              .config="${cbs}"
              .panelOpen="${this.panelOpen}"
              .unreadCount="${cs.unreadCount}"
              .rev="${this.rev}"
            ></cw-chatbar>
          `
        : html`
            <cw-bubble
              .config="${bs}"
              .panelOpen="${this.panelOpen}"
              .unreadCount="${cs.unreadCount}"
              .hasSentMessage="${cs.hasSentMessage}"
              .rev="${this.rev}"
            ></cw-bubble>
          `
      }

      <!-- FLOATING GREET WINDOW -->
      <cw-greet-window
        .config="${gws}"
        .chatbarConfig="${cbs}"
        .bubbleConfig="${bs}"
        .panelOpen="${this.panelOpen}"
        .hasSentMessage="${cs.hasSentMessage}"
        .visible="${gws.visible}"
        .dismissed="${gws.dismissed}"
        .rev="${this.rev}"
      ></cw-greet-window>

      <!-- MAIN CHAT PANEL -->
      <cw-chat-panel
        .chatWindowConfig="${cws}"
        .chatState="${cs}"
        .features="${fs}"
        .chatbarConfig="${cbs}"
        .bubbleConfig="${bs}"
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