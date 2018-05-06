/**
 * @author Habbes <hello@habbes.xyz>
 */


function init () {
    const editor = new Editor(document.querySelector('#editorContainer'));
    const runner = new CodeRunner();

    const app = new App({
        editor,
        runner
    });

    return app;
}

class App {
    /**
     * @param {object} args
     * @param {Editor} args.editor
     * @param {CodeRunner} args.runner
     */ 
    constructor (args) {
        this.editor = args.editor;
        this.runner = args.runner;
    }

    start () {
        this.editor.setRunHandler(source => {
            this.runner.run(source);
        });
    }
}
 
class Editor {
    /**
     * 
     * @param {HTMLElement} el 
     */
    constructor (el) {
        this.container = el;
        this.editor = el.querySelector('#editor');
        this.runBtn = el.querySelector('button');
        this.run = this.run.bind(this);
        this.runBtn.addEventListener('click', this.run);
    }

    /**
     * 
     * @param {Function} handler 
     */
    setRunHandler (handler) {
        this.runHandler = handler;
    }

    /**
     * @return {string}
     */
    get source () {
        return this.editor.value;
    }

    run () {
        this.runHandler && this.runHandler(this.source);
    }
}

class CodeRunner {
    /**
     * 
     * @param {string} source 
     */
    run (source) {
        return eval(source);
    }
}