import { html } from 'lit';
import '../../components/molecules/cw-image-cropper.js';

export default {
  title: 'Molecules/ImageCropper',
  component: 'cw-image-cropper',
  argTypes: {
    open: { control: 'boolean' },
    imageSrc: { control: 'text' },
    titleText: { control: 'text' },
    cropShape: { control: 'select', options: ['circle', 'square', 'rounded'] },
    primaryColor: { control: 'color' },
    cancelText: { control: 'text' },
    applyText: { control: 'text' },
    showRotate: { control: 'boolean' },
    showAspectPills: { control: 'boolean' },
    exportSize: { control: { type: 'number', min: 100, max: 800, step: 50 } },
  },
};

const sampleImage = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80';

export const ConfigurableCropperModal = {
  args: {
    open: true,
    imageSrc: sampleImage,
    titleText: 'Crop & Resize Image',
    cropShape: 'square',
    primaryColor: '#0b5fff',
    cancelText: 'Cancel',
    applyText: 'Crop & Apply',
    showRotate: true,
    showAspectPills: true,
    exportSize: 250,
  },
  render: (args: any) => html`
    <div style="position: relative; height: 550px; background: #f1f5f9; display: flex; align-items: center; justify-content: center;">
      <cw-image-cropper
        .open="${args.open}"
        .imageSrc="${args.imageSrc}"
        .titleText="${args.titleText}"
        .cropShape="${args.cropShape}"
        .primaryColor="${args.primaryColor}"
        .cancelText="${args.cancelText}"
        .applyText="${args.applyText}"
        .showRotate="${args.showRotate}"
        .showAspectPills="${args.showAspectPills}"
        .exportSize="${args.exportSize}"
        @cw:image-cropped="${(e: CustomEvent) => alert(`Image Cropped!\nShape: ${e.detail.cropShape}\nData URL length: ${e.detail.dataUrl.length}`)}"
      ></cw-image-cropper>
    </div>
  `,
};
