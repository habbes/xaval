import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
import apiSpec from '@/api-spec';
import { EditorInitOpts, EditorProvider } from '.';

export function createEditor (domEl: HTMLElement, opts: EditorInitOpts): EditorProvider {
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: false
    });
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.ES2015,
        allowNonTsExtensions: true
    });
    monaco.languages.typescript.javascriptDefaults.addExtraLib(apiSpec);

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