import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../../../components/molecules/cw-emoji-picker.js';
import { CwEmojiPicker } from '../../../components/molecules/cw-emoji-picker.js';

describe('CwEmojiPicker Molecule Component', () => {
  let element: CwEmojiPicker;

  beforeEach(async () => {
    document.body.innerHTML = '';
    element = new CwEmojiPicker();
    document.body.appendChild(element);
    await element.updateComplete;
  });

  it('should instantiate and mount cw-emoji-picker element', () => {
    expect(element).toBeDefined();
    expect(element.tagName.toLowerCase()).toBe('cw-emoji-picker');
  });

  it('should render default emoji buttons', () => {
    const btns = element.shadowRoot?.querySelectorAll('.emoji-btn');
    expect(btns).not.toBeNull();
    expect(btns?.length).toBeGreaterThan(5);
  });

  it('should dispatch cw:insert-emoji with selected emoji on click', () => {
    const spy = vi.fn();
    element.addEventListener('cw:insert-emoji', spy);

    const firstBtn = element.shadowRoot?.querySelector('.emoji-btn') as HTMLElement;
    firstBtn?.click();

    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].detail).toBeDefined();
  });
});
