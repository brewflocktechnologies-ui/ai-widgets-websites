import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../../../components/molecules/cw-form-field.js';
import { CwFormField } from '../../../components/molecules/cw-form-field.js';

describe('CwFormField Molecule Component', () => {
  let element: CwFormField;

  beforeEach(async () => {
    document.body.innerHTML = '';
    element = new CwFormField();
    document.body.appendChild(element);
    await element.updateComplete;
  });

  it('should instantiate and mount cw-form-field element', () => {
    expect(element).toBeDefined();
    expect(element.tagName.toLowerCase()).toBe('cw-form-field');
  });

  it('should render input field, label, required asterisk, and handle input', async () => {
    element.field = { name: 'email', label: 'Email', type: 'text', required: true };
    element.value = 'test@example.com';
    await element.updateComplete;

    const label = element.shadowRoot?.querySelector('label');
    expect(label?.textContent).toContain('Email');
    expect(element.shadowRoot?.querySelector('.req-asterisk')).not.toBeNull();

    const spy = vi.fn();
    element.addEventListener('cw:field-change', spy);

    const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
    input.value = 'new@example.com';
    input.dispatchEvent(new Event('input'));

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({ detail: { name: 'email', value: 'new@example.com' } })
    );
  });

  it('should render textarea without label or placeholder', async () => {
    element.field = { name: 'notes', type: 'textarea' };
    await element.updateComplete;

    const label = element.shadowRoot?.querySelector('label');
    expect(label).toBeNull();

    const textarea = element.shadowRoot?.querySelector('textarea');
    expect(textarea).not.toBeNull();
  });

  it('should render textarea and select dropdown fields', async () => {
    element.field = { name: 'message', label: 'Message', type: 'textarea', placeholder: 'Write...' };
    await element.updateComplete;

    const textarea = element.shadowRoot?.querySelector('textarea');
    expect(textarea).not.toBeNull();

    element.field = {
      name: 'category',
      label: 'Category',
      type: 'select',
      placeholder: 'Select...',
      options: [
        { label: 'Sales', value: 'sales' },
        { label: 'Support', value: 'support' },
      ],
    };
    element.value = '';
    await element.updateComplete;

    const select = element.shadowRoot?.querySelector('select') as HTMLSelectElement;
    expect(select).not.toBeNull();

    const spy = vi.fn();
    element.addEventListener('cw:field-change', spy);
    select.dispatchEvent(new Event('change'));
    expect(spy).toHaveBeenCalled();
  });

  it('should render error message when error property is set', async () => {
    element.field = { name: 'name', label: 'Name', type: 'text' };
    element.error = 'Name is required';
    await element.updateComplete;

    const error = element.shadowRoot?.querySelector('.error-msg');
    expect(error).not.toBeNull();
    expect(error?.textContent).toContain('Name is required');
  });
});
