import { VideoSource } from '@/core/video';

/**
 * represents a library for managing files,
 * it provides access to add and read files of
 * different types
 * each file has unique name
 * the implementation is also assumed to track
 * metadata about each type internally (e.g. type)
 */
export interface FileLibrary {

    /**
     * adds an image to the file source
     * @param fileUrl object url of the image
     * @param filename optional name for the file, if not provided, one will be auto-assigned
     */
    addImage(fileUrl: string, filename?: string): any;

    /**
     * adds a video to the file library
     * @param fileUrl object url of the image
     * @param filename optional name for the file, if not provided, one will be auto-assigned
     */
    addVideo(fileUrl: string, filename?: string): any;

    /**
     * adds a file of an arbitrary type
     * @param file blob containing the file
     * @param filename optional name assigned to the file in the library
     */
    addBinary(file: Blob, filename?: string): any;

    /**
     * reads a specified image from the library as an OpenCv matrix
     * @param name file name
     * @returns {cv.Mat} OpenCV matrix containing the image
     */
    readImage(name: string): any;

    /**
     * reads specified video from the library
     * @param name file name
     * @returns video
     */
    readVideo(name: string): VideoSource;

    /**
     * returns a reader to access the specified file as a blob
     * @param name 
     */
    getReader(name: string): BinaryFileReader;

    /**
     * reads file based on its type
     * @param name file name
     * @returns depends on file type
     */
    read(name: string): any;

    /**
     * changes the name of a file in the library
     * @param oldName current name of the file
     * @param newName new name, should be unique in the library
     */
    rename(oldName: string, newName: string): any;
}

export type FileType = 'image' | 'video';

/**
 * represents a wrapper around a blob
 */
export interface BinaryFileReader {
    /**
     * reads the contents of the file as text
     */
    readText(): Promise<any>;

    /**
     * returns the contents of the file as an ArrayBuffer
     */
    readBuffer(): Promise<any>;

    /**
     * returns the contents of the file as data url
     */
    readDataURL(): Promise<any>;
}
