import { LitElement } from 'lit';
export declare class CwMessageTick extends LitElement {
    status: 'sent' | 'delivered' | 'read' | '';
    sentColor: string;
    deliveredColor: string;
    readColor: string;
    static styles: import("lit").CSSResult;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'cw-message-tick': CwMessageTick;
    }
}
//# sourceMappingURL=cw-message-tick.d.ts.map