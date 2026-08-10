import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './cw-icon.js';

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
  `;

  render() {
    if (!this.status || this.status === 'sent') {
      const strokeColor = this.sentColor || 'currentColor';
      const opacity = this.sentColor ? '1' : '0.7';
      return html`
        <cw-icon .name="${'Check'}" .size="${13}" .color="${strokeColor}" style="opacity: ${opacity}"></cw-icon>
      `;
    }

    if (this.status === 'delivered') {
      const strokeColor = this.deliveredColor || 'currentColor';
      const opacity = this.deliveredColor ? '1' : '0.7';
      return html`
        <cw-icon .name="${'DoubleCheck'}" .size="${14}" .color="${strokeColor}" style="opacity: ${opacity}"></cw-icon>
      `;
    }

    if (this.status === 'read') {
      const strokeColor = this.readColor || '#34b7f1';
      return html`
        <cw-icon .name="${'DoubleCheck'}" .size="${14}" .color="${strokeColor}"></cw-icon>
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
