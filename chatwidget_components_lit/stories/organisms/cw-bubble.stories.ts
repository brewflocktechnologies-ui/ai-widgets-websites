import { html } from 'lit';
import '../../components/organisms/cw-bubble.js';

export default {
  title: 'Organisms/Bubble',
  component: 'cw-bubble',
  argTypes: {
    panelOpen: { control: 'boolean' },
    unreadCount: { control: 'number' },
  },
};

export const DefaultBubble = {
  args: {
    panelOpen: false,
    unreadCount: 2,
    config: {
      useWebsiteTheme: true,
      position: 'bottom-right',
      offsetRight: 16,
      offsetBottom: 16,
      width: 60,
      height: 60,
      backgroundColor: '#0b5fff',
      lucideIcon: 'MessageCircle',
      iconWidth: 26,
      iconHeight: 26,
      iconColor: '#ffffff',
    },
  },
  render: (args: any) => html`
    <div style="position: relative; height: 120px;">
      <cw-bubble
        .config="${args.config}"
        .panelOpen="${args.panelOpen}"
        .unreadCount="${args.unreadCount}"
      ></cw-bubble>
    </div>
  `,
};
