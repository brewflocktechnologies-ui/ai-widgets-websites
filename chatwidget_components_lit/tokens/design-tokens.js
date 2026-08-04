/**
 * Design Tokens for Zotly Chat Widget (Lit)
 * Maps all --cw-* CSS custom properties used in the Alpine widget.
 */
import { GLOBAL_STYLES } from './global-styles.js';
export { GLOBAL_STYLES };
// ---------------------------------------------------------------------------
// CSS Variable Name Constants
// ---------------------------------------------------------------------------
export const CW_BG = '--cw-bg';
export const CW_SURFACE = '--cw-surface';
export const CW_BORDER = '--cw-border';
export const CW_INK = '--cw-ink';
export const CW_MUTED = '--cw-muted';
export const CW_GRAD = '--cw-grad';
export const CW_ACCENT = '--cw-accent';
export const CW_ACCENT_TINT = '--cw-accent-tint';
export const CW_ACCENT_DEEP = '--cw-accent-deep';
// ---------------------------------------------------------------------------
// Token Default Values (light mode)
// ---------------------------------------------------------------------------
export const LIGHT_TOKENS = {
    [CW_BG]: '#ffffff',
    [CW_SURFACE]: '#f8fafc',
    [CW_BORDER]: '#e5e7eb',
    [CW_INK]: '#0f172a',
    [CW_MUTED]: '#71717a',
    [CW_GRAD]: 'linear-gradient(135deg, #0b5fff, #22d3ee)',
    [CW_ACCENT]: '#0b5fff',
    [CW_ACCENT_TINT]: 'rgba(11,95,255,0.1)',
    [CW_ACCENT_DEEP]: '#0040cc',
};
// ---------------------------------------------------------------------------
// Token Default Values (dark mode)
// ---------------------------------------------------------------------------
export const DARK_TOKENS = {
    [CW_BG]: '#18181b',
    [CW_SURFACE]: '#27272a',
    [CW_BORDER]: '#3f3f46',
    [CW_INK]: '#f4f4f5',
    [CW_MUTED]: '#a1a1aa',
    [CW_GRAD]: 'linear-gradient(135deg, #0b5fff, #22d3ee)',
    [CW_ACCENT]: '#0b5fff',
    [CW_ACCENT_TINT]: 'rgba(11,95,255,0.15)',
    [CW_ACCENT_DEEP]: '#3b82f6',
};
// ---------------------------------------------------------------------------
// Keyframe & animation CSS injected into Shadow DOM styles
// ---------------------------------------------------------------------------
export const KEYFRAMES_CSS = `
  #zotly-widget-embed, #zotly-widget-embed *, .panel, .panel * {
    font-family: inherit !important;
  }
  @keyframes statusPulse {
    0% { transform: scale(0.9); opacity: 0.65; }
    50% { transform: scale(1.6); opacity: 0.3; }
    100% { transform: scale(2.4); opacity: 0; }
  }
  @keyframes zotly-wiggle {
    0%, 100% { transform: rotate(0deg); }
    15% { transform: rotate(-8deg); }
    30% { transform: rotate(6deg); }
    45% { transform: rotate(-4deg); }
    60% { transform: rotate(3deg); }
    75% { transform: rotate(-1deg); }
  }
  @keyframes zotly-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.08); }
  }
  @keyframes zotly-bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
  @keyframes zotly-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }
  @keyframes zotly-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes popIn {
    0% { transform: scale(.9); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes slideUp {
    from { transform: translateY(16px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes dotBounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
  @keyframes dotPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.25); }
  }
  @keyframes typingBounce {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
    30% { transform: translateY(-4px); opacity: 1; }
  }
  .anim-zotly-wiggle { animation: zotly-wiggle 2.5s infinite ease-in-out; }
  .anim-zotly-pulse { animation: zotly-pulse 2s infinite ease-in-out; }
  .anim-zotly-bounce { animation: zotly-bounce 2s infinite ease-in-out; }
  .anim-zotly-float { animation: zotly-float 3s infinite ease-in-out; }
  .anim-zotly-spin { animation: zotly-spin 4s infinite linear; }
`;
export function tokensToCss(tokens) {
    return Object.entries(tokens)
        .map(([k, v]) => `${k}: ${v};`)
        .join('\n  ');
}
export function hostTokensCss(isDark = false) {
    const tokens = isDark ? DARK_TOKENS : LIGHT_TOKENS;
    return `:host { ${tokensToCss(tokens)} }`;
}
//# sourceMappingURL=design-tokens.js.map