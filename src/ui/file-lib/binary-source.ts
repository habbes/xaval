import { applyMixins } from '@/core/util';
import { FileType, BinaryFileReader } from '@/core/files';
import { BinaryFileSource } from './types';
import { NameUpdatable } from './mixins';
import Reader from './binary-file-reader';

export default class Source implements BinaryFileSource, NameUpdatable {
    private _el: HTMLElement;
    private _thumbnail: HTMLImageElement;
    private _nameEl: HTMLInputElement;
    private _reader: BinaryFileReader;
    private _name: string;
    private _contents: any;

    onNameChanged: (handler: (newName: string) => any) => any;

    constructor (file: Blob, name: string) {
        this._el = this.createHtml();
        this._reader = new Reader(file);
        this.name = name;
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
        return 'binary';
    }

    get nameEl () {
        return this._nameEl;
    }

    get reader () {
        return this._reader;
    }

    private createHtml () {
        this._el = document.createElement('div');
        this._el.classList.add('file-source', 'video-source');
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
