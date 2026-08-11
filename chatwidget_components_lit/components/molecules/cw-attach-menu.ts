import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { REDUCED_MOTION_CSS } from '../../tokens/accessibility.js';
import '../atoms/cw-icon.js';

/**
 * cw-attach-menu
 * Pure presentational molecule representing the attachment popup menu.
 * Dispatches events and closes popup on outside click.
 */
@customElement('cw-attach-menu')
export class CwAttachMenu extends LitElement {
  static styles = [
    REDUCED_MOTION_CSS,
    css`
      :host {
        display: block;
        position: absolute;
        bottom: 85px;
        left: 16px;
        z-index: 60;
      }
      .attach-pop {
        background: var(--cw-surface, #ffffff);
        border: 1px solid var(--cw-border, #e5e7eb);
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
        display: flex;
        flex-direction: column;
        padding: 4px;
        min-width: 160px;
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

  private onSelectImage() {
    this.dispatchEvent(new CustomEvent('cw:trigger-file-select', { bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('cw:close-popups', { bubbles: true, composed: true }));
  }

  private onCaptureScreenshot() {
    this.dispatchEvent(new CustomEvent('cw:capture-screenshot', { bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('cw:close-popups', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="attach-pop" role="menu" aria-label="Attachment options">
        <button type="button" class="menu-item" @click="${this.onSelectImage}">
          <cw-icon .name="${'Image'}" .size="${16}"></cw-icon>
          <span>Send an image</span>
        </button>
        <button type="button" class="menu-item" @click="${this.onCaptureScreenshot}">
          <cw-icon .name="${'Camera'}" .size="${16}"></cw-icon>
          <span>Add screenshot</span>
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cw-attach-menu': CwAttachMenu;
  }
}
