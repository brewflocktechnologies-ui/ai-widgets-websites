import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../../../components/organisms/cw-greet-window.js';
import { CwGreetWindow } from '../../../components/organisms/cw-greet-window.js';

describe('CwGreetWindow Organism Component', () => {
  let element: CwGreetWindow;

  beforeEach(async () => {
    document.body.innerHTML = '';
    element = new CwGreetWindow();
    element.config = {
      enabled: true,
      dismissed: false,
      visible: true,
      useWebsiteTheme: false,
      width: 320,
      spacing: 16,
      backgroundColor: '#ffffff',
      borderRadius: 16,
      padding: '24px 20px',
      boxShadow: '0 12px 28px rgba(0,0,0,0.15)',
      imageUrl: '',
      imageHeight: 70,
      imageWidth: '',
      iconAlign: 'center',
      imagePadding: '0px',
      iconType: 'lucide',
      lucideIcon: 'Sparkles',
      iconSize: 52,
      iconColor: '#0b5fff',
      iconAnimation: 'wiggle',
      iconAnimationDuration: '2.5s',
      title: 'Hi there! 👋 How can we help?',
      titleColor: '#1e293b',
      titleFontSize: '15px',
      description: 'Let us chat!',
      descriptionColor: '#475569',
      descriptionFontSize: '14px',
    };
    element.visible = true;
    element.panelOpen = false;
    element.dismissed = false;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  it('should instantiate and mount cw-greet-window element', () => {
    expect(element).toBeDefined();
    expect(element.tagName.toLowerCase()).toBe('cw-greet-window');
  });

  it('should render title and description when visible and not dismissed', async () => {
    element.visible = true;
    await element.updateComplete;

    const title = element.shadowRoot?.querySelector('h3');
    expect(title?.textContent?.trim()).toContain('Hi there!');
  });

  it('should dispatch cw:greet-dismiss on close button click and cw:toggle on card click', async () => {
    element.visible = true;
    const dismissSpy = vi.fn();
    const toggleSpy = vi.fn();

    element.addEventListener('cw:greet-dismiss', dismissSpy);
    element.addEventListener('cw:toggle', toggleSpy);
    await element.updateComplete;

    const closeBtn = element.shadowRoot?.querySelector('cw-button[label="Close greet window"]') as HTMLElement;
    closeBtn?.click();
    expect(dismissSpy).toHaveBeenCalled();

    const card = element.shadowRoot?.querySelector('.greet-card') as HTMLElement;
    card?.click();
    expect(toggleSpy).toHaveBeenCalled();
  });

  it('renders image URL and input box when configured', async () => {
    element.config = {
      ...element.config!,
      imageUrl: 'http://example.com/greet.png',
      inputBox: { enabled: true, placeholder: 'Reply here' },
    };
    element.visible = true;
    await element.updateComplete;

    expect(element.shadowRoot?.querySelector('img')).not.toBeNull();
    expect(element.shadowRoot?.querySelector('cw-greet-input')).not.toBeNull();
  });
});
