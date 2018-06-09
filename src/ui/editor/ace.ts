import { EditorInitOpts, EditorProvider } from '.';

export function createAceEditor (domEl: HTMLElement, opts: EditorInitOpts): EditorProvider {
    const editor = ace.edit(domEl);
    editor.setValue(opts.value);
    editor.setTheme('ace/theme/xcode');
    editor.setOption('tabSize', 2);
    editor.session.setMode('ace/mode/javascript');
    editor.setShowPrintMargin(false);
    editor.clearSelection();
    return editor;
}