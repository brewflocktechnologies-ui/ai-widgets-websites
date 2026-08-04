import { LitElement } from 'lit';
import { ChatWindowState, FeaturesState } from '../../store/chat-store.js';
import '../atoms/cw-avatar.js';
export declare class CwChatHeader extends LitElement {
    config?: ChatWindowState;
    features?: FeaturesState;
    isExpanded: boolean;
    clientName: string;
    agentName: string;
    state: string;
    private unsub?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    static styles: import("lit").CSSResult[];
    private toggleExpand;
    private toggleMenu;
    private closePanel;
    private askEndChat;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'cw-chat-header': CwChatHeader;
    }
}
//# sourceMappingURL=cw-chat-header.d.ts.map