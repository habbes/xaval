import { Observable, Observer, Subscription, NextObserver } from 'rxjs';
import { WidgetManager } from '@/ui/widget-manager';
import { FileLibrary } from '@/core/files';

export interface Editor {
    source: string;
    run(): void;
    focus(): void;
    setRunHandler(handler: (source: string) => void): void;
}

export interface ImageViewer extends DataSink<any> {
    show (mat: any): void;
}

export interface ImageSource {
    read (): any;
}

export interface AppNewArgs {
    editor: Editor;
    imageViewer: ImageViewer;
    files: FileLibrary;
    widgetManager: WidgetManager;
}

export interface HtmlInputEvent extends Event {
    target: HTMLInputElement & EventTarget
}

export interface DataSource<T> {
    readonly observable: Observable<T>;
    subscribe (observer: NextObserver<T>): Subscription;
    pipe (dest: DataSink<T>): DataSink<T>;
}

export interface DataSink<T> {
    next (value?: T): void;
}