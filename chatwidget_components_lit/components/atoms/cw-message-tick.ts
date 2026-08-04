import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('cw-message-tick')
export class CwMessageTick extends LitElement {
  @property({ type: String }) status: 'sent' | 'delivered' | 'read' | '' = 'sent';
  @property({ type: String }) sentColor = '';
  @property({ type: String }) deliveredColor = '';
  @property({ type: String }) readColor = '#34b7f1';

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      vertical-align: middle;
      margin-left: 4px;
    }
    svg {
      display: block;
    }
  `;

  render() {
    if (!this.status || this.status === 'sent') {
      const strokeColor = this.sentColor || 'currentColor';
      const opacity = this.sentColor ? '1' : '0.7';
      return html`
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke="${strokeColor}" style="opacity: ${opacity}">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      `;
    }

    if (this.status === 'delivered') {
      const strokeColor = this.deliveredColor || 'currentColor';
      const opacity = this.deliveredColor ? '1' : '0.7';
      return html`
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke="${strokeColor}" style="opacity: ${opacity}">
          <path d="M17 6L8.5 14.5L5 11M22 6L13.5 14.5L12.5 13.5"></path>
        </svg>
      `;
    }

    if (this.status === 'read') {
      const strokeColor = this.readColor || '#34b7f1';
      return html`
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke="${strokeColor}">
          <path d="M17 6L8.5 14.5L5 11M22 6L13.5 14.5L12.5 13.5"></path>
        </svg>
      `;
    }

    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cw-message-tick': CwMessageTick;
  }
}
