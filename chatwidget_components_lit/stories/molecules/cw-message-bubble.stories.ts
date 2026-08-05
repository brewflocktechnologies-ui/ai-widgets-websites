import { html } from 'lit';
import '../../components/molecules/cw-message-bubble.js';

export default {
  title: 'Molecules/MessageBubble',
  component: 'cw-message-bubble',
};

export const AgentMessage = {
  args: {
    message: {
      key: 'm1',
      senderType: 'AGENT',
      senderName: 'Sarah',
      body: 'Hello! How can I help you today?',
      created: new Date().toISOString(),
    },
    agentName: 'Sarah',
    isGroupStart: true,
    isGroupEnd: true,
  },
  render: (args: any) => html`
    <div style="width: 350px; padding: 16px; background: #f4f4f5;">
      <cw-message-bubble
        .message="${args.message}"
        .agentName="${args.agentName}"
        .isGroupStart="${args.isGroupStart}"
        .isGroupEnd="${args.isGroupEnd}"
      ></cw-message-bubble>
    </div>
  `,
};

export const VisitorMessage = {
  args: {
    message: {
      key: 'm2',
      senderType: 'VISITOR',
      body: 'I would like to know more about your pricing plans.',
      created: new Date().toISOString(),
      status: 'read',
    },
    isGroupStart: true,
    isGroupEnd: true,
  },
  render: (args: any) => html`
    <div style="width: 350px; padding: 16px; background: #f4f4f5;">
      <cw-message-bubble
        .message="${args.message}"
        .isGroupStart="${args.isGroupStart}"
        .isGroupEnd="${args.isGroupEnd}"
      ></cw-message-bubble>
    </div>
  `,
};
