import { html } from 'lit';
import '../../components/atoms/cw-badge.js';

export default {
  title: 'Atoms/Badge',
  component: 'cw-badge',
  tags: ['autodocs'],
  argTypes: {
    count: { control: { type: 'number', min: 1, max: 999 } },
    position: {
      control: 'select',
      options: ['relative', 'top-right', 'top-left', 'bottom-right', 'bottom-left'],
    },
    offsetX: { control: { type: 'number', min: -30, max: 30 } },
    offsetY: { control: { type: 'number', min: -30, max: 30 } },
    size: { control: { type: 'number', min: 12, max: 40 } },
    fontSize: { control: { type: 'number', min: 8, max: 20 } },
    backgroundColor: { control: 'color' },
    textColor: { control: 'color' },
    borderWidth: { control: { type: 'number', min: 0, max: 8 } },
    borderColor: { control: 'color' },
    boxShadow: { control: 'text' },
    borderRadius: { control: 'text' },
    fontWeight: { control: 'select', options: ['400', '500', '600', '700', '800', '900'] },
    padding: { control: 'text' },
    animation: {
      control: 'select',
      options: [
        'pulse 1.5s infinite',
        'pulse',
        'bounce 1s infinite',
        'bounce',
        'wiggle 2.5s infinite',
        'wiggle',
        'none',
      ],
    },
  },
};

export const ConfigurableBadge = {
  args: {
    count: 3,
    position: 'relative',
    offsetX: 0,
    offsetY: 0,
    size: 24,
    fontSize: 12,
    backgroundColor: '#dc2626',
    textColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#ffffff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
    borderRadius: '9999px',
    fontWeight: '700',
    padding: '0px',
    animation: 'pulse 1.5s infinite',
  },
  render: (args: any) => html`
    <div style="position: relative; display: inline-flex; align-items: center; justify-content: center; padding: 24px;">
      <cw-badge
        .count="${args.count}"
        .config="${{
          position: args.position,
          offsetX: args.offsetX,
          offsetY: args.offsetY,
          size: args.size,
          fontSize: args.fontSize,
          backgroundColor: args.backgroundColor,
          textColor: args.textColor,
          borderWidth: args.borderWidth,
          borderColor: args.borderColor,
          boxShadow: args.boxShadow,
          borderRadius: args.borderRadius,
          fontWeight: args.fontWeight,
          padding: args.padding,
          animation: args.animation,
        }}"
      ></cw-badge>
    </div>
  `,
};
