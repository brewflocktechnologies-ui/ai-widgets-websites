import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { BadgeConfig } from '../../store/types.js';
import { GLOBAL_STYLES } from '../../tokens/global-styles.js';
import { REDUCED_MOTION_CSS } from '../../tokens/accessibility.js';

@customElement('cw-badge')
export class CwBadge extends LitElement {
  @property({ type: Number }) count = 0;
  @property({ type: Object }) config: BadgeConfig = {};

  static styles = [
    GLOBAL_STYLES,
    REDUCED_MOTION_CSS,
    css`
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

      @keyframes badgePulse {
        0% {
          transform: scale(0.95);
          box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7);
        }
        70% {
          transform: scale(1.05);
          box-shadow: 0 0 0 8px rgba(220, 38, 38, 0);
        }
        100% {
          transform: scale(0.95);
          box-shadow: 0 0 0 0 rgba(220, 38, 38, 0);
        }
      }

      @keyframes badgeBounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-4px); }
      }

      @keyframes badgeWiggle {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-10deg); }
        75% { transform: rotate(10deg); }
      }
    `
  ];

  render() {
    if (!this.count || this.count <= 0) return html``;

    const b = this.config || {};
    const pos = b.position || 'top-right';
    const offsetX = b.offsetX !== undefined ? b.offsetX : -6;
    const offsetY = b.offsetY !== undefined ? b.offsetY : -6;
    const size = b.size || 20;

    let animCss = b.animation || 'none';
    if (animCss === 'pulse') {
      animCss = 'badgePulse 1.5s ease-in-out infinite';
    } else if (animCss === 'bounce') {
      animCss = 'badgeBounce 1s infinite';
    } else if (animCss === 'wiggle') {
      animCss = 'badgeWiggle 2.5s ease-in-out infinite';
    } else if (animCss.includes('pulse')) {
      animCss = animCss.replace(/pulse/g, 'badgePulse');
    } else if (animCss.includes('bounce')) {
      animCss = animCss.replace(/bounce/g, 'badgeBounce');
    } else if (animCss.includes('wiggle')) {
      animCss = animCss.replace(/wiggle/g, 'badgeWiggle');
    }

    const styleObj: Record<string, string> = {
      position: 'absolute',
      backgroundColor: b.backgroundColor || '#dc2626',
      color: b.textColor || '#ffffff',
      fontSize: `${b.fontSize || 11}px`,
      lineHeight: '1',
      minWidth: `${size}px`,
      height: `${size}px`,
      border: `${b.borderWidth !== undefined ? b.borderWidth : 2}px solid ${b.borderColor || '#ffffff'}`,
      borderRadius: b.borderRadius !== undefined ? (typeof b.borderRadius === 'number' ? `${b.borderRadius}px` : b.borderRadius) : '9999px',
      fontWeight: b.fontWeight || '700',
      boxShadow: b.boxShadow || '0 1px 3px rgba(0,0,0,0.15)',
      padding: b.padding !== undefined ? b.padding : '0 4px',
      zIndex: '50',
      animation: animCss,
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
