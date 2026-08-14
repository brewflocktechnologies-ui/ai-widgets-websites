import { describe, it, expect, beforeEach } from 'vitest';
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
  });
});
