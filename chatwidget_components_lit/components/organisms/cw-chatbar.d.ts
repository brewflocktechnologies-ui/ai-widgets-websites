import { LitElement } from 'lit';
import { ChatbarState } from '../../store/chat-store.js';
import '../atoms/cw-icon.js';
export declare class CwChatbar extends LitElement {
    config?: ChatbarState;
    panelOpen: boolean;
    unreadCount: number;
    hovered: boolean;
    private unsub?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    static styles: import("lit").CSSResult[];
    private handleClick;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'cw-chatbar': CwChatbar;
    }
}
//# sourceMappingURL=cw-chatbar.d.ts.map