import { html } from 'lit';
import '../../components/organisms/cw-chat-header.js';

export default {
  title: 'Organisms/ChatHeader',
  component: 'cw-chat-header',
  tags: ['autodocs'],
  argTypes: {
    clientName: { control: 'text' },
    agentName: { control: 'text' },
    state: { control: 'select', options: ['active', 'welcome', 'prechat', 'postchat'] },
    isExpanded: { control: 'boolean' },
    headerBg: { control: 'color' },
    headerTextColor: { control: 'color' },
    headerPadding: { control: 'text' },
    headerTitleFontSize: { control: 'text' },
    headerSubtitleFontSize: { control: 'text' },
    enableCloseChatVisitor: { control: 'boolean', name: 'Show Close Button' },
  },
};

export const ConfigurableHeader = {
  args: {
    clientName: 'Zotly Support',
    agentName: 'Sarah',
    state: 'active',
    isExpanded: false,
    headerBg: '#0b5fff',
    headerTextColor: '#ffffff',
    headerPadding: '14px 16px',
    headerTitleFontSize: '14px',
    headerSubtitleFontSize: '11px',
    enableCloseChatVisitor: true,
  },
  render: (args: any) => {
    return html`
      <div style="width: 350px; border-radius: 16px 16px 0 0; overflow: hidden;">
        <cw-chat-header
          .clientName="${args.clientName}"
          .agentName="${args.agentName}"
          .state="${args.state}"
          .isExpanded="${args.isExpanded}"
          .config="${{
            headerBg: args.headerBg,
            headerTextColor: args.headerTextColor,
            headerPadding: args.headerPadding,
            headerTitleFontSize: args.headerTitleFontSize,
            headerSubtitleFontSize: args.headerSubtitleFontSize,
          }}"
          .features="${{
            closeChatVisitor: args.enableCloseChatVisitor,
          }}"
        ></cw-chat-header>
      </div>
    `;
  },
};
