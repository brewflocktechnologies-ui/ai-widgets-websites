import { LitElement } from 'lit';
import { BadgeConfig } from '../../store/chat-store.js';
export declare class CwBadge extends LitElement {
    count: number;
    config: BadgeConfig;
    static styles: import("lit").CSSResult;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'cw-badge': CwBadge;
    }
}
//# sourceMappingURL=cw-badge.d.ts.map