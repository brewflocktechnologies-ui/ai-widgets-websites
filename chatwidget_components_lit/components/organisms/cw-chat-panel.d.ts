import { LitElement } from 'lit';
import { ChatWindowState, ChatState, FeaturesState, ChatbarState, BubbleState } from '../../store/chat-store.js';
import './cw-chat-header.js';
import './cw-chat-body.js';
export declare class CwChatPanel extends LitElement {
    chatWindowConfig?: ChatWindowState;
    chatState?: ChatState;
    features?: FeaturesState;
    chatbarConfig?: ChatbarState;
    bubbleConfig?: BubbleState;
    panelOpen: boolean;
    private unsub?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    static styles: import("lit").CSSResult[];
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'cw-chat-panel': CwChatPanel;
    }
}
//# sourceMappingURL=cw-chat-panel.d.ts.map