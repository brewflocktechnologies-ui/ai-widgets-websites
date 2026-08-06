import { LitElement, html, css, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ChatWindowState, ChatState, FeaturesState, ChatbarState, BubbleState } from '../../store/types.js';
import { GLOBAL_STYLES } from '../../tokens/design-tokens.js';
import { REDUCED_MOTION_CSS } from '../../tokens/accessibility.js';
import { EnterLeaveController } from '../../utils/transition.js';
import '../molecules/cw-chat-header.js';
import './cw-chat-body.js';
import type { CwChatBody } from './cw-chat-body.js';

@customElement('cw-chat-panel')
export class CwChatPanel extends LitElement {
  @property({ type: Object }) chatWindowConfig?: ChatWindowState;
  @property({ type: Object }) chatState?: ChatState;
  @property({ type: Object }) features?: FeaturesState;
  @property({ type: Object }) chatbarConfig?: ChatbarState;
  @property({ type: Object }) bubbleConfig?: BubbleState;
  @property({ type: Boolean }) panelOpen = false;
  @property({ type: Number }) rev = 0;
  /** When true (default) the panel is fixed to the viewport; set false to position it inside a container (used by stories). */
  @property({ type: Boolean }) fixed = true;

  private transition = new EnterLeaveController(this, {
    enterMs: () => (this.chatWindowConfig?.animationOpeningSec !== undefined ? this.chatWindowConfig.animationOpeningSec : 0.3) * 1000,
    leaveMs: () => (this.chatWindowConfig?.animationClosingSec !== undefined ? this.chatWindowConfig.animationClosingSec : 0.2) * 1000,
  });

  /** Guards "focus on open" so it runs once per open instead of every render. */
  private didFocus = false;

