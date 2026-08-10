import { html } from 'lit';
import '../../components/atoms/cw-icon.js';

const ALL_ICONS = [
  'MessageCircle',
  'MessageSquare',
  'Sparkles',
  'Star',
  'Heart',
  'Smile',
  'Send',
  'SendFilled',
  'ArrowUp',
  'HelpCircle',
  'Gift',
  'Bell',
  'Info',
  'AlertCircle',
  'Minimize2',
  'Maximize2',
  'Phone',
  'Video',
  'Power',
  'MoreHorizontal',
  'Close',
  'Plus',
  'ChevronDown',
  'RotateCw',
  'ChatLines',
  'Check',
  'DoubleCheck',
  'Image',
  'Camera',
  'Download',
  'Volume2',
];

export default {
  title: 'Atoms/Icon',
  component: 'cw-icon',
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: ALL_ICONS,
    },
    size: { control: 'number' },
    color: { control: 'color' },
  },
};

export const ConfigurableIcon = {
  args: {
    name: 'MessageSquare',
    size: 28,
    color: '#0b5fff',
  },
  render: (args: any) => html`
    <cw-icon .name="${args.name}" .size="${args.size}" .color="${args.color}"></cw-icon>
  `,
};

export const IconGallery = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 150px)); gap: 16px; font-family: system-ui, sans-serif;">
      ${ALL_ICONS.map(
        (iconName) => html`
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px; background: #f8fafc;">
            <cw-icon .name="${iconName}" .size="${28}" .color="${'#0b5fff'}"></cw-icon>
            <span style="font-size: 11px; font-weight: 600; color: #334155; text-align: center;">${iconName}</span>
          </div>
        `
      )}
    </div>
  `,
};
