import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { WelcomeConfig } from '../../store/types.js';
import { CORE_STYLES } from '../../tokens/core-styles.js';
import { REDUCED_MOTION_CSS } from '../../tokens/accessibility.js';
import '../atoms/cw-icon.js';

@customElement('cw-welcome-card')
export class CwWelcomeCard extends LitElement {
  @property({ type: Object }) config?: WelcomeConfig;
  @property({ type: String }) accentColor = 'var(--cw-accent)';

  static styles = [
    CORE_STYLES,
    REDUCED_MOTION_CSS,
    css`
      :host {
        display: block;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
      }
      .welcome-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
      }
      .bg-blobs {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 0;
      }
      .blob-1 {
        position: absolute;
        top: -50%;
        right: -20%;
        width: 140%;
        height: 120%;
        background: linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 80%);
        border-radius: 50%;
        transform: rotate(-15deg);
      }
      .blob-2 {
        position: absolute;
        top: -20%;
        right: -30%;
        width: 120%;
        height: 100%;
        background: linear-gradient(200deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 60%);
        border-radius: 40% 60% 50% 50%;
        transform: rotate(10deg);
      }
      .blob-3 {
        position: absolute;
        bottom: -40%;
        left: -20%;
        width: 130%;
        height: 100%;
        background: linear-gradient(35deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 70%);
        border-radius: 50%;
        transform: rotate(-10deg);
      }
      .content-wrapper {
        position: relative;
        z-index: 10;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-between;
      }
      .close-btn {
        position: absolute;
        top: -10px;
        right: -10px;
        border: none;
        background: transparent;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background 0.2s, transform 0.2s;
      }
      .close-btn:hover {
        background: rgba(255, 255, 255, 0.15);
        transform: scale(1.05);
      }
      .start-btn {
        display: flex;
        align-items: center;
        gap: 16px;
        width: 100%;
        border: none;
        cursor: pointer;
        text-align: left;
        transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
        margin: 0;
      }
      .start-btn:hover {
        transform: translateY(-4px);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      }
      .avatars-row {
        display: flex;
        align-items: center;
        gap: 0;
        margin-top: 16px;
        width: 100%;
      }
      .avatar-img {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        border: 2px solid;
        object-fit: cover;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      }
      .footer-brand {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 11px;
        font-weight: 500;
        opacity: 0.8;
        margin-top: auto;
        padding-top: 10px;
        flex-shrink: 0;
      }
      .footer-brand a {
        font-weight: 700;
        color: inherit;
        text-decoration: none;
      }
    `
  ];

  private resolveAvatarUrl(avatar: any): string {
    if (typeof avatar === 'string' && avatar.trim() && !avatar.startsWith('[object')) {
      return avatar;
    }
    if (avatar && typeof avatar === 'object') {
      const url = avatar.url || avatar.src || avatar.avatar || avatar.imageUrl || '';
      if (url && typeof url === 'string') return url;
    }
    return 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80';
  }

  private start(e?: Event) {
    this.dispatchEvent(
      new CustomEvent('cw:start-chat', { bubbles: true, composed: true })
    );
  }

  private close() {
    this.dispatchEvent(
      new CustomEvent('cw:close-panel', { bubbles: true, composed: true })
    );
  }

