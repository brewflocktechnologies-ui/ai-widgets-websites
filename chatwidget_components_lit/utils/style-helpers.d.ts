/**
 * utils/style-helpers.ts
 * Pure style computation functions ported from alpine/bubble.js and alpine/chatbar.js.
 * These are dependency-free pure functions — no Lit/Alpine imports.
 */
/** Converts a hex color string to rgba(...). */
export declare function hexToRgba(hex: string, alpha?: number): string;
export interface BorderRadiusConfig {
    tl?: number;
    tr?: number;
    br?: number;
    bl?: number;
}
export declare function getBorderRadius(borderRadius: number | BorderRadiusConfig | undefined, fallback?: string): string;
export interface GradientStop {
    color: string;
    pos: number;
}
export declare function getGradient(gradientType: string | undefined, gradientStops: GradientStop[], gradientAngle?: number, fallbackColor?: string): string;
export declare function getBoxShadow(config: {
    boxShadowOffsetX?: number;
    boxShadowOffsetY?: number;
    boxShadowSpread?: number;
    boxShadowBlur?: number;
    boxShadowOpacity?: number;
}): string;
export declare function getInnerShadow(config: {
    innerShadow?: {
        enabled?: boolean;
        blur?: number;
        opacity?: number;
    };
}): string;
export declare function getCompositeBackground(config: {
    useWebsiteTheme?: boolean;
    backgroundColor?: string;
    gradientType?: string;
    gradientStops?: GradientStop[];
    gradientAngle?: number;
}): string;
export declare function getChatbarBackground(config: {
    useWebsiteTheme?: boolean;
    accentColor?: string;
    gradientEnabled?: boolean;
    bgColor?: string;
    gradientType?: string;
    gradientStops?: GradientStop[];
    gradientAngle?: number;
}): string;
export declare function getChatbarFontSize(textSize?: number, height?: number): string;
export declare function getChatbarIconWidth(iconWidth?: number, height?: number, type?: string): number;
export declare function getChatbarIconHeight(iconHeight?: number, barHeight?: number, type?: string): number;
export declare function getTooltipBorderRadius(borderRadius: number | BorderRadiusConfig | undefined, pos: string): string;
/** Returns the correct animation class string for a greet-window icon animation. */
export declare function getAnimClass(animation: string | undefined): string;
/** Formats a Date-like ISO string into HH:MM. */
export declare function formatTime(isoString: string | undefined): string;
//# sourceMappingURL=style-helpers.d.ts.map