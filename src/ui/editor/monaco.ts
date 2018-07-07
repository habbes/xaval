// import * as monaco from 'monaco-editor';
// consider plucking specific features for smaller build size
// import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';

import 'monaco-editor/esm/vs/editor/browser/controller/coreCommands.js';
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js';
import 'monaco-editor/esm/vs/editor/contrib/codelens/codelensController.js';
import 'monaco-editor/esm/vs/editor/contrib/parameterHints/parameterHints.js';
import 'monaco-editor/esm/vs/editor/contrib/hover/hover.js';
import 'monaco-editor/esm/vs/editor/contrib/codelens/codelensController.js'
import 'monaco-editor/esm/vs/editor/contrib/suggest/suggestController.js'
import 'monaco-editor/esm/vs/editor/standalone/browser/inspectTokens/inspectTokens.js';
import 'monaco-editor/esm/vs/editor/contrib/comment/comment.js';
import 'monaco-editor/esm/vs/editor/contrib/contextmenu/contextmenu.js';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
import 'monaco-editor/esm/vs/language/typescript/monaco.contribution';
import { EditorInitOpts, EditorProvider } from '.';

// @ts-ignore
self.MonacoEnvironment = {
	getWorkerUrl: function (moduleId: any, label: any) {
		if (label === 'typescript' || label === 'javascript') {
			return './ts.worker.js';
        }
        return './editor.worker.js';
	}
}

export function createEditor (domEl: HTMLElement, opts: EditorInitOpts): EditorProvider {
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