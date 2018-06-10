import { Subject, NextObserver, Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { WidgetModel, WidgetOpts, WidgetModelContext, WidgetArgDataType, WidgetParams, WidgetUpdateResult } from "./types";
import { DataSink } from 'types';

export function createWidgetCreateFunction (opts: WidgetOpts)  {
    function create () {
        const source = new Subject();
        const widget: WidgetModel = {
            opts,
            state: initWidgetModelState(opts),
            inputs: {},
            outputs: {},
            _outputsObservables: {},
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
            setInputs (inputs) {
                Object.keys(inputs).forEach(name => {
                    this.state.inputs[name] = inputs[name];
                });
                this.update();
            },
            setParam (name: string, value: any) {
                this.state.params[name] = value;
                this.update();
            },
            setParams (params) {
                Object.keys(params).forEach(name => {
                    this.state.params[name] = params[name];
                });
                this.update();
            },
            get observable () {
                return source;
            },
            update () {
                const outputs = this.opts.onUpdate(this.state);
                source.next(outputs);
            },
            pipe (dest: DataSink<any>): DataSink<any> {
                source.subscribe(outputs => dest.next(outputs));
                return dest;
            },
            subscribe (observer) {
                return source.subscribe(observer);
            },
            pipeOutput (name: string, dest: DataSink<any>): DataSink<any> {
                this.getOutputObservable(name).subscribe(dest);
                return dest;
            },
            getOutputObservable(name: string): Observable<any> {
                if (!(name in this._outputsObservables)) {
                    this._outputsObservables[name] = source.pipe(pluck(name));
                }
                return this._outputsObservables[name];  
            }
        }

        setupInputDataSinks(widget);
        setupOutputDataSources(widget);

        return widget;
    }

    return create;
}

function setupInputDataSinks (widget: WidgetModel) {
    Object.keys(widget.opts.inputs).forEach(name => {
        widget.inputs[name] = {
            next (value: any) {
                widget.setInput(name, value);
            }
        };
    });
}

function setupOutputDataSources (widget: WidgetModel) {
    Object.keys(widget.opts.outputs).forEach(name => {
        widget.outputs[name] = {
            get observable () {
                return widget.getOutputObservable(name);
            },
            subscribe (observer) {
                return widget.getOutputObservable(name).subscribe(observer);
            },
            pipe (dest: DataSink<any>): DataSink<any> {
                return widget.pipeOutput(name, dest);
            }
        };
    });
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
        case WidgetArgDataType.Boolean:
            return false;
        case WidgetArgDataType.String:
            return '';
        default:
            return null;
    }
}