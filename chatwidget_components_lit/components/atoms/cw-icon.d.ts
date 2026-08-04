import { LitElement } from 'lit';
export declare class CwIcon extends LitElement {
    name: string;
    size: number;
    color: string;
    customSvg: string;
    static styles: import("lit").CSSResult;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'cw-icon': CwIcon;
    }
}
//# sourceMappingURL=cw-icon.d.ts.map