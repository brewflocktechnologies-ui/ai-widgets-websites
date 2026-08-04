var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { initStore, subscribeAll, chatStore, bubbleStore, chatbarStore, greetWindowStore, chatWindowStore, featuresStore } from '../../store/chat-store.js';
import { KEYFRAMES_CSS } from '../../tokens/design-tokens.js';
import '../organisms/cw-bubble.js';
import '../organisms/cw-chatbar.js';
import '../organisms/cw-greet-window.js';
import '../organisms/cw-chat-panel.js';
let CwWidgetRoot = class CwWidgetRoot extends LitElement {
    constructor() {
        super(...arguments);
        this.panelOpen = false;
        this.initialized = false;
        this.toggleListener = () => this.handleToggleWidget();
        this.closeListener = () => this.handleCloseWidget();
    }
    async connectedCallback() {
        super.connectedCallback();
        try {
            // Initialize store
            await initStore();
        }
        catch (err) {
            console.warn('CwWidgetRoot initStore warning:', err);
        }
        finally {
            // Subscribe to store updates
            this.unsubAll = subscribeAll(() => this.requestUpdate());
            // Listen for custom events dispatched anywhere on window
            window.addEventListener('toggle-contact-widget', this.toggleListener);
            window.addEventListener('close-contact-widget', this.closeListener);
            this.initialized = true;
            this.requestUpdate();
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.unsubAll?.();
        window.removeEventListener('toggle-contact-widget', this.toggleListener);
        window.removeEventListener('close-contact-widget', this.closeListener);
    }
    static { this.styles = css `
    :host {
      display: block;
      font-family: inherit;
    }
  `; }
    handleToggleWidget() {
        this.panelOpen = !this.panelOpen;
        chatStore.get().panelOpen = this.panelOpen;
        if (this.panelOpen) {
            chatStore.get().unreadCount = 0;
        }
        this.requestUpdate();
    }
    handleCloseWidget() {
        this.panelOpen = false;
        chatStore.get().panelOpen = false;
        this.requestUpdate();
    }
    render() {
        if (!this.initialized)
            return html ``;
        const bs = bubbleStore.get();
        const cbs = chatbarStore.get();
        const gws = greetWindowStore.get();
        const cws = chatWindowStore.get();
        const fs = featuresStore.get();
        const cs = chatStore.get();
        return html `
      <style>
        ${KEYFRAMES_CSS}
      </style>

      <!-- FLOATING TRIGGER (BUBBLE OR CHATBAR) -->
      ${cbs.enabled
            ? html `
            <cw-chatbar
              .config="${cbs}"
              .panelOpen="${this.panelOpen}"
              .unreadCount="${cs.unreadCount}"
            ></cw-chatbar>
          `
            : html `
            <cw-bubble
              .config="${bs}"
              .panelOpen="${this.panelOpen}"
              .unreadCount="${cs.unreadCount}"
              .hasSentMessage="${cs.hasSentMessage}"
            ></cw-bubble>
          `}

      <!-- FLOATING GREET WINDOW -->
      <cw-greet-window
        .config="${gws}"
        .chatbarConfig="${cbs}"
        .bubbleConfig="${bs}"
        .panelOpen="${this.panelOpen}"
        .hasSentMessage="${cs.hasSentMessage}"
      ></cw-greet-window>

      <!-- MAIN CHAT PANEL -->
      <cw-chat-panel
        .chatWindowConfig="${cws}"
        .chatState="${cs}"
        .features="${fs}"
        .chatbarConfig="${cbs}"
        .bubbleConfig="${bs}"
        .panelOpen="${this.panelOpen}"
      ></cw-chat-panel>
    `;
    }
};
__decorate([
    state()
], CwWidgetRoot.prototype, "panelOpen", void 0);
__decorate([
    state()
], CwWidgetRoot.prototype, "initialized", void 0);
CwWidgetRoot = __decorate([
    customElement('cw-widget-root')
], CwWidgetRoot);
export { CwWidgetRoot };
//# sourceMappingURL=cw-widget-root.js.map