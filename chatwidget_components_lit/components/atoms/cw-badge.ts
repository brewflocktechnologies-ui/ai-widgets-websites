import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { BadgeConfig } from '../../store/types.js';

@customElement('cw-badge')
export class CwBadge extends LitElement {
  @property({ type: Number }) count = 0;
  @property({ type: Object }) config: BadgeConfig = {};

  static styles = css`
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
  `;

  render() {
    if (!this.count || this.count <= 0) return html``;

    const b = this.config || {};
    const pos = b.position || 'top-right';
    const offsetX = b.offsetX !== undefined ? b.offsetX : -6;
    const offsetY = b.offsetY !== undefined ? b.offsetY : -6;
    const size = b.size || 20;

    const styleObj: Record<string, string> = {
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
    } else if (pos === 'bottom-right') {
      styleObj.bottom = `${offsetY}px`;
      styleObj.right = `${offsetX}px`;
    } else if (pos === 'bottom-left') {
      styleObj.bottom = `${offsetY}px`;
      styleObj.left = `${offsetX}px`;
    } else {
      styleObj.top = `${offsetY}px`;
      styleObj.right = `${offsetX}px`;
    }

    const cssString = Object.entries(styleObj)
      .map(([k, v]) => `${k.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${v}`)
      .join('; ');

    return html`<div class="badge" style="${cssString}">${this.count}</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cw-badge': CwBadge;
  }
}
