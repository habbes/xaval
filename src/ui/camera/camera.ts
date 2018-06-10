import { VideoModel, VideoStream, VideoStreamParams } from '@/core/video';

export class Camera implements VideoModel {
    private _video: HTMLVideoElement;
    private _capture: any;
    private _cameraStream: MediaStream;
    private _stream: VideoStream;
    private _constraints: MediaStreamConstraints;

    constructor (constraints: MediaStreamConstraints = { video: true, audio: false }) {
        this._video = document.createElement('video');
        this._constraints = constraints;
    }

    /**
     * requests access to the camera
     */
    request () {
        if (this._cameraStream) {
            return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
            navigator.mediaDevices.getUserMedia(this._constraints)
            .then(camStream => {
                this._video.srcObject = camStream;
                this._cameraStream = camStream;
                this._video.addEventListener('canplay', () => {
                    this.onVideoReady();
                    resolve();
                });
            })
            .catch(err => {
                alert(`Error: ${err}`);
                reject(err);
            });
        });
    }
    
    private onVideoReady () {
        this._video.width = this._video.videoWidth;
        this._video.height = this._video.videoHeight;
        this._capture = new cv.VideoCapture(this._video);
        this._video.play();
    }

    get width () {
        return this._video.width;
    }

    get height () {
        return this._video.height;
    }

    read (dest?: any) {
        dest = dest ||  new cv.Mat(this.height, this.width, cv.CV_8UC4);
        this._capture.read(dest);
        return dest;
    }

    getStream (params: VideoStreamParams) {
        if (!this._stream) {
            this._stream = new VideoStream(this, params);
        }
        return this._stream;
    }
}