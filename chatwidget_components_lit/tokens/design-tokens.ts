/**
 * Design Tokens for Zotly Chat Widget (Lit)
 * Maps all --cw-* CSS custom properties used in the Alpine widget.
 */

// NOTE: GLOBAL_STYLES (tokens/global-styles.ts, ~76 KB) is intentionally NOT
// re-exported here. Components style themselves from CORE_STYLES
// (tokens/core-styles.ts), which is the slimmed subset. Re-exporting the full
// blob from the package entry pinned it as a public export, so Rollup could not
// tree-shake it and every visitor downloaded the unused dashboard CSS.

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
export const CW_ACCENT_SOFT = '--cw-accent-soft';

// Expanded Semantic Token Constants (Backwards Compatible)
export const CW_FONT_FAMILY = '--cw-font-family';
export const CW_FONT_SIZE_XS = '--cw-font-size-xs';
export const CW_FONT_SIZE_SM = '--cw-font-size-sm';
export const CW_FONT_SIZE_MD = '--cw-font-size-md';
export const CW_FONT_SIZE_LG = '--cw-font-size-lg';
export const CW_FONT_SIZE_XL = '--cw-font-size-xl';
export const CW_FONT_SIZE_2XL = '--cw-font-size-2xl';

export const CW_SPACE_XS = '--cw-space-xs';
export const CW_SPACE_SM = '--cw-space-sm';
export const CW_SPACE_MD = '--cw-space-md';
export const CW_SPACE_LG = '--cw-space-lg';

export const CW_RADIUS_SM = '--cw-radius-sm';
export const CW_RADIUS_MD = '--cw-radius-md';
export const CW_RADIUS_LG = '--cw-radius-lg';
export const CW_RADIUS_FULL = '--cw-radius-full';

export const CW_SUCCESS = '--cw-success';
export const CW_WARNING = '--cw-warning';
export const CW_ERROR = '--cw-error';
export const CW_FOCUS_RING = '--cw-focus-ring';

// ---------------------------------------------------------------------------
// Token Default Values (light mode)
// NOTE: values are reconciled with tokens/global-styles.ts (@layer properties),
// which is the runtime source used by `var(--cw-*)` in the components.
// ---------------------------------------------------------------------------
export const LIGHT_TOKENS: Record<string, string> = {
  [CW_BG]: '#f6f7fa',
  [CW_SURFACE]: '#ffffff',
  [CW_BORDER]: '#e9ecf1',
  [CW_INK]: '#101828',
  [CW_MUTED]: '#667085',
  [CW_GRAD]: 'linear-gradient(135deg, var(--cw-accent), var(--cw-accent-deep))',
  [CW_ACCENT]: '#0b5fff',
  [CW_ACCENT_TINT]: 'color-mix(in srgb, var(--cw-accent) 14%, #ffffff)',
  [CW_ACCENT_DEEP]: 'color-mix(in srgb, var(--cw-accent) 74%, #101828)',
  [CW_ACCENT_SOFT]: 'color-mix(in srgb, var(--cw-accent) 8%, #ffffff)',

  // Expanded Semantic Tokens (Light)
  [CW_FONT_FAMILY]: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  [CW_FONT_SIZE_XS]: '0.75rem',
  [CW_FONT_SIZE_SM]: '0.875rem',
  [CW_FONT_SIZE_MD]: '1rem',
  [CW_FONT_SIZE_LG]: '1.125rem',
  [CW_FONT_SIZE_XL]: '1.5rem',
  [CW_FONT_SIZE_2XL]: '1.875rem',

  [CW_SPACE_XS]: '0.25rem',
  [CW_SPACE_SM]: '0.5rem',
  [CW_SPACE_MD]: '1rem',
  [CW_SPACE_LG]: '1.5rem',

  [CW_RADIUS_SM]: '0.375rem',
  [CW_RADIUS_MD]: '0.5rem',
  [CW_RADIUS_LG]: '1rem',
  [CW_RADIUS_FULL]: '9999px',

  [CW_SUCCESS]: '#10b981',
  [CW_WARNING]: '#f59e0b',
  [CW_ERROR]: '#f43f5e',
  [CW_FOCUS_RING]: '#0b5fff',
};

// ---------------------------------------------------------------------------
// Token Default Values (dark mode)
// NOTE: reconciled with tokens/global-styles.ts (`.dark` overrides).
// ---------------------------------------------------------------------------
export const DARK_TOKENS: Record<string, string> = {
  [CW_BG]: '#0f172a',
  [CW_SURFACE]: '#1e293b',
  [CW_BORDER]: '#334155',
  [CW_INK]: '#f8fafc',
  [CW_MUTED]: '#94a3b8',
  [CW_GRAD]: 'linear-gradient(135deg, var(--cw-accent), var(--cw-accent-deep))',
  [CW_ACCENT]: '#0b5fff',
  [CW_ACCENT_TINT]: 'rgba(11,95,255,0.15)',
  [CW_ACCENT_DEEP]: '#3b82f6',
  [CW_ACCENT_SOFT]: 'rgba(11,95,255,0.08)',

  // Expanded Semantic Tokens (Dark)
  [CW_FONT_FAMILY]: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  [CW_FONT_SIZE_XS]: '0.75rem',
  [CW_FONT_SIZE_SM]: '0.875rem',
  [CW_FONT_SIZE_MD]: '1rem',
  [CW_FONT_SIZE_LG]: '1.125rem',
  [CW_FONT_SIZE_XL]: '1.5rem',
  [CW_FONT_SIZE_2XL]: '1.875rem',

  [CW_SPACE_XS]: '0.25rem',
  [CW_SPACE_SM]: '0.5rem',
  [CW_SPACE_MD]: '1rem',
  [CW_SPACE_LG]: '1.5rem',

  [CW_RADIUS_SM]: '0.375rem',
  [CW_RADIUS_MD]: '0.5rem',
  [CW_RADIUS_LG]: '1rem',
  [CW_RADIUS_FULL]: '9999px',

  [CW_SUCCESS]: '#34d399',
  [CW_WARNING]: '#fbbf24',
  [CW_ERROR]: '#f87171',
  [CW_FOCUS_RING]: '#60a5fa',
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

export function tokensToCss(tokens: Record<string, string>): string {
  return Object.entries(tokens)
    .map(([k, v]) => `${k}: ${v};`)
    .join('\n  ');
}

export function hostTokensCss(isDark = false): string {
  const tokens = isDark ? DARK_TOKENS : LIGHT_TOKENS;
  return `:host { ${tokensToCss(tokens)} }`;
}
