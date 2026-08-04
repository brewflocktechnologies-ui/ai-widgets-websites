var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let CwBadge = class CwBadge extends LitElement {
    constructor() {
        super(...arguments);
        this.count = 0;
        this.config = {};
    }
    static { this.styles = css `
    :host {
      display: inline-flex;
    }
    .badge {
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      white-space: nowrap;
    }
  `; }
    render() {
        if (!this.count || this.count <= 0)
            return html ``;
        const b = this.config || {};
        const pos = b.position || 'top-right';
        const offsetX = b.offsetX !== undefined ? b.offsetX : -6;
        const offsetY = b.offsetY !== undefined ? b.offsetY : -6;
        const size = b.size || 20;
        const styleObj = {
            position: 'absolute',
            backgroundColor: b.backgroundColor || '#dc2626',
            color: b.textColor || '#ffffff',
            fontSize: `${b.fontSize || 11}px`,
            lineHeight: '1',
            minWidth: `${size}px`,
            height: `${size}px`,
            border: `${b.borderWidth !== undefined ? b.borderWidth : 2}px solid ${b.borderColor || '#ffffff'}`,
            borderRadius: b.borderRadius !== undefined ? b.borderRadius : '9999px',
            fontWeight: b.fontWeight || '700',
            boxShadow: b.boxShadow || '0 1px 3px rgba(0,0,0,0.15)',
            padding: b.padding || '0px',
            zIndex: '50',
            animation: b.animation || 'none'
        };
        if (pos === 'top-left') {
            styleObj.top = `${offsetY}px`;
            styleObj.left = `${offsetX}px`;
        }
        else if (pos === 'bottom-right') {
            styleObj.bottom = `${offsetY}px`;
            styleObj.right = `${offsetX}px`;
        }
        else if (pos === 'bottom-left') {
            styleObj.bottom = `${offsetY}px`;
            styleObj.left = `${offsetX}px`;
        }
        else {
            styleObj.top = `${offsetY}px`;
            styleObj.right = `${offsetX}px`;
        }
        const cssString = Object.entries(styleObj)
            .map(([k, v]) => `${k.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${v}`)
            .join('; ');
        return html `<div class="badge" style="${cssString}">${this.count}</div>`;
    }
};
__decorate([
    property({ type: Number })
], CwBadge.prototype, "count", void 0);
__decorate([
    property({ type: Object })
], CwBadge.prototype, "config", void 0);
CwBadge = __decorate([
    customElement('cw-badge')
], CwBadge);
export { CwBadge };
//# sourceMappingURL=cw-badge.js.map