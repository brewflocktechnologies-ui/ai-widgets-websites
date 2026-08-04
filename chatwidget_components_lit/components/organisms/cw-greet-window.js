var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { greetWindowStore, chatbarStore, bubbleStore, subscribe } from '../../store/chat-store.js';
import { GLOBAL_STYLES } from '../../tokens/design-tokens.js';
import { getAnimClass } from '../../utils/style-helpers.js';
import '../atoms/cw-icon.js';
import '../molecules/cw-greet-input.js';
let CwGreetWindow = class CwGreetWindow extends LitElement {
    constructor() {
        super(...arguments);
        this.panelOpen = false;
        this.hasSentMessage = false;
    }
    connectedCallback() {
        super.connectedCallback();
        this.unsub = subscribe('store:greetWindow', () => this.requestUpdate());
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.unsub?.();
    }
    static { this.styles = [
        GLOBAL_STYLES,
        css `
      :host {
        display: block;
      }
      .greet-wrapper {
        position: fixed;
        z-index: 30;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        box-sizing: border-box;
        pointer-events: none;
        gap: 12px;
        transition: opacity 0.3s ease, transform 0.3s ease;
        max-width: calc(100% - 24px);
      }
      .close-row {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        padding-right: 2px;
        pointer-events: auto;
      }
      .close-btn {
        border: none;
        background: #475569;
        color: #ffffff;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        transition: transform 0.2s, background-color 0.2s;
      }
      .close-btn:hover {
        background: #1e293b;
        transform: scale(1.05);
      }
      .greet-card {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 100%;
        max-height: 100%;
        overflow-y: auto;
        cursor: pointer;
        pointer-events: auto;
        box-sizing: border-box;
      }
    `
    ]; }
    handleDismiss(e) {
        e.stopPropagation();
        if (this.config) {
            this.config.dismissed = true;
            greetWindowStore.get().dismissed = true;
            this.requestUpdate();
        }
    }
    handleCardClick() {
        window.dispatchEvent(new CustomEvent('toggle-contact-widget'));
    }
    render() {
        const g = this.config || greetWindowStore.get();
        const cb = this.chatbarConfig || chatbarStore.get();
        const bb = this.bubbleConfig || bubbleStore.get();
        const chatbarEnabled = cb.enabled;
        const hideOnOpen = chatbarEnabled ? cb.hideOnOpen : bb.hideOnOpen;
        const shouldShowTrigger = !hideOnOpen || !this.panelOpen;
        if (!shouldShowTrigger || this.hasSentMessage || !g || !g.enabled || g.dismissed || !g.visible) {
            return html ``;
        }
        const baseBottom = chatbarEnabled
            ? cb.offsetBottom !== undefined ? cb.offsetBottom : 12
            : bb.offsetBottom !== undefined ? bb.offsetBottom : 12;
        const triggerHeight = chatbarEnabled
            ? cb.height || (cb.layout === 'card' ? 220 : 40)
            : bb.height || 60;
        const spacing = g.spacing !== undefined ? g.spacing : 16;
        const bottomPx = baseBottom + triggerHeight + spacing;
        const rawRight = chatbarEnabled
            ? cb.offsetRight !== undefined ? parseInt(String(cb.offsetRight)) : 16
            : bb.offsetRight !== undefined ? parseInt(String(bb.offsetRight)) : 16;
        const widthVal = g.width || 320;
        const iconAlign = g.iconAlign === 'left' ? 'flex-start' : g.iconAlign === 'right' ? 'flex-end' : 'center';
        const maxHeightPx = `calc(100% - ${(bottomPx + 24)}px)`;
        return html `
      <div
        class="greet-wrapper"
        style="bottom: ${bottomPx}px; right: ${rawRight}px; width: ${widthVal}px; max-width: calc(100% - 24px); max-height: ${maxHeightPx}"
      >
        <!-- Close Button -->
        <div class="close-row">
          <button type="button" class="close-btn" @click="${this.handleDismiss}">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Greet Card -->
        <div
          class="greet-card"
          style="background-color: ${g.backgroundColor || '#ffffff'}; border-radius: ${(g.borderRadius || 16)}px; padding: ${g.padding || '24px 20px'}; box-shadow: ${g.boxShadow || '0 12px 28px -6px rgba(0,0,0,0.15), 0 8px 14px -4px rgba(0,0,0,0.1)'}"
          @click="${this.handleCardClick}"
        >
          ${g.imageUrl || (g.iconType === 'lucide' && g.lucideIcon)
            ? html `
                <div style="width: 100%; display: flex; align-items: center; margin-bottom: 16px; justify-content: ${iconAlign}">
                  ${g.imageUrl
                ? html `
                        <img
                          src="${g.imageUrl}"
                          class="${getAnimClass(g.iconAnimation)}"
                          style="display: block; margin: ${g.iconAlign === 'center' ? '0 auto' : '0'}; height: ${(g.imageHeight || 70)}px; width: ${g.imageWidth ? `${g.imageWidth}px` : 'auto'}; object-fit: contain; padding: ${g.imagePadding || '0px'}"
                        />
                      `
                : html `
                        <div
                          class="${getAnimClass(g.iconAnimation)}"
                          style="width: ${(g.iconSize || 48)}px; height: ${(g.iconSize || 48)}px; color: ${g.iconColor || '#9333EA'}"
                        >
                          <cw-icon .name="${g.lucideIcon}" .size="${g.iconSize || 48}" .color="${g.iconColor || '#9333EA'}"></cw-icon>
                        </div>
                      `}
                </div>
              `
            : ''}

          <h3 style="color: ${g.titleColor || '#1e293b'}; font-size: ${g.titleFontSize || '15px'}; font-weight: 700; line-height: 1.4; margin: 0 0 8px 0; letter-spacing: -0.01em">
            ${g.title}
          </h3>

          <p style="color: ${g.descriptionColor || '#475569'}; font-size: ${g.descriptionFontSize || '14px'}; line-height: 1.5; margin: 0">
            ${g.description}
          </p>
        </div>

        <!-- Quick Input Box -->
        <cw-greet-input .config="${g.inputBox}" .accentColor="${g.iconColor || '#9333EA'}"></cw-greet-input>
      </div>
    `;
    }
};
__decorate([
    property({ type: Object })
], CwGreetWindow.prototype, "config", void 0);
__decorate([
    property({ type: Object })
], CwGreetWindow.prototype, "chatbarConfig", void 0);
__decorate([
    property({ type: Object })
], CwGreetWindow.prototype, "bubbleConfig", void 0);
__decorate([
    property({ type: Boolean })
], CwGreetWindow.prototype, "panelOpen", void 0);
__decorate([
    property({ type: Boolean })
], CwGreetWindow.prototype, "hasSentMessage", void 0);
CwGreetWindow = __decorate([
    customElement('cw-greet-window')
], CwGreetWindow);
export { CwGreetWindow };
//# sourceMappingURL=cw-greet-window.js.map