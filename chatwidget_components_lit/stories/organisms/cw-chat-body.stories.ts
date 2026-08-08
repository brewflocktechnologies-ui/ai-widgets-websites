import { html } from 'lit';
import '../../components/organisms/cw-chat-body.js';
import { updateStoreConfig } from '../../store/chat-store.js';

export default {
  title: 'Organisms/ChatBody',
  component: 'cw-chat-body',
  tags: ['autodocs'],
  argTypes: {
    state: { control: 'select', options: ['active', 'welcome', 'prechat', 'postchat'] },
    agentName: { control: 'text' },
    bodyBg: { control: 'color' },
    accentColor: { control: 'color' },
  },
};

export const ActiveConversation = {
  args: {
    state: 'active',
    agentName: 'Sarah',
    bodyBg: '#f8fafc',
    accentColor: '#0b5fff',
  },
  render: (args: any) => {
    const chatWindowConfig = {
      bodyBg: args.bodyBg,
      accentColor: args.accentColor,
    };
    const chatState = {
      state: args.state,
      clientName: 'Zotly Support',
      agentName: args.agentName,
      draft: '',
      messages: [
        { key: 'm1', senderType: 'AGENT' as const, senderName: args.agentName, body: 'Welcome! How can we assist you today?', created: new Date().toISOString() },
        { key: 'm2', senderType: 'VISITOR' as const, body: 'Hi, I need help with integration.', created: new Date().toISOString(), status: 'read' as const },
      ],
    };
    updateStoreConfig({
      chatWindow: chatWindowConfig,
      chat: chatState
    });
    return html`
      <div style="width: 350px; height: 450px; display: flex; flex-direction: column; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden;">
        <cw-chat-body
          .chatState="${chatState}"
          .chatWindowConfig="${chatWindowConfig}"
        ></cw-chat-body>
      </div>
    `;
  },
};
