import { DataSource } from '@/types';

export interface VideoModel {
    /**
     * reads the current image frame the video
     * @return {cv.Mat} frame image
     */
    read(): any;

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
}
