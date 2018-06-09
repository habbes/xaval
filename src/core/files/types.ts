export interface FileLibrary {
    /**
     * adds an image to the file source
     * @param fileUrl object url of the image
     * @param filename optional name for the file, if not provided, one will be auto-assigned
     */
    addImage(fileUrl: string, filename?: string): any;

    /**
     * reads a specified image from the library as an OpenCv matrix
     * @param name file name
     * @returns {cv.Mat} OpenCV matrix containing the image
     */
    readImage(name: string): any;

    /**
     * changes the name of a file in the library
     * @param oldName current name of the file
     * @param newName new name, should be unique in the library
     */
    rename(oldName: string, newName: string): any;
}