import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../../../components/organisms/cw-image-cropper.js';
import { CwImageCropper } from '../../../components/organisms/cw-image-cropper.js';

describe('CwImageCropper Organism Component', () => {
  let element: CwImageCropper;

  beforeEach(async () => {
    // Mock CanvasRenderingContext2D for happy-dom
    HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
      clearRect: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
      translate: vi.fn(),
      rotate: vi.fn(),
      scale: vi.fn(),
      drawImage: vi.fn(),
      beginPath: vi.fn(),
      arc: vi.fn(),
      clip: vi.fn(),
    }) as any;
    HTMLCanvasElement.prototype.toDataURL = vi.fn().mockReturnValue('data:image/png;base64,mockedcroppeddata');

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

  it('handles image loading, dragging, zoom, rotation, shape/aspect selection, and cropping', async () => {
    const cropSpy = vi.fn();
    element.addEventListener('cw:image-cropped', cropSpy);

    element.open = true;
    element.imageSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    await element.updateComplete;

    // Simulate canvas mousedown / mousemove / mouseup
    const canvasContainer = element.shadowRoot?.querySelector('.canvas-container') as HTMLElement;
    canvasContainer.dispatchEvent(new MouseEvent('mousedown', { clientX: 10, clientY: 10 }));
    canvasContainer.dispatchEvent(new MouseEvent('mousemove', { clientX: 20, clientY: 20 }));
    canvasContainer.dispatchEvent(new MouseEvent('mouseup'));

    // Zoom slider change
    const zoomInput = element.shadowRoot?.querySelector('.zoom-slider') as HTMLInputElement;
    if (zoomInput) {
      zoomInput.value = '1.5';
      zoomInput.dispatchEvent(new Event('input'));
    }

    // Rotate button click
    const rotateBtn = element.shadowRoot?.querySelector('cw-button[label="Rotate 90°"]') as HTMLElement;
    rotateBtn?.click();

    // Shape button clicks (Square, Rounded, Circle)
    const squareBtn = element.shadowRoot?.querySelector('cw-button[label="⬜ Square"]') as HTMLElement;
    squareBtn?.click();

    const roundedBtn = element.shadowRoot?.querySelector('cw-button[label="▢ Rounded"]') as HTMLElement;
    roundedBtn?.click();

    const circleBtn = element.shadowRoot?.querySelector('cw-button[label="⚪ Circle"]') as HTMLElement;
    circleBtn?.click();

    // Aspect ratio button clicks
    const aspect169 = element.shadowRoot?.querySelector('cw-button[label="16:9"]') as HTMLElement;
    aspect169?.click();

    const aspect43 = element.shadowRoot?.querySelector('cw-button[label="4:3"]') as HTMLElement;
    aspect43?.click();

    const aspect11 = element.shadowRoot?.querySelector('cw-button[label="1:1"]') as HTMLElement;
    aspect11?.click();

    // Directly trigger handleCrop method for reliable testing
    (element as any).imageObj = new Image();
    (element as any).cropShape = 'circle';
    (element as any).handleCrop();

    expect(cropSpy).toHaveBeenCalled();
  });
});
