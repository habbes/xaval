import { ImageViewer } from '@/types';

let _nextId = 0;

function nextId () {
    return ++_nextId;
}

export default class implements ImageViewer {
    el: HTMLElement;
    canvas: HTMLCanvasElement;
    constructor (el: HTMLElement) {
        this.el = el;
        this.canvas = el.querySelector('.canvas');
        this.canvas.id = `canvas${nextId()}`;
    }

    show (mat: any) {
        cv.imshow(this.canvas.id, mat);
    }

    next (mat: any) {
        this.show(mat);
        if (mat.delete) {
            mat.delete();
        }
    }
}