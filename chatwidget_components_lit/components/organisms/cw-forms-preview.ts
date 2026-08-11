import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { CORE_STYLES } from '../../tokens/core-styles.js';
import '../atoms/cw-icon.js';
import '../atoms/cw-button.js';

@customElement('cw-forms-preview')
export class CwFormsPreview extends LitElement {
  @property({ type: String }) type: 'prechat' | 'postchat' | 'ticket' = 'prechat';
  @property({ type: String }) heading = 'Submit a Support Ticket';
  @property({ type: String }) subheading = 'We will get back to you within 24 hours.';
  @property({ type: String }) accentColor = '#0b5fff';

  static styles = [
    CORE_STYLES,
    css`
      :host {
        display: block;
        width: 100%;
        font-family: inherit, system-ui, -apple-system, sans-serif;
      }
      .phone-preview-card-container {
        width: 100%;
        max-width: 320px;
        margin: 0 auto;
        background: #ffffff;
        border-radius: 20px;
        box-shadow: 0 12px 36px rgba(0, 0, 0, 0.12);
        overflow: hidden;
        border: 1px solid #e2e8f0;
        box-sizing: border-box;
      }
      .phone-preview-header {
        background: #000000;
        color: #ffffff;
        text-align: center;
        font-weight: 700;
        font-size: 14px;
        padding: 12px 16px;
        letter-spacing: -0.01em;
      }
      .phone-preview-body {
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        box-sizing: border-box;
      }
      .phone-field-group {
        display: flex;
        flex-direction: column;
        gap: 6px;
        width: 100%;
        text-align: left;
      }
      .phone-field-label {
        font-size: 13px;
        font-weight: 600;
        color: #1e293b;
      }
      .required-star {
        color: #ef4444;
      }
      .phone-field-input {
        width: 100%;
        height: 40px;
        padding: 8px 12px;
        border: 1px solid #cbd5e1;
        border-radius: 10px;
        font-size: 13px;
        color: #1e293b;
        background: #ffffff;
        outline: none;
        box-sizing: border-box;
        font-family: inherit;
        transition: border-color 0.2s, box-shadow 0.2s;
      }
      .phone-field-input:focus,
      .phone-field-input.active-focus {
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
      }
      textarea.phone-field-input {
        height: auto;
        min-height: 80px;
        resize: vertical;
      }
      .phone-country-input-group {
        display: flex;
        width: 100%;
        border: 1px solid #cbd5e1;
        border-radius: 10px;
        overflow: hidden;
        box-sizing: border-box;
        background: #ffffff;
      }
      .phone-country-select-btn {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 0 10px;
        background: #f8fafc;
        border-right: 1px solid #cbd5e1;
        font-size: 12px;
        font-weight: 600;
        color: #334155;
        cursor: pointer;
        flex-shrink: 0;
      }
      .phone-country-input-group input {
        flex: 1;
        border: none;
        outline: none;
        padding: 8px 12px;
        font-size: 13px;
        color: #1e293b;
        font-family: inherit;
      }
      .phone-field-select {
        width: 100%;
        height: 40px;
        padding: 8px 32px 8px 12px;
        border: 1px solid #cbd5e1;
        border-radius: 10px;
        font-size: 13px;
        color: #64748b;
        background: #ffffff;
        outline: none;
        appearance: none;
        -webkit-appearance: none;
        box-sizing: border-box;
        font-family: inherit;
        cursor: pointer;
      }
      .phone-submit-btn {
        width: 100%;
        height: 44px;
        background: #1e293b;
        color: #ffffff;
        border: none;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
        margin-top: 8px;
        transition: background-color 0.2s, transform 0.15s;
      }
      .phone-submit-btn:hover {
        background: #0f172a;
      }
      .phone-footer-brand {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        font-size: 11px;
        color: #64748b;
        margin-top: 12px;
      }
      .phone-footer-brand strong {
        color: #1e293b;
      }
    `
  ];

