import { ImageSource, HtmlInputEvent } from '../types';

export default class implements ImageSource {
    readonly el: HTMLElement;
    readonly thumbnail: HTMLImageElement
    readonly image: HTMLImageElement;
    readonly inputEl: HTMLInputElement;
    constructor (el: HTMLElement) {
        this.el = el;
        this.thumbnail = el.querySelector('img');
        this.image = new Image();
        this.inputEl = el.querySelector('input');

        this.inputEl.addEventListener('change', (e: HtmlInputEvent) => {
            this.thumbnail.src = URL.createObjectURL(e.target.files[0]);
            this.image.src = this.thumbnail.src;
        }, false);
    }

    read () {
        return cv.imread(this.image);
    }
}