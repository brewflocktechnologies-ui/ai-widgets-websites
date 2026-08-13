/**
 * Defensive merge of an untrusted partial token-theme over the defaults.
 * Never throws: mismatches / invalid values fall back to the default and are
 * collected as warnings. Blocked: CSS injection inside non-copy string values.
 */

import {
  DEFAULT_TOKEN_THEME,
  type TokenTheme,
  type PartialTokenTheme,
} from './default-theme.js';
import type {
  BubbleState,
  ChatbarState,
  GreetWindowState,
  ChatWindowState,
  FeaturesState,
} from '../store/types.js';
import { CHATBAR_BAR_PRESET, CHATBAR_CARD_PRESET } from './chatbar-presets.js';
import { getParentTheme } from '../utils/theme.js';

export interface MergeResult {
  theme: TokenTheme;
  warnings: string[];
}

/** A string is a CSS-injection attempt when it could close a rule and start another. */
function isCssInjection(value: string): boolean {
  const lower = value.toLowerCase();
  return (
    (value.includes(';') && (value.includes('{') || value.includes('}'))) ||
    lower.includes('</style') ||
    lower.includes('</script')
  );
}

interface GroupDef {
  key: keyof TokenTheme;
  prefix: string;
  copy?: boolean;
}

const GROUPS: GroupDef[] = [
  { key: 'colors', prefix: 'colors' },
  { key: 'status', prefix: 'status' },
  { key: 'typography', prefix: 'typography' },
  { key: 'spacing', prefix: 'spacing' },
  { key: 'radius', prefix: 'radius' },
];

/** Merge one flat token sub-object over its default, validating each entry. */
function mergeRecords<T extends Record<string, string>>(
  base: T,
  override: Record<string, unknown> | undefined,
  name: string,
  warnings: string[]
): T {
  const out: T = { ...base };
  if (!override || typeof override !== 'object') return out;

  for (const key of Object.keys(override)) {
    const value = (override as Record<string, unknown>)[key];

    // Unknown token in this group
    if (!(key in base)) {
      warnings.push(`unknown '${name}.${key}' ignored`);
      continue;
    }
    // Type mismatch
    if (typeof value !== 'string') {
      warnings.push(`'${name}.${key}' must be a string; using default`);
      continue;
    }
    // CSS-injection guard
    if (isCssInjection(value)) {
      warnings.push(`'${name}.${key}' rejected (suspicious value)`);
      continue;
    }
    (out as Record<string, string>)[key] = value;
  }
  return out;
}

/**
 * Deeply merge an untrusted partial theme over the defaults. Never throws.
 * Returns the valid theme plus a log of everything it rejected.
 */
export function mergeTheme(
  partial: PartialTokenTheme | undefined,
  defaults: TokenTheme = DEFAULT_TOKEN_THEME
): MergeResult {
  const warnings: string[] = [];
  const p = (partial && typeof partial === 'object' ? partial : {}) as PartialTokenTheme;

  // validate the version enum
  let version = defaults.version;
  if (p.version !== undefined) {
    if (p.version === 'v1') {
      version = p.version;
    } else {
      warnings.push(`unsupported version '${p.version}' — using '${defaults.version}'`);
    }
  }

  const theme: TokenTheme = {
    version,
    colors: mergeRecords({ ...defaults.colors }, p.colors, 'colors', warnings) as TokenTheme['colors'],
    status: mergeRecords({ ...defaults.status }, p.status, 'status', warnings) as TokenTheme['status'],
    typography: mergeRecords({ ...defaults.typography }, p.typography, 'typography', warnings) as TokenTheme['typography'],
    spacing: mergeRecords({ ...defaults.spacing }, p.spacing, 'spacing', warnings) as TokenTheme['spacing'],
    radius: mergeRecords({ ...defaults.radius }, p.radius, 'radius', warnings) as TokenTheme['radius'],
    grad: defaults.grad,
  };

  if (typeof p.grad === 'string' && !isCssInjection(p.grad)) {
    theme.grad = p.grad;
  } else if (p.grad !== undefined && typeof p.grad !== 'string') {
    warnings.push("'grad' must be a string, using default");
  } else if (p.grad !== undefined) {
    warnings.push("'grad' rejected (suspicious CSS injection)");
  }

  // dark overrides
  const darkColorBase: Partial<TokenTheme['colors']> = defaults.dark?.colors || {};
  const darkStatusBase: Partial<TokenTheme['status']> = defaults.dark?.status || {};
  const darkColorOverride = (p as any)?.dark?.colors as Record<string, unknown> | undefined;
  const darkStatusOverride = (p as any)?.dark?.status as Record<string, unknown> | undefined;
  theme.dark = {
    colors: mergeRecords(darkColorBase, darkColorOverride, 'dark.colors', warnings),
    status: mergeRecords(darkStatusBase, darkStatusOverride, 'dark.status', warnings),
  };

  // unknown top-level keys
  const known = new Set<string>(['version', 'colors', 'status', 'typography', 'spacing', 'radius', 'grad', 'dark']);
  Object.keys(p).forEach((k) => {
    if (!known.has(k)) warnings.push(`unknown top-level key '${k}' ignored`);
  });

  return { theme, warnings };
}

