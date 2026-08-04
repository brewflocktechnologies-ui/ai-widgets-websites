import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ChatWindowState, FeaturesState, chatStore, chatWindowStore, featuresStore, subscribeAll } from '../../store/chat-store.js';
import { GLOBAL_STYLES } from '../../tokens/design-tokens.js';
import '../atoms/cw-avatar.js';

@customElement('cw-chat-header')
export class CwChatHeader extends LitElement {
  @property({ type: Object }) config?: ChatWindowState;
  @property({ type: Object }) features?: FeaturesState;
  @property({ type: Boolean }) isExpanded = false;
  @property({ type: String }) clientName = 'Support';
  @property({ type: String }) agentName = 'Sarah';
  @property({ type: String }) state = 'active';

  private unsub?: () => void;

  connectedCallback() {
    super.connectedCallback();
    this.unsub = subscribeAll(() => this.requestUpdate());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsub?.();
  }

  static styles = [
    GLOBAL_STYLES,
    css`
      :host {
        display: block;
        width: 100%;
        flex-shrink: 0;
      }
      header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        box-sizing: border-box;
        flex-shrink: 0;
      }
      .left-section {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 0;
      }
      .info-col {
        display: flex;
        flex-direction: column;
        text-align: left;
        min-width: 0;
      }
      .title-text {
        font-weight: 700;
        line-height: 1.2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .subtitle-text {
        opacity: 0.8;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .actions-section {
        display: flex;
        gap: 8px;
        align-items: center;
        flex-shrink: 0;
      }
      .icon-btn {
        background: transparent;
        border: none;
        padding: 4px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
      }
      .icon-btn:hover {
        opacity: 1 !important;
      }
    `
  ];

  private toggleExpand() {
    chatStore.toggleExpand();
  }

  private toggleMenu() {
    chatStore.get().menuOpen = !chatStore.get().menuOpen;
    chatStore.get();
  }

  private closePanel() {
    chatStore.closePanel();
    window.dispatchEvent(new CustomEvent('close-contact-widget'));
  }

  private askEndChat() {
    chatStore.askEndChat();
  }

  render() {
    const cs = chatStore.get();
    const currentState = this.state || cs.state;

    // In welcome mode, header is hidden
    if (currentState === 'welcome') return html``;

    const cw = (this.config && Object.keys(this.config).length > 0) ? this.config : chatWindowStore.get();
    const feats = (this.features && Object.keys(this.features).length > 0) ? this.features : featuresStore.get();
    const headerTextColor = cw.headerTextColor || '#ffffff';

    const showVoice = (feats.voiceCallMaster || cw.features?.voiceCallMaster) &&
      ((feats.voiceCallAgents || cw.features?.voiceCallAgents) || (feats.voiceCallVisitors || cw.features?.voiceCallVisitors));

    const showVideo = (feats.videoCallMaster || cw.features?.videoCallMaster) &&
      ((feats.videoCallAgents || cw.features?.videoCallAgents) || (feats.videoCallVisitors || cw.features?.videoCallVisitors));

    const showCloseSession = feats.closeChatVisitor || cw.features?.closeChatVisitor;

    const currentAgentName = this.agentName || cw.agentName || cs.agentName;
    const currentClientName = this.clientName || cw.clientName || cs.clientName || 'Support';

    const subtitleText = currentState === 'active'
      ? currentAgentName ? `${currentAgentName} · Online` : 'Online'
      : 'Online';

    return html`
      <header
        class="panel-header"
        style="background: ${cw.headerBg || 'var(--cw-grad)'}; color: ${headerTextColor}; padding: ${cw.headerPadding || '14px 16px'}; border-bottom: ${cw.headerBorderColor ? `1px solid ${cw.headerBorderColor}` : '1px solid rgba(0,0,0,0.08)'}"
      >
        <div class="left-section">
          ${cw.modernUi !== false
            ? html`
                <button
                  type="button"
                  class="icon-btn"
                  aria-label="${this.isExpanded ? 'Collapse chat' : 'Expand chat'}"
                  style="color: ${headerTextColor}; opacity: 0.7"
                  @click="${this.toggleExpand}"
                >
                  ${this.isExpanded
                    ? html`
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M10 14l-7 7" />
                        </svg>
                      `
                    : html`
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                        </svg>
                      `
                  }
                </button>
              `
            : ''
          }

          <cw-avatar
            .name="${currentClientName}"
            .bg="${cw.headerAvatarBg || (headerTextColor === '#18181b' ? '#e4e4e7' : 'rgba(255,255,255,0.2)')}"
            .color="${cw.headerAvatarColor || headerTextColor}"
            .size="${32}"
            .activeDot="${cw.activeDot}"
          ></cw-avatar>

          <div class="info-col">
            <span class="title-text" style="font-size: ${cw.headerTitleFontSize || '14px'}">${currentClientName}</span>
            <span class="subtitle-text" style="font-size: ${cw.headerSubtitleFontSize || '11px'}">${subtitleText}</span>
          </div>
        </div>

        <div class="actions-section">
          ${showVoice
            ? html`
                <button
                  type="button"
                  class="icon-btn"
                  aria-label="Start voice call"
                  title="Voice call"
                  style="color: ${headerTextColor}; opacity: 0.9"
                  @click="${() => alert('Initiating voice call...')}"
                >
                  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </button>
              `
            : ''
          }

          ${showVideo
            ? html`
                <button
                  type="button"
                  class="icon-btn"
                  aria-label="Start video call"
                  title="Video call"
                  style="color: ${headerTextColor}; opacity: 0.9"
                  @click="${() => alert('Initiating video call...')}"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect x="1" y="5" width="15" height="14" rx="3" ry="3"></rect>
                  </svg>
                </button>
              `
            : ''
          }

          ${showCloseSession
            ? html`
                <button
                  type="button"
                  class="icon-btn"
                  aria-label="End chat session"
                  title="End chat"
                  style="color: ${headerTextColor}; opacity: 0.7"
                  @click="${this.askEndChat}"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10" />
                  </svg>
                </button>
              `
            : ''
          }

          ${cw.modernUi !== false
            ? html`
                <button
                  type="button"
                  class="icon-btn"
                  aria-label="Chat options"
                  style="color: ${headerTextColor}; opacity: 0.7"
                  @click="${this.toggleMenu}"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <circle cx="5" cy="12" r="1.8" />
                    <circle cx="12" cy="12" r="1.8" />
                    <circle cx="19" cy="12" r="1.8" />
                  </svg>
                </button>
              `
            : ''
          }

          <button
            type="button"
            class="icon-btn"
            aria-label="Minimize chat panel"
            style="color: ${headerTextColor}; opacity: 0.7"
            @click="${this.closePanel}"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cw-chat-header': CwChatHeader;
  }
}
