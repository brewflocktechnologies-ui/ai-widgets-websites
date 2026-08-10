import { html } from 'lit';
import '../../components/templates/cw-widget-root.js';

export default {
  title: 'Templates/WidgetRoot',
  component: 'cw-widget-root',
  argTypes: {
    // -------------------------------------------------------------------------
    // 1. Theme & Layout
    // -------------------------------------------------------------------------
    clientName: { control: 'text', name: 'Client Name', table: { category: '1. Widget & Layout' } },
    agentName: { control: 'text', name: 'Agent Name', table: { category: '1. Widget & Layout' } },
    widgetWidth: { control: { type: 'number', min: 280, max: 600 }, name: 'Widget Width (px)', table: { category: '1. Widget & Layout' } },
    widgetHeight: { control: { type: 'number', min: 400, max: 900 }, name: 'Widget Height (px)', table: { category: '1. Widget & Layout' } },
    accentColor: { control: 'color', name: 'Accent Color', table: { category: '1. Widget & Layout' } },

    // -------------------------------------------------------------------------
    // 2. Trigger Controls & Offsets
    // -------------------------------------------------------------------------
    triggerType: { control: 'select', options: ['bubble', 'chatbar', 'chatcard'], name: 'Trigger Type', table: { category: '2. Trigger & Positioning' } },
    bubbleOffsetRight: { control: { type: 'number', min: 0, max: 100 }, name: 'Bubble Offset Right (px)', table: { category: '2. Trigger & Positioning' } },
    bubbleOffsetBottom: { control: { type: 'number', min: 0, max: 100 }, name: 'Bubble Offset Bottom (px)', table: { category: '2. Trigger & Positioning' } },
    barOffsetRight: { control: { type: 'number', min: 0, max: 100 }, name: 'Chat Bar Offset Right (px)', table: { category: '2. Trigger & Positioning' } },
    barOffsetBottom: { control: { type: 'number', min: 0, max: 100 }, name: 'Chat Bar Offset Bottom (px)', table: { category: '2. Trigger & Positioning' } },
    cardOffsetRight: { control: { type: 'number', min: 0, max: 100 }, name: 'Chat Card Offset Right (px)', table: { category: '2. Trigger & Positioning' } },
    cardOffsetBottom: { control: { type: 'number', min: 0, max: 100 }, name: 'Chat Card Offset Bottom (px)', table: { category: '2. Trigger & Positioning' } },
    bubbleBg: { control: 'color', name: 'Bubble Background Color', table: { category: '2. Trigger & Positioning' } },
    bubbleLucideIcon: { control: 'text', name: 'Bubble Icon', table: { category: '2. Trigger & Positioning' } },
    bubbleIconColor: { control: 'color', name: 'Bubble Icon Color', table: { category: '2. Trigger & Positioning' } },
    chatbarBg: { control: 'color', name: 'Chat Bar Background Color', table: { category: '2. Trigger & Positioning' } },
    chatbarText: { control: 'text', name: 'Chat Bar Text', table: { category: '2. Trigger & Positioning' } },
    chatcardText: { control: 'text', name: 'Chat Card Text', table: { category: '2. Trigger & Positioning' } },

    // -------------------------------------------------------------------------
    // 3. Header Controls
    // -------------------------------------------------------------------------
    headerBg: { control: 'color', name: 'Header Background', table: { category: '3. Header' } },
    headerTextColor: { control: 'color', name: 'Header Text Color', table: { category: '3. Header' } },
    enableVoiceCall: { control: 'boolean', name: 'Enable Voice Call', table: { category: '3. Header' } },
    enableVideoCall: { control: 'boolean', name: 'Enable Video Call', table: { category: '3. Header' } },
    enableCloseChatVisitor: { control: 'boolean', name: 'Enable Close Chat', table: { category: '3. Header' } },

    // -------------------------------------------------------------------------
    // 4. Welcome Card Controls
    // -------------------------------------------------------------------------
    enableWelcomeCard: { control: 'boolean', name: 'Enable Welcome Card', table: { category: '4. Welcome Card' } },
    welcomeTitle: { control: 'text', name: 'Welcome Title', table: { category: '4. Welcome Card' } },
    welcomeDescription: { control: 'text', name: 'Welcome Description', table: { category: '4. Welcome Card' } },
    welcomeBgGradient: { control: 'text', name: 'Welcome Background Gradient', table: { category: '4. Welcome Card' } },
    welcomeButtonText: { control: 'text', name: 'Welcome Button Text', table: { category: '4. Welcome Card' } },

    // -------------------------------------------------------------------------
    // 5. Proactive Greet Window Controls
    // -------------------------------------------------------------------------
    enableGreetWindow: { control: 'boolean', name: 'Enable Greet Window', table: { category: '5. Proactive Greet Window' } },
    greetTitle: { control: 'text', name: 'Greet Title', table: { category: '5. Proactive Greet Window' } },
    greetDescription: { control: 'text', name: 'Greet Description', table: { category: '5. Proactive Greet Window' } },
    greetBg: { control: 'color', name: 'Greet Background', table: { category: '5. Proactive Greet Window' } },
    greetLucideIcon: { control: 'text', name: 'Greet Icon', table: { category: '5. Proactive Greet Window' } },
    enableInputCard: { control: 'boolean', name: 'Enable Quick Input Box', table: { category: '5. Proactive Greet Window' } },
    greetInputPlaceholder: { control: 'text', name: 'Quick Input Placeholder', table: { category: '5. Proactive Greet Window' } },

    // -------------------------------------------------------------------------
    // 6. Chat Body & Messages
    // -------------------------------------------------------------------------
    bodyBg: { control: 'color', name: 'Body Background', table: { category: '6. Messages & Bubbles' } },
    visitorBubbleBg: { control: 'color', name: 'Visitor Bubble Background', table: { category: '6. Messages & Bubbles' } },
    visitorBubbleTextColor: { control: 'color', name: 'Visitor Bubble Text Color', table: { category: '6. Messages & Bubbles' } },
    agentBubbleBg: { control: 'color', name: 'Agent Bubble Background', table: { category: '6. Messages & Bubbles' } },
    agentBubbleTextColor: { control: 'color', name: 'Agent Bubble Text Color', table: { category: '6. Messages & Bubbles' } },

    // -------------------------------------------------------------------------
    // 7. Composer / Input Field Controls
    // -------------------------------------------------------------------------
    inputBg: { control: 'color', name: 'Input Box Background', table: { category: '7. Composer & Input' } },
    inputTextColor: { control: 'color', name: 'Input Text Color', table: { category: '7. Composer & Input' } },
    sendButtonBgActive: { control: 'color', name: 'Send Button Color', table: { category: '7. Composer & Input' } },
    attachmentsEnabled: { control: 'boolean', name: 'Enable Attachments', table: { category: '7. Composer & Input' } },
    modernUi: { control: 'boolean', name: 'Enable Modern UI / Emoji', table: { category: '7. Composer & Input' } },
  },
};

