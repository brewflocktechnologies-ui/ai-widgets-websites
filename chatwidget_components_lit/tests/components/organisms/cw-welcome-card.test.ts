import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../../../components/organisms/cw-welcome-card.js';
import { CwWelcomeCard } from '../../../components/organisms/cw-welcome-card.js';

describe('CwWelcomeCard Organism Component', () => {
  let element: CwWelcomeCard;

  beforeEach(async () => {
    document.body.innerHTML = '';
    element = new CwWelcomeCard();
    element.config = {
      enabled: true,
      title: 'Welcome 👋',
      description: 'How can we help today?',
      buttonText: 'Start Conversation',
      footerPaddingBottom: '10px',
    };
    document.body.appendChild(element);
    await element.updateComplete;
  });

  it('should instantiate and mount cw-welcome-card element', () => {
    expect(element).toBeDefined();
    expect(element.tagName.toLowerCase()).toBe('cw-welcome-card');
  });

  it('should render welcome hero and welcome cta components', () => {
    const hero = element.shadowRoot?.querySelector('cw-welcome-hero');
    expect(hero).not.toBeNull();

    const cta = element.shadowRoot?.querySelector('cw-welcome-cta');
    expect(cta).not.toBeNull();

    const footer = element.shadowRoot?.querySelector('.footer-brand') as HTMLElement;
    expect(footer?.style.paddingBottom).toBe('10px');
  });

  it('dispatches cw:close-panel on close button click', async () => {
    const spy = vi.fn();
    element.addEventListener('cw:close-panel', spy);

    const closeBtn = element.shadowRoot?.querySelector('.close-btn-wrapper') as HTMLElement;
    closeBtn?.click();

    expect(spy).toHaveBeenCalled();
  });

  it('renders glassy card layout', async () => {
    element.config = {
      ...element.config!,
      cardLayout: 'glassy',
      cardAlign: 'center',
    };
    await element.updateComplete;

    expect(element.shadowRoot?.querySelector('.glassy-container')).not.toBeNull();
  });
});
