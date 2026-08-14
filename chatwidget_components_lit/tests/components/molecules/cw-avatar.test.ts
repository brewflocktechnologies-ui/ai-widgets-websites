import { describe, it, expect, beforeEach } from 'vitest';
import '../../../components/molecules/cw-avatar.js';
import { CwAvatar } from '../../../components/molecules/cw-avatar.js';

describe('CwAvatar Molecule Component', () => {
  let element: CwAvatar;

  beforeEach(async () => {
    document.body.innerHTML = '';
    element = new CwAvatar();
    document.body.appendChild(element);
    await element.updateComplete;
  });

  it('should instantiate and mount cw-avatar element', () => {
    expect(element).toBeDefined();
    expect(element.tagName.toLowerCase()).toBe('cw-avatar');
  });

  it('should render initial letter when imageUrl is empty', async () => {
    element.name = 'Sarah';
    await element.updateComplete;

    const span = element.shadowRoot?.querySelector('.avatar-box span');
    expect(span?.textContent?.trim()).toBe('S');
  });

  it('should render image element when src or imageUrl is provided', async () => {
    element.name = 'Sarah';
    element.imageUrl = 'https://example.com/avatar.jpg';
    await element.updateComplete;

    const img = element.shadowRoot?.querySelector('img.avatar-img');
    expect(img).not.toBeNull();
    expect(img?.getAttribute('src')).toBe('https://example.com/avatar.jpg');
  });

  it('should render online status dot when showOnlineDot is true', async () => {
    element.showOnlineDot = true;
    await element.updateComplete;

    const dot = element.shadowRoot?.querySelector('cw-status-dot');
    expect(dot).not.toBeNull();
  });
});
