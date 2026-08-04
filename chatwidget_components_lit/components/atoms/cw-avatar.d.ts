import { LitElement } from 'lit';
export declare class CwAvatar extends LitElement {
    name: string;
    imageUrl: string;
    bg: string;
    color: string;
    size: number;
    activeDot?: {
        size?: number;
        color?: string;
        animate?: boolean;
        borderWidth?: number;
        borderColor?: string;
    };
    showOnlineDot: boolean;
    static styles: import("lit").CSSResult;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'cw-avatar': CwAvatar;
    }
}
//# sourceMappingURL=cw-avatar.d.ts.map