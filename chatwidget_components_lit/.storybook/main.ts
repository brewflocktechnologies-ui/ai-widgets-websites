import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.stories.ts',
    '../stories/**/*.mdx'
  ],

    addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-themes',
    '@storybook/addon-designs',
    '@chromatic-com/storybook',
  ],

  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  }
};

export default config;
