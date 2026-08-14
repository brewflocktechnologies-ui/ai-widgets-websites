import { describe, it, expect, beforeEach } from 'vitest';
import '../../../components/atoms/cw-icon.js';
import { CwIcon } from '../../../components/atoms/cw-icon.js';

describe('CwIcon Atom Component', () => {
  let element: CwIcon;

  beforeEach(async () => {
    document.body.innerHTML = '';
    element = new CwIcon();
    document.body.appendChild(element);
    await element.updateComplete;
  });

  it('should instantiate and mount cw-icon element', () => {
    expect(element).toBeDefined();
    expect(element.tagName.toLowerCase()).toBe('cw-icon');
  });

  it('should render correct SVG for named icon', async () => {
    element.name = 'Sparkles';
    element.size = 28;
    element.color = '#0b5fff';
    await element.updateComplete;

    const svg = element.shadowRoot?.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute('width')).toBe('28');
    expect(svg?.getAttribute('height')).toBe('28');
  });

  it('should support custom inline SVG string rendering', async () => {
    element.customSvg = '<svg class="custom-test"><circle cx="12" cy="12" r="10"></circle></svg>';
    await element.updateComplete;

    const customDiv = element.shadowRoot?.querySelector('.custom-svg');
    expect(customDiv).not.toBeNull();
    expect(customDiv?.innerHTML).toContain('custom-test');
  });
});
