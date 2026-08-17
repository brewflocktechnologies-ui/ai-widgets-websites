import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../../../components/molecules/cw-composer.js';
import { CwComposer } from '../../../components/molecules/cw-composer.js';

describe('CwComposer Molecule Component', () => {
  let element: CwComposer;

  beforeEach(async () => {
    document.body.innerHTML = '';
    element = new CwComposer();
    document.body.appendChild(element);
    await element.updateComplete;
  });

  it('should instantiate and mount cw-composer element', () => {
    expect(element).toBeDefined();
    expect(element.tagName.toLowerCase()).toBe('cw-composer');
  });

  it('should dispatch cw:draft-change on input in textarea', async () => {
    const spy = vi.fn();
    element.addEventListener('cw:draft-change', spy);
    await element.updateComplete;

    const textarea = element.shadowRoot?.querySelector('textarea') as HTMLTextAreaElement;
    expect(textarea).not.toBeNull();

    textarea.value = 'Hello world';
    textarea.dispatchEvent(new Event('input'));

    expect(spy).toHaveBeenCalled();
  });

  it('handles updated draft property reset and height adjustment', async () => {
    element.draft = 'Old draft';
    await element.updateComplete;

    const textarea = element.shadowRoot?.querySelector('textarea') as HTMLTextAreaElement;
    textarea.value = 'Different text';

    element.draft = '';
    await element.updateComplete;

    expect(textarea.value).toBe('');
  });

  it('should dispatch cw:send event when send button is clicked', async () => {
    element.draft = 'Testing message';
    const spy = vi.fn();
    element.addEventListener('cw:send', spy);
    await element.updateComplete;

    const buttons = element.shadowRoot?.querySelectorAll('cw-button');
    const sendBtn = buttons ? buttons[buttons.length - 1] as HTMLElement : null;
    expect(sendBtn).not.toBeNull();
    sendBtn?.click();

    expect(spy).toHaveBeenCalled();
  });

  it('handles toggleAttach, toggleEmoji, focusInput, and keyboard Enter key send', async () => {
    const attachSpy = vi.fn();
    const emojiSpy = vi.fn();
    const sendSpy = vi.fn();

    element.addEventListener('cw:toggle-attach', attachSpy);
    element.addEventListener('cw:toggle-emoji', emojiSpy);
    element.addEventListener('cw:send', sendSpy);
    element.inputBorderRadius = 16;
    element.sendIconType = 'arrow';
    element.draft = 'Enter test';

    await element.updateComplete;

    const buttons = element.shadowRoot?.querySelectorAll('cw-button');
    buttons?.[0]?.click(); // Attach
    expect(attachSpy).toHaveBeenCalled();

    buttons?.[1]?.click(); // Emoji
    expect(emojiSpy).toHaveBeenCalled();

    element.focusInput();

    const textarea = element.shadowRoot?.querySelector('textarea') as HTMLTextAreaElement;
    textarea.dispatchEvent(new Event('focus'));
    await element.updateComplete;

    textarea.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', shiftKey: true }));
    expect(sendSpy).not.toHaveBeenCalled();

    textarea.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', shiftKey: false }));
    expect(sendSpy).toHaveBeenCalledWith(expect.objectContaining({ detail: 'Enter test' }));

    textarea.dispatchEvent(new Event('blur'));
    await element.updateComplete;
  });
});
