import { html } from 'lit';
import '../../components/atoms/cw-tooltip.js';

export default {
  title: 'Atoms/Tooltip',
  component: 'cw-tooltip',
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    position: { control: { type: 'select', options: ['left', 'right', 'top', 'bottom'] } },
    backgroundColor: { control: 'color' },
    textColor: { control: 'color' },
    fontSize: { control: 'number' },
    padding: { control: 'text' },
    boxShadow: { control: 'text' },
    borderWidth: { control: 'number' },
    borderColor: { control: 'color' },
    arrowEnabled: { control: 'boolean' },
    visible: { control: 'boolean' },
  },
};

export const LeftPosition = {
  args: {
    text: 'Chat with us 👋',
    position: 'left',
    backgroundColor: '#ffffff',
    textColor: '#374151',
    fontSize: 14,
    arrowEnabled: true,
    visible: true,
  },
  render: (args: any) => html`
    <div style="padding: 60px 120px; position: relative; display: inline-block;">
      <button style="padding: 10px 20px; border-radius: 8px; border: 1px solid #ccc;">Anchor Target</button>
      <cw-tooltip
        .text="${args.text}"
        .position="${args.position}"
        .backgroundColor="${args.backgroundColor}"
        .textColor="${args.textColor}"
        .fontSize="${args.fontSize}"
        .arrowEnabled="${args.arrowEnabled}"
        .visible="${args.visible}"
      ></cw-tooltip>
    </div>
  `,
};

export const RightPosition = {
  args: {
    text: 'We reply in 5 minutes!',
    position: 'right',
    backgroundColor: '#1e293b',
    textColor: '#ffffff',
    fontSize: 13,
    arrowEnabled: true,
    visible: true,
  },
  render: (args: any) => html`
    <div style="padding: 60px 120px; position: relative; display: inline-block;">
      <button style="padding: 10px 20px; border-radius: 8px; border: 1px solid #ccc;">Anchor Target</button>
      <cw-tooltip
        .text="${args.text}"
        .position="${args.position}"
        .backgroundColor="${args.backgroundColor}"
        .textColor="${args.textColor}"
        .fontSize="${args.fontSize}"
        .arrowEnabled="${args.arrowEnabled}"
        .visible="${args.visible}"
      ></cw-tooltip>
    </div>
  `,
};

