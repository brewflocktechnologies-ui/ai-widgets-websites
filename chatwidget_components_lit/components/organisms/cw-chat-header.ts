import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ChatWindowState, FeaturesState } from '../../store/types.js';
import { CORE_STYLES } from '../../tokens/core-styles.js';
import '../molecules/cw-avatar.js';
import '../atoms/cw-icon.js';

@customElement('cw-chat-header')
export class CwChatHeader extends LitElement {
  @property({ type: Object }) config?: ChatWindowState;
  @property({ type: Object }) features?: FeaturesState;
  @property({ type: Boolean }) isExpanded = false;
  @property({ type: String }) clientName = 'Support';
  @property({ type: String }) agentName = 'Sarah';
  @property({ type: String }) state = 'active';
  @property({ type: Number }) rev = 0;

  static styles = [
    CORE_STYLES,
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
        opacity: 0.95;
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

  private emit(name: string) {
    this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true }));
  }

  private toggleExpand() {
    this.emit('cw:toggle-expand');
  }

  private toggleMenu() {
    this.emit('cw:open-menu');
  }

  private closePanel() {
    this.emit('cw:close-panel');
  }

  private askEndChat() {
    this.emit('cw:end-chat');
  }

  render() {
    const cw = this.config || {};
    const welcomeEnabled = cw.welcome?.enabled !== false;
    const currentState = (this.state === 'welcome' && !welcomeEnabled) ? 'active' : (this.state || 'active');

    // In welcome mode, header is hidden
    if (currentState === 'welcome') return html``;

    const feats = this.features || {};
    const headerTextColor = cw.headerTextColor || '#ffffff';

    const voiceReady = !!feats.voiceCallEnabled || !!cw.features?.voiceCallEnabled;
    const videoReady = !!feats.videoCallEnabled || !!cw.features?.videoCallEnabled;

    const showVoice = voiceReady &&
      (feats.voiceCallMaster || cw.features?.voiceCallMaster) &&
      ((feats.voiceCallAgents || cw.features?.voiceCallAgents) || (feats.voiceCallVisitors || cw.features?.voiceCallVisitors));

    const showVideo = videoReady &&
      (feats.videoCallMaster || cw.features?.videoCallMaster) &&
      ((feats.videoCallAgents || cw.features?.videoCallAgents) || (feats.videoCallVisitors || cw.features?.videoCallVisitors));

    const showCloseSession = feats.closeChatVisitor || cw.features?.closeChatVisitor;

    const currentAgentName = this.agentName || cw.agentName || '';
    const currentClientName = this.clientName || cw.clientName || 'Support';

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
                    ? html`<cw-icon .name="${'Minimize2'}" .size="${16}"></cw-icon>`
                    : html`<cw-icon .name="${'Maximize2'}" .size="${16}"></cw-icon>`
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
                  @click="${() => this.emit('cw:voice-call')}"
                >
                  <cw-icon .name="${'Phone'}" .size="${17}"></cw-icon>
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
                  @click="${() => this.emit('cw:video-call')}"
                >
                  <cw-icon .name="${'Video'}" .size="${18}"></cw-icon>
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
                  <cw-icon .name="${'Power'}" .size="${18}"></cw-icon>
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
                  <cw-icon .name="${'MoreHorizontal'}" .size="${18}"></cw-icon>
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
            <cw-icon .name="${'Close'}" .size="${18}"></cw-icon>
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
