import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { DismissController } from '../../utils/dismiss.js';
import { LitElement } from 'lit';

class TestDismissElement extends LitElement {
  controller = new DismissController(this, {
    eventName: 'test-dismiss',
  });
}
customElements.define('test-dismiss-element', TestDismissElement);

describe('utils/dismiss.ts', () => {
  let element: TestDismissElement;

  beforeEach(async () => {
    document.body.innerHTML = '';
    element = new TestDismissElement();
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should instantiate DismissController on Lit element host', () => {
    expect(element.controller).toBeDefined();
  });

  it('should dispatch dismiss event on outside pointerdown', async () => {
    const spy = vi.fn();
    element.addEventListener('test-dismiss', spy);

    // Wait for rAF listener attachment
    await new Promise((resolve) => requestAnimationFrame(resolve));

    const outsideDiv = document.createElement('div');
    document.body.appendChild(outsideDiv);

    outsideDiv.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, composed: true }));

    expect(spy).toHaveBeenCalled();
  });
});
