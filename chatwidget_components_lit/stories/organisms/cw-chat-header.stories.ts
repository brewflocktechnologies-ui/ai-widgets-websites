import { html } from 'lit';
import '../../components/organisms/cw-chat-header.js';

export default {
  title: 'Organisms/ChatHeader',
  component: 'cw-chat-header',
  argTypes: {
    clientName: { control: 'text' },
    agentName: { control: 'text' },
    isExpanded: { control: 'boolean' },
  },
};

export const ActiveState = {
  args: {
    clientName: 'Zotly Support',
    agentName: 'Sarah',
    state: 'active',
    isExpanded: false,
    config: {
      headerBg: '#0b5fff',
      headerTextColor: '#ffffff',
      headerPadding: '14px 16px',
      headerTitleFontSize: '14px',
      headerSubtitleFontSize: '11px',
    },
    features: {
      closeChatVisitor: true,
    },
  },
  render: (args: any) => html`
    <div style="width: 350px; border-radius: 16px 16px 0 0; overflow: hidden;">
      <cw-chat-header
        .config="${args.config}"
        .features="${args.features}"
        .clientName="${args.clientName}"
        .agentName="${args.agentName}"
        .state="${args.state}"
        .isExpanded="${args.isExpanded}"
      ></cw-chat-header>
    </div>
  `,
};
