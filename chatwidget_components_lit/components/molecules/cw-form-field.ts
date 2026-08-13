import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { CORE_STYLES } from '../../tokens/core-styles.js';
import type { FormField } from '../../tokens/form-schemas.js';

@customElement('cw-form-field')
export class CwFormField extends LitElement {
  @property({ type: Object }) field!: FormField;
  @property({ type: String }) value = '';
  @property({ type: String }) error = '';
  @property({ type: Boolean }) disabled = false;

  static styles = [
    CORE_STYLES,
    css`
      :host {
        display: block;
        width: 100%;
        margin-bottom: 14px;
        box-sizing: border-box;
      }
      .field-container {
        display: flex;
        flex-direction: column;
        gap: 5px;
        width: 100%;
      }
      label {
        font-size: 11px;
        font-weight: 600;
        color: var(--cw-muted, #667085);
        text-transform: uppercase;
        letter-spacing: 0.04em;
        display: flex;
        align-items: center;
        gap: 3px;
        user-select: none;
      }
      .req-asterisk {
        color: var(--cw-error, #f43f5e);
        font-weight: 700;
      }
      .input-ctrl {
        width: 100%;
        box-sizing: border-box;
        padding: 10px 13px;
        border: 1px solid var(--cw-border, #e9ecf1);
        border-radius: 12px;
        font-family: inherit;
        font-size: 14px;
        background: var(--cw-surface, #ffffff);
        color: var(--cw-ink, #101828);
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
        outline: none;
      }
      .input-ctrl::placeholder {
        color: var(--cw-muted, #667085);
        opacity: 0.7;
      }
      .input-ctrl:focus {
        border-color: var(--cw-accent, #0b5fff);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--cw-accent, #0b5fff) 15%, transparent);
      }
      .input-ctrl:disabled {
        opacity: 0.55;
        cursor: not-allowed;
        background: var(--cw-bg, #f6f7fa);
      }
      .input-ctrl.has-error {
        border-color: var(--cw-error, #f43f5e);
      }
      .input-ctrl.has-error:focus {
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--cw-error, #f43f5e) 15%, transparent);
      }
      textarea.input-ctrl {
        resize: vertical;
        min-height: 80px;
        line-height: 1.45;
      }
      select.input-ctrl {
        cursor: pointer;
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23667085' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 12px center;
        padding-right: 36px;
      }
      .error-msg {
        font-size: 11px;
        color: var(--cw-error, #f43f5e);
        font-weight: 500;
        margin-top: 2px;
      }
    `
  ];

  private handleInput(e: Event) {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    this.value = target.value;
    this.dispatchEvent(
      new CustomEvent('cw:field-change', {
        detail: { name: this.field?.name, value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    if (!this.field) return html``;

    const f = this.field;
    const isError = !!this.error;
    const ctrlClass = `input-ctrl ${isError ? 'has-error' : ''}`;

    return html`
      <div class="field-container">
        ${f.label
          ? html`
              <label for="${f.name}">
                <span>${f.label}</span>
                ${f.required ? html`<span class="req-asterisk">*</span>` : ''}
              </label>
            `
          : ''
        }

        ${f.type === 'textarea'
          ? html`
              <textarea
                id="${f.name}"
                name="${f.name}"
                class="${ctrlClass}"
                rows="${f.rows || 3}"
                placeholder="${f.placeholder || ''}"
                .value="${this.value}"
                ?disabled="${this.disabled}"
                @input="${this.handleInput}"
              ></textarea>
            `
          : f.type === 'select'
          ? html`
              <select
                id="${f.name}"
                name="${f.name}"
                class="${ctrlClass}"
                .value="${this.value}"
                ?disabled="${this.disabled}"
                @change="${this.handleInput}"
              >
                ${f.placeholder ? html`<option value="" disabled ?selected="${!this.value}">${f.placeholder}</option>` : ''}
                ${(f.options || []).map(
                  (opt) => html`
                    <option value="${opt.value}" ?selected="${this.value === opt.value}">
                      ${opt.label}
                    </option>
                  `
                )}
              </select>
            `
          : html`
              <input
                id="${f.name}"
                name="${f.name}"
                type="${f.type || 'text'}"
                class="${ctrlClass}"
                placeholder="${f.placeholder || ''}"
                .value="${this.value}"
                ?disabled="${this.disabled}"
                @input="${this.handleInput}"
              />
            `
        }

        ${isError ? html`<span class="error-msg">${this.error}</span>` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cw-form-field': CwFormField;
  }
}
