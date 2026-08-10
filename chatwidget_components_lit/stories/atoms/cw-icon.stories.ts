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
    <div style="display: flex; flex-wrap: wrap; gap: 14px; width: 100%; max-width: 100%; box-sizing: border-box; padding: 8px 0; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      ${ALL_ICONS.map(
        (iconName) => html`
          <div
            style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 125px; min-width: 125px; height: 110px; gap: 10px; padding: 14px 8px 12px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03); cursor: pointer; user-select: none; box-sizing: border-box; text-align: center; transition: all 0.2s ease;"
            title="Click to copy '${iconName}'"
            @mouseenter="${(e: MouseEvent) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = 'translateY(-3px)';
              el.style.borderColor = '#0b5fff';
              el.style.boxShadow = '0 8px 20px rgba(11, 95, 255, 0.12)';
            }}"
            @mouseleave="${(e: MouseEvent) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = 'translateY(0)';
              el.style.borderColor = '#e2e8f0';
              el.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.03)';
            }}"
            @click="${(e: Event) => {
              navigator.clipboard?.writeText(iconName);
              const card = (e.currentTarget as HTMLElement);
              const nameEl = card.querySelector('span');
              if (nameEl) {
                const originalText = iconName;
                nameEl.textContent = 'Copied!';
                nameEl.style.color = '#10b981';
                setTimeout(() => {
                  nameEl.textContent = originalText;
                  nameEl.style.color = '#334155';
                }, 1200);
              }
            }}"
          >
            <cw-icon .name="${iconName}" .size="${28}" .color="${'#0b5fff'}"></cw-icon>
            <span style="font-size: 11.5px; font-weight: 600; color: #334155; line-height: 1.3; word-break: break-word; text-align: center;">${iconName}</span>
          </div>
        `
      )}
    </div>
  `,
};

