import { html } from 'lit';
import '../../components/organisms/cw-chat-body.js';

export default {
  title: 'Organisms/ChatBody',
  component: 'cw-chat-body',
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
  render: (args: any) => html`
    <div style="width: 350px; height: 450px; display: flex; flex-direction: column; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden;">
      <cw-chat-body
        .chatState="${{
          state: args.state,
          clientName: 'Zotly Support',
          agentName: args.agentName,
          draft: '',
          messages: [
            { key: 'm1', senderType: 'AGENT', senderName: args.agentName, body: 'Welcome! How can we assist you today?', created: new Date().toISOString() },
            { key: 'm2', senderType: 'VISITOR', body: 'Hi, I need help with integration.', created: new Date().toISOString(), status: 'read' },
          ],
        }}"
        .chatWindowConfig="${{
          bodyBg: args.bodyBg,
          accentColor: args.accentColor,
        }}"
      ></cw-chat-body>
    </div>
  `,
};
