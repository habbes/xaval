import { Observable, Observer } from 'rxjs';
import { WidgetManager } from '@/ui/widget-manager';

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
    widgetManager: WidgetManager;
}

export interface HtmlInputEvent extends Event {
    target: HTMLInputElement & EventTarget
}

export interface DataSource<T> {
    readonly observable: Observable<T>;
}

export interface DataSink<T> {
    readonly observer: Observer<T>
}