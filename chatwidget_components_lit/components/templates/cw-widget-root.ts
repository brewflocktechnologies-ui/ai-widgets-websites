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

@customElement('cw-widget-root')
export class CwWidgetRoot extends LitElement {
  @state() panelOpen = false;
  @state() initialized = false;

  private unsubAll?: () => void;
  private toggleListener = () => this.handleToggleWidget();
  private closeListener = () => this.handleCloseWidget();

  async connectedCallback() {
    super.connectedCallback();

    try {
      // Initialize store
      await initStore();
    } catch (err) {
      console.warn('CwWidgetRoot initStore warning:', err);
    } finally {
      // Subscribe to store updates
      this.unsubAll = subscribeAll(() => this.requestUpdate());

      // Listen for custom events dispatched anywhere on window
      window.addEventListener('toggle-contact-widget', this.toggleListener);
      window.addEventListener('close-contact-widget', this.closeListener);

      this.initialized = true;
      this.requestUpdate();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubAll?.();
    window.removeEventListener('toggle-contact-widget', this.toggleListener);
    window.removeEventListener('close-contact-widget', this.closeListener);
  }

  static styles = css`
    :host {
      display: block;
      font-family: inherit;
    }
  `;

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
            ></cw-chatbar>
          `
        : html`
            <cw-bubble
              .config="${bs}"
              .panelOpen="${this.panelOpen}"
              .unreadCount="${cs.unreadCount}"
              .hasSentMessage="${cs.hasSentMessage}"
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
      ></cw-greet-window>

      <!-- MAIN CHAT PANEL -->
      <cw-chat-panel
        .chatWindowConfig="${cws}"
        .chatState="${cs}"
        .features="${fs}"
        .chatbarConfig="${cbs}"
        .bubbleConfig="${bs}"
        .panelOpen="${this.panelOpen}"
      ></cw-chat-panel>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cw-widget-root': CwWidgetRoot;
  }
}
