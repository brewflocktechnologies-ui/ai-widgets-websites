import { html } from 'lit';
import '../../components/organisms/cw-chat-body.js';

export default {
  title: 'Organisms/ChatBody',
  component: 'cw-chat-body',
  tags: ['autodocs'],
  argTypes: {
    // --- General Section ---
    state: {
      control: 'select',
      options: ['active', 'welcome', 'boot', 'prechat', 'offline', 'offline-sent', 'queued', 'closed'],
      description: 'Current UI flow state of the chat body',
      table: { category: 'General' },
    },
    clientName: {
      control: 'text',
      description: 'Brand / Client company name',
      table: { category: 'General' },
    },
    agentName: {
      control: 'text',
      description: 'Assigned support agent name',
      table: { category: 'General' },
    },
    agentAvatarUrl: {
      control: 'text',
      description: 'Avatar image URL for support agent',
      table: { category: 'General' },
    },
    agentAvatarBg: {
      control: 'color',
      description: 'Background color for agent avatar',
      table: { category: 'General' },
    },
    bodyBg: {
      control: 'color',
      description: 'Background color of messages container',
      table: { category: 'General' },
    },
    accentColor: {
      control: 'color',
      description: 'Primary brand accent color',
      table: { category: 'General' },
    },

    // --- Visitor Bubble Customization ---
    visitorBubbleBg: {
      control: 'color',
      description: 'Visitor message bubble background',
      table: { category: 'Visitor Bubble' },
    },
    visitorBubbleTextColor: {
      control: 'color',
      description: 'Visitor message bubble text color',
      table: { category: 'Visitor Bubble' },
    },
    visitorBubbleBorderColor: {
      control: 'color',
      description: 'Visitor message bubble border color',
      table: { category: 'Visitor Bubble' },
    },
    visitorBubbleBorderRadius: {
      control: 'text',
      description: 'Visitor message bubble border radius',
      table: { category: 'Visitor Bubble' },
    },
    visitorBubbleFontSize: {
      control: 'text',
      description: 'Visitor message font size',
      table: { category: 'Visitor Bubble' },
    },

    // --- Agent Bubble Customization ---
    agentBubbleBg: {
      control: 'color',
      description: 'Agent message bubble background',
      table: { category: 'Agent Bubble' },
    },
    agentBubbleTextColor: {
      control: 'color',
      description: 'Agent message bubble text color',
      table: { category: 'Agent Bubble' },
    },
    agentBubbleBorderColor: {
      control: 'color',
      description: 'Agent message bubble border color',
      table: { category: 'Agent Bubble' },
    },
    agentBubbleBorderRadius: {
      control: 'text',
      description: 'Agent message bubble border radius',
      table: { category: 'Agent Bubble' },
    },
    agentBubbleFontSize: {
      control: 'text',
      description: 'Agent message font size',
      table: { category: 'Agent Bubble' },
    },

    // --- Welcome Card Customizations ---
    welcomeTitle: {
      control: 'text',
      description: 'Title text on welcome card',
      table: { category: 'Welcome Card' },
    },
    welcomeDescription: {
      control: 'text',
      description: 'Description text on welcome card',
      table: { category: 'Welcome Card' },
    },
    welcomeBgGradient: {
      control: 'text',
      description: 'Background CSS gradient for welcome view',
      table: { category: 'Welcome Card' },
    },
    welcomeCardBg: {
      control: 'color',
      description: 'Welcome card background color',
      table: { category: 'Welcome Card' },
    },
    welcomeButtonBg: {
      control: 'color',
      description: 'Action button background color',
      table: { category: 'Welcome Card' },
    },
    welcomeButtonTextColor: {
      control: 'color',
      description: 'Action button text color',
      table: { category: 'Welcome Card' },
    },
    welcomeButtonText: {
      control: 'text',
      description: 'Action button main label',
      table: { category: 'Welcome Card' },
    },
    welcomeButtonSubtext: {
      control: 'text',
      description: 'Action button subtitle',
      table: { category: 'Welcome Card' },
    },

    // --- Composer & Footer Controls ---
    inputBorderRadius: {
      control: 'text',
      description: 'Border radius of input bar container (e.g. 9999px for pill curve, 8px for box shape)',
      table: { category: 'Composer & Footer' },
    },
    inputPlaceholder: {
      control: 'text',
      description: 'Composer input placeholder text',
      table: { category: 'Composer & Footer' },
    },
    inputBg: {
      control: 'color',
      description: 'Composer input background color',
      table: { category: 'Composer & Footer' },
    },
    inputTextColor: {
      control: 'color',
      description: 'Composer input text color',
      table: { category: 'Composer & Footer' },
    },
    sendButtonBgActive: {
      control: 'color',
      description: 'Send button active background',
      table: { category: 'Composer & Footer' },
    },
    footerBg: {
      control: 'color',
      description: 'Footer container background color',
      table: { category: 'Composer & Footer' },
    },
    poweredByText: {
      control: 'text',
      description: 'Powered by branding text',
      table: { category: 'Composer & Footer' },
    },
    poweredByLink: {
      control: 'text',
      description: 'Powered by link URL',
      table: { category: 'Composer & Footer' },
    },
    showTypingIndicator: {
      control: 'boolean',
      description: 'Toggle agent typing indicator',
      table: { category: 'Composer & Footer' },
    },
    queuePosition: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Queue position number for queued state',
      table: { category: 'Composer & Footer' },
    },
  },
};

