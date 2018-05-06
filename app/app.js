/**
 * @author Habbes <hello@habbes.xyz>
 */


function init () {
    const editor = new Editor(document.querySelector('#editorContainer'));
    const imageViewer = new ImageViewer(document.querySelector('#imageViewer'));
    const imageSource = new ImageSource(document.querySelector('#imageSource'))
    const runner = new CodeRunner();

    const app = new App({
        editor,
        runner,
        imageSource,
        imageViewer
    });

    return app;
}

class App {
    /**
     * @param {object} args
     * @param {Editor} args.editor
     * @param {CodeRunner} args.runner
     * @param {ImageSource} args.imageSource
     * @param {ImageViewer} args.imageViewer
     */ 
    constructor (args) {
        this.editor = args.editor;
        this.runner = args.runner;
        this.imageViewer = args.imageViewer;
        this.imageSource = args.imageSource;
    }

    start () {
        this.editor.setRunHandler(source => {
            const res = this.runner.run(source);
            console.log('Code result', res);
        });

        window.imsource = this.imageSource;
        window.imviewer = this.imageViewer;
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

class ImageViewer {
    /**
     * 
     * @param {HTMLElement} el 
     */
    constructor (el) {
        this.el = el;
        this.canvas = el.querySelector('canvas');
        this.canvas.id = `canvas${ImageViewer.nextId()}`;
    }

    static nextId () {
        ImageViewer._nextId = (ImageViewer._nextId || 0) + 1;
        return ImageViewer._nextId;
    }

    /**
     * 
     * @param {cv.Mat} mat 
     */
    show (mat) {
        cv.imshow(this.canvas.id, mat);
    }
}

class ImageSource {
    /**
     * 
     * @param {HTMLElement} el 
     */
    constructor (el) {
        this.el = el;
        this.imgEl = el.querySelector('img');
        this.inputEl = el.querySelector('input');

        this.inputEl.addEventListener('change', e => {
            this.imgEl.src = URL.createObjectURL(e.target.files[0]);
        }, false);
    }

    

    /**
     * @return {cv.Mat}
     */
    read () {
        return cv.imread(this.imgEl);
    }
}