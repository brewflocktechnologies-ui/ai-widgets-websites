import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../../../components/organisms/cw-bubble.js';
import { CwBubble } from '../../../components/organisms/cw-bubble.js';

describe('CwBubble Organism Component', () => {
  let element: CwBubble;

  beforeEach(async () => {
    document.body.innerHTML = '';
    element = new CwBubble();
    element.config = {
      useWebsiteTheme: true,
      position: 'bottom-right',
      offsetLeft: 16,
      offsetRight: 16,
      offsetBottom: 16,
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#0b5fff',
      gradientType: 'none',
      gradientStops: [],
      backgroundOverlayType: 'none',
      backgroundImageUrl: '',
      backgroundImageSize: 'cover',
      backgroundImageOpacity: 1,
      backgroundBlendMode: 'normal',
      border: { width: 0, color: '', style: 'none' },
      outlineRing: { enabled: false, width: 0, color: '', opacity: 1 },
      boxShadowBlur: 10,
      boxShadowSpread: 0,
      boxShadowOffsetX: 0,
      boxShadowOffsetY: 4,
      boxShadowOpacity: 0.15,
      dots: { color: '#ffffff', size: 6, spacing: 4, animation: 'bounce' },
      hideOnOpen: true,
    };
    document.body.appendChild(element);
    await element.updateComplete;
  });

  it('should instantiate and mount cw-bubble element', () => {
    expect(element).toBeDefined();
    expect(element.tagName.toLowerCase()).toBe('cw-bubble');
  });

  it('should dispatch cw:toggle event when clicked', async () => {
    const spy = vi.fn();
    element.addEventListener('cw:toggle', spy);
    const wrapper = element.shadowRoot?.querySelector('.bubble-wrapper') as HTMLElement;
    wrapper?.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should render unread count badge when unreadCount > 0', async () => {
    element.config = {
      useWebsiteTheme: true,
      position: 'bottom-right',
      offsetLeft: 16,
      offsetRight: 16,
      offsetBottom: 16,
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#0b5fff',
      gradientType: 'none',
      gradientStops: [],
      backgroundOverlayType: 'none',
      backgroundImageUrl: '',
      backgroundImageSize: 'cover',
      backgroundImageOpacity: 1,
      backgroundBlendMode: 'normal',
      border: { width: 0, color: '', style: 'none' },
      outlineRing: { enabled: false, width: 0, color: '', opacity: 1 },
      boxShadowBlur: 10,
      boxShadowSpread: 0,
      boxShadowOffsetX: 0,
      boxShadowOffsetY: 4,
      boxShadowOpacity: 0.15,
      dots: { color: '#ffffff', size: 6, spacing: 4, animation: 'bounce' },
      hideOnOpen: true,
    };
    element.unreadCount = 4;
    element.panelOpen = false;
    await element.updateComplete;

    const badge = element.shadowRoot?.querySelector('cw-badge');
    expect(badge).not.toBeNull();
  });
});
