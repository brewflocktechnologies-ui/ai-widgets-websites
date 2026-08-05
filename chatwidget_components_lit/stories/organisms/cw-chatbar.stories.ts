import { html } from 'lit';
import '../../components/organisms/cw-chatbar.js';

export default {
  title: 'Organisms/Chatbar',
  component: 'cw-chatbar',
  argTypes: {
    panelOpen: { control: 'boolean' },
    unreadCount: { control: 'number' },
  },
};

export const HorizontalBar = {
  args: {
    panelOpen: false,
    unreadCount: 1,
    config: {
      enabled: true,
      layout: 'bar',
      text: 'Chat with us',
      bgColor: '#0b5fff',
      textColor: '#ffffff',
      textSize: 14,
      lucideIcon: 'MessageCircle',
      iconWidth: 20,
      iconHeight: 20,
      width: 255,
      height: 40,
      shadow: true,
      offsetRight: 16,
      offsetBottom: 16,
    },
  },
  render: (args: any) => html`
    <div style="position: relative; height: 100px;">
      <cw-chatbar
        .config="${args.config}"
        .panelOpen="${args.panelOpen}"
        .unreadCount="${args.unreadCount}"
      ></cw-chatbar>
    </div>
  `,
};

export const VerticalCard = {
  args: {
    panelOpen: false,
    unreadCount: 0,
    config: {
      enabled: true,
      layout: 'card',
      cardText: 'Questions about pricing?',
      buttonText: 'Chat Now',
      bgColor: '#003087',
      textColor: '#ffffff',
      buttonBg: '#ffffff',
      textSize: 16,
      lucideIcon: 'MessageCircle',
      iconWidth: 24,
      iconHeight: 24,
      width: 240,
      height: 220,
      shadow: true,
      offsetRight: 16,
      offsetBottom: 16,
    },
  },
  render: (args: any) => html`
    <div style="position: relative; height: 260px;">
      <cw-chatbar
        .config="${args.config}"
        .panelOpen="${args.panelOpen}"
        .unreadCount="${args.unreadCount}"
      ></cw-chatbar>
    </div>
  `,
};
