import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../../../components/organisms/cw-image-cropper.js';
import { CwImageCropper } from '../../../components/organisms/cw-image-cropper.js';

describe('CwImageCropper Organism Component', () => {
  let element: CwImageCropper;

  beforeEach(async () => {
    document.body.innerHTML = '';
    element = new CwImageCropper();
    document.body.appendChild(element);
    await element.updateComplete;
  });

  it('should instantiate and mount cw-image-cropper element', () => {
    expect(element).toBeDefined();
    expect(element.tagName.toLowerCase()).toBe('cw-image-cropper');
  });

  it('should render modal dialog when open is true', async () => {
    element.open = true;
    element.titleText = 'Crop Image Test';
    await element.updateComplete;

    const modal = element.shadowRoot?.querySelector('.modal-backdrop');
    expect(modal).not.toBeNull();

    const title = element.shadowRoot?.querySelector('h3');
    expect(title?.textContent?.trim()).toContain('Crop Image Test');
  });

  it('should dispatch cw:close on cancel button click', async () => {
    element.open = true;
    const spy = vi.fn();
    element.addEventListener('cw:close', spy);
    await element.updateComplete;

    const cancelBtn = element.shadowRoot?.querySelector('cw-button[variant="secondary"]') as HTMLElement;
    cancelBtn?.click();

    expect(spy).toHaveBeenCalled();
  });
});
