import { HtmlInputEvent } from '@/types';

export default class ImageSource {
    private _el: HTMLElement;
    private thumbnail: HTMLImageElement
    private _image: HTMLImageElement;
    private nameEl: HTMLInputElement;
    private _name: string;
    constructor (src: string, name: string) {
        this._el = this.createHtml();
        this._image = new Image();
        this.thumbnail.src = src;
        this._image.src = src;
        this.name = name;
    }

    get el (): HTMLElement {
        return this._el;
    }

    set name (val: string) {
        this._name = val;
        this.nameEl.value = val;
    }

    get name (): string {
        return this._name;
    }

    get image () {
        return this._image;
    }

    private createHtml () {
        this._el = document.createElement('div');
        this._el.classList.add('file-source', 'image-source');
        this.thumbnail = document.createElement('img');
        this.thumbnail.classList.add('thumbnail');
        this.nameEl = document.createElement('input');
        this.nameEl.type = 'text';
        this.nameEl.classList.add('filename');
        this._el.appendChild(this.thumbnail);
        this._el.appendChild(this.nameEl);
        return this._el;
    }

    onNameChanged (handler: (newName: string) => any) {
        this.nameEl.addEventListener('change', () => {
            const newName = this.nameEl.value;
            if (newName !== this.name) {
                handler(newName);
            }
        });
    }
}