import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { CORE_STYLES } from '../../tokens/core-styles.js';
import { REDUCED_MOTION_CSS } from '../../tokens/accessibility.js';
import './cw-icon.js';

@customElement('cw-button')
export class CwButton extends LitElement {
  @property({ type: String }) variant: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'icon' = 'primary';
  @property({ type: String }) size: 'xs' | 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) type: 'button' | 'submit' | 'reset' = 'button';
  @property({ type: String }) label = '';
  @property({ type: String }) icon = '';
  @property({ type: String }) iconPosition: 'left' | 'right' | 'only' = 'left';
  @property({ type: Number }) iconSize?: number;
  @property({ type: String }) bg = '';
  @property({ type: String }) color = '';
  @property({ type: String }) borderColor = '';
  @property({ type: String }) borderRadius = '9999px';
  @property({ type: Boolean }) fullWidth = false;
  @property({ type: String }) padding = '';
  @property({ type: Number }) width?: number;
  @property({ type: Number }) height?: number;

  static styles = [
    CORE_STYLES,
    REDUCED_MOTION_CSS,
    css`
      :host {
        display: inline-block;
      }
      :host([fullWidth]),
      :host([full-width]) {
        display: block;
        width: 100%;
      }
      .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        font-family: inherit;
        font-weight: 600;
        cursor: pointer;
        border: 1px solid transparent;
        box-sizing: border-box;
        text-decoration: none;
        white-space: nowrap;
        transition: all 0.2s ease;
        outline: none;
        user-select: none;
      }
      .btn:focus-visible {
        outline: 2px solid var(--cw-accent, #0b5fff);
        outline-offset: 2px;
      }
      .btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
      }

      /* Sizes */
      .size-xs {
        font-size: 11px;
        padding: 4px 8px;
        height: 28px;
      }
      .size-sm {
        font-size: 12px;
        padding: 6px 12px;
        height: 32px;
      }
      .size-md {
        font-size: 14px;
        padding: 10px 18px;
        height: 40px;
      }
      .size-lg {
        font-size: 15px;
        padding: 14px 24px;
        height: 48px;
      }

      /* Icon variants sizes */
      .variant-icon.size-xs {
        padding: 0;
        width: 28px;
        height: 28px;
      }
      .variant-icon.size-sm {
        padding: 0;
        width: 32px;
        height: 32px;
      }
      .variant-icon.size-md {
        padding: 0;
        width: 40px;
        height: 40px;
      }
      .variant-icon.size-lg {
        padding: 0;
        width: 48px;
        height: 48px;
      }

      /* Variants */
      .variant-primary {
        background-color: var(--cw-accent, #0b5fff);
        color: #ffffff;
      }
      .variant-primary:hover {
        filter: brightness(1.08);
      }

      .variant-secondary {
        background-color: var(--cw-surface, #f1f5f9);
        color: var(--cw-ink, #1e293b);
      }
      .variant-secondary:hover {
        background-color: #e2e8f0;
      }

      .variant-ghost {
        background: transparent;
        color: var(--cw-ink, #1e293b);
      }
      .variant-ghost:hover {
        background: rgba(0, 0, 0, 0.05);
      }

      .variant-outline {
        background: transparent;
        border-color: var(--cw-border, #cbd5e1);
        color: var(--cw-ink, #1e293b);
      }
      .variant-outline:hover {
        background: rgba(0, 0, 0, 0.04);
        border-color: #94a3b8;
      }

      .variant-danger {
        background-color: var(--cw-error, #ef4444);
        color: #ffffff;
      }
      .variant-danger:hover {
        filter: brightness(1.08);
      }

      .variant-icon {
        background: transparent;
        color: var(--cw-ink, #1e293b);
        border-radius: 50%;
      }
      .variant-icon:hover {
        background: rgba(0, 0, 0, 0.06);
      }
    `,
  ];

  render() {
    const isIconOnly = this.variant === 'icon' || this.iconPosition === 'only' || (!this.label && !!this.icon);
    const calculatedIconSize = this.iconSize || (this.size === 'xs' ? 12 : this.size === 'sm' ? 14 : this.size === 'lg' ? 20 : 16);

    const styleObj: Record<string, string> = {};
    if (this.bg) styleObj.backgroundColor = this.bg;
    if (this.color) styleObj.color = this.color;
    if (this.borderColor) styleObj.borderColor = this.borderColor;
    if (this.padding) styleObj.padding = this.padding;
    if (this.borderRadius) styleObj.borderRadius = typeof this.borderRadius === 'number' ? `${this.borderRadius}px` : this.borderRadius;
    if (this.fullWidth) styleObj.width = '100%';
    if (this.width !== undefined) styleObj.width = `${this.width}px`;
    if (this.height !== undefined) styleObj.height = `${this.height}px`;

    const cssString = Object.entries(styleObj)
      .map(([k, v]) => `${k.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${v}`)
      .join('; ');

    return html`
      <button
        type="${this.type}"
        class="btn variant-${this.variant} size-${this.size}"
        style="${cssString}"
        ?disabled="${this.disabled}"
        aria-label="${this.label || this.icon || 'button'}"
      >
        ${this.icon && (this.iconPosition === 'left' || isIconOnly)
          ? html`<cw-icon .name="${this.icon}" .size="${calculatedIconSize}"></cw-icon>`
          : ''
        }

        ${!isIconOnly && this.label ? html`<span>${this.label}</span>` : ''}
        <slot></slot>

        ${this.icon && this.iconPosition === 'right' && !isIconOnly
          ? html`<cw-icon .name="${this.icon}" .size="${calculatedIconSize}"></cw-icon>`
          : ''
        }
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cw-button': CwButton;
  }
}
