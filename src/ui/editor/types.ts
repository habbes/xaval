export interface EditorProvider {
    getValue (): string;
    focus (): void;
}

export interface EditorInitOpts {
    value: string;
}