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

  it('should dispatch cw:greet-dismiss on close button click', async () => {
    element.visible = true;
    const spy = vi.fn();
    element.addEventListener('cw:greet-dismiss', spy);
    await element.updateComplete;

    const closeBtn = element.shadowRoot?.querySelector('cw-button[label="Close greet window"]') as HTMLElement;
    closeBtn?.click();

    expect(spy).toHaveBeenCalled();
  });
});
