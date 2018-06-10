import { VideoModel, VideoStream, VideoStreamParams } from '@/core/video';

export class Camera implements VideoModel {
    private _video: HTMLVideoElement;
    private _capture: any;
    private _cameraStream: MediaStream;
    private _stream: VideoStream;
    private _constraints: MediaStreamConstraints;
    private _captureDest: any;

    constructor (constraints: MediaStreamConstraints = { video: true, audio: false }) {
        this._video = document.createElement('video');
        this._constraints = constraints;
    }

    /**
     * requests access to the camera and starts playing the video
     */
    start () {
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

    /**
     * OpenCV matrix used to store captured video frame
     */
    private get captureDest () {
        if (!this._captureDest || this._captureDest.isDeleted()) {
            this._captureDest = new cv.Mat(this.height, this.width, cv.CV_8UC4);
        }
        return this._captureDest;
    }

    private deleteCaptureDest () {
        if (this._captureDest && !this._captureDest.isDeleted()) {
            this._captureDest.delete();
            this._captureDest = null;
        }
    }

    read (dest?: any) {
        dest = dest ||  this.captureDest;
        this._capture.read(dest);
        return dest;
    }

    getStream (params: VideoStreamParams) {
        if (!this._stream) {
            this._stream = new VideoStream(this, params);
        }
        return this._stream;
    }

    /**
     * stops the camera feed and attached stream (if any)
     */
    stop () {
        if (this._video) {
            this._video.pause();
            this._video.srcObject = null;
        }
        if (this._cameraStream) {
            this._cameraStream.getVideoTracks()[0].stop();
        }
        if (this._stream) {
            this._stream.stop();
            this._stream = null;
        }
        this.deleteCaptureDest();
    }
}