import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { REDUCED_MOTION_CSS } from '../../tokens/accessibility.js';
import '../atoms/cw-icon.js';

/**
 * cw-chat-menu
 * Pure presentational molecule representing the chat options popup menu.
 * Dispatches events and closes popup on outside click.
 */
@customElement('cw-chat-menu')
export class CwChatMenu extends LitElement {
  @property({ type: Boolean }) soundsOn = true;

  static styles = [
    REDUCED_MOTION_CSS,
    css`
      :host {
        display: block;
        position: absolute;
        top: 8px;
        right: 16px;
        z-index: 60;
      }
      .menu-pop {
        background: var(--cw-surface, #ffffff);
        border: 1px solid var(--cw-border, #e5e7eb);
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
        display: flex;
        flex-direction: column;
        padding: 4px;
        min-width: 170px;
        box-sizing: border-box;
      }
      .menu-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border: none;
        background: transparent;
        color: var(--cw-ink, #18181b);
        font-size: 13px;
        cursor: pointer;
        border-radius: 8px;
        text-align: left;
        width: 100%;
        box-sizing: border-box;
        transition: background 0.15s ease;
      }
      .menu-item:hover {
        background: rgba(0, 0, 0, 0.05);
      }
    `,
  ];

  private onOutsidePointer = (e: PointerEvent | MouseEvent) => {
    const path = e.composedPath();
    if (!path.includes(this)) {
      this.dispatchEvent(new CustomEvent('cw:close-popups', { bubbles: true, composed: true }));
    }
  };

  connectedCallback() {
    super.connectedCallback();
    requestAnimationFrame(() => {
      window.addEventListener('pointerdown', this.onOutsidePointer);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('pointerdown', this.onOutsidePointer);
  }

  private onDownloadTranscript() {
    this.dispatchEvent(new CustomEvent('cw:download-transcript', { bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('cw:close-popups', { bubbles: true, composed: true }));
  }

  private onToggleSounds() {
    this.dispatchEvent(new CustomEvent('cw:toggle-sounds', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="menu-pop" role="menu" aria-label="Chat options">
        <button type="button" class="menu-item" @click="${this.onDownloadTranscript}">
          <cw-icon .name="${'Download'}" .size="${16}"></cw-icon>
          <span>Download transcript</span>
        </button>
        <button type="button" class="menu-item" @click="${this.onToggleSounds}">
          <cw-icon .name="${'Volume2'}" .size="${16}"></cw-icon>
          <span>Sounds: ${this.soundsOn ? 'ON' : 'OFF'}</span>
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cw-chat-menu': CwChatMenu;
  }
}
