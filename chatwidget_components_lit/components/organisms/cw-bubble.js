var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { bubbleStore, subscribe } from '../../store/chat-store.js';
import { GLOBAL_STYLES } from '../../tokens/design-tokens.js';
import { getBorderRadius, getCompositeBackground, getBoxShadow, getInnerShadow, getTooltipBorderRadius, hexToRgba } from '../../utils/style-helpers.js';
import '../atoms/cw-icon.js';
import '../atoms/cw-badge.js';
let CwBubble = class CwBubble extends LitElement {
    constructor() {
        super(...arguments);
        this.panelOpen = false;
        this.unreadCount = 0;
        this.hasSentMessage = false;
        this.hovered = false;
    }
    connectedCallback() {
        super.connectedCallback();
        this.unsub = subscribe('store:bubble', () => this.requestUpdate());
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
      .bubble-wrapper {
        position: fixed;
        z-index: 40;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        user-select: none;
        box-sizing: border-box;
        transform-style: preserve-3d;
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, background 0.3s ease;
        max-width: calc(100% - 24px);
        max-height: calc(100% - 24px);
      }
      .overlay-img {
        position: absolute;
        inset: 0;
        pointer-events: none;
        background-repeat: no-repeat;
        background-position: center;
      }
      .overlay-icon {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
      }
      .icon-container {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        color: #ffffff;
      }
      .dots-container {
        position: absolute;
        display: flex;
        z-index: 10;
      }
      .dot-span {
        border-radius: 50%;
      }
      .tooltip-box {
        position: absolute;
        white-space: nowrap;
        pointer-events: auto;
        z-index: 100;
        box-sizing: border-box;
      }
      .tooltip-arrow {
        position: absolute;
        box-sizing: border-box;
        pointer-events: none;
      }
    `
    ]; }
    handleClick() {
        window.dispatchEvent(new CustomEvent('toggle-contact-widget'));
    }
    render() {
        const settings = this.config || bubbleStore.get();
        if (settings.hideOnOpen && this.panelOpen)
            return html ``;
        const widthVal = settings.width || 60;
        const heightVal = settings.height || 60;
        const rawBottom = settings.offsetBottom !== undefined ? settings.offsetBottom : 12;
        const rawRight = settings.offsetRight !== undefined ? settings.offsetRight : 16;
        const borderRadius = getBorderRadius(settings.borderRadius);
        const bg = getCompositeBackground(settings);
        const boxShadow = [getBoxShadow(settings), getInnerShadow(settings)].filter(Boolean).join(', ');
        const hoverScale = settings.hoverScale !== undefined ? settings.hoverScale : 1.05;
        const transform = this.hovered && !this.panelOpen ? `scale(${hoverScale})` : 'scale(1.0)';
        // Glass style
        let glassStyle = '';
        if (settings.glass && settings.glass.enabled) {
            const blur = settings.glass.blur || 10;
            const opacity = settings.glass.bgOpacity || 0.3;
            glassStyle = `backdrop-filter: blur(${blur}px); -webkit-backdrop-filter: blur(${blur}px); background-color: rgba(255, 255, 255, ${opacity});`;
        }
        // Neon style
        let neonStyle = '';
        if (settings.neon && settings.neon.enabled) {
            const color = settings.neon.color || '#22d3ee';
            const intensity = settings.neon.intensity || 0.8;
            neonStyle = `box-shadow: 0 0 ${20 * intensity}px ${color}, inset 0 0 ${10 * intensity}px ${color};`;
        }
        // Border style
        const b = settings.border || {};
        const borderStyle = b.width ? `border: ${b.width}px ${b.style || 'solid'} ${b.color || 'transparent'};` : '';
        // Entry anim
        let entryAnim = '';
        if (settings.idleAnim && settings.idleAnim.enabled && settings.idleAnim.type !== 'none' && !this.hovered && !this.panelOpen) {
            const duration = settings.idleAnim.duration || 3200;
            entryAnim = `animation: idleFloat ${duration}ms ease-in-out infinite;`;
        }
        // Tooltip
        const t = settings.tooltip;
        const showTooltip = t && t.enabled && !this.panelOpen && !this.hasSentMessage;
        const tPos = t?.position || 'left';
        const tBorderRadius = getTooltipBorderRadius(t?.borderRadius, tPos);
        let tPosStyle = '';
        let arrowPosStyle = '';
        const arrowSize = 8;
        const tBorderW = t?.borderWidth || 0;
        const tBorderC = t?.borderColor || 'transparent';
        if (tPos === 'left') {
            tPosStyle = 'right: calc(100% + 12px); top: 50%; transform: translateY(-50%);';
            arrowPosStyle = `right: -${arrowSize / 2}px; top: 50%; transform: translateY(-50%) rotate(45deg);`;
            if (tBorderW > 0)
                arrowPosStyle += ` border-top: ${tBorderW}px solid ${tBorderC}; border-right: ${tBorderW}px solid ${tBorderC};`;
        }
        else if (tPos === 'right') {
            tPosStyle = 'left: calc(100% + 12px); top: 50%; transform: translateY(-50%);';
            arrowPosStyle = `left: -${arrowSize / 2}px; top: 50%; transform: translateY(-50%) rotate(45deg);`;
            if (tBorderW > 0)
                arrowPosStyle += ` border-bottom: ${tBorderW}px solid ${tBorderC}; border-left: ${tBorderW}px solid ${tBorderC};`;
        }
        else if (tPos === 'top') {
            tPosStyle = 'bottom: calc(100% + 12px); left: 50%; transform: translateX(-50%);';
            arrowPosStyle = `bottom: -${arrowSize / 2}px; left: 50%; transform: translateX(-50%) rotate(45deg);`;
            if (tBorderW > 0)
                arrowPosStyle += ` border-bottom: ${tBorderW}px solid ${tBorderC}; border-right: ${tBorderW}px solid ${tBorderC};`;
        }
        else if (tPos === 'bottom') {
            tPosStyle = 'top: calc(100% + 12px); left: 50%; transform: translateX(-50%);';
            arrowPosStyle = `top: -${arrowSize / 2}px; left: 50%; transform: translateX(-50%) rotate(45deg);`;
            if (tBorderW > 0)
                arrowPosStyle += ` border-top: ${tBorderW}px solid ${tBorderC}; border-left: ${tBorderW}px solid ${tBorderC};`;
        }
        const showHoverDots = settings.dots && settings.dots.animation && settings.dots.animation !== 'none' && this.hovered && !this.panelOpen;
        return html `
      <div
        class="bubble-wrapper"
        style="width: ${widthVal}px; height: ${heightVal}px; max-width: calc(100% - 24px); max-height: calc(100% - 24px); bottom: ${rawBottom}px; right: ${rawRight}px; border-radius: ${borderRadius}; background: ${bg}; background-blend-mode: ${settings.backgroundBlendMode || 'normal'}; box-shadow: ${boxShadow}; transform: ${transform}; ${borderStyle} ${glassStyle} ${neonStyle} ${entryAnim}"
        @mouseenter="${() => (this.hovered = true)}"
        @mouseleave="${() => (this.hovered = false)}"
        @click="${this.handleClick}"
      >
        ${settings.backgroundOverlayType === 'image' && settings.backgroundImageUrl
            ? html `
              <div
                class="overlay-img"
                style="background-image: url(${settings.backgroundImageUrl}); background-size: ${settings.backgroundImageSize || 'contain'}; opacity: ${settings.backgroundImageOpacity || 0.25}; mix-blend-mode: ${settings.backgroundBlendMode || 'normal'}; border-radius: inherit"
              ></div>
            `
            : ''}

        ${settings.backgroundOverlayType === 'lucide' && settings.backgroundLucideIcon
            ? html `
              <div
                class="overlay-icon"
                style="color: ${settings.backgroundLucideColor || '#FFFFFF'}; opacity: ${settings.backgroundLucideOpacity || 0.2}; mix-blend-mode: ${settings.backgroundBlendMode || 'normal'}"
              >
                <cw-icon .name="${settings.backgroundLucideIcon}" .size="${settings.backgroundLucideSize || 24}"></cw-icon>
              </div>
            `
            : ''}

        ${!showHoverDots
            ? html `
              <div class="icon-container">
                ${this.panelOpen
                ? html `
                      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    `
                : html `
                      <div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%">
                        ${settings.iconType === 'image' && (settings.iconImageUrl || settings.backgroundImageUrl)
                    ? html `
                              <img
                                src="${settings.iconImageUrl || settings.backgroundImageUrl}"
                                alt="bubble icon"
                                style="width: ${(settings.iconWidth || 26)}px; height: ${(settings.iconHeight || 26)}px; object-fit: ${settings.iconFit || 'contain'}; opacity: ${settings.iconOpacity !== undefined ? settings.iconOpacity : 1}; mix-blend-mode: ${settings.iconBlend || 'normal'}; border-radius: 50%"
                              />
                            `
                    : settings.iconType === 'customSvg' && settings.customSvg
                        ? html `
                              <cw-icon .customSvg="${settings.customSvg}" .size="${settings.iconWidth || 26}" .color="${settings.iconColor || '#ffffff'}"></cw-icon>
                            `
                        : html `
                              <cw-icon
                                .name="${settings.lucideIcon || settings.backgroundLucideIcon || 'MessageSquare'}"
                                .size="${settings.iconWidth || 26}"
                                .color="${settings.iconColor || '#ffffff'}"
                              ></cw-icon>
                            `}
                      </div>
                    `}
              </div>
            `
            : html `
              <div class="dots-container" style="gap: ${(settings.dots?.spacing || 6)}px">
                ${[0, 1, 2].map((i) => html `
                    <span
                      class="dot-span"
                      style="width: ${(settings.dots?.size || 6)}px; height: ${(settings.dots?.size || 6)}px; background-color: ${settings.dots?.color || '#FFFFFF'}; animation: ${settings.dots?.animation === 'bounce' ? `dotBounce 1.2s cubic-bezier(.2,.8,.2,1) ${i * 0.12}s infinite` : `dotPulse 1.4s cubic-bezier(.2,.8,.2,1) ${i * 0.1}s infinite`}"
                    ></span>
                  `)}
              </div>
            `}

        ${settings.outlineRing && settings.outlineRing.enabled
            ? html `
              <div
                style="position: absolute; inset: 0; pointer-events: none; border-radius: inherit; box-shadow: 0 0 0 ${(settings.outlineRing.width || 3)}px ${hexToRgba(settings.outlineRing.color || '#22d3ee', settings.outlineRing.opacity || 0.4)}"
              ></div>
            `
            : ''}

        ${this.unreadCount > 0
            ? html `<cw-badge .count="${this.unreadCount}" .config="${settings.badge}"></cw-badge>`
            : ''}

        ${showTooltip
            ? html `
              <div
                class="tooltip-box"
                style="background-color: ${t?.backgroundColor || '#ffffff'}; color: ${t?.textColor || '#374151'}; font-size: ${(t?.fontSize || 14)}px; padding: ${t?.padding || '8px 16px'}; border-radius: ${tBorderRadius}; box-shadow: ${t?.boxShadow || '0 4px 12px rgba(0,0,0,0.1)'}; border: ${(t?.borderWidth || 0)}px solid ${t?.borderColor || 'transparent'}; ${tPosStyle}"
              >
                <span>${t?.text || 'Chat with us'}</span>
                ${t?.arrowEnabled !== false
                ? html `
                      <div
                        class="tooltip-arrow"
                        style="width: ${arrowSize}px; height: ${arrowSize}px; background-color: ${t?.backgroundColor || '#ffffff'}; ${arrowPosStyle}"
                      ></div>
                    `
                : ''}
              </div>
            `
            : ''}
      </div>
    `;
    }
};
__decorate([
    property({ type: Object })
], CwBubble.prototype, "config", void 0);
__decorate([
    property({ type: Boolean })
], CwBubble.prototype, "panelOpen", void 0);
__decorate([
    property({ type: Number })
], CwBubble.prototype, "unreadCount", void 0);
__decorate([
    property({ type: Boolean })
], CwBubble.prototype, "hasSentMessage", void 0);
__decorate([
    state()
], CwBubble.prototype, "hovered", void 0);
CwBubble = __decorate([
    customElement('cw-bubble')
], CwBubble);
export { CwBubble };
//# sourceMappingURL=cw-bubble.js.map