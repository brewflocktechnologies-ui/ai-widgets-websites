import { html } from 'lit';
import '../../components/organisms/cw-greet-window.js';

export default {
  title: 'Organisms/GreetWindow',
  component: 'cw-greet-window',
};

export const DefaultGreetWindow = {
  args: {
    panelOpen: false,
    config: {
      enabled: true,
      dismissed: false,
      visible: true,
      width: 320,
      backgroundColor: '#ffffff',
      borderRadius: 16,
      padding: '24px 20px',
      title: 'Hi there! 👋 Need help growing your business?',
      description: "Let's chat & find the right solution for you!",
      titleColor: '#1e293b',
      descriptionColor: '#475569',
      lucideIcon: 'Sparkles',
      iconSize: 48,
      iconColor: '#0b5fff',
      iconAnimation: 'wiggle',
      inputBox: {
        enabled: true,
        visible: true,
        layout: 'separated',
        placeholder: 'Write your message...',
        buttonColor: '#0b5fff',
      },
    },
  },
  render: (args: any) => html`
    <div style="position: relative; height: 350px;">
      <cw-greet-window
        .config="${args.config}"
        .panelOpen="${args.panelOpen}"
      ></cw-greet-window>
    </div>
  `,
};
