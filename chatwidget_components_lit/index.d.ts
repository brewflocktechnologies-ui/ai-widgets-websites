/**
 * Main Entry Point for Chat Widget Components (Lit)
 * Exports all tokens, utils, store, and automatically registers custom web components.
 */
export * from './tokens/design-tokens.js';
export * from './utils/theme.js';
export * from './utils/config.js';
export { hexToRgba, getBorderRadius, getGradient, getBoxShadow, getInnerShadow, getCompositeBackground, getChatbarBackground, getChatbarFontSize, getChatbarIconWidth, getChatbarIconHeight, getTooltipBorderRadius, getAnimClass, formatTime } from './utils/style-helpers.js';
export * from './store/chat-store.js';
export * from './components/atoms/cw-icon.js';
export * from './components/atoms/cw-badge.js';
export * from './components/atoms/cw-typing-dots.js';
export * from './components/atoms/cw-message-tick.js';
export * from './components/atoms/cw-avatar.js';
export * from './components/molecules/cw-message-bubble.js';
export * from './components/molecules/cw-composer.js';
export * from './components/molecules/cw-greet-input.js';
export * from './components/molecules/cw-welcome-card.js';
export * from './components/molecules/cw-forms-preview.js';
export * from './components/organisms/cw-bubble.js';
export * from './components/organisms/cw-chatbar.js';
export * from './components/organisms/cw-greet-window.js';
export * from './components/organisms/cw-chat-header.js';
export * from './components/organisms/cw-chat-body.js';
export * from './components/organisms/cw-chat-panel.js';
export * from './components/templates/cw-widget-root.js';
export declare function mountChatWidget(container?: HTMLElement): HTMLElement;
//# sourceMappingURL=index.d.ts.map