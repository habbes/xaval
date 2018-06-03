import * as monaco from 'monaco-editor';
import { EditorInitOpts, EditorProvider } from '.';

export function createMonacoEditor (domEl: HTMLElement, opts: EditorInitOpts): EditorProvider {
    const editor = monaco.editor.create(domEl, {
        value: opts.value,
        language: 'javascript',
        minimap: {
            enabled: false
        }
    });
    window.addEventListener('resize', () => editor.layout());
    return editor;
}