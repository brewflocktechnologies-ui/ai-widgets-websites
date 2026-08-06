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
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
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
    position: 'top-right',
    offsetX: -6,
    offsetY: -6,
    size: 20,
    fontSize: 11,
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
    <div style="position: relative; width: 64px; height: 64px; background: #0b5fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white;">
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
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
