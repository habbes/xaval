export interface Editor {
    source: string;
    run(): void;
    focus(): void;
    setRunHandler(handler: (source: string) => void): void;
}

export interface ImageViewer {
    show (mat: any): void;
}

export interface ImageSource {
    read (): any;
}

export interface AppNewArgs {
    editor: Editor;
    imageViewer: ImageViewer;
    imageSource: ImageSource;
}

export interface HtmlInputEvent extends Event {
    target: HTMLInputElement & EventTarget
}