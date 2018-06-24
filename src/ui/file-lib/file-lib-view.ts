import { FileLibrary } from '@/core/files';
import { HtmlInputEvent } from '@/types';
import ImageSource from './image-source';
import VideoSource from './video-source';

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
            const item = rawFiles.item(i);
            const url = URL.createObjectURL(item);
            if (/image/.test(item.type)) {
                this.addImage(url);
            }
            else if (/video/.test(item.type)) {
                this.addVideo(url)
            }
        }
    }

    addFile (type: FileType, source: Source, filename?: string) {
        const id = this.nextId();
        const name = filename || id;
        if (name in this.files) {
            alert(`There's already an imported file called '${name}'.`);
            return;
        }
        source.el.id = id;
        const file: FileSource = {
            type,
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
        const source = new ImageSource(fileUrl, name);
        this.addFile('image', source, filename);
    }

    addVideo (fileUrl: string, filename: string = '') {
        const source = new VideoSource(fileUrl, name);
        this.addFile('image', source, filename);
    }

    readImage (name: string): any {
        const file = this.files[name];
        if (file.source instanceof ImageSource) {
            return file && cv.imread(file.source.image);
        } else {
            // TODO: throw error instead
            return null;
        }
    }

    readVideo (name: string): any {
        const file = this.files[name];
        if (file.source instanceof VideoSource) {
            return file && file.source.video;
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
        switch (file.type) {
            case 'image':
                return this.readImage(name);
            case 'video':
                return this.readVideo(name);
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

interface FileSource {
    type: FileType,
    id: string,
    name: string,
    source: Source
}

type Source = ImageSource | VideoSource;

type FileType = 'image' | 'video';