import { html } from 'lit';
import '../../components/organisms/cw-chatbar.js';

export default {
  title: 'Organisms/Chatbar',
  component: 'cw-chatbar',
  tags: ['autodocs'],
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
    buttonTextColor: { control: 'color' },
    textSize: { control: { type: 'number', min: 12, max: 24 } },
    lucideIcon: { control: 'text' },
    iconWidth: { control: { type: 'number', min: 14, max: 48 } },
    iconHeight: { control: { type: 'number', min: 14, max: 48 } },
    shadow: { control: 'boolean' },
  },
};

export const BarPreset = {
  args:{
    panelOpen:false,
    unreadCount:1,
    layout:'bar',
    text:'Chat with us',
    cardText:'Questions about PhonePe for business?',
    buttonText:'Chat Now',
    bgColor:"#8133d5",
    textColor:'#ffffff',
    buttonBg:'#ffffff',
    buttonTextColor:"#ffffff",
    textSize:16,
    lucideIcon:"Chat",
    iconWidth:36,
    iconHeight:36,
    shadow:true,
  },
  render:(args: any) => {
    const isCard = args.layout === 'card';
    return html`
      <div style="position: relative; width: ${isCard ? '280px' : '300px'}; height: ${isCard ? '300px' : '120px'};">
        <cw-chatbar
          .fixed="${false}"
          .panelOpen="${args.panelOpen}"
          .unreadCount="${args.unreadCount}"
          .config="${{
            enabled:true,
            layout:args.layout,
            text:args.text,
            cardText:args.cardText,
            buttonText:args.buttonText,
            bgColor:args.bgColor,
            textColor:args.textColor,
            buttonBg:args.buttonBg,
            buttonTextColor:args.buttonTextColor,
            textSize:args.textSize,
            lucideIcon:args.lucideIcon,
            iconWidth:args.iconWidth,
            iconHeight:args.iconHeight,
            width:isCard ? 250 : 255,
            height:isCard ? undefined : 40,
            shadow:args.shadow,
            offsetRight:16,
            offsetBottom:16,
          }}"
        ></cw-chatbar>
      </div>
    `;
  },
};

export const CardPreset = {
  args: {
    panelOpen: false,
    unreadCount: 0,
    layout: 'card',
    cardText: 'Questions about PhonePe for business?',
    buttonText: 'Chat Now',
    bgColor: '#5f259f',
    textColor: '#ffffff',
    buttonBg: '#ffffff',
    buttonTextColor: '#5f259f',
    textSize: 16,
    lucideIcon: 'Sparkles',
    iconWidth: 36,
    iconHeight: 36,
    shadow: true,
  },
  render: (args: any) => html`
    <div style="position: relative; width: 280px; height: 300px;">
      <cw-chatbar
        .fixed="${false}"
        .panelOpen="${args.panelOpen}"
        .unreadCount="${args.unreadCount}"
        .config="${{
          enabled: true,
          layout: 'card',
          cardText: args.cardText,
          buttonText: args.buttonText,
          bgColor: args.bgColor,
          textColor: args.textColor,
          buttonBg: args.buttonBg,
          buttonTextColor: args.buttonTextColor,
          textSize: args.textSize,
          lucideIcon: args.lucideIcon,
          iconWidth: args.iconWidth,
          iconHeight: args.iconHeight,
          width: 250,
          shadow: args.shadow,
          offsetRight: 16,
          offsetBottom: 16,
        }}"
      ></cw-chatbar>
    </div>
  `,
};
