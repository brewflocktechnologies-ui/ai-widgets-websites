import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../../../components/molecules/cw-greet-input.js';
import { CwGreetInput } from '../../../components/molecules/cw-greet-input.js';

describe('CwGreetInput Molecule Component', () => {
  let element: CwGreetInput;

  beforeEach(async () => {
    document.body.innerHTML = '';
    element = new CwGreetInput();
    document.body.appendChild(element);
    await element.updateComplete;
  });

  it('should instantiate and mount cw-greet-input element', () => {
    expect(element).toBeDefined();
    expect(element.tagName.toLowerCase()).toBe('cw-greet-input');
  });

  it('should render input field when visible is true', async () => {
    element.visible = true;
    element.config = { enabled: true, placeholder: 'Type a message...' };
    await element.updateComplete;

    const input = element.shadowRoot?.querySelector('input');
    expect(input).not.toBeNull();
    expect(input?.placeholder).toBe('Type a message...');
  });

  it('should dispatch cw:greet-submit on submit button click or enter key', async () => {
    element.visible = true;
    element.config = { enabled: true, placeholder: 'Type a message...' };
    const spy = vi.fn();
    element.addEventListener('cw:greet-submit', spy);
    await element.updateComplete;

    const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
    if (input) {
      input.value = 'Hello!';
      input.dispatchEvent(new Event('input'));
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    }

    expect(spy).toHaveBeenCalled();
  });
});
