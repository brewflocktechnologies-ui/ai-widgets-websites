import { html } from 'lit';
import '../../components/molecules/cw-welcome-card.js';

export default {
  title: 'Molecules/WelcomeCard',
  component: 'cw-welcome-card',
  argTypes: {
    accentColor: { control: 'color' },
  },
};

const sampleAvatars = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
];

export const GlassyCard = {
  args: {
    accentColor: '#0b5fff',
    config: {
      enabled: true,
      cardLayout: 'glassy',
      title: 'Hi there! 👋 How can we help you today?',
      description: 'Our support heroes are here to assist you.',
      bgGradient: 'linear-gradient(135deg, #0b5fff, #22d3ee)',
      headerTextColor: '#ffffff',
      subtextColor: 'rgba(255, 255, 255, 0.9)',
      avatars: sampleAvatars,
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
  },
  render: (args: any) => html`
    <div style="width: 350px; height: 550px; position: relative; border-radius: 24px; overflow: hidden; box-shadow: 0 12px 32px rgba(0,0,0,0.2);">
      <cw-welcome-card
        .config="${args.config}"
        .accentColor="${args.accentColor}"
      ></cw-welcome-card>
    </div>
  `,
};

export const NormalLayout = {
  args: {
    accentColor: '#0b5fff',
    config: {
      enabled: true,
      cardLayout: 'normal',
      title: 'Hi there! 👋 How can we help you today?',
      description: 'Our support heroes are here to assist you.',
      bgGradient: 'linear-gradient(135deg, #059669, #0d9488)',
      headerTextColor: '#ffffff',
      subtextColor: 'rgba(255, 255, 255, 0.9)',
      avatars: sampleAvatars,
      buttonText: 'Start Conversation',
      buttonSubtext: 'Typically replies in 5 minutes',
      buttonBg: '#ffffff',
      buttonTextColor: '#111827',
      buttonIconColor: '#059669',
      buttonBorderRadius: 24,
    },
  },
  render: (args: any) => html`
    <div style="width: 350px; height: 550px; position: relative; border-radius: 24px; overflow: hidden; box-shadow: 0 12px 32px rgba(0,0,0,0.2);">
      <cw-welcome-card
        .config="${args.config}"
        .accentColor="${args.accentColor}"
      ></cw-welcome-card>
    </div>
  `,
};
