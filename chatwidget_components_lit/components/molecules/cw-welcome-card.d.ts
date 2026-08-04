import { LitElement } from 'lit';
import { WelcomeConfig } from '../../store/chat-store.js';
export declare class CwWelcomeCard extends LitElement {
    config?: WelcomeConfig;
    accentColor: string;
    static styles: import("lit").CSSResult[];
    private start;
    private close;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'cw-welcome-card': CwWelcomeCard;
    }
}
//# sourceMappingURL=cw-welcome-card.d.ts.map