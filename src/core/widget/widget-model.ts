import { WidgetModel, WidgetOpts, WidgetModelContext, WidgetArgDataType } from "./types";

export function createWidgetCreateFunction (opts: WidgetOpts)  {
    function create (): WidgetModel {
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
            update () {
                // TODO trigger output
                const output = this.opts.onUpdate(this.state);
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