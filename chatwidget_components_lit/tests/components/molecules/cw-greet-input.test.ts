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

  it('should dispatch cw:greet-input on input and cw:greet-submit on enter key', async () => {
    element.visible = true;
    element.config = { enabled: true, placeholder: 'Type a message...', animationOpeningSec: 0.5 };
    const inputSpy = vi.fn();
    const submitSpy = vi.fn();
    element.addEventListener('cw:greet-input', inputSpy);
    element.addEventListener('cw:greet-submit', submitSpy);
    await element.updateComplete;

    const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
    if (input) {
      input.value = 'Hello!';
      input.dispatchEvent(new Event('input'));
      expect(inputSpy).toHaveBeenCalledWith(expect.objectContaining({ detail: 'Hello!' }));

      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      expect(submitSpy).toHaveBeenCalledWith(expect.objectContaining({ detail: 'Hello!' }));
    }
  });

  it('renders separated layout and handles button click', async () => {
    element.visible = true;
    element.config = {
      enabled: true,
      layout: 'separated',
      buttonBgColor: '#00ff00',
      buttonIconColor: '#00ff00',
      borderRadius: 16,
    };
    const submitSpy = vi.fn();
    element.addEventListener('cw:greet-submit', submitSpy);
    await element.updateComplete;

    const btn = element.shadowRoot?.querySelector('cw-button');
    expect(btn).not.toBeNull();
    btn?.click();
    expect(submitSpy).toHaveBeenCalled();
  });

  it('renders joined layout with matching button color and icon color', async () => {
    element.visible = true;
    element.config = {
      enabled: true,
      layout: 'joined',
      buttonColor: '#ff0000',
      buttonIconColor: '#FF0000',
    };
    await element.updateComplete;

    const btn = element.shadowRoot?.querySelector('cw-button');
    expect(btn).not.toBeNull();
  });
});
