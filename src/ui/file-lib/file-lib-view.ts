import { FileLibrary, FileType } from '@/core/files';
import { HtmlInputEvent } from '@/types';
import { FileSource, FileContainer, SourceCtor } from './types';
import ImageSource from './image-source';
import VideoSource from './video-source';
import BinarySource from './binary-source';

export default class FileLibView implements FileLibrary {
    readonly el: HTMLElement;
    readonly inputEl: HTMLInputElement;
    readonly inputPrompt: HTMLElement;
    readonly thumbnailsEl: HTMLElement;
    readonly files: { [filename: string]: FileContainer } = {};
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
            const item = rawFiles.item(i);
            const url = URL.createObjectURL(item);
            if (/image/.test(item.type)) {
                this.addImage(url);
            }
            else if (/video/.test(item.type)) {
                this.addVideo(url);
            }
            else {
                this.addBinary(item);
            }
        }
    }

    add (fileUrl: string | Blob, ctor: SourceCtor, filename?: string) {
        const id = this.nextId();
        const name = filename || id;
        if (name in this.files) {
            alert(`There's already an imported file called '${name}'.`);
            return;
        }
        const source = new ctor(fileUrl, name);
        source.el.id = id;
        const file: FileContainer = {
            id,
            name,
            source
        };
        this.files[name] = file;
        this.addFileEl(source.el);
        source.onNameChanged((newName) => {
            this.onFilenameChanged(file.name, newName);
        });
    }

    addImage (fileUrl: string, filename: string = '') {
        this.add(fileUrl, ImageSource, filename);
    }

    addVideo (fileUrl: string, filename: string = '') {
        this.add(fileUrl, VideoSource, filename);
    }

    addBinary (file: Blob, filename: string = '') {
        this.add(file, BinarySource, filename);
    }

    readImage (name: string): any {
        const file = this.files[name];
        if (file && file.source instanceof ImageSource) {
            return cv.imread(file.source.image);
        } else {
            // TODO: throw error instead
            return null;
        }
    }

    readVideo (name: string): any {
        const file = this.files[name];
        if (file && file.source instanceof VideoSource) {
            return file.source.video;
        } else {
            // TODO: throw error instead
            return null;
        }

    }

    getReader (name: string) {
        const file = this.files[name];
        if (file && file.source instanceof BinarySource) {
            return file.source.reader;
        } else {
            // TODO: throw error instead
            return null;
        }
    }

    read (name: string): any {
        const file = this.files[name];
        // TODO throw error instead
        if (!file) {
            alert(`Unknown file ${file}.`);
        }
        switch (file.source.type) {
            case 'image':
                return this.readImage(name);
            case 'video':
                return this.readVideo(name);
            case 'binary':
                return this.getReader(name);
            default:
                return null;
        }
    }

    rename(oldName: string, newName: string) {
        const file = this.files[oldName];
        if (!(oldName in this.files)) {
            alert(`The file '${oldName}' was not found.`);
            return;
        }
        if (newName in this.files) {
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
        this.rename(oldName, newName);
    }
}
