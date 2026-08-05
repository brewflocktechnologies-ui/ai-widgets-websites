import { html } from 'lit';
import '../../components/molecules/cw-welcome-card.js';

export default {
  title: 'Molecules/WelcomeCard',
  component: 'cw-welcome-card',
  argTypes: {
    accentColor: { control: 'color' },
  },
};

export const GlassyCard = {
  args: {
    accentColor: '#0b5fff',
    config: {
      enabled: true,
      cardLayout: 'glassy',
      title: 'Hi there! 👋 How can we help you today?',
      description: 'Our support heroes are here to assist you.',
      bgGradient: 'linear-gradient(135deg, #0b5fff, #9333ea)',
      avatars: [
        { name: 'Sarah' },
        { name: 'Alex' },
        { name: 'Emily' }
      ],
      buttonText: 'Start Conversation',
      buttonBg: '#ffffff',
      buttonTextColor: '#111827',
    },
  },
  render: (args: any) => html`
    <div style="width: 350px; height: 500px; position: relative;">
      <cw-welcome-card
        .config="${args.config}"
        .accentColor="${args.accentColor}"
      ></cw-welcome-card>
    </div>
  `,
};