  render() {
    const w = this.config || {};
    const headerTextColor = w.headerTextColor || '#ffffff';
    const bgGradient = w.bgGradient || 'linear-gradient(135deg, var(--cw-accent), #22d3ee)';
    const padding = w.padding || '24px 20px 12px 20px';
    const isGlassy = w.cardLayout === 'glassy';

    return html`
      <div class="welcome-container" style="padding: ${padding}; color: ${headerTextColor}; background: ${bgGradient}">
        <div class="bg-blobs">
          <div class="blob-1"></div>
          <div class="blob-2"></div>
          <div class="blob-3"></div>
        </div>

        <div class="content-wrapper">
          <button type="button" class="close-btn" style="color: ${headerTextColor}" @click="${this.close}">
            <cw-icon .name="${'Close'}" .size="${16}"></cw-icon>
          </button>

          ${isGlassy
            ? html`
                <div style="display: flex; flex-direction: column; height: 100%; justify-content: space-between; width: 100%">
                  <div style="display: flex; flex-direction: column; height: 100%; margin-bottom: 12px; justify-content: ${w.cardAlign === 'center' || w.cardPosition === 'center' ? 'center' : 'space-between'}">
                    <!-- Top Logo / Icon -->
                    <div style="display: flex; align-items: center; margin-bottom: 20px; flex-shrink: 0; justify-content: ${w.logoAlign || (w.textAlign === 'center' || w.cardAlign === 'center' ? 'center' : 'flex-start')}">
                      ${w.logoUrl
                        ? html`<img src="${w.logoUrl}" style="height: 36px; object-fit: contain" />`
                        : html`
                            <div style="color: ${headerTextColor}; opacity: 1">
                              <cw-icon .name="${'MessageCircle'}" .size="${42}"></cw-icon>
                            </div>
                          `
                      }
                    </div>

                    <!-- Glassy Container -->
                    <div
                      style="background: ${w.cardBg || 'rgba(255, 255, 255, 0.12)'}; border: ${w.cardBorder || '1px solid rgba(255, 255, 255, 0.22)'}; border-radius: ${(w.cardBorderRadius || 24)}px; padding: ${w.cardPadding || '32px 24px'}; backdrop-filter: blur(${(w.cardBlur || 16)}px); -webkit-backdrop-filter: blur(${(w.cardBlur || 16)}px); box-shadow: ${w.cardShadow || '0 12px 40px 0 rgba(0, 0, 0, 0.15)'}; display: flex; flex-direction: column; gap: 24px; flex: ${w.cardFlex || '1'}; width: ${w.cardWidth || '100%'}; min-height: ${w.cardMinHeight || 'auto'}; justify-content: space-between"
                    >
                      <div style="display: flex; flex-direction: column; gap: 10px; text-align: ${w.textAlign || (w.cardAlign === 'center' ? 'center' : 'left')}; align-items: ${w.textAlign === 'center' || w.cardAlign === 'center' ? 'center' : 'flex-start'}">
                        <h2 style="font-weight: 800; line-height: 1.15; letter-spacing: -0.02em; margin: 0; font-size: ${w.titleFontSize || '28px'}; color: ${headerTextColor}">
                          ${w.title || 'Hi there! 👋 How can we help you today?'}
                        </h2>
                        <p style="font-size: ${w.descriptionFontSize || '16px'}; line-height: 1.5; font-weight: 400; margin: 0; color: ${w.subtextColor || 'rgba(255,255,255,0.9)'}">
                          ${w.description || 'Our support heroes are here to assist you.'}
                        </p>

                        <!-- Overlapping Avatars -->
                        <div class="avatars-row" style="justify-content: ${w.avatarAlign || (w.textAlign === 'center' || w.cardAlign === 'center' ? 'center' : 'flex-start')}">
                          ${(w.avatars || []).map(
                            (avatar: any, idx: number) => html`
                              <img
                                class="avatar-img"
                                src="${this.resolveAvatarUrl(avatar)}"
                                style="margin-left: ${idx === 0 ? '0' : '-12px'}; border-color: ${w.avatarBorderColor || 'rgba(255,255,255,0.2)'}; z-index: ${10 + idx}"
                              />
                            `
                          )}
                        </div>
                      </div>

                      <!-- Button inside Glassy Card -->
                      <button
                        type="button"
                        class="start-btn"
                        style="background: ${w.buttonBg || '#ffffff'}; color: ${w.buttonTextColor || 'var(--cw-ink)'}; border-radius: ${(w.buttonBorderRadius || 24)}px; padding: ${w.buttonPadding || '18px 24px'}"
                        @click="${this.start}"
                      >
                        <div style="display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: ${w.buttonIconColor || this.accentColor}">
                          <cw-icon .name="${'ChatLines'}" .size="${24}"></cw-icon>
                        </div>
                        <div style="display: flex; flex-direction: column; min-width: 0">
                          <span style="font-weight: 700; font-size: 15px; letter-spacing: -0.01em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: ${w.buttonTextColor || 'var(--cw-ink)'}">
                            ${w.buttonText || 'Start Conversation'}
                          </span>
                          <span style="font-size: 12px; font-weight: 500; opacity: 0.6; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: ${w.buttonTextColor || 'var(--cw-ink)'}">
                            ${w.buttonSubtext || 'Typically replies in 5 minutes'}
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>

                  <!-- Footer -->
                  <div class="footer-brand" style="color: ${w.subtextColor || 'rgba(255,255,255,0.9)'}; padding-bottom: ${w.footerPaddingBottom || '0px'}">
                    <span>Powered by</span>&nbsp;
                    <a href="#" target="_blank">vAInatheya.ai</a>
                  </div>
                </div>
              `
            : html`
                <!-- Normal Layout -->
                <div style="display: flex; flex-direction: column; height: 100%; justify-content: space-between; width: 100%">
                  <div>
                    <div style="display: flex; align-items: center; justify-content: flex-start; margin-bottom: 28px">
                      ${w.logoUrl
                        ? html`<img src="${w.logoUrl}" style="height: 36px; object-fit: contain" />`
                        : html`
                            <div style="color: ${headerTextColor}; opacity: 1">
                              <cw-icon .name="${'MessageCircle'}" .size="${42}"></cw-icon>
                            </div>
                          `
                      }
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; text-align: left">
                      <h2 style="font-weight: 800; font-size: ${w.titleFontSize || '28px'}; line-height: 1.15; letter-spacing: -0.02em">
                        ${w.title || 'Hi there! 👋 How can we help you today?'}
                      </h2>
                      <p style="font-size: ${w.descriptionFontSize || '16px'}; line-height: 1.5; font-weight: 400; color: ${w.subtextColor || 'rgba(255,255,255,0.9)'}">
                        ${w.description || 'Our support heroes are here to assist you.'}
                      </p>

                      <div class="avatars-row">
                        ${(w.avatars || []).map(
                          (avatar: any, idx: number) => html`
                            <img
                              class="avatar-img"
                              src="${this.resolveAvatarUrl(avatar)}"
                              style="margin-left: ${idx === 0 ? '0' : '-12px'}; border-color: ${w.avatarBorderColor || 'rgba(255,255,255,0.2)'}; z-index: ${10 + idx}"
                            />
                          `
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      class="start-btn"
                      style="background: ${w.buttonBg || '#ffffff'}; color: ${w.buttonTextColor || 'var(--cw-ink)'}; border-radius: ${(w.buttonBorderRadius || 24)}px; padding: ${w.buttonPadding || '18px 24px'}; margin-bottom: 20px"
                      @click="${this.start}"
                    >
                      <div style="display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: ${w.buttonIconColor || this.accentColor}">
                        <cw-icon .name="${'ChatLines'}" .size="${24}"></cw-icon>
                      </div>
                      <div style="display: flex; flex-direction: column; min-width: 0">
                        <span style="font-weight: 700; font-size: 15px; letter-spacing: -0.01em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: ${w.buttonTextColor || 'var(--cw-ink)'}">
                          ${w.buttonText || 'Start Conversation'}
                        </span>
                        <span style="font-size: 12px; font-weight: 500; opacity: 0.6; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: ${w.buttonTextColor || 'var(--cw-ink)'}">
                          ${w.buttonSubtext || 'Typically replies in 5 minutes'}
                        </span>
                      </div>
                    </button>

                    <div class="footer-brand" style="color: ${w.subtextColor || 'rgba(255,255,255,0.9)'}; padding-bottom: ${w.footerPaddingBottom || '0px'}">
                      <span>Powered by</span>&nbsp;
                      <a href="#" target="_blank">vAInatheya.ai</a>
                    </div>
                  </div>
                </div>
              `
          }
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cw-welcome-card': CwWelcomeCard;
  }
}
