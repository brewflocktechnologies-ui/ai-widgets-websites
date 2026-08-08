import { html } from 'lit';
import '../../components/templates/cw-widget-root.js';
import { updateStoreConfig } from '../../store/chat-store.js';

export default {
  title: 'Templates/WidgetRoot',
  component: 'cw-widget-root',
  argTypes: {
    enableWelcomeCard: { control: 'boolean', name: 'Enable Welcome Card' },
    enableGreetWindow: { control: 'boolean', name: 'Enable Greet Window' },
    enableInputCard: { control: 'boolean', name: 'Enable Input Card' },
    triggerType: { control: 'select', options: ['bubble', 'chatbar', 'chatcard'], name: 'Trigger Type' },
    greetDelaySec: { control: { type: 'number', min: 0, max: 10, step: 0.5 }, name: 'Greet Window Delay (sec)' },
    greetAnimOpenSec: { control: { type: 'number', min: 0.1, max: 3, step: 0.1 }, name: 'Greet Open Anim Duration (sec)' },
    greetAnimCloseSec: { control: { type: 'number', min: 0.1, max: 3, step: 0.1 }, name: 'Greet Close Anim Duration (sec)' },
    inputBoxDelaySec: { control: { type: 'number', min: 0, max: 10, step: 0.5 }, name: 'Input Box Delay (sec)' },
    inputBoxAnimOpenSec: { control: { type: 'number', min: 0.1, max: 3, step: 0.1 }, name: 'Input Box Anim Duration (sec)' },
    chatAnimStyle: { control: 'select', options: ['drop-in', 'slide-up', 'pop-in', 'fade-in'], name: 'Chat Panel Anim Style' },
    chatAnimOpenSec: { control: { type: 'number', min: 0.1, max: 3, step: 0.1 }, name: 'Chat Panel Open Anim Duration (sec)' },
    chatAnimCloseSec: { control: { type: 'number', min: 0.1, max: 3, step: 0.1 }, name: 'Chat Panel Close Anim Duration (sec)' },
  },
};

export const ConfigurableLiveWidget = {
  args: {
    enableWelcomeCard: true,
    enableGreetWindow: true,
    enableInputCard: true,
    triggerType: 'bubble',
    greetDelaySec: 2.0,
    greetAnimOpenSec: 0.3,
    greetAnimCloseSec: 0.3,
    inputBoxDelaySec: 4.0,
    inputBoxAnimOpenSec: 0.5,
    chatAnimStyle: 'drop-in',
    chatAnimOpenSec: 0.35,
    chatAnimCloseSec: 0.25,
  },
  render: (args: any) => {
    updateStoreConfig({
      enableWelcomeCard: args.enableWelcomeCard,
      enableGreetWindow: args.enableGreetWindow,
      enableInputCard: args.enableInputCard,
      triggerType: args.triggerType,
      greetDelaySec: args.greetDelaySec,
      greetAnimOpenSec: args.greetAnimOpenSec,
      greetAnimCloseSec: args.greetAnimCloseSec,
      inputBoxDelaySec: args.inputBoxDelaySec,
      inputBoxAnimOpenSec: args.inputBoxAnimOpenSec,
      chatAnimStyle: args.chatAnimStyle,
      chatAnimOpenSec: args.chatAnimOpenSec,
      chatAnimCloseSec: args.chatAnimCloseSec,
    });

    return html`
      <div style="position: relative; height: 650px; width: 420px;">
        <cw-widget-root></cw-widget-root>
      </div>
    `;
  },
};