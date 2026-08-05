import { html } from 'lit';
import '../../components/molecules/cw-greet-input.js';

export default {
  title: 'Molecules/GreetInput',
  component: 'cw-greet-input',
  argTypes: {
    accentColor: { control: 'color' },
  },
};

export const SeparatedLayout = {
  args: {
    accentColor: '#0b5fff',
    config: {
      enabled: true,
      visible: true,
      layout: 'separated',
      placeholder: 'Write your message...',
      buttonColor: '#0b5fff',
      buttonIconColor: '#ffffff',
    },
  },
  render: (args: any) => html`
    <div style="width: 320px; padding: 16px; background: #f8fafc; border-radius: 16px;">
      <cw-greet-input .config="${args.config}" .accentColor="${args.accentColor}"></cw-greet-input>
    </div>
  `,
};
