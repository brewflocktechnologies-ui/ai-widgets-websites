import { LitElement } from 'lit';
export declare class CwFormsPreview extends LitElement {
    type: 'prechat' | 'postchat' | 'ticket';
    heading: string;
    subheading: string;
    static styles: import("lit").CSSResult[];
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'cw-forms-preview': CwFormsPreview;
    }
}
//# sourceMappingURL=cw-forms-preview.d.ts.map