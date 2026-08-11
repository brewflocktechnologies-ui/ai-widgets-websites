import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { ChatState, ChatWindowState, Message } from '../../store/types.js';
import { CORE_STYLES } from '../../tokens/core-styles.js';
import { REDUCED_MOTION_CSS } from '../../tokens/accessibility.js';
import './cw-welcome-card.js';
import '../molecules/cw-message-bubble.js';
import '../molecules/cw-composer.js';
import '../molecules/cw-chat-footer.js';
import '../molecules/cw-emoji-picker.js';
import '../molecules/cw-attach-menu.js';
import '../molecules/cw-chat-menu.js';
import './cw-image-cropper.js';
import '../atoms/cw-typing-dots.js';
import '../atoms/cw-icon.js';
import type { CwComposer } from '../molecules/cw-composer.js';

/**
 * cw-chat-body
 * Pure presentational organism. Reads state via props and pushes ALL user
 * actions up as composed CustomEvents (`cw:*`). Never touches the store.
 * A `rev` (revision) prop from the container guarantees re-render when the
 * store mutates config objects in place.
 */
@customElement('cw-chat-body')
export class CwChatBody extends LitElement {
  @property({ type: Object }) chatState!: ChatState;
  @property({ type: Object }) chatWindowConfig!: ChatWindowState;
  @property({ type: Number }) rev = 0;

  @state() private offlineName = '';
  @state() private offlineEmail = '';
  @state() private offlineMessage = '';
  @state() private cropperOpen = false;
  @state() private pendingImageSrc = '';

  private lastCount = -1;

  static styles = [
    CORE_STYLES,
    REDUCED_MOTION_CSS,
    css`
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-height: 0;
        position: relative;
        overflow: hidden;
      }
      .panel-body {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-height: 0;
        position: relative;
        overflow: hidden;
      }
      .messages-area {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 4px;
        scroll-behavior: smooth;
      }
      .messages-area:focus,
      .prechat:focus {
        outline: none;
      }
      .messages-area:focus-visible,
      .prechat:focus-visible {
        outline: 2px solid var(--cw-accent, #0b5fff);
        outline-offset: -2px;
      }
      .day-divider {
        text-align: center;
        font-size: 11px;
        color: var(--cw-muted);
        margin: 12px 0 8px 0;
        position: relative;
      }
      .center-note {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        gap: 12px;
        color: var(--cw-muted);
      }
      .spinner {
        width: 24px;
        height: 24px;
        border: 2px solid currentColor;
        border-top-color: transparent;
        border-radius: 50%;
        animation: zotly-spin 1s linear infinite;
      }
      .prechat {
        padding: 24px 20px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        overflow-y: auto;
      }
      .prechat h2 {
        margin: 0;
        font-size: 20px;
        font-weight: 700;
      }
      .prechat p.muted {
        margin: 0;
        font-size: 13px;
        color: var(--cw-muted);
      }
      .prechat form {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .prechat label {
        font-size: 12px;
        font-weight: 600;
        color: var(--cw-ink);
      }
      .prechat input, .prechat textarea {
        padding: 10px 12px;
        border-radius: 8px;
        border: 1px solid var(--cw-border);
        background: var(--cw-surface);
        color: var(--cw-ink);
        font-family: inherit;
        font-size: 14px;
        outline: none;
      }
      .prechat button.primary {
        padding: 12px;
        border-radius: 9999px;
        border: none;
        background: var(--cw-accent);
        color: #ffffff;
        font-weight: 700;
        font-size: 14px;
        cursor: pointer;
        margin-top: 6px;
      }
      .queued {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        padding: 24px;
        text-align: center;
      }
      .ticket {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      }
      .ticket-number {
        font-size: 48px;
        font-weight: 800;
        color: var(--cw-accent);
      }
      .ticket-label {
        font-size: 14px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .done-check {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: rgba(34, 197, 94, 0.1);
        color: var(--cw-success);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .consent {
        padding: 8px 16px;
        background: var(--cw-surface);
        border-top: 1px solid var(--cw-border);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        font-size: 11px;
        color: var(--cw-muted);
      }
      .consent p {
        margin: 0;
      }
      .consent-x {
        border: none;
        background: transparent;
        cursor: pointer;
        color: var(--cw-muted);
        font-size: 12px;
      }
      .closed-note {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 24px;
        text-align: center;
      }
      .closed-note p {
        margin: 0;
        font-weight: 600;
      }
      .closed-note button.primary {
        padding: 10px 20px;
        border-radius: 9999px;
        border: none;
        background: var(--cw-accent);
        color: #ffffff;
        font-weight: 700;
        cursor: pointer;
      }

      @keyframes zotly-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `
  ];

