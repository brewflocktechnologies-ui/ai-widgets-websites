var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { chatStore } from '../../store/chat-store.js';
import { GLOBAL_STYLES } from '../../tokens/design-tokens.js';
let CwComposer = class CwComposer extends LitElement {
    constructor() {
        super(...arguments);
        this.config = {};
        this.draft = '';
        this.attachmentsEnabled = true;
        this.modernUi = true;
        this.uploading = false;
        this.focused = false;
    }
    static { this.styles = [
        GLOBAL_STYLES,
        css `
      :host {
        display: block;
        width: 100%;
      }
      .composer {
        display: flex;
        align-items: center;
        gap: 6px;
        box-sizing: border-box;
        transition: all 0.2s ease;
      }
      textarea {
        flex: 1;
        border: none;
        resize: none;
        padding: 6px 12px;
        background: transparent;
        outline: none;
        font-family: inherit;
        height: 32px;
        min-height: 24px;
        max-height: 120px;
        overflow-y: auto;
        box-sizing: border-box;
      }
      textarea::placeholder {
        color: var(--placeholder-color, #a1a1aa) !important;
      }
      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: none;
        padding: 0;
        margin: 0;
        line-height: 0;
        box-sizing: border-box;
        cursor: pointer;
        flex-shrink: 0;
      }
      button:disabled {
        cursor: default;
      }
      .send-icon {
        transform: rotate(45deg);
        margin-left: 2px;
        margin-top: -2px;
      }
    `
    ]; }
    handleInput(e) {
        const target = e.target;
        this.draft = target.value;
        target.style.height = 'auto';
        target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
        this.dispatchEvent(new CustomEvent('draft-change', { detail: this.draft }));
    }
    handleKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.send();
        }
    }
    send() {
        if (!this.draft.trim())
            return;
        this.dispatchEvent(new CustomEvent('send-message', { detail: this.draft.trim() }));
    }
    toggleAttach() {
        this.dispatchEvent(new CustomEvent('toggle-attach'));
    }
    toggleEmoji() {
        this.dispatchEvent(new CustomEvent('toggle-emoji'));
    }
    handleFileSelect(e) {
        const input = e.target;
        if (input) {
            chatStore.uploadImage(input);
        }
    }
    render() {
        const cw = this.config;
        const isFocused = this.focused;
        const canSend = !!this.draft.trim();
        const padding = cw.inputPadding || '6px 8px';
        const margin = cw.inputMargin || '12px 16px';
        const bg = cw.inputBg || 'var(--cw-surface)';
        const borderRadius = cw.inputBorderRadius || '9999px';
        const borderColor = isFocused
            ? cw.inputFocusBorderColor || cw.accentColor || '#0b5fff'
            : cw.inputBorderColor || 'var(--cw-border)';
        const boxShadow = isFocused
            ? cw.inputFocusShadow || '0 0 0 2px rgba(11, 95, 255, 0.1)'
            : 'none';
        const inputTextColor = cw.inputTextColor || 'var(--cw-ink)';
        const placeholderColor = cw.inputPlaceholderColor || '#a1a1aa';
        const textareaFontSize = cw.textareaFontSize || '14px';
        const attachBg = cw.attachButtonBg || '#ffffff';
        const attachColor = cw.attachButtonColor || '#71717a';
        const emojiColor = cw.emojiButtonColor || '#71717a';
        const sendBg = !canSend
            ? cw.sendButtonBgInactive || '#e4e4e7'
            : cw.sendButtonBgActive || cw.accentColor || '#0b5fff';
        const sendColor = !canSend
            ? cw.sendButtonColorInactive || '#a1a1aa'
            : cw.sendButtonColorActive || '#ffffff';
        return html `
      <div
        class="composer"
        style="padding: ${padding}; margin: ${margin}; background: ${bg}; border-radius: ${borderRadius}; border: 1px solid ${borderColor}; box-shadow: ${boxShadow}; --placeholder-color: ${placeholderColor}"
      >
        <input
          type="file"
          id="cw-file-input"
          class="file-input"
          accept="image/png,image/jpeg,image/gif,image/webp"
          style="display: none"
          @change="${this.handleFileSelect}"
        />

        ${this.attachmentsEnabled
            ? html `
              <button
                type="button"
                class="attach-btn"
                aria-label="Attach"
                title="Attach"
                ?disabled="${this.uploading}"
                style="background: ${attachBg}; color: ${attachColor}"
                @click="${this.toggleAttach}"
              >
                <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                  <path d="M8 3.5v9M3.5 8h9" />
                </svg>
              </button>
            `
            : ''}

        <textarea
          rows="1"
          maxlength="4000"
          placeholder="Write a message…"
          aria-label="Message"
          .value="${this.draft}"
          style="color: ${inputTextColor}; font-size: ${textareaFontSize}"
          @input="${this.handleInput}"
          @keydown="${this.handleKeyDown}"
          @focus="${() => (this.focused = true)}"
          @blur="${() => (this.focused = false)}"
        ></textarea>

        ${this.modernUi
            ? html `
              <button
                type="button"
                aria-label="Emoji"
                style="background: transparent; color: ${emojiColor}; margin-right: 2px"
                @click="${this.toggleEmoji}"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M8.5 14.5a4.5 4.5 0 007 0" />
                  <circle cx="9" cy="10" r="0.5" fill="currentColor" />
                  <circle cx="15" cy="10" r="0.5" fill="currentColor" />
                </svg>
              </button>
            `
            : ''}

        <button
          type="button"
          aria-label="Send message"
          ?disabled="${!canSend}"
          style="background: ${sendBg}; color: ${sendColor}"
          @click="${this.send}"
        >
          ${cw.sendIconType === 'arrow'
            ? html `
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5"></line>
                  <polyline points="5 12 12 5 19 12"></polyline>
                </svg>
              `
            : html `
                <svg class="send-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              `}
        </button>
      </div>
    `;
    }
};
__decorate([
    property({ type: Object })
], CwComposer.prototype, "config", void 0);
__decorate([
    property({ type: String })
], CwComposer.prototype, "draft", void 0);
__decorate([
    property({ type: Boolean })
], CwComposer.prototype, "attachmentsEnabled", void 0);
__decorate([
    property({ type: Boolean })
], CwComposer.prototype, "modernUi", void 0);
__decorate([
    property({ type: Boolean })
], CwComposer.prototype, "uploading", void 0);
__decorate([
    state()
], CwComposer.prototype, "focused", void 0);
CwComposer = __decorate([
    customElement('cw-composer')
], CwComposer);
export { CwComposer };
//# sourceMappingURL=cw-composer.js.map