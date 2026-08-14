import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../../../components/organisms/cw-chat-form.js';
import { CwChatForm } from '../../../components/organisms/cw-chat-form.js';

describe('CwChatForm Organism Component', () => {
  let element: CwChatForm;

  beforeEach(async () => {
    document.body.innerHTML = '';
    element = new CwChatForm();
    element.schema = {
      id: 'prechat',
      title: 'Pre-Chat Form',
      subtitle: 'Please introduce yourself',
      submitLabel: 'Start Chatting',
      fields: [
        { name: 'name', type: 'text', label: 'Full Name', required: true },
        { name: 'email', type: 'email', label: 'Email', required: true },
      ],
    };
    document.body.appendChild(element);
    await element.updateComplete;
  });

  it('should instantiate and mount cw-chat-form element', () => {
    expect(element).toBeDefined();
    expect(element.tagName.toLowerCase()).toBe('cw-chat-form');
  });

  it('should render form header and form fields', () => {
    const title = element.shadowRoot?.querySelector('.form-title');
    expect(title?.textContent?.trim()).toBe('Pre-Chat Form');

    const fields = element.shadowRoot?.querySelectorAll('cw-form-field');
    expect(fields?.length).toBe(2);
  });

  it('should validate required fields on submit and dispatch cw:form-submit when valid', async () => {
    const spy = vi.fn();
    element.addEventListener('cw:form-submit', spy);

    element.values = { name: 'John Doe', email: 'john@example.com' };
    await element.updateComplete;

    const submitBtn = element.shadowRoot?.querySelector('cw-button') as HTMLElement;
    submitBtn?.click();

    expect(spy).toHaveBeenCalled();
  });
});