export const FullyConfigurableWidget = {
  args: {
    // 1. Theme & Layout
    clientName: 'Zotly Support',
    agentName: 'Sarah',
    widgetWidth: 380,
    widgetHeight: 620,
    accentColor: '#0b5fff',

    // 2. Trigger & Positioning
    triggerType: 'bubble',
    bubbleOffsetRight: 28,
    bubbleOffsetBottom: 12,
    barOffsetRight: 24,
    barOffsetBottom: 16,
    cardOffsetRight: 20,
    cardOffsetBottom: 20,
    bubbleBg: '#0b5fff',
    bubbleLucideIcon: 'MessageCircle',
    bubbleIconColor: '#ffffff',
    chatbarBg: '#0b5fff',
    chatbarText: 'Chat with us',
    chatcardText: 'Questions about AI solutions?',

    // 3. Header
    headerBg: '#f4f4f5',
    headerTextColor: '#18181b',
    enableVoiceCall: false,
    enableVideoCall: false,
    enableCloseChatVisitor: true,

    // 4. Welcome Card
    enableWelcomeCard: true,
    welcomeTitle: 'Hi there! 👋 How can we help you today?',
    welcomeDescription: 'Our support heroes are here to assist you.',
    welcomeBgGradient: 'linear-gradient(135deg, #0b5fff, #0284c7)',
    welcomeButtonText: 'Start Conversation',

    // 5. Proactive Greet Window
    enableGreetWindow: true,
    greetTitle: 'Hi there! 👋 Need help growing your business using AI?',
    greetDescription: "Let's chat & find the right solution for you!",
    greetBg: '#ffffff',
    greetLucideIcon: 'Sparkles',
    enableInputCard: true,
    greetInputPlaceholder: 'Write your message...',

    // 6. Messages & Bubbles
    bodyBg: '#f4f4f5',
    visitorBubbleBg: '#0b5fff',
    visitorBubbleTextColor: '#ffffff',
    agentBubbleBg: '#ffffff',
    agentBubbleTextColor: '#111827',

    // 7. Composer & Input
    inputBg: '#ffffff',
    inputTextColor: '#18181b',
    sendButtonBgActive: '#0b5fff',
    attachmentsEnabled: true,
    modernUi: true,
  },
  render: (args: any) => {
    return html`
      <div style="position: relative; height: 680px; width: 440px;">
        <cw-widget-root
          .triggerType="${args.triggerType}"
          .bubbleOffsetRight="${args.bubbleOffsetRight}"
          .bubbleOffsetBottom="${args.bubbleOffsetBottom}"
          .barOffsetRight="${args.barOffsetRight}"
          .barOffsetBottom="${args.barOffsetBottom}"
          .cardOffsetRight="${args.cardOffsetRight}"
          .cardOffsetBottom="${args.cardOffsetBottom}"
          .clientName="${args.clientName}"
          .agentName="${args.agentName}"
          .widgetWidth="${args.widgetWidth}"
          .widgetHeight="${args.widgetHeight}"
          .accentColor="${args.accentColor}"
          .bubbleBg="${args.bubbleBg}"
          .bubbleLucideIcon="${args.bubbleLucideIcon}"
          .bubbleIconColor="${args.bubbleIconColor}"
          .chatbarBg="${args.chatbarBg}"
          .chatbarText="${args.chatbarText}"
          .chatcardText="${args.chatcardText}"
          .headerBg="${args.headerBg}"
          .headerTextColor="${args.headerTextColor}"
          .enableVoiceCall="${args.enableVoiceCall}"
          .enableVideoCall="${args.enableVideoCall}"
          .enableCloseChatVisitor="${args.enableCloseChatVisitor}"
          .enableWelcomeCard="${args.enableWelcomeCard}"
          .welcomeTitle="${args.welcomeTitle}"
          .welcomeDescription="${args.welcomeDescription}"
          .welcomeBgGradient="${args.welcomeBgGradient}"
          .welcomeButtonText="${args.welcomeButtonText}"
          .enableGreetWindow="${args.enableGreetWindow}"
          .greetTitle="${args.greetTitle}"
          .greetDescription="${args.greetDescription}"
          .greetBg="${args.greetBg}"
          .greetLucideIcon="${args.greetLucideIcon}"
          .enableInputCard="${args.enableInputCard}"
          .greetInputPlaceholder="${args.greetInputPlaceholder}"
          .bodyBg="${args.bodyBg}"
          .visitorBubbleBg="${args.visitorBubbleBg}"
          .visitorBubbleTextColor="${args.visitorBubbleTextColor}"
          .agentBubbleBg="${args.agentBubbleBg}"
          .agentBubbleTextColor="${args.agentBubbleTextColor}"
          .inputBg="${args.inputBg}"
          .inputTextColor="${args.inputTextColor}"
          .sendButtonBgActive="${args.sendButtonBgActive}"
          .attachmentsEnabled="${args.attachmentsEnabled}"
          .modernUi="${args.modernUi}"
        ></cw-widget-root>
      </div>
    `;
  },
};
