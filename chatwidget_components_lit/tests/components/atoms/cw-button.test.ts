import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../../../components/atoms/cw-button.js';
import { CwButton } from '../../../components/atoms/cw-button.js';

describe('CwButton Atom Component', () => {
  let element: CwButton;

  beforeEach(async () => {
    document.body.innerHTML = '';
    element = new CwButton();
    document.body.appendChild(element);
    await element.updateComplete;
  });

  it('should instantiate and mount cw-button element', () => {
    expect(element).toBeDefined();
    expect(element.tagName.toLowerCase()).toBe('cw-button');
  });

  it('should render label text and handle variant / size classes', async () => {
    element.label = 'Send Message';
    element.variant = 'primary';
    element.size = 'lg';
    await element.updateComplete;

    const btn = element.shadowRoot?.querySelector('button');
    expect(btn).not.toBeNull();
    expect(btn?.classList.contains('variant-primary')).toBe(true);
    expect(btn?.classList.contains('size-lg')).toBe(true);
    expect(btn?.textContent?.trim()).toContain('Send Message');
  });

  it('should support disabled state', async () => {
    element.disabled = true;
    await element.updateComplete;

    const btn = element.shadowRoot?.querySelector('button');
    expect(btn?.hasAttribute('disabled')).toBe(true);
  });

  it('should render icon when icon property is set', async () => {
    element.icon = 'Send';
    element.label = 'Submit';
    await element.updateComplete;

    const icon = element.shadowRoot?.querySelector('cw-icon');
    expect(icon).not.toBeNull();
  });
});
