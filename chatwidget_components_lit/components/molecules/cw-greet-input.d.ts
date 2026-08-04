import { LitElement } from 'lit';
import { InputBoxConfig } from '../../store/chat-store.js';
export declare class CwGreetInput extends LitElement {
    config?: InputBoxConfig;
    accentColor: string;
    draft: string;
    static styles: import("lit").CSSResult;
    private handleKeyDown;
    private handleInput;
    private submit;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'cw-greet-input': CwGreetInput;
    }
}
//# sourceMappingURL=cw-greet-input.d.ts.map