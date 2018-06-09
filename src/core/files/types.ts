export interface FileLibrary {
    addImage(fileUrl: string, filename?: string): any;
    readImage(name: string): any;
}