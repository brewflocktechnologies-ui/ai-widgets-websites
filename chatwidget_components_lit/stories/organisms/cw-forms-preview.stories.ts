import { html } from 'lit';
import '../../components/organisms/cw-forms-preview.js';

export default {
  title: 'Organisms/FormsPreview',
  component: 'cw-forms-preview',
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['prechat', 'postchat', 'ticket'] },
    heading: { control: 'text' },
    subheading: { control: 'text' },
  },
};

export const PrechatForm = {
  args: {
    type: 'prechat',
  },
  render: (args: any) => {
    return html`
      <div style="width: 360px; padding: 24px; background: #f8fafc; border-radius: 16px;">
        <cw-forms-preview
          .type="${args.type}"
        ></cw-forms-preview>
      </div>
    `;
  },
};

export const PostchatForm = {
  args: {
    type: 'postchat',
  },
  render: (args: any) => {
    return html`
      <div style="width: 360px; padding: 24px; background: #f8fafc; border-radius: 16px;">
        <cw-forms-preview
          .type="${args.type}"
        ></cw-forms-preview>
      </div>
    `;
  },
};

export const TicketForm = {
  args: {
    type: 'ticket',
    heading: 'Submit a Support Ticket',
    subheading: 'We will get back to you within 24 hours.',
  },
  render: (args: any) => {
    return html`
      <div style="width: 360px; padding: 24px; background: #f8fafc; border-radius: 16px;">
        <cw-forms-preview
          .type="${args.type}"
          .heading="${args.heading}"
          .subheading="${args.subheading}"
        ></cw-forms-preview>
      </div>
    `;
  },
};
