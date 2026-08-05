import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Message, ChatWindowState } from '../../store/types.js';
import { GLOBAL_STYLES } from '../../tokens/global-styles.js';
import '../atoms/cw-message-tick.js';

@customElement('cw-message-bubble')
export class CwMessageBubble extends LitElement {
  @property({ type: Object }) message!: Message;
  @property({ type: Object }) chatWindowConfig?: ChatWindowState;
  @property({ type: Boolean }) isGroupEnd = true;
  @property({ type: Boolean }) isGroupStart = true;
  @property({ type: String }) agentName = '';

  static styles = [
    GLOBAL_STYLES,
    css`
      :host {
        display: block;
        width: 100%;
        margin-bottom: 4px;
        font-family: inherit, system-ui, -apple-system, sans-serif;
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
        font-size: 12px;
        font-weight: 700;
        flex-shrink: 0;
        overflow: hidden;
        background-color: #0b5fff;
        color: #ffffff;
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
        opacity: 0.75;
        display: inline-flex;
        align-items: center;
        float: right;
        margin-left: 8px;
        margin-top: 4px;
      }
    `
  ];

  render() {
    if (!this.message) return html``;

    const m = this.message;
    const cw = this.chatWindowConfig || {};
    const isVisitor = m.senderType === 'VISITOR';
    const isAgent = m.senderType === 'AGENT';

    const bg = isVisitor
      ? cw.visitorBubbleBg || 'linear-gradient(135deg, #0b5fff, #22d3ee)'
      : cw.agentBubbleBg || '#ffffff';

    const color = isVisitor
      ? cw.visitorBubbleColor || '#ffffff'
      : cw.agentBubbleColor || '#1e293b';

    const borderColor = isVisitor
      ? 'transparent'
      : cw.agentBubbleBorderColor || '#e2e8f0';

    const boxShadow = isVisitor
      ? cw.visitorBubbleBg ? 'none' : '0 2px 8px rgba(11, 95, 255, 0.2)'
      : cw.agentBubbleBoxShadow || '0 1px 3px rgba(0, 0, 0, 0.08)';

    const borderRadius = isVisitor
      ? cw.visitorBubbleBorderRadius || '16px'
      : cw.agentBubbleBorderRadius || '16px';

    const padding = isVisitor
      ? cw.visitorBubblePadding || '10px 14px'
      : cw.agentBubblePadding || '10px 14px';

    const fontSize = isVisitor
      ? cw.visitorBubbleFontSize || '14px'
      : cw.agentBubbleFontSize || '14px';

    const avatarBg = cw.agentAvatarBg || '#0b5fff';
    const avatarColor = cw.agentAvatarColor || '#ffffff';

    const formattedTime = m.created
      ? new Date(m.created).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const avatarInitial = (m.senderName || this.agentName || 'A').charAt(0).toUpperCase();

    return html`
      <div class="bubble-row ${isVisitor ? 'from-visitor' : 'from-agent'}">
        ${isAgent && this.isGroupEnd
          ? html`
              <div class="msg-avatar" style="background-color: ${avatarBg}; color: ${avatarColor}">
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
                  ${formattedTime}
                  ${isVisitor
                    ? html`
                        &nbsp;<cw-message-tick
                          .status="${m.pending ? 'pending' : (m.status as any) || 'delivered'}"
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
