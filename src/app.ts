import { AppNewArgs } from '@/types';
import { createWidgetTemplate } from '@/core/widget';

const ROOT_MODULE = 'xaval';

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

    getRootModule () {
        return {
            cv,
            widgets: this.args.widgetManager,
            core: {
                widget: {
                    createWidgetTemplate
                },
            },
            io: {
                imageViewer: this.args.imageViewer,
                files: this.args.files,
            }
        }
    }

    runCode (source: string) {
        const execute = Function(
            ROOT_MODULE,
            `"use strict";${source}`
        );

        return execute(
            this.getRootModule()
        );
    }
}
