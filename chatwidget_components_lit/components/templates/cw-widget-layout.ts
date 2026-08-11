import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type {
  BubbleState,
  ChatbarState,
  GreetWindowState,
  ChatWindowState,
  FeaturesState,
  ChatState,
} from '../../store/types.js';
import { KEYFRAMES_CSS } from '../../tokens/design-tokens.js';
import '../organisms/cw-bubble.js';
import '../organisms/cw-chatbar.js';
import '../organisms/cw-greet-window.js';
import '../organisms/cw-chat-panel.js';

/**
 * cw-widget-layout
 * Pure presentational template component for the chat widget surface.
 * Lays out the floating trigger (bubble/chatbar), greet window, and main chat panel.
 * Receives all configuration and state via props. Contains ZERO store dependencies.
 */
@customElement('cw-widget-layout')
export class CwWidgetLayout extends LitElement {
  @property({ type: Object }) bubbleConfig?: Partial<BubbleState>;
  @property({ type: Object }) chatbarConfig?: Partial<ChatbarState>;
  @property({ type: Object }) greetWindowConfig?: Partial<GreetWindowState>;
  @property({ type: Object }) chatWindowConfig?: Partial<ChatWindowState>;
  @property({ type: Object }) featuresConfig?: Partial<FeaturesState>;
  @property({ type: Object }) chatState?: Partial<ChatState>;

  @property({ type: Boolean }) panelOpen = false;
  @property({ type: Number }) unreadCount = 0;
  @property({ type: Boolean }) hasSentMessage = false;
  @property({ type: Number }) rev = 0;

  render() {
    const bs = this.bubbleConfig || {};
    const cbs = this.chatbarConfig || {};
    const gws = this.greetWindowConfig || {};
    const cws = this.chatWindowConfig || {};
    const fs = this.featuresConfig || {};
    const cs = (this.chatState || {}) as ChatState;

    const activeTrigger = cbs.enabled ? (cbs.layout === 'card' ? 'chatcard' : 'chatbar') : 'bubble';
    const isChatbarTrigger = activeTrigger === 'chatbar' || activeTrigger === 'chatcard';

    return html`
      <style>
        ${KEYFRAMES_CSS}
      </style>

      <!-- FLOATING TRIGGER (BUBBLE OR CHATBAR OR CHATCARD) -->
      ${isChatbarTrigger
        ? html`
            <cw-chatbar
              .config="${cbs}"
              .panelOpen="${this.panelOpen}"
              .unreadCount="${this.unreadCount}"
              .rev="${this.rev}"
            ></cw-chatbar>
          `
        : html`
            <cw-bubble
              .config="${bs}"
              .panelOpen="${this.panelOpen}"
              .unreadCount="${this.unreadCount}"
              .hasSentMessage="${this.hasSentMessage}"
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
        .hasSentMessage="${this.hasSentMessage}"
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
    'cw-widget-layout': CwWidgetLayout;
  }
}
