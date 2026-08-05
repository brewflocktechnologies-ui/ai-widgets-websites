import { html } from 'lit';
import '../../components/molecules/cw-forms-preview.js';

export default {
  title: 'Molecules/FormsPreview',
  component: 'cw-forms-preview',
  argTypes: {
    accentColor: { control: 'color' },
  },
};

export const PrechatForm = {
  args: {
    accentColor: '#0b5fff',
  },
  render: (args: any) => html`
    <div style="width: 350px; background: #ffffff; padding: 16px; border-radius: 16px; border: 1px solid #e5e7eb;">
      <cw-forms-preview .accentColor="${args.accentColor}"></cw-forms-preview>
    </div>
  `,
};
