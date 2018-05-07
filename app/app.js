/**
 * @author Habbes <hello@habbes.xyz>
 */


const INITIAL_CODE = `
// Xaval is a playground for experimenting with computer vision using OpenCv

// To get started, import an image from the bottom-left
// Use \`imsource.read()\` to load the imported image into an OpenCV array
const img = imsource.read();
// Do some image processing and manipulation using OpenCV
cv.cvtColor(img, img, cv.COLOR_RGBA2GRAY, 0);
// to display an image, use \`imviewer.show()\`
imviewer.show(img);

// don't forget to clean up the memory
img.delete();

// When you're ready, click the "Run" button

// To learn more about OpenCV for JS,
// check out the tutorials at
// https://docs.opencv.org/3.4.1/d5/d10/tutorial_js_root.html
`;


function init () {
    const editor = new Editor(document.querySelector('#editorContainer'));
    const imageViewer = new ImageViewer(document.querySelector('#imageViewer'));
    const imageSource = new ImageSource(document.querySelector('#imageSource'))

    const app = new App({
        editor,
        imageSource,
        imageViewer
    });

    return app;
}

class App {
    /**
     * @param {object} args
     * @param {Editor} args.editor
     * @param {ImageSource} args.imageSource
     * @param {ImageViewer} args.imageViewer
     */ 
    constructor (args) {
        this.editor = args.editor;
        this.imageSource = args.imageSource;
        this.imageViewer = args.imageViewer;
    }

    start () {
        this.editor.setRunHandler(source => {
            const res = this.runCode(source);
            console.log('Code result', res);
        });

        this.editor.editor.focus();
    }

    /**
     * 
     * @param {string} source 
     */
    runCode (source) {
        const execute = Function(
            'imsource',
            'imviewer',
            `"use strict";${source}`
        );

        return execute(
            this.imageSource,
            this.imageViewer
        );
    }
}
 
class Editor {
    /**
     * 
     * @param {HTMLElement} el 
     */
    constructor (el) {
        this.container = el;

        this.editorEl = el.querySelector('#editor');
        this.editor = ace.edit(this.editorEl);
        this.editor.setValue(INITIAL_CODE);
        this.editor.setTheme("ace/theme/monokai");
        this.editor.session.setMode("ace/mode/javascript");
        this.editor.setShowPrintMargin(false);
        this.editor.clearSelection();
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
        // return this.editor.value;
        return this.editor.getValue();
    }

    run () {
        this.runHandler && this.runHandler(this.source);
    }
}

class ImageViewer {
    /**
     * 
     * @param {HTMLElement} el 
     */
    constructor (el) {
        this.el = el;
        this.canvas = el.querySelector('.canvas');
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