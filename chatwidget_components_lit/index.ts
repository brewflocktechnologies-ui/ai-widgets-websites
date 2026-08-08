/**
 * Main Entry Point for Chat Widget Components (Lit)
 * Exports all tokens, utils, store, and automatically registers custom web components.
 */

export * from './tokens/design-tokens.js';
export * from './tokens/core-styles.js';
export * from './tokens/accessibility.js';
export * from './tokens/default-theme.js';
export * from './tokens/merge.js';
export * from './tokens/css.js';
export * from './utils/theme.js';
export * from './utils/config.js';
export * from './utils/transition.js';
export {
  hexToRgba,
  getBorderRadius,
  getGradient,
  getBoxShadow,
  getInnerShadow,
  getCompositeBackground,
  getChatbarBackground,
  getChatbarFontSize,
  getChatbarIconWidth,
  getChatbarIconHeight,
  getTooltipBorderRadius,
  getAnimClass,
  formatTime
} from './utils/style-helpers.js';
export * from './store/chat-store.js';
import { injectStoreConfig } from './store/chat-store.js';

// Atoms
export * from './components/atoms/cw-icon.js';
export * from './components/atoms/cw-badge.js';
export * from './components/atoms/cw-typing-dots.js';
export * from './components/atoms/cw-message-tick.js';
export * from './components/atoms/cw-avatar.js';

// Molecules
export * from './components/molecules/cw-message-bubble.js';
export * from './components/molecules/cw-composer.js';
export * from './components/molecules/cw-greet-input.js';
export * from './components/molecules/cw-welcome-card.js';
export * from './components/molecules/cw-forms-preview.js';
export * from './components/molecules/cw-image-cropper.js';

// Organisms
export * from './components/organisms/cw-bubble.js';
export * from './components/organisms/cw-chatbar.js';
export * from './components/organisms/cw-greet-window.js';
export * from './components/molecules/cw-chat-header.js';
export * from './components/organisms/cw-chat-body.js';
export * from './components/organisms/cw-chat-panel.js';

// Templates
export * from './components/templates/cw-widget-root.js';

// Auto-mount function helper for script tag usage
export function mountChatWidget(container: HTMLElement = document.body): HTMLElement {
  let root = container.querySelector<HTMLElement>('cw-widget-root');
  if (!root) {
    root = document.createElement('cw-widget-root');
    container.appendChild(root);
  }
  return root;
}

/**
 * Mounts the widget into container and hydrates the store using the provided JSON token.
 */
export function mountChatWidgetWithToken(
  token: Record<string, any>,
  container: HTMLElement = document.body
): HTMLElement {
  if (token) {
    injectStoreConfig(token);
  }
  return mountChatWidget(container);
}


