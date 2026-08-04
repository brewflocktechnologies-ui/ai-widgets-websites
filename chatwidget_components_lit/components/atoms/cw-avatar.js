var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let CwAvatar = class CwAvatar extends LitElement {
    constructor() {
        super(...arguments);
        this.name = 'Support';
        this.imageUrl = '';
        this.bg = 'rgba(255,255,255,0.2)';
        this.color = '#ffffff';
        this.size = 32;
        this.showOnlineDot = true;
    }
    static { this.styles = css `
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
      display: flex;
      align-items: center;
      justify-content: center;
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
  `; }
    render() {
        const initial = (this.name || 'S').charAt(0).toUpperCase();
        const dotSize = this.activeDot?.size !== undefined ? this.activeDot.size : 8;
        const dotColor = this.activeDot?.color || '#22c55e';
        const dotAnimate = this.activeDot?.animate !== false;
        const dotBorderWidth = this.activeDot?.borderWidth !== undefined ? this.activeDot.borderWidth : 0;
        const dotBorderColor = this.activeDot?.borderColor || 'transparent';
        return html `
      <div class="avatar-box" style="width: ${this.size}px; height: ${this.size}px; font-size: ${Math.floor(this.size * 0.45)}px; background: ${this.bg}; color: ${this.color}">
        ${this.imageUrl
            ? html `<img class="avatar-img" src="${this.imageUrl}" alt="${this.name}" />`
            : html `<span>${initial}</span>`}
        ${this.showOnlineDot
            ? html `
              <div class="dot-wrapper" style="width: ${dotSize}px; height: ${dotSize}px">
                ${dotAnimate ? html `<span class="dot-pulse" style="background-color: ${dotColor}"></span>` : ''}
                <span class="dot-solid" style="background-color: ${dotColor}; border: ${dotBorderWidth}px solid ${dotBorderColor}"></span>
              </div>
            `
            : ''}
      </div>
    `;
    }
};
__decorate([
    property({ type: String })
], CwAvatar.prototype, "name", void 0);
__decorate([
    property({ type: String })
], CwAvatar.prototype, "imageUrl", void 0);
__decorate([
    property({ type: String })
], CwAvatar.prototype, "bg", void 0);
__decorate([
    property({ type: String })
], CwAvatar.prototype, "color", void 0);
__decorate([
    property({ type: Number })
], CwAvatar.prototype, "size", void 0);
__decorate([
    property({ type: Object })
], CwAvatar.prototype, "activeDot", void 0);
__decorate([
    property({ type: Boolean })
], CwAvatar.prototype, "showOnlineDot", void 0);
CwAvatar = __decorate([
    customElement('cw-avatar')
], CwAvatar);
export { CwAvatar };
//# sourceMappingURL=cw-avatar.js.map