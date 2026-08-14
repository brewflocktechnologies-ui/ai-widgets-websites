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

  it('should dispatch cw:toggle event when clicked', async () => {
    const spy = vi.fn();
    element.addEventListener('cw:toggle', spy);
    const wrapper = element.shadowRoot?.querySelector('.chatbar-wrapper') as HTMLElement;
    wrapper?.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should render bar layout text', async () => {
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
    await element.updateComplete;

    const wrapper = element.shadowRoot?.querySelector('.chatbar-wrapper');
    expect(wrapper?.textContent?.trim()).toContain('Talk with us');
  });
});
