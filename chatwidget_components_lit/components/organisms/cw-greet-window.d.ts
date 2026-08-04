import { LitElement } from 'lit';
import { GreetWindowState, ChatbarState, BubbleState } from '../../store/chat-store.js';
import '../atoms/cw-icon.js';
import '../molecules/cw-greet-input.js';
export declare class CwGreetWindow extends LitElement {
    config?: GreetWindowState;
    chatbarConfig?: ChatbarState;
    bubbleConfig?: BubbleState;
    panelOpen: boolean;
    hasSentMessage: boolean;
    private unsub?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    static styles: import("lit").CSSResult[];
    private handleDismiss;
    private handleCardClick;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'cw-greet-window': CwGreetWindow;
    }
}
//# sourceMappingURL=cw-greet-window.d.ts.map