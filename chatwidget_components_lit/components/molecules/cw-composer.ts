import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { ChatWindowState } from '../../store/types.js';
import { GLOBAL_STYLES } from '../../tokens/design-tokens.js';

/**
 * cw-composer
 * Pure presentational molecule. Sends data UP via composed CustomEvents
 * (`cw:draft-change`, `cw:send`, `cw:toggle-attach`, `cw:toggle-emoji`).
 * It never reads or mutates the store.
 */
@customElement('cw-composer')
export class CwComposer extends LitElement {
  @property({ type: Object }) config: Partial<ChatWindowState> = {};
  @property({ type: String }) draft = '';
  @property({ type: Boolean }) attachmentsEnabled = true;
  @property({ type: Boolean }) modernUi = true;
  @property({ type: Boolean }) uploading = false;
  @property({ type: Number }) rev = 0;

  @state() focused = false;

  static styles = [
    GLOBAL_STYLES,
    css`
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
        margin-left: 2px;
        margin-top: 1px;
      }
    `
  ];

  private emit(name: string, detail?: unknown) {
    this.dispatchEvent(
      new CustomEvent(name, { detail, bubbles: true, composed: true })
    );
  }

  private handleInput(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    this.draft = target.value;
    target.style.height = 'auto';
    target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
    this.emit('cw:draft-change', this.draft);
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.send();
    }
  }

  private send() {
    if (!this.draft.trim()) return;
    this.emit('cw:send', this.draft.trim());
  }

  private toggleAttach() {
    this.emit('cw:toggle-attach');
  }

  private toggleEmoji() {
    this.emit('cw:toggle-emoji');
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

    return html`
      <div
        class="composer"
        style="padding: ${padding}; margin: ${margin}; background: ${bg}; border-radius: ${borderRadius}; border: 1px solid ${borderColor}; box-shadow: ${boxShadow}; --placeholder-color: ${placeholderColor}"
      >
        ${this.attachmentsEnabled
          ? html`
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
          : ''
        }

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
          ? html`
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
          : ''
        }

        <button
          type="button"
          aria-label="Send message"
          ?disabled="${!canSend}"
          style="background: ${sendBg}; color: ${sendColor}"
          @click="${this.send}"
        >
          ${cw.sendIconType === 'arrow'
            ? html`
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5"></line>
                  <polyline points="5 12 12 5 19 12"></polyline>
                </svg>
              `
            : html`
                <svg class="send-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              `
          }
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cw-composer': CwComposer;
  }
}
