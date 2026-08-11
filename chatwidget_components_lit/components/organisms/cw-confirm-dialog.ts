import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ChatWindowState } from '../../store/types.js';
import { CORE_STYLES } from '../../tokens/core-styles.js';
import { REDUCED_MOTION_CSS } from '../../tokens/accessibility.js';
import '../atoms/cw-button.js';

/**
 * cw-confirm-dialog
 * Pure presentational organism representing the end-chat confirm modal overlay.
 * Uses <cw-button> for action buttons. Emits `cw:confirm-cancel` and `cw:confirm-end`.
 */
@customElement('cw-confirm-dialog')
export class CwConfirmDialog extends LitElement {
  @property({ type: Object }) config?: Partial<ChatWindowState>;
  @property({ type: String }) message = 'Are you sure you want to end this chat?';
  @property({ type: String }) cancelLabel = 'Cancel';
  @property({ type: String }) confirmLabel = 'Confirm';

  static styles = [
    CORE_STYLES,
    REDUCED_MOTION_CSS,
    css`
      :host {
        display: block;
      }
      .modal-overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(2px);
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
      }
      .modal-card {
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        width: 100%;
        max-width: 300px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        box-sizing: border-box;
      }
      .modal-message {
        margin: 0;
        font-size: 14px;
        font-weight: 600;
        line-height: 1.4;
      }
      .modal-actions {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
      }
    `,
  ];

  private onCancel() {
    this.dispatchEvent(new CustomEvent('cw:confirm-cancel', { bubbles: true, composed: true }));
  }

  private onConfirm() {
    this.dispatchEvent(new CustomEvent('cw:confirm-end', { bubbles: true, composed: true }));
  }

  render() {
    const cw = this.config || {};
    const cardBg = cw.modalCardBg || '#ffffff';
    const messageColor = cw.modalMessageColor || 'var(--cw-ink)';
    const borderRadius = cw.modalBorderRadius !== undefined ? cw.modalBorderRadius : 16;

    return html`
      <div class="modal-overlay" role="dialog" aria-modal="true" aria-label="Confirmation">
        <div class="modal-card" style="background: ${cardBg}; border-radius: ${borderRadius}px">
          <p class="modal-message" style="color: ${messageColor}">
            ${this.message}
          </p>

          <div class="modal-actions">
            <cw-button
              variant="ghost"
              size="sm"
              .label="${this.cancelLabel}"
              .bg="${cw.endChatCancelBg || 'var(--cw-surface)'}"
              .color="${cw.endChatCancelTextColor || 'var(--cw-muted)'}"
              .borderColor="${cw.endChatCancelBorderColor || 'var(--cw-border)'}"
              @click="${this.onCancel}"
            ></cw-button>

            <cw-button
              variant="primary"
              size="sm"
              .label="${this.confirmLabel}"
              .bg="${cw.endChatConfirmBg || 'var(--cw-accent)'}"
              .color="${cw.endChatConfirmTextColor || '#ffffff'}"
              @click="${this.onConfirm}"
            ></cw-button>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cw-confirm-dialog': CwConfirmDialog;
  }
}