  static styles = [
    GLOBAL_STYLES,
    REDUCED_MOTION_CSS,
    css`
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
  ];

  private emit(name: string) {
    this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true }));
  }

  protected willUpdate(_changed: PropertyValues<this>) {
    super.willUpdate(_changed);
    this.transition.setTarget(!!this.panelOpen);
  }

  protected updated(_changed: PropertyValues<this>) {
    super.updated(_changed);
    if (this.panelOpen) {
      // Only move focus once per open, after the enter transition finishes.
      if (this.transition.phase === 'open' && !this.didFocus) {
        this.didFocus = true;
        this.focusOnOpen();
      }
    } else {
      this.didFocus = false;
    }
  }

  /** Moves focus into the dialog (composer for active chats, panel otherwise). */
  private focusOnOpen() {
    const panel = this.shadowRoot?.querySelector<HTMLElement>('.panel');
    panel?.focus();
    if (this.chatState?.state === 'active') {
      setTimeout(() => {
        const body = this.renderRoot?.querySelector<CwChatBody>('cw-chat-body');
        body?.focusInput?.();
      }, 60);
    }
  }

  render() {
    const cw = this.chatWindowConfig;
    const cs = this.chatState;
    const feats = this.features || {};
    const cb = this.chatbarConfig;
    const bb = this.bubbleConfig;

    if (!this.transition.render || !cw || !cs) return html``;

    const phase = this.transition.phase;
    const isLeaving = phase === 'leave';
    const isHidden = phase === 'enter' || phase === 'leave';
    const openingSec = cw.animationOpeningSec !== undefined ? cw.animationOpeningSec : 0.3;
    const closingSec = cw.animationClosingSec !== undefined ? cw.animationClosingSec : 0.2;
    const durationSec = isLeaving ? closingSec : openingSec;

    const isExpanded = cs.isExpanded;
    const widthVal = isExpanded
      ? cw.expandedWidth || 480
      : cw.widgetWidth || 350;

    const heightVal = cw.widgetHeight || 550;

    const defaultBottom = (cw.offsetBottom !== undefined && cw.offsetBottom !== null && (cw.offsetBottom as any) !== '')
      ? Number(cw.offsetBottom)
      : (cb?.enabled ? (cb.offsetBottom !== undefined ? cb.offsetBottom : 12) : (bb?.offsetBottom !== undefined ? bb.offsetBottom : 12));

    let bottomPx = defaultBottom;
    if (cb?.enabled && !cb.hideOnOpen) {
      const h = cb.height || (cb.layout === 'card' ? 220 : 40);
      const gap = cb.stackGap !== undefined ? cb.stackGap : 12;
      bottomPx = defaultBottom + h + gap;
    } else if (!cb?.enabled && bb && !bb.hideOnOpen) {
      const h = bb.height || 60;
      const gap = bb.stackGap !== undefined ? bb.stackGap : 12;
      bottomPx = defaultBottom + h + gap;
    }

    const rawRight = (cw.offsetRight !== undefined && cw.offsetRight !== null && (cw.offsetRight as any) !== '')
      ? Number(cw.offsetRight)
      : (cb?.enabled ? (cb.offsetRight !== undefined ? cb.offsetRight : 16) : (bb?.offsetRight !== undefined ? bb.offsetRight : 16));

    const shadow = cw.widgetShadow
      ? `0 8px ${cw.widgetShadowBlur || 30}px ${cw.widgetShadowColor || 'rgba(0,0,0,0.12)'}`
      : 'none';

    const border = cw.widgetBorderEnabled
      ? `${cw.widgetBorderWidth || 1}px solid ${cw.widgetBorderColor || '#e5e7eb'}`
      : 'none';

    const borderRadius = `${cw.widgetBorderRadius || 24}px`;
    const maxHeightPx = `calc(100% - ${(bottomPx + 24)}px)`;

    return html`
      <div
        class="panel-wrapper zotly-widget-panel-wrapper"
        style="position: ${this.fixed ? 'fixed' : 'absolute'}; width: ${widthVal}px; height: ${heightVal}px; max-width: calc(100% - 24px); max-height: ${maxHeightPx}; bottom: ${bottomPx}px; right: ${rawRight}px; opacity: ${isHidden ? '0' : '1'}; transform: ${isHidden ? 'scale(0.5) translateY(32px)' : 'scale(1) translateY(0)'}; transform-origin: bottom right; transition: opacity ${durationSec}s ease, transform ${durationSec}s ease"
      >
        <div
          class="panel"
          role="dialog"
          aria-modal="${this.panelOpen ? 'true' : 'false'}"
          aria-label="Chat window"
          tabindex="-1"
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
            .rev="${this.rev}"
          ></cw-chat-header>

          <!-- BODY -->
          <cw-chat-body .chatState="${cs}" .chatWindowConfig="${cw}" .rev="${this.rev}"></cw-chat-body>

          <!-- RECONNECTING BANNER -->
          ${cs.reconnecting
            ? html`<div class="reconnecting">Reconnecting…</div>`
            : ''
          }

          <!-- CONFIRM MODAL OVERLAY -->
          ${cs.confirmBox
            ? html`
                <div class="modal-overlay" @click="${(e: Event) => { if (e.target === e.currentTarget) this.emit('cw:confirm-cancel'); }}">
                  <div class="modal-card" style="background: ${cw.modalCardBg || '#ffffff'}; border-radius: ${(cw.modalBorderRadius || 24)}px">
                    <p class="modal-message" style="color: ${cw.modalMessageColor || '#101828'}">${cs.confirmBox.message}</p>
                    <div class="modal-actions">
                      <button
                        type="button"
                        class="btn-ghost"
                        style="background: ${cw.endChatCancelBg || 'var(--cw-surface)'}; color: ${cw.endChatCancelTextColor || 'var(--cw-muted)'}; border-color: ${cw.endChatCancelBorderColor || 'var(--cw-border)'}"
                        @click="${() => this.emit('cw:confirm-cancel')}"
                      >
                        ${cs.confirmBox.cancelLabel || 'Cancel'}
                      </button>

                      <button
                        type="button"
                        class="btn-confirm"
                        style="background: ${cw.endChatConfirmBg || 'var(--cw-grad)'}; color: ${cw.endChatConfirmTextColor || '#ffffff'}"
                        @click="${() => this.emit('cw:confirm-end')}"
                      >
                        ${cs.confirmBox.confirmLabel || 'Confirm'}
                      </button>
                    </div>
                  </div>
                </div>
              `
            : ''
          }
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cw-chat-panel': CwChatPanel;
  }
}
