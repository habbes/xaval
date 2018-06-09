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
        const rawFiles = e.target.files;
        for (let i = 0; i < rawFiles.length; i++) {
            this.addImage(URL.createObjectURL(rawFiles.item(i)));
        }
    }

    addImage (fileUrl: string, filename: string = '') {
        const id = this.nextId();
        const name = filename || id;
        const source = new ImageSource(fileUrl, id)
        source.el.id = id;
        const file: FileSource = {
            type: 'image',
            id,
            name,
            source: source
        };
        this.files[name] = file;
        this.addFileEl(source.el);
        source.onNameChanged((newName) => {
            this.onFilenameChanged(file.name, newName);
        });
    }

    readImage (name: string): any {
        console.log(this.files);
        const file = this.files[name];
        // TODO: ensure file is of type image
        return file && cv.imread(file.source.image);
    }

    renameFile(oldName: string, newName: string) {
        const file = this.files[oldName];
        if (newName in this.files) {
            console.log('new', newName, this.files);
            alert(`There's already an imported file called '${newName}'.`);
            file.source.name = oldName;
            return;
        }
        this.files[newName] = file;
        delete this.files[oldName];
        file.source.name = newName;
        file.name = newName;
    }

    private nextId (): string {
        return `file${this.idCounter++}`;
    }

    private addFileEl (el: HTMLElement) {
        this.thumbnailsEl.appendChild(el);
    }

    private onFilenameChanged (oldName: string, newName: string) {
        this.renameFile(oldName, newName);
    }
}

interface FileSource {
    type: 'image',
    id: string,
    name: string,
    source: ImageSource
}