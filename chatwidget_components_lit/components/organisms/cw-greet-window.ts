import { LitElement, html, css, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { GreetWindowState, ChatbarState, BubbleState } from '../../store/types.js';
import { GLOBAL_STYLES } from '../../tokens/design-tokens.js';
import { getAnimClass } from '../../utils/style-helpers.js';
import { EnterLeaveController } from '../../utils/transition.js';
import '../atoms/cw-icon.js';
import '../molecules/cw-greet-input.js';

@customElement('cw-greet-window')
export class CwGreetWindow extends LitElement {
  @property({ type: Object }) config?: GreetWindowState;
  @property({ type: Object }) chatbarConfig?: ChatbarState;
  @property({ type: Object }) bubbleConfig?: BubbleState;
  @property({ type: Boolean }) panelOpen = false;
  @property({ type: Boolean }) hasSentMessage = false;
  @property({ type: Boolean }) visible = false;
  @property({ type: Boolean }) dismissed = false;
  @property({ type: Number }) rev = 0;

  private transition = new EnterLeaveController(this, {
    enterMs: () => (this.config?.animationOpeningSec !== undefined ? this.config.animationOpeningSec : 0.3) * 1000,
    leaveMs: () => (this.config?.animationClosingSec !== undefined ? this.config.animationClosingSec : 0.3) * 1000,
  });

  static styles = [
    GLOBAL_STYLES,
    css`
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
  ];

  private handleDismiss(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(
      new CustomEvent('cw:greet-dismiss', { bubbles: true, composed: true })
    );
  }

  private handleCardClick() {
    this.dispatchEvent(
      new CustomEvent('cw:toggle', { bubbles: true, composed: true })
    );
  }

  protected willUpdate(_changed: PropertyValues<this>) {
    super.willUpdate(_changed);
    const g = this.config;
    const cb = this.chatbarConfig;
    const bb = this.bubbleConfig;

    const chatbarEnabled = !!cb?.enabled;
    const hideOnOpen = chatbarEnabled ? (cb?.hideOnOpen ?? true) : (bb?.hideOnOpen ?? true);
    const shouldShowTrigger = !hideOnOpen || !this.panelOpen;
    const isVisible = this.visible || !!g?.visible;

    const shouldShow = shouldShowTrigger && !this.hasSentMessage && !!g && g.enabled && !this.dismissed && isVisible;
    this.transition.setTarget(shouldShow);
  }

  render() {
    const g = this.config;
    const cb = this.chatbarConfig;
    const bb = this.bubbleConfig;

    if (!this.transition.render || !g) return html``;

    const phase = this.transition.phase;
    const isLeaving = phase === 'leave';
    const isHidden = phase === 'enter' || phase === 'leave';
    const openingSec = g.animationOpeningSec !== undefined ? g.animationOpeningSec : 0.3;
    const closingSec = g.animationClosingSec !== undefined ? g.animationClosingSec : 0.3;
    const durationSec = isLeaving ? closingSec : openingSec;
    const transitionDelay = phase === 'enter' ? '150ms' : '0ms';

    const chatbarEnabled = !!cb?.enabled;

    const baseBottom = chatbarEnabled
      ? cb?.offsetBottom !== undefined ? cb.offsetBottom : 12
      : bb?.offsetBottom !== undefined ? bb.offsetBottom : 12;

    const triggerHeight = chatbarEnabled
      ? cb?.height || (cb?.layout === 'card' ? 220 : 40)
      : bb?.height || 60;

    const spacing = g.spacing !== undefined ? g.spacing : 16;
    const bottomPx = baseBottom + triggerHeight + spacing;

    const rawRight = chatbarEnabled
      ? cb?.offsetRight !== undefined ? parseInt(String(cb.offsetRight)) : 16
      : bb?.offsetRight !== undefined ? parseInt(String(bb.offsetRight)) : 16;

    const widthVal = g.width || 320;
    const iconAlign = g.iconAlign === 'left' ? 'flex-start' : g.iconAlign === 'right' ? 'flex-end' : 'center';
    const maxHeightPx = `calc(100% - ${(bottomPx + 24)}px)`;

    return html`
      <div
        class="greet-wrapper"
        style="bottom: ${bottomPx}px; right: ${rawRight}px; width: ${widthVal}px; max-width: calc(100% - 24px); max-height: ${maxHeightPx}; opacity: ${isHidden ? '0' : '1'}; transform: ${isHidden ? 'translateY(16px)' : 'translateY(0)'}; transition: opacity ${durationSec}s ease, transform ${durationSec}s ease; transition-delay: ${transitionDelay}"
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
            ? html`
                <div style="width: 100%; display: flex; align-items: center; margin-bottom: 16px; justify-content: ${iconAlign}">
                  ${g.imageUrl
                    ? html`
                        <img
                          src="${g.imageUrl}"
                          class="${getAnimClass(g.iconAnimation)}"
                          style="display: block; margin: ${g.iconAlign === 'center' ? '0 auto' : '0'}; height: ${(g.imageHeight || 70)}px; width: ${g.imageWidth ? `${g.imageWidth}px` : 'auto'}; object-fit: contain; padding: ${g.imagePadding || '0px'}"
                        />
                      `
                    : html`
                        <div
                          class="${getAnimClass(g.iconAnimation)}"
                          style="width: ${(g.iconSize || 48)}px; height: ${(g.iconSize || 48)}px; color: ${g.iconColor || '#9333EA'}"
                        >
                          <cw-icon .name="${g.lucideIcon}" .size="${g.iconSize || 48}" .color="${g.iconColor || '#9333EA'}"></cw-icon>
                        </div>
                      `
                  }
                </div>
              `
            : ''
          }

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
}

declare global {
  interface HTMLElementTagNameMap {
    'cw-greet-window': CwGreetWindow;
  }
}
