import { Editor } from '@/types';
import INITIAL_CODE from '@/samples/quick-intro';

export default class implements Editor {
    readonly container: HTMLElement;
    readonly editorEl: HTMLElement;
    readonly runBtn: HTMLButtonElement;
    readonly editor: any;
    runHandler: (source: string) => void;

    constructor (el: HTMLElement) {
        this.container = el;

        this.editorEl = el.querySelector('#editor');
        this.editor = ace.edit(this.editorEl);
        this.editor.setValue(INITIAL_CODE);
        this.editor.setTheme("ace/theme/xcode");
        this.editor.session.setMode("ace/mode/javascript");
        this.editor.setShowPrintMargin(false);
        this.editor.clearSelection();
        this.runBtn = el.querySelector('button');
        this.run = this.run.bind(this);
        this.runBtn.addEventListener('click', this.run);
    }

    setRunHandler (handler: (source: string) => void) {
        this.runHandler = handler;
    }

    get source (): string {
        return this.editor.getValue();
    }

    focus () {
        this.editor.focus();
    }

    run () {
        this.runHandler && this.runHandler(this.source);
    }
}