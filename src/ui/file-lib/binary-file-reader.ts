import { BinaryFileReader } from '@/core/files';

export default class implements BinaryFileReader {
    _reader: FileReader;
    _file: Blob;
    _url: string;

    constructor (file: Blob) {
        this._file = file;
        this._reader = new FileReader();
        this._url = URL.createObjectURL(file);
    }

    get objectURL () {
        return this._url;
    }

    _read (type: Type) {
        return new Promise ((resolve, reject) => {
            this._reader.onloadend = () => {
                resolve(this._reader.result);
            };
            this._reader.onerror = (e: any) => {
                const error = e.error || new Error('Error reading file');
                reject(error);
            }
            if (type === 'text') {
                this._reader.readAsText(this._file);
            }
            else if (type === 'url') {
                this._reader.readAsDataURL(this._file);
            }
            else {
                this._reader.readAsArrayBuffer(this._file);
            }
        });
    }

    readText () {
        return this._read('text');
    }

    readBuffer () {
        return this._read('buffer');
    }

    readDataURL () {
        return this._read('url');
    }
}

type Type = 'text' | 'buffer' | 'url';
