import { Video } from '@/ui/video';

export default class  {
    private _el: HTMLElement;
    private _thumbnail: HTMLElement;
    private _nameEl: HTMLInputElement;
    private _video: Video;
    private _name: string;

    constructor (src: string, name: string) {
        this._el = this.createHtml();
        this._video = new Video(src);
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

    onNameChanged (handler: (newName: string) => any) {
        this._nameEl.addEventListener('change', () => {
            const newName = this._nameEl.value;
            if (newName !== this._name) {
                handler(newName);
            }
        });
    }
}
