import { html } from 'lit';
import '../../components/molecules/cw-button.js';

export default {
  title: 'Molecules/Button',
  component: 'cw-button',
  tags: ['autodocs'],
  argTypes: {
    variant: { control: { type: 'select', options: ['primary', 'secondary', 'ghost', 'outline', 'danger', 'icon'] } },
    size: { control: { type: 'select', options: ['sm', 'md', 'lg'] } },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    icon: { control: 'text' },
    iconPosition: { control: { type: 'select', options: ['left', 'right', 'only'] } },
    fullWidth: { control: 'boolean' },
    bg: { control: 'color' },
    color: { control: 'color' },
  },
};

export const Primary = {
  args: {
    variant: 'primary',
    size: 'md',
    label: 'Start Conversation',
    icon: 'MessageCircle',
    disabled: false,
  },
  render: (args: any) => html`
    <cw-button
      .variant="${args.variant}"
      .size="${args.size}"
      .label="${args.label}"
      .icon="${args.icon}"
      ?disabled="${args.disabled}"
    ></cw-button>
  `,
};

export const Secondary = {
  args: {
    variant: 'secondary',
    size: 'md',
    label: 'Cancel',
    disabled: false,
  },
  render: (args: any) => html`
    <cw-button
      .variant="${args.variant}"
      .size="${args.size}"
      .label="${args.label}"
      ?disabled="${args.disabled}"
    ></cw-button>
  `,
};

export const GhostIcon = {
  args: {
    variant: 'icon',
    size: 'md',
    icon: 'Maximize2',
    disabled: false,
  },
  render: (args: any) => html`
    <cw-button
      .variant="${args.variant}"
      .size="${args.size}"
      .icon="${args.icon}"
      ?disabled="${args.disabled}"
    ></cw-button>
  `,
};

export const Danger = {
  args: {
    variant: 'danger',
    size: 'md',
    label: 'End Chat',
    icon: 'Power',
    disabled: false,
  },
  render: (args: any) => html`
    <cw-button
      .variant="${args.variant}"
      .size="${args.size}"
      .label="${args.label}"
      .icon="${args.icon}"
      ?disabled="${args.disabled}"
    ></cw-button>
  `,
};

export const CustomStyled = {
  args: {
    variant: 'primary',
    size: 'lg',
    label: 'Custom Gradient Button',
    icon: 'Sparkles',
    bg: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
    color: '#ffffff',
    borderRadius: '16px',
  },
  render: (args: any) => html`
    <cw-button
      .variant="${args.variant}"
      .size="${args.size}"
      .label="${args.label}"
      .icon="${args.icon}"
      .bg="${args.bg}"
      .color="${args.color}"
      .borderRadius="${args.borderRadius}"
    ></cw-button>
  `,
};
