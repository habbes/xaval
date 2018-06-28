import { FileType, BinaryFileReader } from '@/core/files';
import { Video } from '@/ui/video';

export interface FileSource {
    el: HTMLElement;
    type: FileType;
    name: string;
    onNameChanged (handler: (newName: string) => any): any;
}

export interface ImageFileSource extends FileSource {
    image: HTMLImageElement;
}

export interface VideoFileSource extends FileSource {
    video: Video;
}

export interface BinaryFileSource extends FileSource {
    reader: BinaryFileReader;
}

export interface SourceCtor {
    new (file: Blob | string, name: string): FileSource;
}

export interface FileContainer {
    id: string,
    name: string,
    source: FileSource
}
