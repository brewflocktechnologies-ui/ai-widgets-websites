import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Message, ChatWindowState } from '../../store/chat-store.js';
import '../atoms/cw-message-tick.js';

@customElement('cw-message-bubble')
export class CwMessageBubble extends LitElement {
  @property({ type: Object }) message!: Message;
  @property({ type: Object }) chatWindowConfig: Partial<ChatWindowState> = {};
  @property({ type: Boolean }) isGroupEnd = true;
  @property({ type: Boolean }) isGroupStart = true;
  @property({ type: String }) agentName = 'Sarah';

  static styles = css`
    :host {
      display: block;
      width: 100%;
      margin-bottom: 4px;
    }
    .bubble-row {
      display: flex;
      gap: 8px;
      align-items: flex-end;
      width: 100%;
    }
    .bubble-row.from-visitor {
      justify-content: flex-end;
    }
    .bubble-row.from-agent {
      justify-content: flex-start;
    }
    .msg-avatar {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 700;
      flex-shrink: 0;
      overflow: hidden;
    }
    .msg-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .msg-avatar-placeholder {
      width: 28px;
      height: 28px;
      flex-shrink: 0;
    }
    .bubble {
      max-width: 75%;
      word-break: break-word;
      line-height: 1.4;
      position: relative;
      box-sizing: border-box;
    }
    .bubble.pending {
      opacity: 0.7;
    }
    .bubble-img {
      max-width: 100%;
      border-radius: 12px;
      cursor: pointer;
      display: block;
      margin-bottom: 4px;
    }
    .bubble-time {
      font-size: 10px;
      opacity: 0.7;
      display: inline-flex;
      align-items: center;
      float: right;
      margin-left: 8px;
      margin-top: 4px;
    }
  `;

  render() {
    if (!this.message) return html``;

    const m = this.message;
    const cw = this.chatWindowConfig;
    const isVisitor = m.senderType === 'VISITOR';
    const isAgent = m.senderType === 'AGENT';

    const bg = isVisitor
      ? cw.visitorBubbleBg || 'var(--cw-grad)'
      : cw.agentBubbleBg || 'var(--cw-surface)';

    const color = isVisitor
      ? cw.visitorBubbleColor || '#fff'
      : cw.agentBubbleColor || 'var(--cw-ink)';

    const borderColor = isVisitor
      ? 'transparent'
      : cw.agentBubbleBorderColor || 'var(--cw-border)';

    const boxShadow = isVisitor
      ? cw.visitorBubbleBg ? 'none' : '0 2px 8px color-mix(in srgb, var(--cw-accent) 25%, transparent)'
      : '0 1px 2px rgba(16, 24, 40, 0.05)';

    const borderRadius = isVisitor
      ? cw.visitorBubbleBorderRadius || '16px'
      : cw.agentBubbleBorderRadius || '16px';

    const padding = isVisitor
      ? cw.visitorBubblePadding || '10px 14px'
      : cw.agentBubblePadding || '10px 14px';

    const fontSize = isVisitor
      ? cw.visitorBubbleFontSize || '14px'
      : cw.agentBubbleFontSize || '14px';

    const formattedTime = m.created
      ? new Date(m.created).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const avatarInitial = (m.senderName || this.agentName || 'A').charAt(0).toUpperCase();

    return html`
      <div class="bubble-row ${isVisitor ? 'from-visitor' : 'from-agent'}">
        ${isAgent && this.isGroupEnd
          ? html`
              <div class="msg-avatar" style="background: ${cw.agentAvatarBg || 'var(--cw-accent-tint)'}; color: ${cw.agentAvatarColor || 'var(--cw-accent-deep)'}">
                ${cw.agentAvatarUrl
                  ? html`<img src="${cw.agentAvatarUrl}" alt="avatar" />`
                  : html`<span>${avatarInitial}</span>`
                }
              </div>
            `
          : isAgent
          ? html`<div class="msg-avatar-placeholder"></div>`
          : ''
        }

        <div
          class="bubble ${m.pending ? 'pending' : ''}"
          style="background: ${bg}; color: ${color}; border-color: ${borderColor}; border-style: solid; border-width: ${isVisitor ? '0px' : '1px'}; box-shadow: ${boxShadow}; border-radius: ${borderRadius}; padding: ${padding}; font-size: ${fontSize}"
        >
          ${m.attachment || m.localUrl
            ? html`
                <img
                  class="bubble-img"
                  alt="attachment"
                  src="${m.localUrl || m.url || ''}"
                  @click="${() => !m.pending && window.open(m.localUrl || m.url || '', '_blank')}"
                />
              `
            : ''
          }

          ${m.body ? html`<span>${m.body}</span>` : ''}

          ${this.isGroupEnd
            ? html`
                <span class="bubble-time">
                  <span>${formattedTime}</span>
                  ${isVisitor && cw.ticksEnabled !== false
                    ? html`
                        <cw-message-tick
                          .status="${m.status || 'sent'}"
                          .sentColor="${cw.sentTickColor || ''}"
                          .deliveredColor="${cw.deliveredTickColor || ''}"
                          .readColor="${cw.readTickColor || '#34b7f1'}"
                        ></cw-message-tick>
                      `
                    : ''
                  }
                </span>
              `
            : ''
          }
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cw-message-bubble': CwMessageBubble;
  }
}