  private emit(name: string, detail?: unknown) {
    this.dispatchEvent(
      new CustomEvent(name, { detail, bubbles: true, composed: true })
    );
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('rev') && this.chatState) {
      const count = this.chatState.messages?.length || 0;
      if (count !== this.lastCount) {
        this.lastCount = count;
        this.scrollToBottom();
      }
    }
  }

  private scrollToBottom() {
    setTimeout(() => {
      const el = this.shadowRoot?.querySelector('.messages-area');
      if (el) el.scrollTop = el.scrollHeight;
    }, 50);
  }

  private flag(key: string, def = true): boolean {
    const f = this.chatState?.flags || {};
    return f[key] !== undefined ? f[key] : def;
  }

  private groupStart(i: number, msgs: Message[]): boolean {
    return i === 0 || msgs[i].senderType !== msgs[i - 1].senderType;
  }

  private groupEnd(i: number, msgs: Message[]): boolean {
    return i === msgs.length - 1 || msgs[i].senderType !== msgs[i + 1].senderType;
  }

  private handleFileSelect(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.pendingImageSrc = evt.target?.result as string;
        this.cropperOpen = true;
      };
      reader.readAsDataURL(file);
    } else {
      this.emit('cw:attach-files', e.target);
    }
  }

  private openFileSelector() {
    const input = this.shadowRoot?.querySelector<HTMLInputElement>('#cw-file-input');
    if (input) {
      input.click();
    }
  }

  /** Delegates focus to the composer (used by the panel when the chat opens). */
  focusInput() {
    const composer = this.renderRoot?.querySelector<CwComposer>('cw-composer');
    composer?.focusInput?.();
  }

  render() {
    const cs = this.chatState;
    const cw = this.chatWindowConfig;

    if (!cs || !cw) return html``;

    const welcomeEnabled = cw.welcome?.enabled !== false;
    const isWelcome = cs.state === 'welcome' && welcomeEnabled;
    const isBoot = cs.state === 'boot';
    const isPrechat = cs.state === 'prechat';
    const isOffline = cs.state === 'offline';
    const isOfflineSent = cs.state === 'offline-sent';
    const isQueued = cs.state === 'queued';
    const isActive = cs.state === 'active' || (cs.state === 'welcome' && !welcomeEnabled);
    const isClosed = cs.state === 'closed';

    const msgs = cs.messages || [];

    return html`
      <div
        class="panel-body"
        style="background: ${isWelcome ? cw.welcome?.bgGradient || 'linear-gradient(135deg, var(--cw-accent), #22d3ee)' : cw.bodyBg || 'var(--cw-bg)'}; padding: ${isWelcome ? '0px' : ''}"
      >
        <!-- WELCOME SCREEN -->
        ${isWelcome
          ? html`<cw-welcome-card .config="${cw.welcome}" .accentColor="${cw.accentColor}"></cw-welcome-card>`
          : ''
        }

        <!-- BOOT / CONNECTING -->
        ${isBoot
          ? html`
              <div class="center-note">
                <div class="spinner"></div>
                <p>Connecting…</p>
              </div>
            `
          : ''
        }

        <!-- PRECHAT FORM -->
        ${isPrechat
          ? html`
              <div class="prechat" tabindex="0" aria-label="Pre-chat form">
                <div class="avatar prechat-avatar">
                  <span>${(cs.clientName || cw.clientName || 'S').charAt(0)}</span>
                </div>
                <h2>Hi there 👋</h2>
                <p class="muted">Tell us who you are and we'll connect you with an agent right away.</p>
                <form @submit="${(e: Event) => { e.preventDefault(); this.emit('cw:start-chat'); }}">
                  <label>Name</label>
                  <input required maxlength="120" placeholder="Your name" />
                  <label>Email</label>
                  <input type="email" required maxlength="160" placeholder="you@example.com" />
                  <button type="submit" class="primary">Start chat</button>
                </form>
              </div>
            `
          : ''
        }

        <!-- OFFLINE FORM -->
        ${isOffline
          ? html`
              <div class="prechat" tabindex="0" aria-label="Offline support form">
                <div class="avatar prechat-avatar offline-avatar">
                  <cw-icon .name="${'AlertCircle'}" .size="${22}"></cw-icon>
                </div>
                <h2>We're not around right now</h2>
                <p class="muted">Our agents are offline. Leave your details and a message — we'll pick it up the moment someone is back.</p>
                <form @submit="${(e: Event) => { e.preventDefault(); this.emit('cw:submit-offline', { name: this.offlineName, email: this.offlineEmail, message: this.offlineMessage }); }}">
                  <label>Name</label>
                  <input
                    required
                    maxlength="120"
                    placeholder="Your name"
                    .value="${this.offlineName}"
                    @input="${(e: Event) => (this.offlineName = (e.target as HTMLInputElement).value)}"
                  />
                  <label>Email</label>
                  <input
                    type="email"
                    required
                    maxlength="160"
                    placeholder="you@example.com"
                    .value="${this.offlineEmail}"
                    @input="${(e: Event) => (this.offlineEmail = (e.target as HTMLInputElement).value)}"
                  />
                  <label>Message</label>
                  <textarea
                    rows="3"
                    class="offline-msg"
                    required
                    maxlength="4000"
                    placeholder="How can we help?"
                    .value="${this.offlineMessage}"
                    @input="${(e: Event) => (this.offlineMessage = (e.target as HTMLTextAreaElement).value)}"
                  ></textarea>
                  <button type="submit" class="primary" ?disabled="${cs.offlineSending}">
                    ${cs.offlineSending ? 'Sending…' : 'Leave message'}
                  </button>
                </form>
              </div>
            `
          : ''
        }

        <!-- OFFLINE SENT CONFIRMATION -->
        ${isOfflineSent
          ? html`
              <div class="queued">
                <div class="ticket offline-done">
                  <div class="done-check">
                    <cw-icon .name="${'Check'}" .size="${30}"></cw-icon>
                  </div>
                  <h2>Message received</h2>
                  <p class="muted">
                    Thanks${this.offlineName ? `, ${this.offlineName}` : ''}! We've saved your message and will reply to <strong>${this.offlineEmail}</strong> as soon as an agent is back.
                  </p>
                </div>
              </div>
            `
          : ''
        }

        <!-- QUEUED STATE -->
        ${isQueued
          ? html`
              <div class="queued">
                <div class="ticket">
                  <div class="ticket-number">${cs.position}</div>
                  <div class="ticket-label">in line</div>
                  <p class="muted">An agent will be with you shortly.</p>
                </div>
              </div>
            `
          : ''
        }

        <!-- ACTIVE CHAT / CLOSED MESSAGES -->
        ${isActive || isClosed
          ? html`
              <div class="messages-area" tabindex="0" role="log" aria-label="Message history" aria-live="polite" aria-relevant="additions" style="background: ${cw.bodyBg || 'var(--cw-bg)'}">
                <input
                  type="file"
                  id="cw-file-input"
                  accept="image/png,image/jpeg,image/gif,image/webp"
                  style="display: none"
                  @change="${this.handleFileSelect}"
                />
                ${msgs.map((m, i) => {
                  const showDivider = i === 0;
                  const isGroupEnd = this.groupEnd(i, msgs);
                  const isGroupStart = this.groupStart(i, msgs);

                  return html`
                    ${showDivider ? html`<div class="day-divider">Today</div>` : ''}

                    <cw-message-bubble
                      .message="${m}"
                      .chatWindowConfig="${cw}"
                      .isGroupEnd="${isGroupEnd}"
                      .isGroupStart="${isGroupStart}"
                      .agentName="${cs.agentName}"
                    ></cw-message-bubble>
                  `;
                })}

                ${cs.typingName && this.flag('chat.typingIndicator', true)
                  ? html`
                      <div class="bubble-row from-agent g-start g-end" style="margin-top: 4px">
                        <div class="bubble typing-bubble">
                          <span class="sr-only">${cs.typingName}</span>
                          <span class="typing-dots"><cw-typing-dots></cw-typing-dots></span>
                        </div>
                      </div>
                    `
                  : ''
                }
              </div>

              <!-- CONSENT BANNER -->
              ${isActive && !cs.consentDismissed && this.flag('widget.modernUi', true)
                ? html`
                    <div class="consent">
                      <p>By chatting here you agree this conversation may be processed and recorded to provide support.</p>
                      <button type="button" class="consent-x" aria-label="Dismiss" @click="${() => this.emit('cw:dismiss-consent')}">✕</button>
                    </div>
                  `
                : ''
              }

              <!-- ATTACHMENT POPUP -->
              ${cs.attachOpen
                ? html`
                    <cw-attach-menu
                      @cw:trigger-file-select="${this.openFileSelector}"
                    ></cw-attach-menu>
                  `
                : ''
              }

              <!-- MENU POPUP -->
              ${cs.menuOpen
                ? html`<cw-chat-menu .soundsOn="${cs.soundsOn}"></cw-chat-menu>`
                : ''
              }

              <!-- EMOJI PICKER -->
              ${cs.emojiOpen
                ? html`<cw-emoji-picker></cw-emoji-picker>`
                : ''
              }

              <!-- COMPOSER BAR (ACTIVE STATE) -->
              ${isActive
                ? html`
                    <cw-composer
                      .config="${cw}"
                      .draft="${cs.draft || ''}"
                      .attachmentsEnabled="${this.flag('attachments.enabled', true)}"
                      .modernUi="${this.flag('widget.modernUi', true)}"
                      .uploading="${cs.uploading}"
                      .rev="${this.rev}"
                    ></cw-composer>

                    <cw-chat-footer
                      .config="${cw}"
                      .modernUi="${this.flag('widget.modernUi', true)}"
                    ></cw-chat-footer>
                  `
                : ''
              }

              <!-- CLOSED NOTE -->
              ${isClosed
                ? html`
                    <div class="closed-note">
                      <p>Chat ended</p>
                      <button type="button" class="primary" @click="${() => this.emit('cw:start-new')}">Start new chat</button>
                    </div>
                  `
                : ''
              }
            `
          : ''
        }

        <cw-image-cropper
          .open="${this.cropperOpen}"
          .imageSrc="${this.pendingImageSrc}"
          @cw:image-cropped="${(e: CustomEvent) => {
            this.cropperOpen = false;
            this.emit('cw:send', `[Cropped Image: ${e.detail.dataUrl.slice(0, 40)}...]`);
          }}"
          @cw:close="${() => (this.cropperOpen = false)}"
        ></cw-image-cropper>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cw-chat-body': CwChatBody;
  }
}
