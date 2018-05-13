import { AppNewArgs } from '@/types';

export default class App {
    args: AppNewArgs;
    constructor (args: AppNewArgs) {
        this.args = args;
    }

    start () {
        this.args.editor.setRunHandler(source => {
            const res = this.runCode(source);
            console.log('Code result', res);
        });

        this.args.editor.focus();
    }

    runCode (source: string) {
        const execute = Function(
            'imsource',
            'imviewer',
            `"use strict";${source}`
        );

        return execute(
            this.args.imageSource,
            this.args.imageViewer
        );
    }
}