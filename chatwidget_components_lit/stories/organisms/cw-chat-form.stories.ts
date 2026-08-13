import { html } from 'lit';
import '../../components/organisms/cw-chat-form.js';
import {
  PRECHAT_SCHEMA,
  OFFLINE_SCHEMA,
  POSTCHAT_SCHEMA,
  TICKET_SCHEMA,
} from '../../tokens/form-schemas.js';

const panelFrame = (story: any) => html`
  <div style="width: 350px; height: 550px; border-radius: 24px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,.12); background: var(--cw-bg, #f6f7fa); display: flex; flex-direction: column; margin: 20px auto;">
    ${story()}
  </div>
`;

export default {
  title: 'Organisms/ChatForm',
  component: 'cw-chat-form',
  tags: ['autodocs'],
  decorators: [panelFrame],
  argTypes: {
    submitting: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export const Prechat = {
  args: {
    schema: PRECHAT_SCHEMA,
    values: {},
  },
};

export const Offline = {
  args: {
    schema: OFFLINE_SCHEMA,
    values: {},
  },
};

export const Postchat = {
  args: {
    schema: POSTCHAT_SCHEMA,
    values: {},
  },
};

export const Ticket = {
  args: {
    schema: TICKET_SCHEMA,
    values: {},
  },
};

export const WithErrors = {
  args: {
    schema: PRECHAT_SCHEMA,
    values: { name: 'John Doe', email: 'invalid-email' },
    errors: { email: 'Enter a valid email address' },
  },
};

export const Submitting = {
  args: {
    schema: PRECHAT_SCHEMA,
    values: { name: 'John Doe', email: 'john@example.com' },
    submitting: true,
  },
};
