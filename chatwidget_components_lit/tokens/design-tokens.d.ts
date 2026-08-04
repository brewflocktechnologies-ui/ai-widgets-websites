/**
 * Design Tokens for Zotly Chat Widget (Lit)
 * Maps all --cw-* CSS custom properties used in the Alpine widget.
 */
import { GLOBAL_STYLES } from './global-styles.js';
export { GLOBAL_STYLES };
export declare const CW_BG = "--cw-bg";
export declare const CW_SURFACE = "--cw-surface";
export declare const CW_BORDER = "--cw-border";
export declare const CW_INK = "--cw-ink";
export declare const CW_MUTED = "--cw-muted";
export declare const CW_GRAD = "--cw-grad";
export declare const CW_ACCENT = "--cw-accent";
export declare const CW_ACCENT_TINT = "--cw-accent-tint";
export declare const CW_ACCENT_DEEP = "--cw-accent-deep";
export declare const LIGHT_TOKENS: Record<string, string>;
export declare const DARK_TOKENS: Record<string, string>;
export declare const KEYFRAMES_CSS = "\n  #zotly-widget-embed, #zotly-widget-embed *, .panel, .panel * {\n    font-family: inherit !important;\n  }\n  @keyframes statusPulse {\n    0% { transform: scale(0.9); opacity: 0.65; }\n    50% { transform: scale(1.6); opacity: 0.3; }\n    100% { transform: scale(2.4); opacity: 0; }\n  }\n  @keyframes zotly-wiggle {\n    0%, 100% { transform: rotate(0deg); }\n    15% { transform: rotate(-8deg); }\n    30% { transform: rotate(6deg); }\n    45% { transform: rotate(-4deg); }\n    60% { transform: rotate(3deg); }\n    75% { transform: rotate(-1deg); }\n  }\n  @keyframes zotly-pulse {\n    0%, 100% { transform: scale(1); }\n    50% { transform: scale(1.08); }\n  }\n  @keyframes zotly-bounce {\n    0%, 100% { transform: translateY(0); }\n    50% { transform: translateY(-6px); }\n  }\n  @keyframes zotly-float {\n    0%, 100% { transform: translateY(0); }\n    50% { transform: translateY(-4px); }\n  }\n  @keyframes zotly-spin {\n    0% { transform: rotate(0deg); }\n    100% { transform: rotate(360deg); }\n  }\n  @keyframes fadeIn {\n    from { opacity: 0; transform: translateY(6px); }\n    to { opacity: 1; transform: translateY(0); }\n  }\n  @keyframes popIn {\n    0% { transform: scale(.9); opacity: 0; }\n    100% { transform: scale(1); opacity: 1; }\n  }\n  @keyframes slideUp {\n    from { transform: translateY(16px); opacity: 0; }\n    to { transform: translateY(0); opacity: 1; }\n  }\n  @keyframes dotBounce {\n    0%, 100% { transform: translateY(0); }\n    50% { transform: translateY(-6px); }\n  }\n  @keyframes dotPulse {\n    0%, 100% { transform: scale(1); }\n    50% { transform: scale(1.25); }\n  }\n  @keyframes typingBounce {\n    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }\n    30% { transform: translateY(-4px); opacity: 1; }\n  }\n  .anim-zotly-wiggle { animation: zotly-wiggle 2.5s infinite ease-in-out; }\n  .anim-zotly-pulse { animation: zotly-pulse 2s infinite ease-in-out; }\n  .anim-zotly-bounce { animation: zotly-bounce 2s infinite ease-in-out; }\n  .anim-zotly-float { animation: zotly-float 3s infinite ease-in-out; }\n  .anim-zotly-spin { animation: zotly-spin 4s infinite linear; }\n";
export declare function tokensToCss(tokens: Record<string, string>): string;
export declare function hostTokensCss(isDark?: boolean): string;
//# sourceMappingURL=design-tokens.d.ts.map