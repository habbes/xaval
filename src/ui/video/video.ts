import { VideoSource, VideoStream, VideoStreamParams } from '@/core/video';

export class Video implements VideoSource {
    private _video: HTMLVideoElement;
    private _capture: any;
    private _captureDest: any;
    private _stream: VideoStream;
    private _playing: boolean;
    private _onPlayHandler: any;
    private _onPauseHandler: any;
    private _onEndHandler: any;

    constructor (src: string) {
        this._video = document.createElement('video');
        this._video.muted = true;
        this._video.preload = 'auto';
        this._video.src = src;
        this._video.addEventListener('canplay', () => {
            this.onVideoReady();
        });
        this._onPlayHandler = this.onVideoPlaying.bind(this);
        this._onPauseHandler = this.onVideoPaused.bind(this);
        this._onEndHandler = this.onVideoEnded.bind(this);
    }

    get width () {
        return this._video.width;
    }

    get height () {
        return this._video.height;
    }

    get playing () {
        return this._playing;
    }

    get looping (): boolean {
        return this._video.loop;
    }

    set looping (val: boolean) {
        this._video.loop = val;
    }

    get ended (): boolean {
        return this._video.ended;
    }

    get duration (): number {
        return this._video.duration;
    }

    get currentTime (): number {
        return this._video.currentTime;
    }

    set currentTime (time: number) {
        this._video.currentTime = time;
    }

    /**
     * OpenCV matrix used to store captured video frame
     */
    private get captureDest () {
        if (!this._captureDest || this._captureDest.isDeleted()) {
            this._captureDest = new cv.Mat(this.height, this.width, cv.CV_8UC4);
        }
        return this._captureDest;
    }

    private onVideoReady () {
        this._video.width = this._video.videoWidth;
        this._video.height = this._video.videoHeight;
        this._capture = new cv.VideoCapture(this._video);
        this._video.addEventListener('play', this._onPlayHandler);
        this._video.addEventListener('pause', this._onPauseHandler);
        this._video.addEventListener('ended', this._onEndHandler);
    }

    private onVideoPlaying () {
        this._playing = true;
        if (this._stream && this._stream.params.autoStart && !this._stream.streaming) {
            this._stream.start();
        }
    }

    private onVideoPaused () {
        this._playing = false;
        if (this._stream && this._stream.streaming) {
            this._stream.stop();
        }
    }

    private onVideoEnded () {
        this.onVideoPaused();
    }


    private deleteCaptureDest () {
        if (this._captureDest && !this._captureDest.isDeleted()) {
            this._captureDest.delete();
            this._captureDest = null;
        }
    }

    
    
    read (dest?: any) {
        dest = dest || this.captureDest;
        this._capture.read(dest);
        return dest;
    }

    getStream (params: VideoStreamParams) {
        if (!this._stream) {
            params = { autoStart: true, ...params };
            this._stream = new VideoStream(this, params);
            if (this._playing && params.autoStart) {
                this._stream.start();
            }
        }
        return this._stream;
    }

    play () {
        this._video.play();
    }

    pause () {
        this._video.pause();
    }

    stop () {
        if (this._video) {
            this._video.pause();
            this._video.srcObject = null;
            this._video.removeEventListener('play', this._onPlayHandler);
            this._video.removeEventListener('pause', this._onPauseHandler);
        }

        if (this._stream) {
            this._stream.stop();
            this._stream = null;
        }
        this.deleteCaptureDest();
    }
}