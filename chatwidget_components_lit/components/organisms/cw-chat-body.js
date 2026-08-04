var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { chatStore, chatWindowStore, subscribe } from '../../store/chat-store.js';
import { GLOBAL_STYLES } from '../../tokens/design-tokens.js';
import '../molecules/cw-welcome-card.js';
import '../molecules/cw-message-bubble.js';
import '../molecules/cw-composer.js';
import '../atoms/cw-typing-dots.js';
let CwChatBody = class CwChatBody extends LitElement {
    connectedCallback() {
        super.connectedCallback();
        this.unsub = subscribe('store:chat', () => {
            this.requestUpdate();
            this.scrollToBottom();
        });
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.unsub?.();
    }
    static { this.styles = [
        GLOBAL_STYLES,
        css `
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
      .day-divider {
        text-align: center;
        font-size: 11px;
        color: var(--cw-muted, #71717a);
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
        background: var(--cw-accent, #0b5fff);
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
        color: #22c55e;
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
      .attach-pop, .menu-pop {
        position: absolute;
        bottom: 60px;
        left: 16px;
        background: var(--cw-surface, #ffffff);
        border: 1px solid var(--cw-border, #e5e7eb);
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.12);
        display: flex;
        flex-direction: column;
        padding: 4px;
        z-index: 60;
      }
      .menu-pop {
        top: 50px;
        right: 16px;
        bottom: auto;
        left: auto;
      }
      .menu-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border: none;
        background: transparent;
        color: var(--cw-ink);
        font-size: 13px;
        cursor: pointer;
        border-radius: 8px;
        text-align: left;
      }
      .menu-item:hover {
        background: rgba(0,0,0,0.05);
      }
      .emoji-row {
        position: absolute;
        bottom: 60px;
        right: 16px;
        background: var(--cw-surface, #ffffff);
        border: 1px solid var(--cw-border, #e5e7eb);
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.12);
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 4px;
        padding: 8px;
        z-index: 60;
      }
      .emoji-btn {
        border: none;
        background: transparent;
        font-size: 18px;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
      }
      .emoji-btn:hover {
        background: rgba(0,0,0,0.05);
      }
      .panel-footer {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 8px 16px;
        background: var(--cw-bg, #ffffff);
        font-size: 11px;
        color: var(--cw-muted);
      }
      .powered {
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .powered a {
        font-weight: 600;
        color: inherit;
        text-decoration: none;
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
        background: var(--cw-accent, #0b5fff);
        color: #ffffff;
        font-weight: 700;
        cursor: pointer;
      }

      @keyframes zotly-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `
    ]; }
    scrollToBottom() {
        setTimeout(() => {
            const el = this.shadowRoot?.querySelector('.messages-area');
            if (el)
                el.scrollTop = el.scrollHeight;
        }, 50);
    }
    handleDraftChange(e) {
        chatStore.get().draft = e.detail;
    }
    handleSendMessage(e) {
        chatStore.send();
    }
    render() {
        const cs = this.chatState || chatStore.get();
        const cw = this.chatWindowConfig || chatWindowStore.get();
        const isWelcome = cs.state === 'welcome';
        const isBoot = cs.state === 'boot';
        const isPrechat = cs.state === 'prechat';
        const isOffline = cs.state === 'offline';
        const isOfflineSent = cs.state === 'offline-sent';
        const isQueued = cs.state === 'queued';
        const isActive = cs.state === 'active';
        const isClosed = cs.state === 'closed';
        return html `
      <div
        class="panel-body"
        style="background: ${isWelcome ? cw.welcome?.bgGradient || 'linear-gradient(135deg, #0b5fff, #22d3ee)' : cw.bodyBg || 'var(--cw-bg)'}; padding: ${isWelcome ? '0px' : ''}"
      >
        <!-- WELCOME SCREEN -->
        ${isWelcome
            ? html `<cw-welcome-card .config="${cw.welcome}" .accentColor="${cw.accentColor}"></cw-welcome-card>`
            : ''}

        <!-- BOOT / CONNECTING -->
        ${isBoot
            ? html `
              <div class="center-note">
                <div class="spinner"></div>
                <p>Connecting…</p>
              </div>
            `
            : ''}

        <!-- PRECHAT FORM -->
        ${isPrechat
            ? html `
              <div class="prechat">
                <div class="avatar prechat-avatar">
                  <span>${(cs.clientName || cw.clientName || 'S').charAt(0)}</span>
                </div>
                <h2>Hi there 👋</h2>
                <p class="muted">Tell us who you are and we'll connect you with an agent right away.</p>
                <form @submit="${(e) => { e.preventDefault(); cs.state = 'active'; chatStore.get().state = 'active'; this.requestUpdate(); }}">
                  <label>Name</label>
                  <input required maxlength="120" placeholder="Your name" />
                  <label>Email</label>
                  <input type="email" required maxlength="160" placeholder="you@example.com" />
                  <button type="submit" class="primary">Start chat</button>
                </form>
              </div>
            `
            : ''}

        <!-- OFFLINE FORM -->
        ${isOffline
            ? html `
              <div class="prechat">
                <div class="avatar prechat-avatar offline-avatar">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 8v4M12 16h.01" />
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                </div>
                <h2>We're not around right now</h2>
                <p class="muted">Our agents are offline. Leave your details and a message — we'll pick it up the moment someone is back.</p>
                <form @submit="${(e) => { e.preventDefault(); chatStore.submitOffline(); }}">
                  <label>Name</label>
                  <input
                    required
                    maxlength="120"
                    placeholder="Your name"
                    .value="${cs.offlineName}"
                    @input="${(e) => (cs.offlineName = e.target.value)}"
                  />
                  <label>Email</label>
                  <input
                    type="email"
                    required
                    maxlength="160"
                    placeholder="you@example.com"
                    .value="${cs.offlineEmail}"
                    @input="${(e) => (cs.offlineEmail = e.target.value)}"
                  />
                  <label>Message</label>
                  <textarea
                    rows="3"
                    class="offline-msg"
                    required
                    maxlength="4000"
                    placeholder="How can we help?"
                    .value="${cs.offlineMessage}"
                    @input="${(e) => (cs.offlineMessage = e.target.value)}"
                  ></textarea>
                  <button type="submit" class="primary" ?disabled="${cs.offlineSending}">
                    ${cs.offlineSending ? 'Sending…' : 'Leave message'}
                  </button>
                </form>
              </div>
            `
            : ''}

        <!-- OFFLINE SENT CONFIRMATION -->
        ${isOfflineSent
            ? html `
              <div class="queued">
                <div class="ticket offline-done">
                  <div class="done-check">
                    <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M4 12.5l5 5L20 6.5" />
                    </svg>
                  </div>
                  <h2>Message received</h2>
                  <p class="muted">
                    Thanks${cs.offlineName ? `, ${cs.offlineName}` : ''}! We've saved your message and will reply to <strong>${cs.offlineEmail}</strong> as soon as an agent is back.
                  </p>
                </div>
              </div>
            `
            : ''}

        <!-- QUEUED STATE -->
        ${isQueued
            ? html `
              <div class="queued">
                <div class="ticket">
                  <div class="ticket-number">${cs.position}</div>
                  <div class="ticket-label">in line</div>
                  <p class="muted">An agent will be with you shortly.</p>
                </div>
              </div>
            `
            : ''}

        <!-- ACTIVE CHAT / CLOSED MESSAGES -->
        ${isActive || isClosed
            ? html `
              <div class="messages-area" style="background: ${cw.bodyBg || 'var(--cw-bg)'}">
                ${cs.messages.map((m, i) => {
                const showDivider = chatStore.dividerBefore(i);
                const isGroupEnd = chatStore.groupEnd(i);
                const isGroupStart = chatStore.groupStart(i);
                return html `
                    ${showDivider ? html `<div class="day-divider">${chatStore.dayLabel()}</div>` : ''}

                    <cw-message-bubble
                      .message="${m}"
                      .chatWindowConfig="${cw}"
                      .isGroupEnd="${isGroupEnd}"
                      .isGroupStart="${isGroupStart}"
                      .agentName="${cs.agentName}"
                    ></cw-message-bubble>
                  `;
            })}

                ${cs.typingName && chatStore.flag('chat.typingIndicator', true)
                ? html `
                      <div class="bubble-row from-agent g-start g-end" style="margin-top: 4px">
                        <div class="bubble typing-bubble">
                          <span class="sr-only">${cs.typingName}</span>
                          <span class="typing-dots"><cw-typing-dots></cw-typing-dots></span>
                        </div>
                      </div>
                    `
                : ''}
              </div>

              <!-- CONSENT BANNER -->
              ${isActive && !cs.consentDismissed && chatStore.flag('widget.modernUi', true)
                ? html `
                    <div class="consent">
                      <p>By chatting here you agree this conversation may be processed and recorded to provide support.</p>
                      <button type="button" class="consent-x" aria-label="Dismiss" @click="${() => chatStore.dismissConsent()}">✕</button>
                    </div>
                  `
                : ''}

              <!-- ATTACHMENT POPUP -->
              ${cs.attachOpen
                ? html `
                    <div class="attach-pop">
                      <button type="button" class="menu-item" @click="${() => { cs.attachOpen = false; this.shadowRoot?.querySelector('#cw-file-input')?.click(); }}">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                          <rect x="3" y="5" width="18" height="14" rx="2" />
                          <circle cx="8.5" cy="10" r="1.5" />
                          <path d="M21 15l-4.5-4.5L9 18" />
                        </svg>
                        Send an image
                      </button>
                      <button type="button" class="menu-item" @click="${() => chatStore.captureScreenshot()}">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M4 8V6a2 2 0 012-2h2M16 4h2a2 2 0 012 2v2M20 16v2a2 2 0 01-2 2h-2M8 20H6a2 2 0 01-2-2v-2" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                        Add screenshot
                      </button>
                    </div>
                  `
                : ''}

              <!-- MENU POPUP -->
              ${cs.menuOpen
                ? html `
                    <div class="menu-pop">
                      <button type="button" class="menu-item" @click="${() => chatStore.downloadTranscript()}">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
                        </svg>
                        Download transcript
                      </button>
                      <button type="button" class="menu-item" @click="${() => chatStore.toggleSounds()}">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M11 5L6 9H3v6h3l5 4V5zM16 9a4 4 0 010 6" />
                        </svg>
                        Sounds: ${cs.soundsOn ? 'ON' : 'OFF'}
                      </button>
                    </div>
                  `
                : ''}

              <!-- EMOJI PICKER -->
              ${cs.emojiOpen
                ? html `
                    <div class="emoji-row">
                      ${['😀', '😂', '😊', '😍', '👍', '👎', '🙏', '🎉', '❤️', '😢', '😮', '👌'].map((e) => html `
                          <button type="button" class="emoji-btn" @click="${() => { cs.draft += e; this.requestUpdate(); }}">${e}</button>
                        `)}
                    </div>
                  `
                : ''}

              <!-- COMPOSER BAR (ACTIVE STATE) -->
              ${isActive
                ? html `
                    <cw-composer
                      .config="${cw}"
                      .draft="${cs.draft}"
                      .attachmentsEnabled="${chatStore.flag('attachments.enabled', true)}"
                      .modernUi="${chatStore.flag('widget.modernUi', true)}"
                      .uploading="${cs.uploading}"
                      @draft-change="${this.handleDraftChange}"
                      @send-message="${this.handleSendMessage}"
                      @toggle-attach="${() => { cs.attachOpen = !cs.attachOpen; cs.emojiOpen = false; this.requestUpdate(); }}"
                      @toggle-emoji="${() => { cs.emojiOpen = !cs.emojiOpen; cs.attachOpen = false; this.requestUpdate(); }}"
                    ></cw-composer>

                    <div
                      class="panel-footer"
                      style="padding-bottom: ${cw.footerPaddingBottom || '16px'}; background: ${cw.footerBg || cw.bodyBg || '#ffffff'}; border-bottom-left-radius: ${(cw.widgetBorderRadius || 24)}px; border-bottom-right-radius: ${(cw.widgetBorderRadius || 24)}px"
                    >
                      ${chatStore.flag('widget.modernUi', true)
                    ? html `
                            <div class="powered" style="font-size: ${cw.footerFontSize || '11px'}; color: ${cw.footerTextColor || 'var(--cw-muted)'}">
                              <span>Powered by</span>
                              <a href="${cw.poweredByLink || '#'}" target="_blank" style="color: ${cw.poweredByColor || '#a1a1aa'}">
                                ${cw.poweredByText || 'vAInatheya.ai'}
                              </a>
                            </div>
                          `
                    : ''}
                    </div>
                  `
                : ''}

              <!-- CLOSED NOTE -->
              ${isClosed
                ? html `
                    <div class="closed-note">
                      <p>Chat ended</p>
                      <button type="button" class="primary" @click="${() => chatStore.startNew()}">Start new chat</button>
                    </div>
                  `
                : ''}
            `
            : ''}
      </div>
    `;
    }
};
__decorate([
    property({ type: Object })
], CwChatBody.prototype, "chatState", void 0);
__decorate([
    property({ type: Object })
], CwChatBody.prototype, "chatWindowConfig", void 0);
CwChatBody = __decorate([
    customElement('cw-chat-body')
], CwChatBody);
export { CwChatBody };
//# sourceMappingURL=cw-chat-body.js.map