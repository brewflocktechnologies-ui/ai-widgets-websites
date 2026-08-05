import { html } from 'lit';
import '../../components/atoms/cw-icon.js';

export default {
  title: 'Atoms/Icon',
  component: 'cw-icon',
  argTypes: {
    name: { control: 'text' },
    size: { control: 'number' },
    color: { control: 'color' },
  },
};

export const LucideMessageSquare = {
  args: {
    name: 'MessageSquare',
    size: 28,
    color: '#0b5fff',
  },
  render: (args: any) => html`
    <cw-icon .name="${args.name}" .size="${args.size}" .color="${args.color}"></cw-icon>
  `,
};

export const LucideSparkles = {
  args: {
    name: 'Sparkles',
    size: 32,
    color: '#9333ea',
  },
  render: (args: any) => html`
    <cw-icon .name="${args.name}" .size="${args.size}" .color="${args.color}"></cw-icon>
  `,
};
