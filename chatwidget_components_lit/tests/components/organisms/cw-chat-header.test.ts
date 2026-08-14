import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../../../components/organisms/cw-chat-header.js';
import { CwChatHeader } from '../../../components/organisms/cw-chat-header.js';

describe('CwChatHeader Organism Component', () => {
  let element: CwChatHeader;

  beforeEach(async () => {
    document.body.innerHTML = '';
    element = new CwChatHeader();
    document.body.appendChild(element);
    await element.updateComplete;
  });

  it('should instantiate and mount cw-chat-header element', () => {
    expect(element).toBeDefined();
    expect(element.tagName.toLowerCase()).toBe('cw-chat-header');
  });

  it('should render agent & client title text', async () => {
    element.clientName = 'Acme Corp';
    element.agentName = 'Sarah';
    await element.updateComplete;

    const title = element.shadowRoot?.querySelector('.title-text');
    expect(title?.textContent?.trim()).toContain('Acme Corp');
  });

  it('should dispatch cw:close-panel event on close button click', async () => {
    const spy = vi.fn();
    element.addEventListener('cw:close-panel', spy);
    await element.updateComplete;

    const closeBtn = element.shadowRoot?.querySelector('cw-button[label="Minimize chat panel"]') as HTMLElement;
    closeBtn?.click();

    expect(spy).toHaveBeenCalled();
  });
});
