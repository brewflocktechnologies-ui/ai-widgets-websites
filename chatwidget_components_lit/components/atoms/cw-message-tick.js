var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let CwMessageTick = class CwMessageTick extends LitElement {
    constructor() {
        super(...arguments);
        this.status = 'sent';
        this.sentColor = '';
        this.deliveredColor = '';
        this.readColor = '#34b7f1';
    }
    static { this.styles = css `
    :host {
      display: inline-flex;
      align-items: center;
      vertical-align: middle;
      margin-left: 4px;
    }
    svg {
      display: block;
    }
  `; }
    render() {
        if (!this.status || this.status === 'sent') {
            const strokeColor = this.sentColor || 'currentColor';
            const opacity = this.sentColor ? '1' : '0.7';
            return html `
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke="${strokeColor}" style="opacity: ${opacity}">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      `;
        }
        if (this.status === 'delivered') {
            const strokeColor = this.deliveredColor || 'currentColor';
            const opacity = this.deliveredColor ? '1' : '0.7';
            return html `
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke="${strokeColor}" style="opacity: ${opacity}">
          <path d="M17 6L8.5 14.5L5 11M22 6L13.5 14.5L12.5 13.5"></path>
        </svg>
      `;
        }
        if (this.status === 'read') {
            const strokeColor = this.readColor || '#34b7f1';
            return html `
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke="${strokeColor}">
          <path d="M17 6L8.5 14.5L5 11M22 6L13.5 14.5L12.5 13.5"></path>
        </svg>
      `;
        }
        return html ``;
    }
};
__decorate([
    property({ type: String })
], CwMessageTick.prototype, "status", void 0);
__decorate([
    property({ type: String })
], CwMessageTick.prototype, "sentColor", void 0);
__decorate([
    property({ type: String })
], CwMessageTick.prototype, "deliveredColor", void 0);
__decorate([
    property({ type: String })
], CwMessageTick.prototype, "readColor", void 0);
CwMessageTick = __decorate([
    customElement('cw-message-tick')
], CwMessageTick);
export { CwMessageTick };
//# sourceMappingURL=cw-message-tick.js.map