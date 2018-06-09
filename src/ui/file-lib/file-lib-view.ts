import { FileLibrary } from '@/core/files';
import { HtmlInputEvent } from '@/types';
import ImageSource from './image-source';

export default class FileLibView implements FileLibrary {
    readonly el: HTMLElement;
    readonly inputEl: HTMLInputElement;
    readonly inputPrompt: HTMLElement;
    readonly thumbnailsEl: HTMLElement;
    readonly files: { [filename: string]: FileSource } = {};
    private idCounter = 1;
    
    constructor (el: HTMLElement) {
        this.el = el;
        this.inputEl = el.querySelector('input');
        this.inputPrompt = el.querySelector('.files-new');
        this.thumbnailsEl = el.querySelector('.thumbnails');
        this.inputEl.addEventListener('change', this.onFileSelected.bind(this));
        this.inputPrompt.addEventListener('click', () => {
            this.inputEl.click();
        });
    }

    private onFileSelected (e: HtmlInputEvent) {
        const fileUrl = URL.createObjectURL(e.target.files[0]);
        this.addImage(fileUrl);
    }

    /**
     * adds an image to the file source
     * @param fileUrl object url of the image
     * @param filename optional name for the file, if not provided, one will be auto-assigned
     */
    addImage (fileUrl: string, filename: string = '') {
        const id = this.nextId();
        const name = filename || id;
        const source = new ImageSource(fileUrl, id)
        source.el.id = id;
        this.files[name] = {
            type: 'image',
            id,
            source: source
        };
        this.addFileEl(source.el);
    }

    /**
     * reads a specified image from the library as an OpenCv matrix
     * @param name file name
     * @returns {cv.Mat} OpenCV matrix containing the image
     */
    readImage (name: string): any {
        console.log(this.files);
        const file = this.files[name];
        // TODO: ensure file is of type image
        return file && cv.imread(file.source.image);
    }

    private nextId (): string {
        return `file${this.idCounter++}`;
    }

    private addFileEl (el: HTMLElement) {
        this.thumbnailsEl.appendChild(el);
    }
}

interface FileSource {
    type: 'image',
    id: string,
    source: ImageSource
}