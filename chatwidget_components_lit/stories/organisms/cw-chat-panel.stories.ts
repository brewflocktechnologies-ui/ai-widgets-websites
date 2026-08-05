import { html } from 'lit';
import '../../components/organisms/cw-chat-panel.js';

export default {
  title: 'Organisms/ChatPanel',
  component: 'cw-chat-panel',
  argTypes: {
    panelOpen: { control: 'boolean' },
  },
};

export const OpenChatPanel = {
  args: {
    panelOpen: true,
    chatWindowConfig: {
      widgetWidth: 350,
      widgetHeight: 500,
      headerBg: '#0b5fff',
      bodyBg: '#f4f4f5',
      accentColor: '#0b5fff',
    },
    chatState: {
      state: 'active',
      clientName: 'Zotly Support',
      agentName: 'Sarah',
      messages: [
        { key: 'm1', senderType: 'AGENT', senderName: 'Sarah', body: 'Welcome! How can we assist you today?', created: new Date().toISOString() },
      ],
    },
  },
  render: (args: any) => html`
    <div style="position: relative; height: 550px;">
      <cw-chat-panel
        .panelOpen="${args.panelOpen}"
        .chatWindowConfig="${args.chatWindowConfig}"
        .chatState="${args.chatState}"
      ></cw-chat-panel>
    </div>
  `,
};