/**
 * Sanitizes a fetched (untrusted) client config before it is merged into the
 * store: deep-clones and drops any string value that carries a CSS-injection
 * payload, so remote configs cannot inject styles/scripts.
 */
export function sanitizeConfig<T>(value: T, name = 'config'): { value: T; warnings: string[] } {
  const warnings: string[] = [];
  const walk = (node: unknown, path: string): unknown => {
    if (typeof node === 'string') {
      return isCssInjection(node) ? null : node;
    }
    if (Array.isArray(node)) {
      return node.map((item, i) => walk(item, `${path}[${i}]`));
    }
    if (node && typeof node === 'object') {
      const out: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(node)) {
        const cleaned = walk(v, `${path}.${k}`);
        if (cleaned !== null) out[k] = cleaned;
        else warnings.push(`${name}: removed '${path}.${k}' (suspicious CSS injection)`);
      }
      return out;
    }
    return node;
  };
  return { value: walk(value, '') as T, warnings };
}

// re-export for convenience
export { GROUPS };

// ---------------------------------------------------------------------------
// Pure Config Merge Functions for cw-widget-root
// ---------------------------------------------------------------------------

export function computeEffectiveChatbarConfig(
  host: Record<string, any>,
  cbs: ChatbarState = {} as ChatbarState,
  activeTrigger: string = 'bubble'
): ChatbarState {
  const useTheme = host.useWebsiteTheme !== undefined ? host.useWebsiteTheme : (cbs.useWebsiteTheme ?? true);
  const pTheme = useTheme ? getParentTheme() : null;

  const isChatbarTrigger = activeTrigger === 'chatbar' || activeTrigger === 'chatcard';
  const barRight = host.barOffsetRight !== undefined ? host.barOffsetRight : (cbs.barOffsetRight ?? cbs.offsetRight ?? 16);
  const barBottom = host.barOffsetBottom !== undefined ? host.barOffsetBottom : (cbs.barOffsetBottom ?? cbs.offsetBottom ?? 12);
  const cardRight = host.cardOffsetRight !== undefined ? host.cardOffsetRight : (cbs.cardOffsetRight ?? cbs.offsetRight ?? 16);
  const cardBottom = host.cardOffsetBottom !== undefined ? host.cardOffsetBottom : (cbs.cardOffsetBottom ?? cbs.offsetBottom ?? 12);

  const isCardLayout = (host.chatbarLayout || (activeTrigger === 'chatcard' ? 'card' : 'bar')) === 'card';
  const preset = isCardLayout ? CHATBAR_CARD_PRESET : CHATBAR_BAR_PRESET;

  const effectiveBg = host.chatbarBg || host.accentColor || (pTheme ? pTheme.primary : cbs.bgColor);

  return {
    ...preset,
    ...cbs,
    useWebsiteTheme: useTheme,
    enabled: isChatbarTrigger,
    layout: isCardLayout ? 'card' : 'bar',
    width: (host.chatbarWidth !== undefined && host.chatbarWidth !== CHATBAR_BAR_PRESET.width)
      ? host.chatbarWidth
      : preset.width,
    height: (host.chatbarHeight !== undefined && host.chatbarHeight !== CHATBAR_BAR_PRESET.height)
      ? host.chatbarHeight
      : preset.height,
    bgColor: effectiveBg,
    gradientEnabled: host.chatbarGradientEnabled !== undefined ? host.chatbarGradientEnabled : cbs.gradientEnabled,
    gradientStops: (host.chatbarGradientStart || host.chatbarGradientEnd)
      ? [
          { color: host.chatbarGradientStart || cbs.gradientStops?.[0]?.color || effectiveBg, pos: 0 },
          { color: host.chatbarGradientEnd || cbs.gradientStops?.[1]?.color || effectiveBg, pos: 100 },
        ]
      : cbs.gradientStops,
    borderRadius: (host.chatbarBorderRadius !== undefined && host.chatbarBorderRadius !== 20)
      ? { tl: host.chatbarBorderRadius, tr: host.chatbarBorderRadius, bl: host.chatbarBorderRadius, br: host.chatbarBorderRadius }
      : preset.borderRadius,
    padding: isCardLayout ? CHATBAR_CARD_PRESET.padding : (cbs.padding || CHATBAR_BAR_PRESET.padding),
    gap: isCardLayout ? CHATBAR_CARD_PRESET.gap : (cbs.gap ?? CHATBAR_BAR_PRESET.gap),
    text: host.chatbarText || cbs.text,
    cardText: host.chatcardText || cbs.cardText,
    textSize: host.chatbarTextSize || cbs.textSize,
    textColor: host.chatbarTextColor || cbs.textColor,
    lucideIcon: host.chatbarLucideIcon || cbs.lucideIcon,
    iconWidth: host.chatbarIconSize || cbs.iconWidth || preset.iconWidth || 36,
    iconHeight: host.chatbarIconSize || cbs.iconHeight || preset.iconHeight || 36,
    iconColor: host.chatbarIconColor || cbs.iconColor,
    barOffsetRight: barRight,
    barOffsetBottom: barBottom,
    cardOffsetRight: cardRight,
    cardOffsetBottom: cardBottom,
    offsetRight: activeTrigger === 'chatcard' ? cardRight : barRight,
    offsetBottom: activeTrigger === 'chatcard' ? cardBottom : barBottom,
  } as ChatbarState;
}

