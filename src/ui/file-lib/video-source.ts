import { Video } from '@/ui/video';
import { applyMixins } from '@/core/util';
import { FileType } from '@/core/files';
import { VideoFileSource } from './types';
import { NameUpdatable } from './mixins';

export default class Source implements VideoFileSource, NameUpdatable {
    private _el: HTMLElement;
    private _thumbnail: HTMLImageElement;
    private _nameEl: HTMLInputElement;
    private _video: Video;
    private _name: string;

    onNameChanged: (handler: (newName: string) => any) => any;

    constructor (src: string, name: string) {
        this._el = this.createHtml();
        this._video = new Video(src);
        this.name = name;
        this._video.onPosterReady(() => {
            this._thumbnail.src = this._video.poster;
        });
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
        return 'video';
    }

    get video (): Video {
        return this._video;
    }

    get nameEl () {
        return this._nameEl;
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
