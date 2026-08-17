import { describe, it, expect, beforeEach } from 'vitest';
import '../../../components/templates/cw-widget-layout.js';
import { CwWidgetLayout } from '../../../components/templates/cw-widget-layout.js';

describe('CwWidgetLayout Template Component', () => {
  let element: CwWidgetLayout;

  beforeEach(async () => {
    document.body.innerHTML = '';
    element = new CwWidgetLayout();
    document.body.appendChild(element);
    await element.updateComplete;
  });

  it('should instantiate and mount cw-widget-layout element', () => {
    expect(element).toBeDefined();
    expect(element.tagName.toLowerCase()).toBe('cw-widget-layout');
  });

  it('should render default bubble, greet window, and chat panel slots', async () => {
    element.activeTrigger = 'bubble';
    element.bubbleConfig = { enabled: true, hideOnOpen: true };
    await element.updateComplete;

    const bubbleSlot = element.shadowRoot?.querySelector('slot[name="trigger"]');
    expect(bubbleSlot).not.toBeNull();

    const greetSlot = element.shadowRoot?.querySelector('slot[name="greet"]');
    expect(greetSlot).not.toBeNull();

    const panelSlot = element.shadowRoot?.querySelector('slot[name="panel"]');
    expect(panelSlot).not.toBeNull();
  });

  it('handles chatcard activeTrigger and hideOnOpen false stacking math', async () => {
    element.activeTrigger = 'chatcard';
    element.chatbarConfig = { enabled: true, cardOffsetRight: 20, hideOnOpen: false, stackGap: 10 };
    element.chatWindowConfig = { offsetBottom: 10, offsetRight: 10 };
    await element.updateComplete;

    const chatbar = element.shadowRoot?.querySelector('cw-chatbar');
    expect(chatbar).not.toBeNull();

    element.activeTrigger = 'bubble';
    element.bubbleConfig = { hideOnOpen: false, stackGap: 10 };
    await element.updateComplete;
    expect(element.shadowRoot?.querySelector('cw-bubble')).not.toBeNull();
  });

  it('should render chatbar component in trigger slot when activeTrigger is chatbar', async () => {
    element.activeTrigger = 'chatbar';
    element.chatbarConfig = { enabled: true, text: 'Help' };
    await element.updateComplete;

    const chatbar = element.shadowRoot?.querySelector('cw-chatbar');
    expect(chatbar).not.toBeNull();
  });
});
