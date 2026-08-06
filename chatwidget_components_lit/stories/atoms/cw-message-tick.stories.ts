import { html } from 'lit';
import '../../components/atoms/cw-message-tick.js';

export default {
  title: 'Atoms/MessageTick',
  component: 'cw-message-tick',
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: { type: 'select' },
      options: ['sent', 'delivered', 'read'],
    },
    color: { control: 'color' },
  },
};

export const Sent = {
  args: {
    status: 'sent',
    color: '#9ca3af',
  },
  render: (args: any) => html`
    <cw-message-tick .status="${args.status}" .color="${args.color}"></cw-message-tick>
  `,
};

export const Delivered = {
  args: {
    status: 'delivered',
    color: '#9ca3af',
  },
  render: (args: any) => html`
    <cw-message-tick .status="${args.status}" .color="${args.color}"></cw-message-tick>
  `,
};

export const Read = {
  args: {
    status: 'read',
    color: '#34b7f1',
  },
  render: (args: any) => html`
    <cw-message-tick .status="${args.status}" .color="${args.color}"></cw-message-tick>
  `,
};
