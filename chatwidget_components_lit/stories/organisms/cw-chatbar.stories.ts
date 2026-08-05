import { html } from 'lit';
import '../../components/organisms/cw-chatbar.js';

export default {
  title: 'Organisms/Chatbar',
  component: 'cw-chatbar',
  argTypes: {
    panelOpen: { control: 'boolean' },
    unreadCount: { control: { type: 'number', min: 0, max: 99 } },
    layout: { control: 'select', options: ['bar', 'card'], description: 'Switch between horizontal floating bar and vertical card trigger' },
    text: { control: 'text' },
    cardText: { control: 'text' },
    buttonText: { control: 'text' },
    bgColor: { control: 'color' },
    textColor: { control: 'color' },
    buttonBg: { control: 'color' },
    textSize: { control: { type: 'number', min: 12, max: 24 } },
    lucideIcon: { control: 'text' },
    iconWidth: { control: { type: 'number', min: 14, max: 32 } },
    iconHeight: { control: { type: 'number', min: 14, max: 32 } },
    width: { control: { type: 'number', min: 140, max: 360 } },
    height: { control: { type: 'number', min: 32, max: 280 } },
    shadow: { control: 'boolean' },
  },
};

export const ConfigurableChatbar = {
  args: {
    panelOpen: false,
    unreadCount: 1,
    layout: 'bar',
    text: 'Chat with us',
    cardText: 'Questions about pricing?',
    buttonText: 'Chat Now',
    bgColor: '#0b5fff',
    textColor: '#ffffff',
    buttonBg: '#ffffff',
    textSize: 14,
    lucideIcon: 'MessageCircle',
    iconWidth: 20,
    iconHeight: 20,
    width: 255,
    height: 40,
    shadow: true,
  },
  render: (args: any) => html`
    <div style="position: relative; height: ${args.layout === 'card' ? '260px' : '100px'};">
      <cw-chatbar
        .panelOpen="${args.panelOpen}"
        .unreadCount="${args.unreadCount}"
        .config="${{
          enabled: true,
          layout: args.layout,
          text: args.text,
          cardText: args.cardText,
          buttonText: args.buttonText,
          bgColor: args.bgColor,
          textColor: args.textColor,
          buttonBg: args.buttonBg,
          textSize: args.textSize,
          lucideIcon: args.lucideIcon,
          iconWidth: args.iconWidth,
          iconHeight: args.iconHeight,
          width: args.width,
          height: args.height,
          shadow: args.shadow,
          offsetRight: 16,
          offsetBottom: 16,
        }}"
      ></cw-chatbar>
    </div>
  `,
};