export const ConfigurableChatBody = {
  args: {
    state: 'active',
    clientName: 'Zotly Support',
    agentName: 'Sarah Connor',
    agentAvatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    agentAvatarBg: '#0b5fff',
    bodyBg: '#f8fafc',
    accentColor: '#0b5fff',

    // Visitor Bubble
    visitorBubbleBg: '#0b5fff',
    visitorBubbleTextColor: '#ffffff',
    visitorBubbleBorderColor: 'transparent',
    visitorBubbleBorderRadius: '16px 16px 4px 16px',
    visitorBubbleFontSize: '14px',

    // Agent Bubble
    agentBubbleBg: '#ffffff',
    agentBubbleTextColor: '#1f2937',
    agentBubbleBorderColor: '#e5e7eb',
    agentBubbleBorderRadius: '16px 16px 16px 4px',
    agentBubbleFontSize: '14px',

    // Welcome Card
    welcomeTitle: 'Hi there! 👋 How can we help you today?',
    welcomeDescription: 'Our support heroes are standing by to assist you in real time.',
    welcomeBgGradient: 'linear-gradient(135deg, #0b5fff, #22d3ee)',
    welcomeCardBg: 'rgba(255, 255, 255, 0.15)',
    welcomeButtonBg: '#ffffff',
    welcomeButtonTextColor: '#0f172a',
    welcomeButtonText: 'Start Conversation',
    welcomeButtonSubtext: 'Typically replies in 5 minutes',

    // Composer & Footer
    inputBorderRadius: '9999px',
    inputPlaceholder: 'Write a message...',
    inputBg: '#ffffff',
    inputTextColor: '#1f2937',
    sendButtonBgActive: '#0b5fff',
    footerBg: '#ffffff',
    poweredByText: 'vAInatheya.ai',
    poweredByLink: 'https://vainatheya.ai',
    showTypingIndicator: true,
    queuePosition: 3,
  },
  render: (args: any) => {
    const chatWindowConfig = {
      bodyBg: args.bodyBg,
      accentColor: args.accentColor,
      agentAvatarBg: args.agentAvatarBg,
      agentAvatarUrl: args.agentAvatarUrl,

      // Visitor Bubbles
      visitorBubbleBg: args.visitorBubbleBg,
      visitorBubbleColor: args.visitorBubbleTextColor,
      visitorBubbleBorderColor: args.visitorBubbleBorderColor,
      visitorBubbleBorderRadius: args.visitorBubbleBorderRadius,
      visitorBubbleFontSize: args.visitorBubbleFontSize,

      // Agent Bubbles
      agentBubbleBg: args.agentBubbleBg,
      agentBubbleColor: args.agentBubbleTextColor,
      agentBubbleBorderColor: args.agentBubbleBorderColor,
      agentBubbleBorderRadius: args.agentBubbleBorderRadius,
      agentBubbleFontSize: args.agentBubbleFontSize,

      // Welcome Card
      welcome: {
        enabled: true,
        title: args.welcomeTitle,
        description: args.welcomeDescription,
        bgGradient: args.welcomeBgGradient,
        cardBg: args.welcomeCardBg,
        buttonBg: args.welcomeButtonBg,
        buttonTextColor: args.welcomeButtonTextColor,
        buttonText: args.welcomeButtonText,
        buttonSubtext: args.welcomeButtonSubtext,
        avatars: [args.agentAvatarUrl],
      },

      // Composer & Footer
      inputBorderRadius: args.inputBorderRadius,
      inputPlaceholder: args.inputPlaceholder,
      inputBg: args.inputBg,
      inputTextColor: args.inputTextColor,
      sendButtonBgActive: args.sendButtonBgActive,
      footerBg: args.footerBg,
      poweredByText: args.poweredByText,
      poweredByLink: args.poweredByLink,
    };

    const chatState = {
      state: args.state,
      clientName: args.clientName,
      agentName: args.agentName,
      position: args.queuePosition,
      typingName: args.showTypingIndicator ? args.agentName : '',
      draft: '',
      messages: [
        {
          key: 'm1',
          senderType: 'AGENT' as const,
          senderName: args.agentName,
          body: 'Hello! Welcome to Zotly Support. How can we help you build your widgets today?',
          created: new Date(Date.now() - 300000).toISOString(),
        },
        {
          key: 'm2',
          senderType: 'VISITOR' as const,
          body: 'Hi Sarah, I would like to customize the chat body colors and message bubbles.',
          created: new Date(Date.now() - 180000).toISOString(),
          status: 'read' as const,
        },
        {
          key: 'm3',
          senderType: 'AGENT' as const,
          senderName: args.agentName,
          body: 'Absolutely! You can customize background colors, message bubble styles, typography, and screens seamlessly.',
          created: new Date(Date.now() - 60000).toISOString(),
        },
      ],
    };

    return html`
      <div style="width: 380px; height: 550px; display: flex; flex-direction: column; border: 1px solid #e2e8f0; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);">
        <cw-chat-body
          .chatState="${chatState}"
          .chatWindowConfig="${chatWindowConfig}"
        ></cw-chat-body>
      </div>
    `;
  },
};
