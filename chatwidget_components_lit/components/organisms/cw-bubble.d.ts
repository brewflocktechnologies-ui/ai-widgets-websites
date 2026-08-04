import { LitElement } from 'lit';
import { BubbleState } from '../../store/chat-store.js';
import '../atoms/cw-icon.js';
import '../atoms/cw-badge.js';
export declare class CwBubble extends LitElement {
    config?: BubbleState;
    panelOpen: boolean;
    unreadCount: number;
    hasSentMessage: boolean;
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
        'cw-bubble': CwBubble;
    }
}
//# sourceMappingURL=cw-bubble.d.ts.map