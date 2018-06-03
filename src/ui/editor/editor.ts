import * as monaco from 'monaco-editor';
import { Editor } from '@/types';
import INITIAL_CODE from '@/samples/widgets';
import { EditorProvider } from './types';
import { createMonacoEditor } from '.';

export default class implements Editor {
    readonly container: HTMLElement;
    readonly editorEl: HTMLElement;
    readonly runBtn: HTMLButtonElement;
    readonly editor: EditorProvider;
    runHandler: (source: string) => void;

    constructor (el: HTMLElement) {
        this.container = el;

        this.editorEl = el.querySelector('#editor');
        this.editor = createMonacoEditor(this.editorEl, { value: INITIAL_CODE });
        this.runBtn = document.querySelector('#runButton');
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