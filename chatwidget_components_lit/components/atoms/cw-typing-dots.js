var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
let CwTypingDots = class CwTypingDots extends LitElement {
    static { this.styles = css `
    :host {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 6px 8px;
    }
    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: currentColor;
      animation: typingBounce 1.4s infinite ease-in-out;
    }
    .dot:nth-child(1) {
      animation-delay: 0s;
    }
    .dot:nth-child(2) {
      animation-delay: 0.2s;
    }
    .dot:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes typingBounce {
      0%, 60%, 100% {
        transform: translateY(0);
        opacity: 0.4;
      }
      30% {
        transform: translateY(-4px);
        opacity: 1;
      }
    }
  `; }
    render() {
        return html `
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    `;
    }
};
CwTypingDots = __decorate([
    customElement('cw-typing-dots')
], CwTypingDots);
export { CwTypingDots };
//# sourceMappingURL=cw-typing-dots.js.map