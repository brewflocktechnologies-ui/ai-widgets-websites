/**
 * utils/theme.ts
 * Port of window.ZotlyUtils from utils.js
 */
/**
 * Reads --primary-color and --secondary-color CSS variables from the host page,
 * falling back to the data-accent attribute on the widget script tag.
 */
export declare function getParentTheme(): {
    primary: string;
    secondary: string;
};
/**
 * Determines the base URL for the widget's assets (JSON configs, etc.)
 * by inspecting the loaded script's src.
 */
export declare function getWidgetBaseUrl(): string;
/**
 * Returns true when the host page currently has the dark class on <html>.
 */
export declare function isHostDark(): boolean;
/**
 * Observes the host page's <html> class changes and fires a callback
 * whenever dark mode toggles. Returns an unsubscribe function.
 */
export declare function observeDarkMode(callback: (isDark: boolean) => void): () => void;
//# sourceMappingURL=theme.d.ts.map