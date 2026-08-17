import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../../../components/molecules/cw-message-bubble.js';
import { CwMessageBubble } from '../../../components/molecules/cw-message-bubble.js';

describe('CwMessageBubble Molecule Component', () => {
  let element: CwMessageBubble;

  beforeEach(async () => {
    document.body.innerHTML = '';
    element = new CwMessageBubble();
    document.body.appendChild(element);
    await element.updateComplete;
  });

  it('should instantiate and mount cw-message-bubble element', () => {
    expect(element).toBeDefined();
    expect(element.tagName.toLowerCase()).toBe('cw-message-bubble');
  });

  it('should render visitor message bubble text', async () => {
    element.message = {
      key: '1',
      senderType: 'VISITOR',
      body: 'Hello support team',
      created: new Date().toISOString(),
    };
    await element.updateComplete;

    const span = element.shadowRoot?.querySelector('.bubble span');
    expect(span).not.toBeNull();
    expect(span?.textContent?.trim()).toBe('Hello support team');
  });

  it('should render agent message bubble text and avatar', async () => {
    element.message = {
      key: '2',
      senderType: 'AGENT',
      senderName: 'Sarah',
      body: 'Hi! How can I help?',
      created: new Date().toISOString(),
    };
    element.agentName = 'Sarah';
    await element.updateComplete;

    const span = element.shadowRoot?.querySelector('.bubble span');
    expect(span).not.toBeNull();
    expect(span?.textContent?.trim()).toBe('Hi! How can I help?');
  });

  it('should render image attachment and handle click to open full image', async () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);

    element.message = {
      key: '3',
      senderType: 'VISITOR',
      body: '',
      attachment: true,
      localUrl: 'blob:http://localhost/test-image.png',
      pending: false,
    };
    await element.updateComplete;

    const img = element.shadowRoot?.querySelector('.bubble-img') as HTMLImageElement;
    expect(img).not.toBeNull();
    img.click();

    expect(openSpy).toHaveBeenCalledWith('blob:http://localhost/test-image.png', '_blank');
  });
});
