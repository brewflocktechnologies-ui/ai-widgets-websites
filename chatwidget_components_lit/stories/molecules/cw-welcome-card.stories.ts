import { html } from 'lit';
import '../../components/molecules/cw-welcome-card.js';

export default {
  title: 'Molecules/WelcomeCard',
  component: 'cw-welcome-card',
  argTypes: {
    enabled: { control: 'boolean' },
    cardLayout: {
      control: 'select',
      options: ['glassy', 'normal'],
      description: 'Switch layout mode between glassy card overlay and normal standard layout',
    },
    title: { control: 'text' },
    titleFontSize: { control: 'text' },
    description: { control: 'text' },
    descriptionFontSize: { control: 'text' },
    headerTextColor: { control: 'color' },
    subtextColor: { control: 'color' },
    bgGradient: { control: 'text' },
    avatarAlign: { control: 'select', options: ['center', 'flex-start', 'flex-end'] },
    buttonText: { control: 'text' },
    buttonSubtext: { control: 'text' },
    buttonBg: { control: 'color' },
    buttonTextColor: { control: 'color' },
    buttonIconColor: { control: 'color' },
    buttonBorderRadius: { control: { type: 'number', min: 0, max: 40 } },
    cardBg: { control: 'text' },
    cardBorder: { control: 'text' },
    cardBorderRadius: { control: { type: 'number', min: 0, max: 40 } },
    cardBlur: { control: { type: 'number', min: 0, max: 40 } },
  },
};

const sampleAvatars = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
];

export const ConfigurableWelcomeCard = {
  args: {
    enabled: true,
    cardLayout: 'glassy',
    title: 'Hi there! 👋 How can we help you today?',
    titleFontSize: '24px',
    description: 'Our support heroes are here to assist you.',
    descriptionFontSize: '14px',
    bgGradient: 'linear-gradient(135deg, #0b5fff, #22d3ee)',
    headerTextColor: '#ffffff',
    subtextColor: 'rgba(255, 255, 255, 0.9)',
    avatarAlign: 'center',
    buttonText: 'Start Conversation',
    buttonSubtext: 'Typically replies in 5 minutes',
    buttonBg: '#ffffff',
    buttonTextColor: '#111827',
    buttonIconColor: '#0b5fff',
    buttonBorderRadius: 24,
    cardBg: 'rgba(255, 255, 255, 0.12)',
    cardBorder: '1px solid rgba(255, 255, 255, 0.22)',
    cardBorderRadius: 24,
    cardBlur: 16,
  },
  render: (args: any) => html`
    <div style="width: 350px; height: 550px; position: relative; border-radius: 24px; overflow: hidden; box-shadow: 0 12px 32px rgba(0,0,0,0.2);">
      <cw-welcome-card
        .config="${{
          enabled: args.enabled,
          cardLayout: args.cardLayout,
          title: args.title,
          titleFontSize: args.titleFontSize,
          description: args.description,
          descriptionFontSize: args.descriptionFontSize,
          bgGradient: args.bgGradient,
          headerTextColor: args.headerTextColor,
          subtextColor: args.subtextColor,
          avatars: sampleAvatars,
          avatarAlign: args.avatarAlign,
          buttonText: args.buttonText,
          buttonSubtext: args.buttonSubtext,
          buttonBg: args.buttonBg,
          buttonTextColor: args.buttonTextColor,
          buttonIconColor: args.buttonIconColor,
          buttonBorderRadius: args.buttonBorderRadius,
          cardBg: args.cardBg,
          cardBorder: args.cardBorder,
          cardBorderRadius: args.cardBorderRadius,
          cardBlur: args.cardBlur,
        }}"
        .accentColor="${args.buttonIconColor}"
      ></cw-welcome-card>
    </div>
  `,
};
