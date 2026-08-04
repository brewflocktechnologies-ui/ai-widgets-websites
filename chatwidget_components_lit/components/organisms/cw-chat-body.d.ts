import { LitElement } from 'lit';
import { ChatState, ChatWindowState } from '../../store/chat-store.js';
import '../molecules/cw-welcome-card.js';
import '../molecules/cw-message-bubble.js';
import '../molecules/cw-composer.js';
import '../atoms/cw-typing-dots.js';
export declare class CwChatBody extends LitElement {
    chatState: ChatState;
    chatWindowConfig: ChatWindowState;
    private unsub?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    static styles: import("lit").CSSResult[];
    private scrollToBottom;
    private handleDraftChange;
    private handleSendMessage;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'cw-chat-body': CwChatBody;
    }
}
//# sourceMappingURL=cw-chat-body.d.ts.map