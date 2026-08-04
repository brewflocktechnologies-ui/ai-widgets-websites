import { LitElement } from 'lit';
import { ChatWindowState } from '../../store/chat-store.js';
export declare class CwComposer extends LitElement {
    config: Partial<ChatWindowState>;
    draft: string;
    attachmentsEnabled: boolean;
    modernUi: boolean;
    uploading: boolean;
    focused: boolean;
    static styles: import("lit").CSSResult[];
    private handleInput;
    private handleKeyDown;
    private send;
    private toggleAttach;
    private toggleEmoji;
    private handleFileSelect;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'cw-composer': CwComposer;
    }
}
//# sourceMappingURL=cw-composer.d.ts.map