import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { WelcomeConfig } from '../../store/types.js';
import { CORE_STYLES } from '../../tokens/core-styles.js';
import { REDUCED_MOTION_CSS } from '../../tokens/accessibility.js';
import '../atoms/cw-icon.js';
import '../atoms/cw-button.js';
import '../molecules/cw-avatar.js';

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
      .close-btn-wrapper {
        position: absolute;
        top: -10px;
        right: -10px;
        z-index: 20;
      }
      .layout-col {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-between;
        width: 100%;
      }
      .logo-container {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        margin-bottom: 20px;
      }
      .logo-img {
        height: 36px;
        object-fit: contain;
      }
      .text-block {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .welcome-title {
        font-weight: 800;
        line-height: 1.15;
        letter-spacing: -0.02em;
        margin: 0;
      }
      .welcome-desc {
        line-height: 1.5;
        font-weight: 400;
        margin: 0;
      }
      .avatars-row {
        display: flex;
        align-items: center;
        gap: 0;
        margin-top: 16px;
        width: 100%;
      }
      .glassy-container {
        display: flex;
        flex-direction: column;
        gap: 24px;
        justify-content: space-between;
      }
      .btn-inner {
        display: flex;
        align-items: center;
        gap: 16px;
        width: 100%;
        text-align: left;
      }
      .btn-icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .btn-text-col {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }
      .btn-text-main {
        font-weight: 700;
        font-size: 15px;
        letter-spacing: -0.01em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .btn-text-sub {
        font-size: 12px;
        font-weight: 500;
        opacity: 0.6;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
    return '';
  }

  private start() {
    this.dispatchEvent(
      new CustomEvent('cw:start-chat', { bubbles: true, composed: true })
    );
  }

  private close() {
    this.dispatchEvent(
      new CustomEvent('cw:close-panel', { bubbles: true, composed: true })
    );
  }

  private renderFooter(w: WelcomeConfig) {
    const poweredByLink = w.poweredByLink || '#';
    const poweredByText = w.poweredByText || 'vAInatheya.ai';
    const color = w.subtextColor || 'rgba(255,255,255,0.9)';
    const paddingBottom = typeof w.footerPaddingBottom === 'number' ? `${w.footerPaddingBottom}px` : (w.footerPaddingBottom || '0px');

    return html`
      <div class="footer-brand" style="color: ${color}; padding-bottom: ${paddingBottom}">
        <span>Powered by</span>&nbsp;
        <a href="${poweredByLink}" target="_blank" rel="noopener noreferrer">${poweredByText}</a>
      </div>
    `;
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
          <cw-button
            variant="icon"
            size="sm"
            icon="Close"
            .iconSize="${16}"
            scalable
            class="close-btn-wrapper"
            .color="${headerTextColor}"
            aria-label="Close welcome card"
            @click="${this.close}"
          ></cw-button>

          ${isGlassy
            ? html`
                <div class="layout-col">
                  <div style="display: flex; flex-direction: column; height: 100%; margin-bottom: 12px; justify-content: ${w.cardAlign === 'center' || w.cardPosition === 'center' ? 'center' : 'space-between'}">
                    <!-- Top Logo / Icon -->
                    <div class="logo-container" style="justify-content: ${w.logoAlign || (w.textAlign === 'center' || w.cardAlign === 'center' ? 'center' : 'flex-start')}">
                      ${w.logoUrl
                        ? html`<img src="${w.logoUrl}" alt="${w.logoAlt || 'Company Logo'}" class="logo-img" />`
                        : html`
                            <div style="color: ${headerTextColor}">
                              <cw-icon .name="${'MessageCircle'}" .size="${42}"></cw-icon>
                            </div>
                          `
                      }
                    </div>

                    <!-- Glassy Container -->
                    <div
                      class="glassy-container"
                      style="background: ${w.cardBg || 'rgba(255, 255, 255, 0.12)'}; border: ${w.cardBorder || '1px solid rgba(255, 255, 255, 0.22)'}; border-radius: ${(w.cardBorderRadius || 24)}px; padding: ${w.cardPadding || '32px 24px'}; backdrop-filter: blur(${(w.cardBlur || 16)}px); -webkit-backdrop-filter: blur(${(w.cardBlur || 16)}px); box-shadow: ${w.cardShadow || '0 12px 40px 0 rgba(0, 0, 0, 0.15)'}; flex: ${w.cardFlex || '1'}; width: ${w.cardWidth || '100%'}; min-height: ${w.cardMinHeight || 'auto'}"
                    >
                      <div class="text-block" style="text-align: ${w.textAlign || (w.cardAlign === 'center' ? 'center' : 'left')}; align-items: ${w.textAlign === 'center' || w.cardAlign === 'center' ? 'center' : 'flex-start'}">
                        <h2 class="welcome-title" style="font-size: ${w.titleFontSize || '28px'}; color: ${headerTextColor}">
                          ${w.title || 'Hi there! 👋 How can we help you today?'}
                        </h2>
                        <p class="welcome-desc" style="font-size: ${w.descriptionFontSize || '16px'}; color: ${w.subtextColor || 'rgba(255,255,255,0.9)'}">
                          ${w.description || 'Our support heroes are here to assist you.'}
                        </p>

                        <!-- Overlapping Avatars -->
                        <div class="avatars-row" style="justify-content: ${w.avatarAlign || (w.textAlign === 'center' || w.cardAlign === 'center' ? 'center' : 'flex-start')}">
                          ${(w.avatars || []).map(
                            (avatar: any, idx: number) => html`
                              <cw-avatar
                                .src="${this.resolveAvatarUrl(avatar)}"
                                .name="${typeof avatar === 'object' && avatar?.name ? avatar.name : 'Agent'}"
                                .size="${38}"
                                .showOnline="${false}"
                                style="margin-left: ${idx === 0 ? '0' : '-12px'}; border: 2px solid ${w.avatarBorderColor || 'rgba(255,255,255,0.2)'}; border-radius: 50%; z-index: ${10 + idx}; box-shadow: 0 4px 6px rgba(0,0,0,0.1)"
                              ></cw-avatar>
                            `
                          )}
                        </div>
                      </div>

                      <!-- Button inside Glassy Card -->
                      <cw-button
                        fullWidth
                        elevatable
                        .bg="${w.buttonBg || '#ffffff'}"
                        .color="${w.buttonTextColor || 'var(--cw-ink)'}"
                        .borderRadius="${(w.buttonBorderRadius || 24) + 'px'}"
                        .padding="${w.buttonPadding || '18px 24px'}"
                        @click="${this.start}"
                      >
                        <div class="btn-inner">
                          <div class="btn-icon-wrapper" style="color: ${w.buttonIconColor || this.accentColor}">
                            <cw-icon .name="${'ChatLines'}" .size="${24}"></cw-icon>
                          </div>
                          <div class="btn-text-col">
                            <span class="btn-text-main" style="color: ${w.buttonTextColor || 'var(--cw-ink)'}">
                              ${w.buttonText || 'Start Conversation'}
                            </span>
                            <span class="btn-text-sub" style="color: ${w.buttonTextColor || 'var(--cw-ink)'}">
                              ${w.buttonSubtext || 'Typically replies in 5 minutes'}
                            </span>
                          </div>
                        </div>
                      </cw-button>
                    </div>
                  </div>

                  ${this.renderFooter(w)}
                </div>
              `
            : html`
                <!-- Normal Layout -->
                <div class="layout-col">
                  <div>
                    <div class="logo-container" style="justify-content: flex-start; margin-bottom: 28px">
                      ${w.logoUrl
                        ? html`<img src="${w.logoUrl}" alt="${w.logoAlt || 'Company Logo'}" class="logo-img" />`
                        : html`
                            <div style="color: ${headerTextColor}">
                              <cw-icon .name="${'MessageCircle'}" .size="${42}"></cw-icon>
                            </div>
                          `
                      }
                    </div>

                    <div class="text-block" style="margin-bottom: 24px; text-align: left">
                      <h2 class="welcome-title" style="font-size: ${w.titleFontSize || '28px'}">
                        ${w.title || 'Hi there! 👋 How can we help you today?'}
                      </h2>
                      <p class="welcome-desc" style="font-size: ${w.descriptionFontSize || '16px'}; color: ${w.subtextColor || 'rgba(255,255,255,0.9)'}">
                        ${w.description || 'Our support heroes are here to assist you.'}
                      </p>

                      <div class="avatars-row">
                        ${(w.avatars || []).map(
                          (avatar: any, idx: number) => html`
                            <cw-avatar
                              .src="${this.resolveAvatarUrl(avatar)}"
                              .name="${typeof avatar === 'object' && avatar?.name ? avatar.name : 'Agent'}"
                              .size="${38}"
                              .showOnline="${false}"
                              style="margin-left: ${idx === 0 ? '0' : '-12px'}; border: 2px solid ${w.avatarBorderColor || 'rgba(255,255,255,0.2)'}; border-radius: 50%; z-index: ${10 + idx}; box-shadow: 0 4px 6px rgba(0,0,0,0.1)"
                            ></cw-avatar>
                          `
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <cw-button
                      fullWidth
                      elevatable
                      .bg="${w.buttonBg || '#ffffff'}"
                      .color="${w.buttonTextColor || 'var(--cw-ink)'}"
                      .borderRadius="${(w.buttonBorderRadius || 24) + 'px'}"
                      .padding="${w.buttonPadding || '18px 24px'}"
                      style="margin-bottom: 20px"
                      @click="${this.start}"
                    >
                      <div class="btn-inner">
                        <div class="btn-icon-wrapper" style="color: ${w.buttonIconColor || this.accentColor}">
                          <cw-icon .name="${'ChatLines'}" .size="${24}"></cw-icon>
                        </div>
                        <div class="btn-text-col">
                          <span class="btn-text-main" style="color: ${w.buttonTextColor || 'var(--cw-ink)'}">
                            ${w.buttonText || 'Start Conversation'}
                          </span>
                          <span class="btn-text-sub" style="color: ${w.buttonTextColor || 'var(--cw-ink)'}">
                            ${w.buttonSubtext || 'Typically replies in 5 minutes'}
                          </span>
                        </div>
                      </div>
                    </cw-button>

                    ${this.renderFooter(w)}
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
