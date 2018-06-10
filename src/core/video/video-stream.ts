import { Subject, NextObserver, Subscription } from 'rxjs';
import { DataSink, DataSource } from '@/types';
import { VideoStreamParams, VideoModel } from './types';

export default class VideoStream implements DataSource<any> {
    private _source: Subject<any>;
    private _params: VideoStreamParams;
    private _streaming: boolean = false;
    private _video: VideoModel;

    constructor (video: VideoModel, params: VideoStreamParams) {
        this._source = new Subject();
        this._params = { ...params };
        this._video = video;
        if (this._params.autoStart) {
            this.start();
        }
    }
    
    /**
     * whether or not the stream is currently running
     */
    get streaming () {
        return this._streaming;
    }

    get observable () {
        return this._source;
    }

    /**
     * starts the video stream
     */
    start () {
        if (this._streaming) {
            return;
        }
        this._streaming = true;
        this.loop();
    }

    /**
     * stops the video stream
     */
    stop () {
        if (!this._streaming) {
            return;
        }
        this._streaming = false;
    }

    private loop () {
        if (!this._streaming) {
            return;
        }
        const started = Date.now();
        const frame = this._video.read();
        this._source.next(frame);
        const delay = 1000 / this._params.fps - (Date.now() - started);
        setTimeout(() => this.loop(), delay);
    }

    pipe (dest: DataSink<any>): DataSink<any> {
        this._source.subscribe(outputs => dest.next(outputs));
        return dest;
    }

    subscribe (observer: NextObserver<any>): Subscription {
        return this._source.subscribe(observer);
    }
}