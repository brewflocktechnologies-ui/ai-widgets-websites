import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { ChatbarState } from '../../store/types.js';
import { GLOBAL_STYLES } from '../../tokens/design-tokens.js';
import {
  getBorderRadius,
  getChatbarBackground,
  getChatbarFontSize,
  getChatbarIconWidth,
  getChatbarIconHeight
} from '../../utils/style-helpers.js';
import '../atoms/cw-icon.js';

@customElement('cw-chatbar')
export class CwChatbar extends LitElement {
  @property({ type: Object }) config?: ChatbarState;
  @property({ type: Boolean }) panelOpen = false;
  @property({ type: Number }) unreadCount = 0;
  @property({ type: Number }) rev = 0;

  @state() hovered = false;

  static styles = [
    GLOBAL_STYLES,
    css`
      :host {
        display: block;
      }
      .chatbar-wrapper {
        position: fixed;
        z-index: 40;
        display: flex;
        cursor: pointer;
        user-select: none;
        box-sizing: border-box;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        max-width: calc(100% - 24px);
        max-height: calc(100% - 24px);
      }
      .card-layout {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
      }
      .bar-layout {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100%;
      }
      .badge {
        position: absolute;
        top: -6px;
        right: -6px;
        background-color: #dc2626;
        color: #ffffff;
        font-weight: 700;
        border-radius: 9999px;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 20px;
        height: 20px;
        font-size: 11px;
        border: 2px solid #ffffff;
        z-index: 50;
        box-shadow: 0 2px 5px rgba(0,0,0,0.15);
      }
      .bar-badge {
        position: absolute;
        top: -10px;
        right: -10px;
        background-color: #dc2626;
        color: #ffffff;
        font-weight: 700;
        border-radius: 9999px;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 18px;
        height: 18px;
        font-size: 10px;
        border: 1.5px solid #ffffff;
        z-index: 50;
        box-shadow: 0 1px 3px rgba(0,0,0,0.15);
      }
    `
  ];

  private handleClick() {
    this.dispatchEvent(
      new CustomEvent('cw:toggle', { bubbles: true, composed: true })
    );
  }

