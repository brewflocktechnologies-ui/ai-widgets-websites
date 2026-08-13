import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { CORE_STYLES } from '../../tokens/core-styles.js';
import type { FormSchema } from '../../tokens/form-schemas.js';
import '../molecules/cw-form-field.js';
import '../atoms/cw-button.js';

@customElement('cw-chat-form')
export class CwChatForm extends LitElement {
  @property({ type: Object }) schema!: FormSchema;
  @property({ type: Object }) values: Record<string, string> = {};
  @property({ type: Object }) errors: Record<string, string> = {};
  @property({ type: Boolean }) submitting = false;
  @property({ type: Boolean }) disabled = false;

  @state() private localValues: Record<string, string> = {};
  @state() private localErrors: Record<string, string> = {};

  static styles = [
    CORE_STYLES,
    css`
      :host {
        display: block;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
      }
      .form-wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 24px 20px;
        box-sizing: border-box;
        overflow-y: auto;
        background: var(--cw-bg, #f6f7fa);
      }
      .form-header {
        margin-bottom: 20px;
        text-align: left;
      }
      .form-title {
        font-size: 20px;
        font-weight: 700;
        color: var(--cw-ink, #101828);
        line-height: 1.25;
        margin: 0 0 6px 0;
      }
      .form-subtitle {
        font-size: 13px;
        color: var(--cw-muted, #667085);
        line-height: 1.45;
        margin: 0;
      }
      .form-fields {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
      }
      .form-actions {
        margin-top: auto;
        padding-top: 16px;
      }
    `
  ];

  protected willUpdate(changedProperties: Map<string, unknown>) {
    super.willUpdate(changedProperties);
    if (changedProperties.has('values') && this.values) {
      this.localValues = { ...this.values };
    }
    if (changedProperties.has('errors') && this.errors) {
      this.localErrors = { ...this.errors };
    }
  }

  private handleFieldChange(e: CustomEvent<{ name: string; value: string }>) {
    const { name, value } = e.detail;
    this.localValues = { ...this.localValues, [name]: value };
    if (this.localErrors[name]) {
      const nextErrors = { ...this.localErrors };
      delete nextErrors[name];
      this.localErrors = nextErrors;
    }

    this.dispatchEvent(
      new CustomEvent('cw:field-change', {
        detail: { formId: this.schema?.id, name, value, values: this.localValues },
        bubbles: true,
        composed: true,
      })
    );
  }

  private validate(): boolean {
    if (!this.schema?.fields) return true;
    const errs: Record<string, string> = {};

    for (const f of this.schema.fields) {
      const val = (this.localValues[f.name] || '').trim();
      if (f.required && !val) {
        errs[f.name] = `${f.label} is required`;
      } else if (f.type === 'email' && val) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val)) {
          errs[f.name] = 'Enter a valid email address';
        }
      }
    }

    this.localErrors = errs;
    return Object.keys(errs).length === 0;
  }

  private handleSubmit(e?: Event) {
    if (e) e.preventDefault();
    if (this.submitting || this.disabled) return;

    if (!this.validate()) return;

    this.dispatchEvent(
      new CustomEvent('cw:form-submit', {
        detail: { formId: this.schema?.id, values: { ...this.localValues } },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    if (!this.schema) return html``;

    const s = this.schema;

    return html`
      <div class="form-wrapper">
        <div class="form-header">
          <h2 class="form-title">${s.title}</h2>
          ${s.subtitle ? html`<p class="form-subtitle">${s.subtitle}</p>` : ''}
        </div>

        <div class="form-fields">
          ${(s.fields || []).map(
            (field) => html`
              <cw-form-field
                .field="${field}"
                .value="${this.localValues[field.name] || ''}"
                .error="${this.localErrors[field.name] || ''}"
                ?disabled="${this.disabled || this.submitting}"
                @cw:field-change="${this.handleFieldChange}"
              ></cw-form-field>
            `
          )}
        </div>

        <div class="form-actions">
          <cw-button
            variant="primary"
            size="lg"
            .label="${this.submitting ? 'Submitting…' : s.submitLabel}"
            ?fullWidth="${true}"
            ?disabled="${this.disabled || this.submitting}"
            ?elevatable="${true}"
            @click="${() => this.handleSubmit()}"
          ></cw-button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cw-chat-form': CwChatForm;
  }
}
