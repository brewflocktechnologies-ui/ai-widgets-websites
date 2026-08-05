import { html } from 'lit';
import '../../components/templates/cw-widget-root.js';

export default {
  title: 'Templates/WidgetRoot',
  component: 'cw-widget-root',
};

export const LiveWidget = {
  render: () => html`
    <div style="position: relative; height: 600px; width: 100%;">
      <cw-widget-root></cw-widget-root>
    </div>
  `,
};
