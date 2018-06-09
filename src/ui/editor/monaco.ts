import * as monaco from 'monaco-editor';
// consider plucking specific features for smaller build size
// import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
import { EditorInitOpts, EditorProvider } from '.';

export function createMonacoEditor (domEl: HTMLElement, opts: EditorInitOpts): EditorProvider {
    const editor = monaco.editor.create(domEl, {
        value: opts.value,
        language: 'javascript',
        minimap: {
            enabled: false
        }
    });
    editor.getModel().updateOptions({
        tabSize: 2
    });
    window.addEventListener('resize', () => editor.layout());
    return editor;
}