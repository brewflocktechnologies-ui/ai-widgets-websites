var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { chatStore } from '../../store/chat-store.js';
let CwGreetInput = class CwGreetInput extends LitElement {
    constructor() {
        super(...arguments);
        this.accentColor = '#9333EA';
        this.draft = '';
    }
    static { this.styles = css `
    :host {
      display: block;
      width: 100%;
    }
    .input-container {
      display: flex;
      align-items: center;
      width: 100%;
      position: relative;
      pointer-events: auto;
      box-sizing: border-box;
    }
    input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      width: 100%;
      font-size: 14px;
      font-family: inherit;
    }
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      border: none;
      cursor: pointer;
      transition: transform 0.2s;
    }
    button:hover {
      transform: scale(1.05);
    }
  `; }
    handleKeyDown(e) {
        if (e.key === 'Enter') {
            this.submit();
        }
    }
    handleInput(e) {
        this.draft = e.target.value;
        chatStore.get().draft = this.draft;
    }
    submit() {
        window.dispatchEvent(new CustomEvent('toggle-contact-widget'));
        chatStore.get().state = 'active';
        if (this.draft) {
            setTimeout(() => chatStore.send(), 200);
        }
    }
    render() {
        if (!this.config || !this.config.enabled || !this.config.visible)
            return html ``;
        const ib = this.config;
        const isSeparated = ib.layout === 'separated';
        if (isSeparated) {
            const btnBg = ib.buttonBgColor || ib.buttonColor || '#ffffff';
            const btnIconColor = ib.buttonIconColor || this.accentColor;
            const btnSize = ib.buttonSize || 42;
            return html `
        <div class="input-container" style="gap: 8px">
          <div
            style="flex: 1; background-color: ${ib.backgroundColor || '#ffffff'}; border-radius: ${(ib.borderRadius || 24)}px; box-shadow: ${ib.boxShadow || '0 6px 16px rgba(0,0,0,0.12)'}; padding: 10px 16px; display: flex; align-items: center"
          >
            <input
              type="text"
              .value="${this.draft}"
              placeholder="${ib.placeholder || 'Write your message...'}"
              style="color: ${ib.textColor || '#1e293b'}"
              @input="${this.handleInput}"
              @keydown="${this.handleKeyDown}"
            />
          </div>

          <button
            type="button"
            style="background-color: ${btnBg}; color: ${btnIconColor}; border-radius: 50%; width: ${btnSize}px; height: ${btnSize}px; box-shadow: ${ib.buttonBoxShadow || '0 6px 16px rgba(0,0,0,0.12)'}"
            @click="${this.submit}"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style="margin-left: 2px; margin-top: 1px">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      `;
        }
        // Joined layout (default)
        const btnColor = ib.buttonColor || '#9333EA';
        const btnIconColor = ib.buttonIconColor || '#ffffff';
        return html `
      <div
        class="input-container"
        style="background-color: ${ib.backgroundColor || '#ffffff'}; border-radius: ${(ib.borderRadius || 24)}px; box-shadow: ${ib.boxShadow || '0 6px 16px rgba(0,0,0,0.12)'}; padding: 4px 4px 4px 16px"
      >
        <input
          type="text"
          .value="${this.draft}"
          placeholder="${ib.placeholder || 'Write your message...'}"
          style="color: ${ib.textColor || '#1e293b'}"
          @input="${this.handleInput}"
          @keydown="${this.handleKeyDown}"
        />

        <button
          type="button"
          style="width: 38px; height: 38px; border-radius: 50%; background-color: ${btnColor}; color: ${btnIconColor}"
          @click="${this.submit}"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style="margin-left: 2px; margin-top: 1px">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    `;
    }
};
__decorate([
    property({ type: Object })
], CwGreetInput.prototype, "config", void 0);
__decorate([
    property({ type: String })
], CwGreetInput.prototype, "accentColor", void 0);
__decorate([
    property({ type: String })
], CwGreetInput.prototype, "draft", void 0);
CwGreetInput = __decorate([
    customElement('cw-greet-input')
], CwGreetInput);
export { CwGreetInput };
//# sourceMappingURL=cw-greet-input.js.map