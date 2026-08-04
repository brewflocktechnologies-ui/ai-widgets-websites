import { LitElement } from 'lit';
import '../organisms/cw-bubble.js';
import '../organisms/cw-chatbar.js';
import '../organisms/cw-greet-window.js';
import '../organisms/cw-chat-panel.js';
export declare class CwWidgetRoot extends LitElement {
    panelOpen: boolean;
    initialized: boolean;
    private unsubAll?;
    private toggleListener;
    private closeListener;
    connectedCallback(): Promise<void>;
    disconnectedCallback(): void;
    static styles: import("lit").CSSResult;
    private handleToggleWidget;
    private handleCloseWidget;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'cw-widget-root': CwWidgetRoot;
    }
}
//# sourceMappingURL=cw-widget-root.d.ts.map