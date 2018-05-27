import {Subject} from 'rxjs';
import { WidgetModel, WidgetOpts, WidgetModelContext, WidgetArgDataType } from "./types";

export function createWidgetCreateFunction (opts: WidgetOpts)  {
    function create () {
        const source = new Subject();
        const widget: WidgetModel =  {
            opts,
            state: initWidgetModelState(opts),
            getInput (name: string) {
                return this.state.inputs[name];
            },
            getParam (name: string) {
                return this.state.params[name];
            },
            setInput (name: string, value: any) {
                this.state.inputs[name] = value;
                this.update();
            },
            setParam (name: string, value: any) {
                this.state.params[name] = value;
                console.log('setting', name, value);
                this.update();
            },
            get observable () {
                return source;
            },
            update () {
                const output = this.opts.onUpdate(this.state);
                source.next(output);
                console.log('update called', this.state);
            }
        }

        return widget;
    }

    return create;
}

function initWidgetModelState (opts: WidgetOpts): WidgetModelContext {
    const state: WidgetModelContext = {
        params: {},
        inputs: {}
    };
    for (let paramName in opts.params) {
        const param = opts.params[paramName];
        let value: any;
        switch (param.type) {
            case WidgetArgDataType.Number:
                value = 0;
                break;
            case WidgetArgDataType.String:
                value = '';
                break;
            case WidgetArgDataType.Any:
                value = null;
        }
        state.params[paramName] = value;
    }
    for (let inputName in opts.inputs) {
        state.inputs[inputName] = null;
    }
    return state;
}