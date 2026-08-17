import { describe, it, expect, beforeEach } from 'vitest';
import '../../../components/molecules/cw-welcome-hero.js';
import { CwWelcomeHero } from '../../../components/molecules/cw-welcome-hero.js';

describe('CwWelcomeHero Molecule Component', () => {
  let element: CwWelcomeHero;

  beforeEach(async () => {
    document.body.innerHTML = '';
    element = new CwWelcomeHero();
    document.body.appendChild(element);
    await element.updateComplete;
  });

  it('should instantiate and mount cw-welcome-hero element', () => {
    expect(element).toBeDefined();
    expect(element.tagName.toLowerCase()).toBe('cw-welcome-hero');
  });

  it('should render title, description, and team avatars', async () => {
    element.config = {
      title: 'Hi there! 👋 How can we help?',
      description: 'Our support team is online.',
      avatars: [
        'http://example.com/avatar1.png',
        { url: 'http://example.com/avatar2.png', name: 'Alex' },
      ],
    };
    element.isGlassy = true;
    await element.updateComplete;

    const title = element.shadowRoot?.querySelector('.welcome-title');
    expect(title?.textContent?.trim()).toContain('Hi there!');

    const desc = element.shadowRoot?.querySelector('.welcome-desc');
    expect(desc?.textContent?.trim()).toContain('Our support team is online.');

    const avatars = element.shadowRoot?.querySelectorAll('cw-avatar');
    expect(avatars?.length).toBe(2);
  });

  it('renders logoOnly layout', async () => {
    element.logoOnly = true;
    element.config = { logoUrl: 'http://example.com/logo.png', logoAlt: 'Logo' };
    await element.updateComplete;

    const img = element.shadowRoot?.querySelector('.logo-img');
    expect(img).not.toBeNull();
  });
});