  render() {
    const s = this.config || ({} as ChatbarState);
    if (!s.enabled || (s.hideOnOpen && this.panelOpen)) return html``;

    const isCard = s.layout === 'card';
    const widthVal = s.width || (isCard ? 240 : 255);
    const heightVal = s.height || (isCard ? 220 : 40);
    const rawBottom = s.offsetBottom !== undefined ? s.offsetBottom : 12;
    const rawRight = s.offsetRight !== undefined ? s.offsetRight : 16;

    const bg = getChatbarBackground(s);
    const borderRadius = getBorderRadius(s.borderRadius, '20px');
    const transform = this.hovered ? 'scale(1.02)' : 'scale(1.0)';
    const padding = s.padding !== undefined ? s.padding : isCard ? '24px 16px' : '0 16px';
    const gap = s.gap !== undefined ? `${s.gap}px` : isCard ? '14px' : '0';

    return html`
      <div
        class="chatbar-wrapper"
        style="width: ${widthVal}px; height: ${heightVal}px; max-width: calc(100% - 24px); max-height: calc(100% - 24px); bottom: ${rawBottom}px; right: ${rawRight}px; background: ${bg}; color: ${s.textColor || '#ffffff'}; border-radius: ${borderRadius}; box-shadow: ${s.shadow ? '0 4px 16px rgba(0,0,0,0.15)' : 'none'}; padding: ${padding}; transform: ${transform}; flex-direction: ${isCard ? 'column' : 'row'}; gap: ${gap}"
        @mouseenter="${() => (this.hovered = true)}"
        @mouseleave="${() => (this.hovered = false)}"
        @click="${this.handleClick}"
      >
        ${isCard
          ? html`
              <!-- CARD LAYOUT (Vertical) -->
              <div class="card-layout" style="gap: ${s.gap !== undefined ? s.gap : 14}px">
                <div style="display: flex; align-items: center; justify-content: center; position: relative">
                  ${s.iconType === 'image' && s.iconImageUrl
                    ? html`
                        <img
                          src="${s.iconImageUrl}"
                          alt="icon"
                          style="object-fit: ${s.iconFit || 'contain'}; opacity: ${s.iconOpacity !== undefined ? s.iconOpacity : 1}; width: ${(s.iconWidth || 24)}px; height: ${(s.iconHeight || 24)}px; mix-blend-mode: ${s.iconBlend || 'normal'}"
                        />
                      `
                    : s.iconType === 'customSvg' && s.customSvg
                    ? html`<cw-icon .customSvg="${s.customSvg}" .size="${s.iconWidth || 28}" .color="${s.iconColor || '#ffffff'}"></cw-icon>`
                    : html`<cw-icon .name="${s.lucideIcon || 'MessageCircle'}" .size="${s.iconWidth || 24}" .color="${s.iconColor || '#ffffff'}"></cw-icon>`
                  }
                </div>

                <span style="font-weight: 700; line-height: 1.35; white-space: pre-line; text-align: center; font-size: ${(s.textSize || 16)}px; letter-spacing: ${(s.letterSpacing || 0)}px">
                  ${s.cardText || s.text || 'Questions about PayPal?'}
                </span>

                <div
                  style="background-color: ${s.buttonBg || '#ffffff'}; color: ${s.buttonTextColor || s.bgColor || '#003087'}; font-weight: 700; border-radius: 9999px; display: flex; align-items: center; justify-content: center; padding: 10px 24px; font-size: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); width: 85%"
                >
                  <span>${s.buttonText || 'Chat Now'}</span>
                </div>

                ${this.unreadCount > 0
                  ? html`<span class="badge">${this.unreadCount}</span>`
                  : ''
                }
              </div>
            `
          : html`
              <!-- BAR LAYOUT (Horizontal) -->
              <div class="bar-layout">
                <span
                  style="font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1; min-width: 0; text-align: left; font-size: ${getChatbarFontSize(s.textSize, s.height)}; letter-spacing: ${(s.letterSpacing || 0)}px; color: ${s.textColor || '#ffffff'}"
                >
                  ${(s.text || 'Chat with us').replace(/\n/g, ' ')}
                </span>

                <div style="display: flex; align-items: center; justify-content: center; position: relative; flex-shrink: 0; margin-left: 8px">
                  ${s.iconType === 'image' && s.iconImageUrl
                    ? html`
                        <img
                          src="${s.iconImageUrl}"
                          alt="icon"
                          style="object-fit: ${s.iconFit || 'contain'}; opacity: ${s.iconOpacity !== undefined ? s.iconOpacity : 1}; width: ${getChatbarIconWidth(s.iconWidth, s.height, 'image')}px; height: ${getChatbarIconHeight(s.iconHeight, s.height, 'image')}px; mix-blend-mode: ${s.iconBlend || 'normal'}"
                        />
                      `
                    : s.iconType === 'customSvg' && s.customSvg
                    ? html`
                        <cw-icon
                          .customSvg="${s.customSvg}"
                          .size="${getChatbarIconWidth(s.iconWidth, s.height, 'customSvg')}"
                          .color="${s.iconColor || '#ffffff'}"
                        ></cw-icon>
                      `
                    : html`
                        <cw-icon
                          .name="${s.lucideIcon || 'MessageCircle'}"
                          .size="${getChatbarIconWidth(s.iconWidth, s.height, 'lucide')}"
                          .color="${s.iconColor || '#ffffff'}"
                        ></cw-icon>
                      `
                  }

                  ${this.unreadCount > 0
                    ? html`<span class="bar-badge">${this.unreadCount}</span>`
                    : ''
                  }
                </div>
              </div>
            `
        }
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cw-chatbar': CwChatbar;
  }
}