export function computeEffectiveBubbleConfig(
  host: Record<string, any>,
  bs: BubbleState = {} as BubbleState
): BubbleState {
  const useTheme = host.useWebsiteTheme !== undefined ? host.useWebsiteTheme : (bs.useWebsiteTheme ?? true);
  const pTheme = useTheme ? getParentTheme() : null;

  const effectiveBg = host.bubbleBg || host.accentColor || (pTheme ? pTheme.primary : bs.backgroundColor);
  const effectiveRingColor = host.bubbleOutlineRingColor || (pTheme ? pTheme.secondary : bs.outlineRing?.color);
  const effectiveBorderColor = host.bubbleBorderColor || host.accentColor || (pTheme ? pTheme.primary : bs.border?.color);

  return {
    ...bs,
    useWebsiteTheme: useTheme,
    width: host.bubbleWidth || bs.width,
    height: host.bubbleHeight || bs.height,
    hideOnOpen: host.bubbleHideOnOpen !== undefined ? host.bubbleHideOnOpen : bs.hideOnOpen,
    backgroundColor: effectiveBg,
    gradientType: host.bubbleGradientType || bs.gradientType,
    gradientAngle: host.bubbleGradientAngle !== undefined ? host.bubbleGradientAngle : bs.gradientAngle,
    gradientStops: (host.bubbleGradientStart || host.bubbleGradientEnd)
      ? [
          { color: host.bubbleGradientStart || bs.gradientStops?.[0]?.color || effectiveBg, pos: 0 },
          { color: host.bubbleGradientEnd || bs.gradientStops?.[1]?.color || effectiveBg, pos: 100 },
        ]
      : bs.gradientStops,
    border: {
      ...(bs.border || {}),
      width: host.bubbleBorderWidth !== undefined ? host.bubbleBorderWidth : bs.border?.width,
      style: host.bubbleBorderStyle || bs.border?.style || 'solid',
      color: effectiveBorderColor,
    },
    outlineRing: {
      ...(bs.outlineRing || {}),
      enabled: host.bubbleOutlineRingEnabled !== undefined ? host.bubbleOutlineRingEnabled : bs.outlineRing?.enabled,
      width: host.bubbleOutlineRingWidth !== undefined ? host.bubbleOutlineRingWidth : bs.outlineRing?.width,
      color: effectiveRingColor,
    },
    boxShadowBlur: host.bubbleBoxShadowBlur !== undefined ? host.bubbleBoxShadowBlur : bs.boxShadowBlur,
    boxShadowOffsetY: host.bubbleBoxShadowOffsetY !== undefined ? host.bubbleBoxShadowOffsetY : bs.boxShadowOffsetY,
    boxShadowOpacity: host.bubbleBoxShadowOpacity !== undefined ? host.bubbleBoxShadowOpacity : bs.boxShadowOpacity,
    innerShadow: {
      ...(bs.innerShadow || {}),
      enabled: host.bubbleInnerShadowEnabled !== undefined ? host.bubbleInnerShadowEnabled : bs.innerShadow?.enabled,
    },
    glass: {
      ...(bs.glass || {}),
      enabled: host.bubbleGlassEnabled !== undefined ? host.bubbleGlassEnabled : bs.glass?.enabled,
      blur: host.bubbleGlassBlur !== undefined ? host.bubbleGlassBlur : bs.glass?.blur,
    },
    neon: {
      ...(bs.neon || {}),
      enabled: host.bubbleNeonEnabled !== undefined ? host.bubbleNeonEnabled : bs.neon?.enabled,
      color: host.bubbleNeonColor || bs.neon?.color,
    },
    lucideIcon: host.bubbleLucideIcon || bs.lucideIcon,
    lucideSize: host.bubbleLucideSize || bs.lucideSize,
    iconColor: host.bubbleIconColor || bs.iconColor,
    hoverScale: host.bubbleHoverScale !== undefined ? host.bubbleHoverScale : bs.hoverScale,
    idleAnim: {
      ...(bs.idleAnim || {}),
      enabled: host.bubbleIdleAnimEnabled !== undefined ? host.bubbleIdleAnimEnabled : bs.idleAnim?.enabled,
      type: host.bubbleIdleAnimType || bs.idleAnim?.type,
    },
    tooltip: {
      ...(bs.tooltip || {}),
      enabled: host.bubbleTooltipEnabled !== undefined ? host.bubbleTooltipEnabled : bs.tooltip?.enabled,
      text: host.bubbleTooltipText || bs.tooltip?.text,
      position: host.bubbleTooltipPosition || bs.tooltip?.position,
      backgroundColor: host.bubbleTooltipBg || bs.tooltip?.backgroundColor,
      textColor: host.bubbleTooltipTextColor || bs.tooltip?.textColor,
    },
    badge: {
      ...(bs.badge || {}),
      position: host.bubbleBadgePosition || bs.badge?.position,
      backgroundColor: host.bubbleBadgeBg || bs.badge?.backgroundColor,
      textColor: host.bubbleBadgeTextColor || bs.badge?.textColor,
    },
    offsetRight: host.bubbleOffsetRight !== undefined ? host.bubbleOffsetRight : (bs.offsetRight ?? 16),
    offsetBottom: host.bubbleOffsetBottom !== undefined ? host.bubbleOffsetBottom : (bs.offsetBottom ?? 12),
  } as BubbleState;
}

