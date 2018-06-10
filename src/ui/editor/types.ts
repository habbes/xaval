export interface EditorProvider {
    getValue (): string;
    setValue (code: string): any;
    focus (): void;
}

export interface EditorInitOpts {
    value: string;
}