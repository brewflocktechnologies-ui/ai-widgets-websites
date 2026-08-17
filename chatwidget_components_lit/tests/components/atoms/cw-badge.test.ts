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

  it('should apply badge positioning for top-left, bottom-right, bottom-left, relative', async () => {
    element.count = 3;
    element.position = 'top-left';
    element.animation = 'bounce';
    element.borderRadius = 8;
    await element.updateComplete;

    let badge = element.shadowRoot?.querySelector('.badge') as HTMLElement;
    expect(badge.getAttribute('style')).toContain('top: -6px');

    element.position = 'bottom-right';
    element.animation = 'wiggle';
    await element.updateComplete;
    badge = element.shadowRoot?.querySelector('.badge') as HTMLElement;
    expect(badge.getAttribute('style')).toContain('bottom: -6px');

    element.position = 'bottom-left';
    element.animation = 'pulse';
    await element.updateComplete;
    badge = element.shadowRoot?.querySelector('.badge') as HTMLElement;
    expect(badge.getAttribute('style')).toContain('bottom: -6px');

    element.position = 'relative';
    await element.updateComplete;
    badge = element.shadowRoot?.querySelector('.badge') as HTMLElement;
    expect(badge.getAttribute('style')).toContain('position: relative');
  });

  it('handles animation replacement strings for custom-pulse, my-bounce, super-wiggle', async () => {
    element.count = 2;
    element.animation = 'custom-pulse 2s';
    await element.updateComplete;
    let badge = element.shadowRoot?.querySelector('.badge') as HTMLElement;
    expect(badge.getAttribute('style')).toContain('badgePulse');

    element.animation = 'my-bounce 1s';
    await element.updateComplete;
    badge = element.shadowRoot?.querySelector('.badge') as HTMLElement;
    expect(badge.getAttribute('style')).toContain('badgeBounce');

    element.animation = 'super-wiggle 3s';
    await element.updateComplete;
    badge = element.shadowRoot?.querySelector('.badge') as HTMLElement;
    expect(badge.getAttribute('style')).toContain('badgeWiggle');
  });

  it('should fallback to config properties when available', async () => {
    element.count = 1;
    element.config = {
      position: 'top-left',
      animation: 'wiggle',
      borderRadius: 12,
      borderWidth: 1,
      padding: '2px',
    };
    await element.updateComplete;

    const badge = element.shadowRoot?.querySelector('.badge') as HTMLElement;
    expect(badge.getAttribute('style')).toContain('border-radius: 12px');
  });
});
