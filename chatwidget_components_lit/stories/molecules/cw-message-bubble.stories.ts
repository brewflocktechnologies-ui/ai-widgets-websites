import { html } from 'lit';
import '../../components/molecules/cw-message-bubble.js';

export default {
  title: 'Molecules/MessageBubble',
  component: 'cw-message-bubble',
};

const defaultChatWindowConfig = {
  agentBubbleBg: '#ffffff',
  agentBubbleColor: '#1e293b',
  agentBubbleBorderColor: '#e2e8f0',
  agentBubbleBorderRadius: '16px',
  agentBubblePadding: '10px 14px',
  agentBubbleFontSize: '14px',
  agentBubbleBoxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
  agentAvatarBg: '#0b5fff',
  agentAvatarColor: '#ffffff',

  visitorBubbleBg: '#0b5fff',
  visitorBubbleColor: '#ffffff',
  visitorBubbleBorderRadius: '16px',
  visitorBubblePadding: '10px 14px',
  visitorBubbleFontSize: '14px',
};

export const AgentMessage = {
  args: {
    message: {
      key: 'm1',
      senderType: 'AGENT',
      senderName: 'Alex',
      body: 'Hello! How can I help you today?',
      created: new Date().toISOString(),
    },
    agentName: 'Alex',
    isGroupStart: true,
    isGroupEnd: true,
    chatWindowConfig: defaultChatWindowConfig,
  },
  render: (args: any) => html`
    <div style="width: 350px; padding: 20px; background: #f8fafc; border-radius: 16px;">
      <cw-message-bubble
        .message="${args.message}"
        .agentName="${args.agentName}"
        .isGroupStart="${args.isGroupStart}"
        .isGroupEnd="${args.isGroupEnd}"
        .chatWindowConfig="${args.chatWindowConfig}"
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
    chatWindowConfig: defaultChatWindowConfig,
  },
  render: (args: any) => html`
    <div style="width: 350px; padding: 20px; background: #f8fafc; border-radius: 16px;">
      <cw-message-bubble
        .message="${args.message}"
        .isGroupStart="${args.isGroupStart}"
        .isGroupEnd="${args.isGroupEnd}"
        .chatWindowConfig="${args.chatWindowConfig}"
      ></cw-message-bubble>
    </div>
  `,
};
