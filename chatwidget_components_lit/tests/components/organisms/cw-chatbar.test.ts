import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../../../components/organisms/cw-chatbar.js';
import { CwChatbar } from '../../../components/organisms/cw-chatbar.js';

describe('CwChatbar Organism Component', () => {
  let element: CwChatbar;

  beforeEach(async () => {
    document.body.innerHTML = '';
    element = new CwChatbar();
    element.config = {
      enabled: true,
      useWebsiteTheme: true,
      position: 'bottom-right',
      offsetLeft: 16,
      offsetRight: 16,
      offsetBottom: 16,
      text: 'Talk with us',
      barText: 'Talk with us',
      bgColor: '#0b5fff',
      textColor: '#ffffff',
      textSize: 14,
      letterSpacing: 0,
      gradientEnabled: false,
      gradientStops: [],
      gradientType: 'linear',
      gradientAngle: 135,
      iconType: 'lucide',
      iconColor: '#ffffff',
      lucideIcon: 'MessageSquare',
      iconImageUrl: '',
      iconFit: 'contain',
      iconOpacity: 1,
      iconBlend: 'normal',
      iconWidth: 20,
      iconHeight: 20,
      width: 180,
      height: 48,
      shadow: true,
      borderRadius: 24,
      hideOnOpen: false,
    };
    document.body.appendChild(element);
    await element.updateComplete;
  });

  it('should instantiate and mount cw-chatbar element', () => {
    expect(element).toBeDefined();
    expect(element.tagName.toLowerCase()).toBe('cw-chatbar');
  });

  it('should dispatch cw:toggle event when clicked or keydown Enter/Space', async () => {
    const spy = vi.fn();
    element.addEventListener('cw:toggle', spy);
    const wrapper = element.shadowRoot?.querySelector('.chatbar-wrapper') as HTMLElement;
    wrapper?.click();
    expect(spy).toHaveBeenCalled();

    wrapper?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(spy).toHaveBeenCalledTimes(2);

    wrapper?.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    expect(spy).toHaveBeenCalledTimes(3);
  });

  it('handles hover states (mouseenter, mouseleave)', async () => {
    const wrapper = element.shadowRoot?.querySelector('.chatbar-wrapper') as HTMLElement;
    wrapper.dispatchEvent(new Event('mouseenter'));
    await element.updateComplete;

    wrapper.dispatchEvent(new Event('mouseleave'));
    await element.updateComplete;
  });

  it('renders image and customSvg in bar layout with unread badge', async () => {
    element.config = {
      ...element.config!,
      layout: 'bar',
      iconType: 'image',
      iconImageUrl: 'http://example.com/icon.png',
    };
    element.unreadCount = 3;
    await element.updateComplete;

    expect(element.shadowRoot?.querySelector('img')).not.toBeNull();
    expect(element.shadowRoot?.querySelector('cw-badge')).not.toBeNull();

    element.config = {
      ...element.config!,
      layout: 'bar',
      iconType: 'customSvg',
      customSvg: '<svg></svg>',
    };
    await element.updateComplete;
    expect(element.shadowRoot?.querySelector('cw-icon')).not.toBeNull();
  });

  it('renders card layout and handles different icon types (image, customSvg, lucide)', async () => {
    element.config = {
      ...element.config!,
      layout: 'card',
      cardText: 'Any questions?',
      buttonText: 'Start Chat',
      iconType: 'image',
      iconImageUrl: 'http://example.com/icon.png',
    };
    element.unreadCount = 2;
    await element.updateComplete;

    expect(element.shadowRoot?.querySelector('.card-layout')).not.toBeNull();
    expect(element.shadowRoot?.querySelector('cw-badge')).not.toBeNull();

    element.config = {
      ...element.config!,
      layout: 'card',
      iconType: 'customSvg',
      customSvg: '<svg></svg>',
    };
    await element.updateComplete;
    expect(element.shadowRoot?.querySelector('cw-icon')).not.toBeNull();
  });
});
