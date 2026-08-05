import { html } from 'lit';
import '../../components/atoms/cw-badge.js';

export default {
  title: 'Atoms/Badge',
  component: 'cw-badge',
  argTypes: {
    count: { control: 'number' },
  },
};

export const SingleDigit = {
  args: {
    count: 3,
  },
  render: (args: any) => html`
    <div style="position: relative; width: 60px; height: 60px; background: #e2e8f0; border-radius: 50%;">
      <cw-badge .count="${args.count}"></cw-badge>
    </div>
  `,
};

export const HighCount = {
  args: {
    count: 99,
  },
  render: (args: any) => html`
    <div style="position: relative; width: 60px; height: 60px; background: #e2e8f0; border-radius: 50%;">
      <cw-badge .count="${args.count}"></cw-badge>
    </div>
  `,
};
