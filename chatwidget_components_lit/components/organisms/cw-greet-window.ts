import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { GreetWindowState, ChatbarState, BubbleState } from '../../store/types.js';
import { GLOBAL_STYLES } from '../../tokens/global-styles.js';
import { REDUCED_MOTION_CSS } from '../../tokens/accessibility.js';
import { getAnimClass } from '../../utils/style-helpers.js';
import { EnterLeaveController } from '../../utils/transition.js';
import '../molecules/cw-greet-input.js';
import '../atoms/cw-icon.js';

@customElement('cw-greet-window')
export class CwGreetWindow extends LitElement {
  @property({ type: Object }) config?: GreetWindowState;
  @property({ type: Object }) chatbarConfig?: ChatbarState;
  @property({ type: Object }) bubbleConfig?: BubbleState;
  @property({ type: Boolean }) panelOpen = false;
  @property({ type: Boolean }) hasSentMessage = false;
  @property({ type: Boolean }) visible = true;
  @property({ type: Boolean }) dismissed = false;
  @property({ type: Number }) rev = 0;
  /** When true (default) the window is fixed to the viewport; set false to position it inside a container (used by stories). */
  @property({ type: Boolean }) fixed = true;

  private transition = new EnterLeaveController(this, {
    enterMs: () => 300,
    leaveMs: () => 300,
  });

  static styles = [
    GLOBAL_STYLES,
    REDUCED_MOTION_CSS,
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
        padding-top: 14px;
        padding-right: 8px;
      }
      .close-btn {
        position: absolute;
        top: -12px;
        right: -8px;
        z-index: 20;
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
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        transition: transform 0.2s, background-color 0.2s;
        pointer-events: auto;
      }
      .close-btn:hover {
        background: var(--cw-ink);
        transform: scale(1.1);
      }
      .greet-card {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 100%;
        max-height: 100%;
        overflow: visible;
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
        style="position: ${this.fixed ? 'fixed' : 'absolute'}; bottom: ${bottomPx}px; right: ${rawRight}px; width: ${widthVal}px; max-width: calc(100% - 24px); max-height: ${maxHeightPx}; opacity: ${isHidden ? '0' : '1'}; transform: ${isHidden ? 'translateY(16px)' : 'translateY(0)'}; transition: opacity ${durationSec}s ease, transform ${durationSec}s ease; transition-delay: ${transitionDelay}"
      >
        <!-- Greet Card -->
        <div
          class="greet-card"
          style="background-color: ${g.backgroundColor || '#ffffff'}; border-radius: ${(g.borderRadius || 16)}px; padding: ${g.padding || '24px 20px'}; box-shadow: ${g.boxShadow || '0 12px 28px -6px rgba(0,0,0,0.15), 0 8px 14px -4px rgba(0,0,0,0.1)'}"
          @click="${this.handleCardClick}"
        >
          <!-- Floating Close Button outside top right -->
          <button type="button" class="close-btn" aria-label="Close greet window" @click="${this.handleDismiss}">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <!-- Icon / Image Area (Lucide icon default on top) -->
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
                    style="color: ${g.iconColor || 'var(--cw-accent)'}; display: flex; align-items: center; justify-content: center"
                  >
                    <cw-icon .name="${g.lucideIcon || 'Sparkles'}" .size="${g.iconSize || 48}"></cw-icon>
                  </div>
                `
            }
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px; text-align: ${g.textAlign || 'center'}; width: 100%">
            <h3 style="margin: 0; font-size: ${(g.fontSize || 16)}px; font-weight: 700; color: ${g.titleColor || 'var(--cw-ink)'}; line-height: 1.35">
              ${g.title || 'Hi there! 👋'}
            </h3>
            ${g.description
              ? html`
                  <p style="margin: 0; font-size: 14px; color: ${g.descriptionColor || '#475569'}; line-height: 1.45">
                    ${g.description}
                  </p>
                `
              : ''
            }
          </div>
        </div>

        <!-- Optional Input Box -->
        ${g.inputBox && g.inputBox.enabled
          ? html`
              <cw-greet-input
                .config="${g.inputBox}"
                .visible="${this.visible && (g.inputBox.visible !== undefined ? g.inputBox.visible : true)}"
                .accentColor="${g.iconColor || 'var(--cw-accent)'}"
              ></cw-greet-input>
            `
          : ''
        }
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cw-greet-window': CwGreetWindow;
  }
}
