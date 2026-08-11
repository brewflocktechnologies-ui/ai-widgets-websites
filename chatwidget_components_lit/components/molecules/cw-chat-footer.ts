import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ChatWindowState } from '../../store/types.js';
import { REDUCED_MOTION_CSS } from '../../tokens/accessibility.js';

const formatPx = (val: number | string | undefined, fallback: string): string => {
  if (val === undefined || val === null || val === '') return fallback;
  if (typeof val === 'number') return `${val}px`;
  const str = String(val).trim();
  if (str.endsWith('px') || str.endsWith('rem') || str.endsWith('em') || str.includes('var(')) return str;
  return `${str}px`;
};

/**
 * cw-chat-footer
 * Pure presentational molecule representing the powered-by widget footer.
 */
@customElement('cw-chat-footer')
export class CwChatFooter extends LitElement {
  @property({ type: Object }) config: Partial<ChatWindowState> = {};
  @property({ type: Boolean }) modernUi = true;
  @property({ type: String }) poweredByText = '';
  @property({ type: String }) poweredByLink = '';
  @property({ type: String }) poweredByColor = '';
  @property({ type: String }) footerBg = '';
  @property({ type: String }) footerTextColor = '';
  @property({ type: Number }) footerFontSize?: number;
  @property({ type: Number }) footerPaddingBottom?: number;
  @property({ type: Number }) widgetBorderRadius?: number;

  static styles = [
    REDUCED_MOTION_CSS,
    css`
      :host {
        display: block;
        width: 100%;
      }
      .panel-footer {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 8px 16px;
        background: var(--cw-bg, #ffffff);
        font-size: 11px;
        color: var(--cw-muted);
        box-sizing: border-box;
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
    `,
  ];

  render() {
    const cw = this.config || {};
    const isModern = this.modernUi !== undefined ? this.modernUi : cw.modernUi !== false;
    const paddingBottom = formatPx(
      this.footerPaddingBottom !== undefined ? this.footerPaddingBottom : cw.footerPaddingBottom,
      isModern ? '16px' : '8px'
    );
    const bg = this.footerBg || cw.footerBg || cw.bodyBg || (isModern ? '#ffffff' : '#f9fafb');
    const borderRadius =
      this.widgetBorderRadius !== undefined
        ? this.widgetBorderRadius
        : cw.widgetBorderRadius !== undefined
        ? cw.widgetBorderRadius
        : (isModern ? 24 : 0);
    const fontSize = formatPx(
      this.footerFontSize !== undefined ? this.footerFontSize : cw.footerFontSize,
      '11px'
    );
    const textColor = this.footerTextColor || cw.footerTextColor || 'var(--cw-muted)';
    const poweredByLink = this.poweredByLink || cw.poweredByLink || '#';
    const poweredByColor = this.poweredByColor || cw.poweredByColor || 'var(--cw-muted)';
    const poweredByText = this.poweredByText || cw.poweredByText || 'vAInatheya.ai';

    return html`
      <div
        class="panel-footer"
        style="padding-bottom: ${paddingBottom}; background: ${bg}; border-bottom-left-radius: ${borderRadius}px; border-bottom-right-radius: ${borderRadius}px"
      >
        <div class="powered" style="font-size: ${fontSize}; color: ${textColor}">
          <span>Powered by</span>
          <a href="${poweredByLink}" target="_blank" style="color: ${poweredByColor}">
            ${poweredByText}
          </a>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cw-chat-footer': CwChatFooter;
  }
}