  private handleSubmit(e: Event, formType: string) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent('form-submit', {
      detail: { type: formType },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    if (this.type === 'postchat') {
      return html`
        <div class="phone-preview-card-container">
          <div class="phone-preview-header">
            Post-chat form preview
          </div>
          <form class="phone-preview-body" @submit="${(e: Event) => this.handleSubmit(e, 'postchat')}">
            <div style="text-align: center; margin-bottom: 4px">
              <h4 style="font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 6px; margin-top: 0">How was your experience?</h4>
              <p style="font-size: 12px; color: #64748b; margin: 0">Rate our customer support team</p>
            </div>

            <div style="display: flex; justify-content: center; gap: 8px; font-size: 24px; cursor: pointer; margin: 8px 0">
              <span title="Poor">😠</span>
              <span title="Neutral">😐</span>
              <span title="Good">😊</span>
              <span title="Great">😄</span>
              <span title="Excellent!" style="transform: scale(1.2)">😍</span>
            </div>

            <div class="phone-field-group">
              <label class="phone-field-label">Comments / Feedback</label>
              <textarea class="phone-field-input" rows="3" placeholder="Tell us what we did well or how we can improve..."></textarea>
            </div>

            <div class="phone-field-group">
              <label class="phone-field-label">Email (Optional)</label>
              <input type="email" class="phone-field-input" placeholder="Your email for follow-up" />
            </div>

            <cw-button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              label="Submit Feedback"
              .bg="${this.accentColor || '#1e293b'}"
              borderRadius="12px"
            ></cw-button>

            <div class="phone-footer-brand">
              <cw-icon .name="${'MessageSquare'}" .size="${14}" .color="${'#2563eb'}"></cw-icon>
              <span>Powered by <strong>Zotly Chat</strong></span>
            </div>
          </form>
        </div>
      `;
    }

    if (this.type === 'ticket') {
      return html`
        <div class="phone-preview-card-container">
          <div class="phone-preview-header">
            Ticket form preview
          </div>
          <form class="phone-preview-body" @submit="${(e: Event) => this.handleSubmit(e, 'ticket')}">
            <div style="margin-bottom: 6px">
              <h4 style="font-size: 15px; font-weight: 700; color: #0f172a; margin: 0">${this.heading}</h4>
              <p style="font-size: 12px; color: #64748b; margin-top: 2px; margin-bottom: 0">${this.subheading}</p>
            </div>

            <div class="phone-field-group">
              <label class="phone-field-label">Subject <span class="required-star">*</span></label>
              <input type="text" class="phone-field-input" placeholder="Brief summary of issue" required />
            </div>

            <div class="phone-field-group">
              <label class="phone-field-label">Description <span class="required-star">*</span></label>
              <textarea class="phone-field-input" rows="3" placeholder="Provide details about your inquiry" required></textarea>
            </div>

            <cw-button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              label="Submit Ticket"
              .bg="${this.accentColor || '#1e293b'}"
              borderRadius="12px"
            ></cw-button>

            <div class="phone-footer-brand">
              <cw-icon .name="${'MessageSquare'}" .size="${14}" .color="${'#2563eb'}"></cw-icon>
              <span>Powered by <strong>Zotly Chat</strong></span>
            </div>
          </form>
        </div>
      `;
    }

    // Default: Pre-chat preview
    return html`
      <div class="phone-preview-card-container">
        <div class="phone-preview-header">
          Pre-chat form preview
        </div>
        <form class="phone-preview-body" @submit="${(e: Event) => this.handleSubmit(e, 'prechat')}">
          <div class="phone-field-group">
            <label class="phone-field-label">Name <span class="required-star">*</span></label>
            <input type="text" class="phone-field-input active-focus" placeholder="Your name" value="Your name" required />
          </div>

          <div class="phone-field-group">
            <label class="phone-field-label">Email <span class="required-star">*</span></label>
            <input type="email" class="phone-field-input" placeholder="Your email" required />
          </div>

          <div class="phone-field-group">
            <label class="phone-field-label">Phone</label>
            <div class="phone-country-input-group">
              <div class="phone-country-select-btn">
                <span>us</span>
                <span>+1</span>
                <cw-icon .name="${'ChevronDown'}" .size="${12}"></cw-icon>
              </div>
              <input type="tel" placeholder="Enter phone number" />
            </div>
          </div>

          <div class="phone-field-group">
            <label class="phone-field-label">Department</label>
            <div style="position: relative">
              <select class="phone-field-select">
                <option value="" selected>Select a department</option>
                <option value="sales">Sales & Business</option>
                <option value="support">Technical Support</option>
                <option value="billing">Billing & Invoices</option>
              </select>
              <div style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); pointer-events: none; color: #64748b">
                <cw-icon .name="${'ChevronDown'}" .size="${14}"></cw-icon>
              </div>
            </div>
          </div>

          <cw-button
            type="submit"
            variant="primary"
            size="md"
            fullWidth
            label="Submit"
            .bg="${this.accentColor || '#1e293b'}"
            borderRadius="12px"
          ></cw-button>

          <div class="phone-footer-brand">
            <cw-icon .name="${'MessageSquare'}" .size="${14}" .color="${'#2563eb'}"></cw-icon>
            <span>Powered by <strong>Zotly Chat</strong></span>
          </div>
        </form>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cw-forms-preview': CwFormsPreview;
  }
}
