import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { REDUCED_MOTION_CSS } from '../../tokens/accessibility.js';

@customElement('cw-avatar')
export class CwAvatar extends LitElement {
  @property({ type: String }) name = 'Support';
  @property({ type: String }) imageUrl = '';
  @property({ type: String }) src = '';
  @property({ type: String }) bg = 'rgba(255,255,255,0.2)';
  @property({ type: String }) bgColor = '';
  @property({ type: String }) color = '#ffffff';
  @property({ type: String }) textColor = '';
  @property({ type: Number }) size = 32;
  @property({ type: Object }) activeDot?: { size?: number; color?: string; animate?: boolean; borderWidth?: number; borderColor?: string };
  @property({ type: Boolean }) showOnlineDot = true;
  @property({ type: Boolean }) showOnline = true;

  static styles = [
    REDUCED_MOTION_CSS,
    css`
    :host {
      display: inline-flex;
      position: relative;
      flex-shrink: 0;
    }
    .avatar-box {
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
    }
    .avatar-img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
    .dot-wrapper {
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: translate(25%, 25%);
    }
    .dot-pulse {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      opacity: 0.6;
      pointer-events: none;
      animation: statusPulse 1.8s cubic-bezier(0.24, 0, 0.38, 1) infinite;
    }
    .dot-solid {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }

    @keyframes statusPulse {
      0% { transform: scale(0.9); opacity: 0.65; }
      50% { transform: scale(1.6); opacity: 0.3; }
      100% { transform: scale(2.4); opacity: 0; }
    }
  `,
  ];

  render() {
    const initial = (this.name || 'S').charAt(0).toUpperCase();
    const imgUrl = this.src || this.imageUrl;
    const background = this.bgColor || this.bg || 'rgba(255,255,255,0.2)';
    const textCol = this.textColor || this.color || '#ffffff';
    const showDot = this.showOnlineDot && this.showOnline;

    const dotSize = this.activeDot?.size !== undefined ? this.activeDot.size : 8;
    const dotColor = this.activeDot?.color || '#22c55e';
    const dotAnimate = this.activeDot?.animate !== true;
    const dotBorderWidth = this.activeDot?.borderWidth !== undefined ? this.activeDot.borderWidth : 0;
    const dotBorderColor = this.activeDot?.borderColor || '#ffffff';

    return html`
      <div class="avatar-box" style="width: ${this.size}px; height: ${this.size}px; font-size: ${Math.floor(this.size * 0.45)}px; background: ${background}; color: ${textCol}">
        ${imgUrl
          ? html`<img class="avatar-img" src="${imgUrl}" alt="${this.name}" />`
          : html`<span>${initial}</span>`
        }
      </div>
      ${showDot
        ? html`
            <div class="dot-wrapper" style="width: ${dotSize}px; height: ${dotSize}px">
              ${dotAnimate ? html`<span class="dot-pulse" style="background-color: ${dotColor}"></span>` : ''}
              <span class="dot-solid" style="background-color: ${dotColor}; border: ${dotBorderWidth}px solid ${dotBorderColor}"></span>
            </div>
          `
        : ''
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cw-avatar': CwAvatar;
  }
}
