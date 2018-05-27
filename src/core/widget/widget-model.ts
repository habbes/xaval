import {Subject} from 'rxjs';
import { WidgetModel, WidgetOpts, WidgetModelContext, WidgetArgDataType, WidgetParams } from "./types";

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
                this.update();
            },
            get observable () {
                return source;
            },
            update () {
                const output = this.opts.onUpdate(this.state);
                source.next(output);
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
        let value: any = 'initial' in param ? param.initial : getDefaultInitialValueForType(param.type);
        state.params[paramName] = value;
    }
    for (let inputName in opts.inputs) {
        state.inputs[inputName] = null;
    }
    return state;
}

function getDefaultInitialValueForType (type: WidgetArgDataType): any {
    switch (type) {
        case WidgetArgDataType.Number:
            return 0;
        case WidgetArgDataType.String:
            return '';
        default:
            return null;
    }
}