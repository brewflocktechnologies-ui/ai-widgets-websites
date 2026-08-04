/**
 * utils/config.ts
 * Port of window.ZotlyConfig from config.js
 */
export interface ClientConfigs {
    bubbleConfig: Record<string, unknown>;
    chatConfig: Record<string, unknown>;
    chatbarConfig: Record<string, unknown>;
    greetWindowConfig: Record<string, unknown>;
}
/**
 * Reads the client ID from window.ZOTLY_CLIENT_ID or from the widget
 * script tag's data-client-id attribute / URL query param.
 */
export declare function getClientId(): string;
/**
 * Fetches the client configuration from the server (or local storage if
 * ?test=true is present in the URL for the editor preview flow).
 */
export declare function fetchClientConfig(clientId: string): Promise<ClientConfigs>;
//# sourceMappingURL=config.d.ts.map