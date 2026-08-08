import { html } from 'lit';
import '../../components/molecules/cw-composer.js';
import { updateStoreConfig } from '../../store/chat-store.js';

export default {
  title: 'Molecules/Composer',
  component: 'cw-composer',
  tags: ['autodocs'],
  argTypes: {
    draft: { control: 'text' },
    attachmentsEnabled: { control: 'boolean' },
    modernUi: { control: 'boolean' },
  },
};

export const DefaultComposer = {
  args: {
    draft: '',
    attachmentsEnabled: true,
    modernUi: true,
  },
  render: (args: any) => {
    updateStoreConfig({
      chatWindow: {
        modernUi: args.modernUi,
        attachmentsEnabled: args.attachmentsEnabled,
      },
      chat: {
        draft: args.draft,
      }
    });

    return html`
      <div style="width: 350px; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden;">
        <cw-composer
          .draft="${args.draft}"
          .attachmentsEnabled="${args.attachmentsEnabled}"
          .modernUi="${args.modernUi}"
        ></cw-composer>
      </div>
    `;
  },
};

export const WithDraftText = {
  args: {
    draft: 'Hello, I have a question regarding pricing!',
    attachmentsEnabled: true,
    modernUi: true,
  },
  render: (args: any) => {
    updateStoreConfig({
      chatWindow: {
        modernUi: args.modernUi,
        attachmentsEnabled: args.attachmentsEnabled,
      },
      chat: {
        draft: args.draft,
      }
    });

    return html`
      <div style="width: 350px; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden;">
        <cw-composer
          .draft="${args.draft}"
          .attachmentsEnabled="${args.attachmentsEnabled}"
          .modernUi="${args.modernUi}"
        ></cw-composer>
      </div>
    `;
  },
};

