import { LitElement } from 'lit';
import { Message, ChatWindowState } from '../../store/chat-store.js';
import '../atoms/cw-message-tick.js';
export declare class CwMessageBubble extends LitElement {
    message: Message;
    chatWindowConfig: Partial<ChatWindowState>;
    isGroupEnd: boolean;
    isGroupStart: boolean;
    agentName: string;
    static styles: import("lit").CSSResult;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'cw-message-bubble': CwMessageBubble;
    }
}
//# sourceMappingURL=cw-message-bubble.d.ts.map