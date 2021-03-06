import { DataSource } from '@/types';

export interface VideoSource {
    /**
     * the height of the video
     */
    readonly height: number;

    /**
     * the width of the video;
     */
    readonly width: number;

    /**
     * reads the current image frame the video
     * @param {cv.Mat} dest matrix object where to store the image,
     * if not provided, a new matrix is created
     * @return {cv.Mat} frame image
     * if `dest` was provided, then this will be the same object
     */
    read(dest?: any): any;

    /**
     * gets a stream from the video, that
     * can be piped to a data source
     */
    getStream(params: VideoStreamParams): DataSource<any>;
}

export interface VideoStreamParams {
    /**
     * frame rate of the video stream
     */
    fps: number;
    /**
     * indicates whether the video stream should be started
     * automatically by its video model
     */
    autoStart?: boolean;
}
