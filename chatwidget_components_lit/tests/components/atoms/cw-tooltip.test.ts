import { describe, it, expect, beforeEach } from 'vitest';
import '../../../components/atoms/cw-tooltip.js';
import { CwTooltip } from '../../../components/atoms/cw-tooltip.js';

describe('CwTooltip Atom Component', () => {
  let element: CwTooltip;

  beforeEach(async () => {
    document.body.innerHTML = '';
    element = new CwTooltip();
    document.body.appendChild(element);
    await element.updateComplete;
  });

  it('should instantiate and mount cw-tooltip element', () => {
    expect(element).toBeDefined();
    expect(element.tagName.toLowerCase()).toBe('cw-tooltip');
  });

  it('should render tooltip text and arrow when visible', async () => {
    element.text = 'Need help?';
    element.visible = true;
    element.position = 'right';
    await element.updateComplete;

    const box = element.shadowRoot?.querySelector('.tooltip-box');
    expect(box).not.toBeNull();
    expect(box?.textContent?.trim()).toContain('Need help?');

    const arrow = element.shadowRoot?.querySelector('.tooltip-arrow');
    expect(arrow).not.toBeNull();
  });

  it('should hide tooltip when visible is false', async () => {
    element.visible = false;
    await element.updateComplete;

    const box = element.shadowRoot?.querySelector('.tooltip-box');
    expect(box).toBeNull();
  });
});