export function computeEffectiveGreetWindowConfig(
  host: Record<string, any>,
  gws: GreetWindowState = {} as GreetWindowState
): GreetWindowState {
  const useTheme = host.useWebsiteTheme !== undefined ? host.useWebsiteTheme : (gws.useWebsiteTheme ?? true);
  const pTheme = useTheme ? getParentTheme() : null;

  const effectiveIconColor = host.greetIconColor || host.accentColor || (pTheme ? pTheme.primary : gws.iconColor);
  const effectiveBtnColor = host.greetInputButtonColor || host.accentColor || (pTheme ? pTheme.primary : gws.inputBox?.buttonColor);
  const effectiveBtnIconColor = host.greetInputButtonIconColor || (pTheme ? pTheme.primary : gws.inputBox?.buttonIconColor);

  return {
    ...gws,
    useWebsiteTheme: useTheme,
    enabled: host.enableGreetWindow !== undefined ? host.enableGreetWindow : gws.enabled,
    title: host.greetTitle || gws.title,
    titleColor: host.greetTitleColor || gws.titleColor,
    titleFontSize: host.greetTitleFontSize || gws.titleFontSize,
    description: host.greetDescription || gws.description,
    descriptionColor: host.greetDescriptionColor || gws.descriptionColor,
    descriptionFontSize: host.greetDescriptionFontSize || gws.descriptionFontSize,
    backgroundColor: host.greetBg || gws.backgroundColor,
    width: host.greetWidth || gws.width,
    borderRadius: host.greetBorderRadius || gws.borderRadius,
    spacing: host.greetSpacing !== undefined ? host.greetSpacing : gws.spacing,
    openingTimeAfterInitialLoadSec: host.greetOpeningDelaySec !== undefined ? host.greetOpeningDelaySec : gws.openingTimeAfterInitialLoadSec,
    animationOpeningSec: host.greetFadeInSpeedSec !== undefined ? host.greetFadeInSpeedSec : gws.animationOpeningSec,
    iconType: host.greetIconType || gws.iconType,
    iconAlign: host.greetIconAlign || gws.iconAlign,
    lucideIcon: host.greetLucideIcon || gws.lucideIcon,
    iconSize: host.greetIconSize || gws.iconSize,
    iconColor: effectiveIconColor,
    iconAnimation: host.greetIconAnimation || gws.iconAnimation,
    imageUrl: host.greetImageUrl || gws.imageUrl,
    inputBox: {
      ...(gws.inputBox || {}),
      enabled: host.enableInputCard !== undefined ? host.enableInputCard : gws.inputBox?.enabled ?? true,
      openingTimeAfterInitialLoadSec: host.greetInputOpeningDelaySec !== undefined ? host.greetInputOpeningDelaySec : gws.inputBox?.openingTimeAfterInitialLoadSec,
      layout: host.greetInputLayout || gws.inputBox?.layout,
      placeholder: host.greetInputPlaceholder || gws.inputBox?.placeholder,
      backgroundColor: host.greetInputBg || gws.inputBox?.backgroundColor,
      textColor: host.greetInputTextColor || gws.inputBox?.textColor,
      borderRadius: host.greetInputBorderRadius || gws.inputBox?.borderRadius,
      buttonColor: effectiveBtnColor,
      buttonIconColor: effectiveBtnIconColor,
    },
  } as GreetWindowState;
}

