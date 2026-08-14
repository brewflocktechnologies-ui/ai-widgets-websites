import { describe, it, expect, beforeEach } from 'vitest';
import '../../../components/atoms/cw-badge.js';
import { CwBadge } from '../../../components/atoms/cw-badge.js';

describe('CwBadge Atom Component', () => {
  let element: CwBadge;

  beforeEach(async () => {
    document.body.innerHTML = '';
    element = new CwBadge();
    document.body.appendChild(element);
    await element.updateComplete;
  });

  it('should instantiate and mount cw-badge element', () => {
    expect(element).toBeDefined();
    expect(element.tagName.toLowerCase()).toBe('cw-badge');
  });

  it('should render empty when count is 0 or negative', async () => {
    element.count = 0;
    await element.updateComplete;
    expect(element.shadowRoot?.querySelector('.badge')).toBeNull();

    element.count = -2;
    await element.updateComplete;
    expect(element.shadowRoot?.querySelector('.badge')).toBeNull();
  });

  it('should render count badge when count > 0', async () => {
    element.count = 5;
    await element.updateComplete;
    const badge = element.shadowRoot?.querySelector('.badge');
    expect(badge).not.toBeNull();
    expect(badge?.textContent?.trim()).toBe('5');
  });

  it('should apply badge positioning and styles', async () => {
    element.count = 3;
    element.position = 'top-right';
    element.backgroundColor = '#ef4444';
    await element.updateComplete;

    const badge = element.shadowRoot?.querySelector('.badge') as HTMLElement;
    expect(badge).not.toBeNull();
    expect(badge.getAttribute('style')).toContain('background-color: #ef4444');
  });
});
