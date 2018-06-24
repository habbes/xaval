import { FileType } from '@/core/files';
import { applyMixins } from '@/core/util';
import { ImageFileSource } from './types';
import { NameUpdatable } from './mixins';


export default class Source implements ImageFileSource {
    private _el: HTMLElement;
    private _thumbnail: HTMLImageElement
    private _image: HTMLImageElement;
    private _nameEl: HTMLInputElement;
    private _name: string;

    onNameChanged: (handler: (newName: string) => any) => any;

    constructor (src: string, name: string) {
        this._el = this.createHtml();
        this._image = new Image();
        this._thumbnail.src = src;
        this._image.src = src;
        this._name = name;
    }

    get el (): HTMLElement {
        return this._el;
    }

    set name (val: string) {
        this._name = val;
        this._nameEl.value = val;
    }

    get name (): string {
        return this._name;
    }

    get type (): FileType {
        return 'image';
    }

    get image () {
        return this._image;
    }

    private createHtml () {
        this._el = document.createElement('div');
        this._el.classList.add('file-source', 'image-source');
        this._thumbnail = document.createElement('img');
        this._thumbnail.classList.add('thumbnail');
        this._nameEl = document.createElement('input');
        this._nameEl.type = 'text';
        this._nameEl.classList.add('filename');
        this._el.appendChild(this._thumbnail);
        this._el.appendChild(this._nameEl);
        return this._el;
    }
}

applyMixins(Source, [NameUpdatable]);
