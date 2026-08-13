import { html } from 'lit';
import '../../components/molecules/cw-form-field.js';

export default {
  title: 'Molecules/FormField',
  component: 'cw-form-field',
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    value: { control: 'text' },
    error: { control: 'text' },
  },
};

const renderField = (args: any) => html`
  <div style="max-width: 360px; padding: 24px; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; margin: 0 auto;">
    <cw-form-field
      .field="${args.field}"
      .value="${args.value || ''}"
      .error="${args.error || ''}"
      ?disabled="${args.disabled}"
    ></cw-form-field>
  </div>
`;

export const TextField = {
  args: {
    field: {
      name: 'fullName',
      label: 'Full Name',
      type: 'text',
      required: true,
      placeholder: 'John Doe',
    },
    value: '',
  },
  render: renderField,
};

export const EmailField = {
  args: {
    field: {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      placeholder: 'john@example.com',
    },
    value: 'john@example.com',
  },
  render: renderField,
};

export const TextareaField = {
  args: {
    field: {
      name: 'message',
      label: 'Message',
      type: 'textarea',
      required: true,
      placeholder: 'Write your message here...',
      rows: 4,
    },
    value: '',
  },
  render: renderField,
};

export const SelectField = {
  args: {
    field: {
      name: 'department',
      label: 'Department',
      type: 'select',
      required: true,
      placeholder: 'Select a department',
      options: [
        { value: 'sales', label: 'Sales & Inquiries' },
        { value: 'support', label: 'Technical Support' },
        { value: 'billing', label: 'Billing & Accounting' },
      ],
    },
    value: '',
  },
  render: renderField,
};

export const WithValidationError = {
  args: {
    field: {
      name: 'email',
      label: 'Work Email',
      type: 'email',
      required: true,
      placeholder: 'you@company.com',
    },
    value: 'invalid-email',
    error: 'Please enter a valid email address',
  },
  render: renderField,
};

export const DisabledField = {
  args: {
    field: {
      name: 'username',
      label: 'Username',
      type: 'text',
      required: false,
      placeholder: 'Read-only field',
    },
    value: 'john_doe_99',
    disabled: true,
  },
  render: renderField,
};
