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
});
