var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { chatStore, chatWindowStore, featuresStore, chatbarStore, bubbleStore, subscribeAll } from '../../store/chat-store.js';
import { GLOBAL_STYLES } from '../../tokens/design-tokens.js';
import './cw-chat-header.js';
import './cw-chat-body.js';
let CwChatPanel = class CwChatPanel extends LitElement {
    constructor() {
        super(...arguments);
        this.panelOpen = false;
    }
    connectedCallback() {
        super.connectedCallback();
        this.unsub = subscribeAll(() => this.requestUpdate());
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
      .panel-wrapper {
        position: fixed;
        z-index: 50;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        pointer-events: auto;
        transform-origin: bottom right;
        transition: all 0.3s ease;
        max-width: calc(100% - 24px);
      }
      .panel {
        display: flex;
        flex-direction: column;
        position: relative;
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        overflow: hidden;
        box-sizing: border-box;
        isolation: isolate;
        transform: translateZ(0);
      }
      .modal-overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(2px);
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
      }
      .modal-card {
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        width: 100%;
        max-width: 300px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      }
      .modal-message {
        margin: 0;
        font-size: 14px;
        font-weight: 600;
        line-height: 1.4;
      }
      .modal-actions {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
      }
      .modal-actions button {
        padding: 8px 16px;
        border-radius: 9999px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        border: 1px solid transparent;
      }
    `
    ]; }
    render() {
        if (!this.panelOpen)
            return html ``;
        const cw = this.chatWindowConfig || chatWindowStore.get();
        const cs = this.chatState || chatStore.get();
        const feats = this.features || featuresStore.get();
        const cb = this.chatbarConfig || chatbarStore.get();
        const bb = this.bubbleConfig || bubbleStore.get();
        const isExpanded = cs.isExpanded;
        const widthVal = isExpanded
            ? cw.expandedWidth || 480
            : cw.widgetWidth || 350;
        const heightVal = cw.widgetHeight || 550;
        const defaultBottom = (cw.offsetBottom !== undefined && cw.offsetBottom !== null && cw.offsetBottom !== '')
            ? Number(cw.offsetBottom)
            : (cb.enabled ? (cb.offsetBottom !== undefined ? cb.offsetBottom : 12) : (bb.offsetBottom !== undefined ? bb.offsetBottom : 12));
        let bottomPx = defaultBottom;
        if (cb.enabled && !cb.hideOnOpen) {
            const h = cb.height || (cb.layout === 'card' ? 220 : 40);
            const gap = cb.stackGap !== undefined ? cb.stackGap : 12;
            bottomPx = defaultBottom + h + gap;
        }
        else if (!cb.enabled && !bb.hideOnOpen) {
            const h = bb.height || 60;
            const gap = bb.stackGap !== undefined ? bb.stackGap : 12;
            bottomPx = defaultBottom + h + gap;
        }
        const rawRight = (cw.offsetRight !== undefined && cw.offsetRight !== null && cw.offsetRight !== '')
            ? Number(cw.offsetRight)
            : (cb.enabled ? (cb.offsetRight !== undefined ? cb.offsetRight : 16) : (bb.offsetRight !== undefined ? bb.offsetRight : 16));
        const shadow = cw.widgetShadow
            ? `0 8px ${cw.widgetShadowBlur || 30}px ${cw.widgetShadowColor || 'rgba(0,0,0,0.12)'}`
            : 'none';
        const border = cw.widgetBorderEnabled
            ? `${cw.widgetBorderWidth || 1}px solid ${cw.widgetBorderColor || '#e5e7eb'}`
            : 'none';
        const borderRadius = `${cw.widgetBorderRadius || 24}px`;
        const maxHeightPx = `calc(100% - ${(bottomPx + 24)}px)`;
        return html `
      <div
        class="panel-wrapper zotly-widget-panel-wrapper"
        style="width: ${widthVal}px; height: ${heightVal}px; max-width: calc(100% - 24px); max-height: ${maxHeightPx}; position: fixed; bottom: ${bottomPx}px; right: ${rawRight}px"
      >
        <div
          class="panel"
          style="box-shadow: ${shadow}; border: ${border}; border-radius: ${borderRadius}; background: ${cw.bodyBg || 'var(--cw-bg)'}; --cw-accent: ${cw.accentColor || '#0b5fff'}"
        >
          <!-- HEADER -->
          <cw-chat-header
            .config="${cw}"
            .features="${feats}"
            .isExpanded="${isExpanded}"
            .clientName="${cs.clientName}"
            .agentName="${cs.agentName}"
            .state="${cs.state}"
          ></cw-chat-header>

          <!-- BODY -->
          <cw-chat-body .chatState="${cs}" .chatWindowConfig="${cw}"></cw-chat-body>

          <!-- RECONNECTING BANNER -->
          ${cs.reconnecting
            ? html `<div class="reconnecting">Reconnecting…</div>`
            : ''}

          <!-- CONFIRM MODAL OVERLAY -->
          ${cs.confirmBox
            ? html `
                <div class="modal-overlay" @click="${(e) => { if (e.target === e.currentTarget)
                cs.confirmBox = null; }}">
                  <div class="modal-card" style="background: ${cw.modalCardBg || '#ffffff'}; border-radius: ${(cw.modalBorderRadius || 24)}px">
                    <p class="modal-message" style="color: ${cw.modalMessageColor || '#101828'}">${cs.confirmBox.message}</p>
                    <div class="modal-actions">
                      <button
                        type="button"
                        class="btn-ghost"
                        style="background: ${cw.endChatCancelBg || 'var(--cw-surface)'}; color: ${cw.endChatCancelTextColor || 'var(--cw-muted)'}; border-color: ${cw.endChatCancelBorderColor || 'var(--cw-border)'}"
                        @click="${() => { cs.confirmBox = null; this.requestUpdate(); }}"
                      >
                        ${cs.confirmBox.cancelLabel || 'Cancel'}
                      </button>

                      <button
                        type="button"
                        class="btn-confirm"
                        style="background: ${cw.endChatConfirmBg || 'var(--cw-grad)'}; color: ${cw.endChatConfirmTextColor || '#ffffff'}"
                        @click="${() => chatStore.confirmEnd()}"
                      >
                        ${cs.confirmBox.confirmLabel || 'Confirm'}
                      </button>
                    </div>
                  </div>
                </div>
              `
            : ''}
        </div>
      </div>
    `;
    }
};
__decorate([
    property({ type: Object })
], CwChatPanel.prototype, "chatWindowConfig", void 0);
__decorate([
    property({ type: Object })
], CwChatPanel.prototype, "chatState", void 0);
__decorate([
    property({ type: Object })
], CwChatPanel.prototype, "features", void 0);
__decorate([
    property({ type: Object })
], CwChatPanel.prototype, "chatbarConfig", void 0);
__decorate([
    property({ type: Object })
], CwChatPanel.prototype, "bubbleConfig", void 0);
__decorate([
    property({ type: Boolean })
], CwChatPanel.prototype, "panelOpen", void 0);
CwChatPanel = __decorate([
    customElement('cw-chat-panel')
], CwChatPanel);
export { CwChatPanel };
//# sourceMappingURL=cw-chat-panel.js.map