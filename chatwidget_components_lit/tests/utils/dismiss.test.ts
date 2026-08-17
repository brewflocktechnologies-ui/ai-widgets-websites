import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { DismissController } from '../../utils/dismiss.js';
import { LitElement } from 'lit';

class TestDismissElement extends LitElement {
  onDismissCallback = vi.fn();
  enabledState = true;

  controller = new DismissController(this, {
    onDismiss: (e) => this.onDismissCallback(e),
    enabled: () => this.enabledState,
  });
}

class TestDismissEventElement extends LitElement {
  controller = new DismissController(this, {
    eventName: 'custom-dismiss',
    enabled: true,
  });
}

if (!customElements.get('test-dismiss-element')) {
  customElements.define('test-dismiss-element', TestDismissElement);
}
if (!customElements.get('test-dismiss-event-element')) {
  customElements.define('test-dismiss-event-element', TestDismissEventElement);
}

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

  it('should invoke onDismiss callback on outside pointerdown when enabled', async () => {
    await new Promise((resolve) => requestAnimationFrame(resolve));

    const outsideDiv = document.createElement('div');
    document.body.appendChild(outsideDiv);

    outsideDiv.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, composed: true }));

    expect(element.onDismissCallback).toHaveBeenCalled();
  });

  it('should dispatch custom event when onDismiss is omitted', async () => {
    const eventElement = new TestDismissEventElement();
    document.body.appendChild(eventElement);
    await eventElement.updateComplete;

    await new Promise((resolve) => requestAnimationFrame(resolve));

    const listener = vi.fn();
    eventElement.addEventListener('custom-dismiss', listener);

    const outsideDiv = document.createElement('div');
    document.body.appendChild(outsideDiv);

    outsideDiv.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, composed: true }));

    expect(listener).toHaveBeenCalled();
  });

  it('should not invoke callback when disabled', async () => {
    await new Promise((resolve) => requestAnimationFrame(resolve));
    element.enabledState = false;

    const outsideDiv = document.createElement('div');
    document.body.appendChild(outsideDiv);

    outsideDiv.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, composed: true }));

    expect(element.onDismissCallback).not.toHaveBeenCalled();
  });

  it('should remove listener on hostDisconnected', async () => {
    await new Promise((resolve) => requestAnimationFrame(resolve));

    element.remove();
    element.controller.hostDisconnected();

    const outsideDiv = document.createElement('div');
    document.body.appendChild(outsideDiv);

    outsideDiv.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, composed: true }));
  });
});