export function computeEffectiveChatWindowConfig(
  host: Record<string, any>,
  cws: ChatWindowState = {} as ChatWindowState,
  activeOffsetBottom: number = 12
): ChatWindowState {
  const useTheme = host.useWebsiteTheme !== undefined ? host.useWebsiteTheme : (cws.useWebsiteTheme ?? false);
  const pTheme = useTheme ? getParentTheme() : null;

  const effectiveAccent = host.accentColor || (useTheme && pTheme ? pTheme.primary : (cws.accentColor || '#0b5fff'));

  // When host.accentColor is provided (e.g. via controls or prop), it drives dependent primary surfaces unless host explicitly sets a custom sub-property
  const primaryColor = host.accentColor || (useTheme && pTheme ? pTheme.primary : null);

  const effectiveVisitorBg = host.visitorBubbleBg || primaryColor || (useTheme && pTheme ? pTheme.primary : cws.visitorBubbleBg) || effectiveAccent;
  const effectiveHeaderBg = host.headerBg || primaryColor || (useTheme && pTheme ? pTheme.primary : cws.headerBg) || effectiveAccent;
  const effectiveAgentAvatarBg = host.agentAvatarBg || primaryColor || (useTheme && pTheme ? pTheme.primary : cws.agentAvatarBg) || effectiveAccent;
  const effectiveInputFocusBorder = host.inputFocusBorderColor || primaryColor || (useTheme && pTheme ? pTheme.primary : cws.inputFocusBorderColor) || effectiveAccent;
  const effectiveSendBtnActive = host.sendButtonBgActive || primaryColor || (useTheme && pTheme ? pTheme.primary : cws.sendButtonBgActive) || effectiveAccent;
  const effectivePoweredByColor = host.poweredByColor || primaryColor || (useTheme && pTheme ? pTheme.primary : cws.poweredByColor) || effectiveAccent;
  const effectiveEndChatConfirmBg = host.endChatConfirmBg || primaryColor || (useTheme && pTheme ? pTheme.primary : cws.endChatConfirmBg) || effectiveAccent;

  const sec = useTheme && pTheme?.secondary ? pTheme.secondary : effectiveAccent;
  const effectiveBgGradient = host.welcomeBgGradient || (primaryColor ? `linear-gradient(135deg, ${primaryColor}, ${sec})` : (useTheme && pTheme ? `linear-gradient(135deg, ${pTheme.primary}, ${sec})` : cws.welcome?.bgGradient));
  const effectiveWelcomeButtonIconColor = host.welcomeButtonIconColor || primaryColor || (useTheme && pTheme ? pTheme.primary : cws.welcome?.buttonIconColor) || effectiveAccent;

  return {
    ...cws,
    useWebsiteTheme: useTheme,
    clientName: host.clientName || cws.clientName,
    agentName: host.agentName || cws.agentName,
    widgetWidth: host.widgetWidth || cws.widgetWidth,
    widgetHeight: host.widgetHeight || cws.widgetHeight,
    expandedWidth: host.expandedWidth || cws.expandedWidth,
    widgetBorderRadius: host.widgetBorderRadius || cws.widgetBorderRadius,
    accentColor: effectiveAccent,
    headerBg: effectiveHeaderBg,
    headerTextColor: host.headerTextColor || cws.headerTextColor,
    headerBorderColor: host.headerBorderColor || cws.headerBorderColor,
    headerAvatarBg: host.headerAvatarBg || cws.headerAvatarBg,
    headerAvatarColor: host.headerAvatarColor || cws.headerAvatarColor,
    activeDot: {
      ...(cws.activeDot || {}),
      color: host.activeDotColor || cws.activeDot?.color,
      animate: host.activeDotAnimate !== undefined ? host.activeDotAnimate : cws.activeDot?.animate,
    },
    bodyBg: host.bodyBg || cws.bodyBg,
    visitorBubbleBg: effectiveVisitorBg,
    visitorBubbleColor: host.visitorBubbleTextColor || cws.visitorBubbleColor,
    visitorBubbleFontSize: host.visitorBubbleFontSize || cws.visitorBubbleFontSize,
    visitorBubbleBorderRadius: host.visitorBubbleBorderRadius || cws.visitorBubbleBorderRadius,
    agentBubbleBg: host.agentBubbleBg || cws.agentBubbleBg,
    agentBubbleColor: host.agentBubbleTextColor || cws.agentBubbleColor,
    agentBubbleBorderColor: host.agentBubbleBorderColor || cws.agentBubbleBorderColor,
    agentBubbleFontSize: host.agentBubbleFontSize || cws.agentBubbleFontSize,
    agentBubbleBorderRadius: host.agentBubbleBorderRadius || cws.agentBubbleBorderRadius,
    agentAvatarBg: effectiveAgentAvatarBg,
    agentAvatarColor: host.agentAvatarColor || cws.agentAvatarColor,
    agentAvatarUrl: host.agentAvatarUrl || cws.agentAvatarUrl,
    inputBg: host.inputBg || cws.inputBg,
    inputTextColor: host.inputTextColor || cws.inputTextColor,
    inputPlaceholderColor: host.inputPlaceholderColor || cws.inputPlaceholderColor,
    inputBorderColor: host.inputBorderColor || cws.inputBorderColor,
    inputFocusBorderColor: effectiveInputFocusBorder,
    inputBorderRadius: host.inputBorderRadius || cws.inputBorderRadius,
    textareaFontSize: host.textareaFontSize || cws.textareaFontSize,
    attachButtonBg: host.attachButtonBg || cws.attachButtonBg,
    attachButtonColor: host.attachButtonColor || cws.attachButtonColor,
    emojiButtonColor: host.emojiButtonColor || cws.emojiButtonColor,
    sendIconType: host.sendIconType || cws.sendIconType,
    sendButtonBgActive: effectiveSendBtnActive,
    sendButtonColorActive: host.sendButtonColorActive || cws.sendButtonColorActive,
    sendButtonBgInactive: host.sendButtonBgInactive || cws.sendButtonBgInactive,
    sendButtonColorInactive: host.sendButtonColorInactive || cws.sendButtonColorInactive,
    footerBg: host.footerBg || cws.footerBg,
    footerTextColor: host.footerTextColor || cws.footerTextColor,
    poweredByText: host.poweredByText || cws.poweredByText,
    poweredByLink: host.poweredByLink || cws.poweredByLink,
    poweredByColor: effectivePoweredByColor,
    modernUi: host.modernUi !== undefined ? host.modernUi : cws.modernUi,
    typingIndicator: host.typingIndicator !== undefined ? host.typingIndicator : cws.typingIndicator,
    attachmentsEnabled: host.attachmentsEnabled !== undefined ? host.attachmentsEnabled : cws.attachmentsEnabled,
    ticksEnabled: host.ticksEnabled !== undefined ? host.ticksEnabled : cws.ticksEnabled,
    sentTickColor: host.sentTickColor || cws.sentTickColor,
    readTickColor: host.readTickColor || cws.readTickColor,
    widgetShadow: host.widgetShadow !== undefined ? host.widgetShadow : cws.widgetShadow,
    widgetShadowBlur: host.widgetShadowBlur || cws.widgetShadowBlur,
    widgetShadowColor: host.widgetShadowColor || cws.widgetShadowColor,
    widgetBorderEnabled: host.widgetBorderEnabled !== undefined ? host.widgetBorderEnabled : cws.widgetBorderEnabled,
    widgetBorderWidth: host.widgetBorderWidth || cws.widgetBorderWidth,
    widgetBorderColor: host.widgetBorderColor || cws.widgetBorderColor,
    endChatConfirmMessage: host.endChatConfirmMessage || cws.endChatConfirmMessage,
    endChatConfirmLabel: host.endChatConfirmLabel || cws.endChatConfirmLabel,
    endChatCancelLabel: host.endChatCancelLabel || cws.endChatCancelLabel,
    modalCardBg: host.modalCardBg || cws.modalCardBg,
    modalMessageColor: host.modalMessageColor || cws.modalMessageColor,
    modalBorderRadius: host.modalBorderRadius || cws.modalBorderRadius,
    endChatConfirmBg: effectiveEndChatConfirmBg,
    endChatConfirmTextColor: host.endChatConfirmTextColor || cws.endChatConfirmTextColor,
    offsetRight: 16,
    offsetBottom: activeOffsetBottom,
    welcome: {
      ...(cws.welcome || {}),
      enabled: host.enableWelcomeCard !== undefined ? host.enableWelcomeCard : cws.welcome?.enabled ?? true,
      cardLayout: host.welcomeCardLayout || cws.welcome?.cardLayout,
      title: host.welcomeTitle || cws.welcome?.title,
      description: host.welcomeDescription || cws.welcome?.description,
      bgGradient: effectiveBgGradient,
      buttonText: host.welcomeButtonText || cws.welcome?.buttonText,
      buttonSubtext: host.welcomeButtonSubtext || cws.welcome?.buttonSubtext,
      buttonBg: host.welcomeButtonBg || cws.welcome?.buttonBg,
      buttonTextColor: host.welcomeButtonTextColor || cws.welcome?.buttonTextColor,
      buttonIconColor: effectiveWelcomeButtonIconColor,
      logoUrl: host.welcomeLogoUrl || cws.welcome?.logoUrl,
      cardBorderRadius: host.welcomeCardBorderRadius || cws.welcome?.cardBorderRadius,
      cardBlur: host.welcomeCardBlur || cws.welcome?.cardBlur,
    },
  } as ChatWindowState;
}

export function computeEffectiveFeaturesConfig(
  host: Record<string, any>,
  fs: FeaturesState = {} as FeaturesState
): FeaturesState {
  const voiceCall = host.enableVoiceCall !== undefined ? host.enableVoiceCall : (fs.voiceCallEnabled ?? fs.voiceCallMaster);
  const videoCall = host.enableVideoCall !== undefined ? host.enableVideoCall : (fs.videoCallEnabled ?? fs.videoCallMaster);
  return {
    ...fs,
    voiceCallEnabled: voiceCall,
    voiceCallMaster: voiceCall,
    voiceCallAgents: voiceCall,
    videoCallEnabled: videoCall,
    videoCallMaster: videoCall,
    videoCallAgents: videoCall,
    closeChatVisitor: host.enableCloseChatVisitor !== undefined ? host.enableCloseChatVisitor : fs.closeChatVisitor,
    prechatEnabled: host.prechatEnabled !== undefined ? host.prechatEnabled : fs.prechatEnabled,
    postchatEnabled: host.postchatEnabled !== undefined ? host.postchatEnabled : fs.postchatEnabled,
  } as FeaturesState;
}
