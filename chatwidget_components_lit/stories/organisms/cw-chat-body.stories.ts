import { html } from 'lit';
import '../../components/organisms/cw-chat-body.js';

export default {
  title: 'Organisms/ChatBody',
  component: 'cw-chat-body',
};

export const ActiveConversation = {
  args: {
    chatState: {
      state: 'active',
      clientName: 'Zotly Support',
      agentName: 'Sarah',
      draft: '',
      messages: [
        { key: 'm1', senderType: 'AGENT', senderName: 'Sarah', body: 'Welcome! How can we assist you today?', created: new Date().toISOString() },
        { key: 'm2', senderType: 'VISITOR', body: 'Hi, I need help with integration.', created: new Date().toISOString(), status: 'read' },
      ],
    },
    chatWindowConfig: {
      bodyBg: '#ffffff',
      accentColor: '#0b5fff',
    },
  },
  render: (args: any) => html`
    <div style="width: 350px; height: 450px; display: flex; flex-direction: column; border: 1px solid #e5e7eb;">
      <cw-chat-body
        .chatState="${args.chatState}"
        .chatWindowConfig="${args.chatWindowConfig}"
      ></cw-chat-body>
    </div>
  `,
};
