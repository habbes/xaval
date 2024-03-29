import { Subject, NextObserver, Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import {
    WidgetModel,
    WidgetOpts,
    WidgetModelContext,
    WidgetArgDataType,
    WidgetArgControlType,
    WidgetParams,
    WidgetUpdateResult } from "./types";
import { DataSink } from 'types';

/**
 * returns a function that is used to create widget models
 * based on the specified options
 * @param opts 
 */
export function createWidgetCreateFunction (opts: WidgetOpts)  {
    function create () {
        const source = new Subject();
        const widget: WidgetModel = {
            opts,
            state: initWidgetModelState(opts),
            inputs: {},
            outputs: {},
            _outputsObservables: {},
            _paramUpdateHandler: undefined,
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
                if (this._paramUpdateHandler) {
                    this._paramUpdateHandler(name, value);
                }
                this.update();
            },
            setParams (params) {
                Object.keys(params).forEach(name => {
                    this.state.params[name] = params[name];
                    if (this._paramUpdateHandler) {
                        this._paramUpdateHandler(name, params[name]);
                    }
                });
                this.update();
            },
            onParamUpdated (handler) {
                this._paramUpdateHandler = handler;
            },
            get observable () {
                return source;
            },
            update () {
                if (!validateUpdate(this)) {
                    return;
                }
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

/**
 * checks whether the widget state is in a valid
 * state for the update callback to run
 * @param widget 
 */
function validateUpdate (widget: WidgetModel): boolean {
    const res = !(
        Object.keys(widget.opts.inputs)
        .some(input => typeof widget.state.inputs[input] === 'undefined')
        || Object.keys(widget.opts.params)
        .some(param => typeof widget.state.params[param] === 'undefined')
    );
    return res;
}

/**
 * initializes a widget model's state
 * @param opts 
 */
export function initWidgetModelState (opts: WidgetOpts): WidgetModelContext {
    const state: WidgetModelContext = {
        params: {},
        inputs: {}
    };
    for (let paramName in opts.params) {
        const param = opts.params[paramName];
        let value: any = typeof param.initial !== 'undefined' ? param.initial : getDefaultInitialValueForType(param.type);
        state.params[paramName] = value;
    }
    for (let inputName in opts.inputs) {
        state.inputs[inputName] = undefined;
    }
    return state;
}

/**
 * gets the default initial value to use for the given param data type.
 * This is used when the param is not explicitly initialized
 * @param type
 */
export function getDefaultInitialValueForType (type: WidgetArgDataType): any {
    switch (type) {
        case WidgetArgDataType.Number:
            return 0;
        case WidgetArgDataType.Boolean:
            return false;
        case WidgetArgDataType.String:
            return '';
        default:
            return undefined;
    }
}

/**
 * gets the default param control type for the specified param data type
 * @param type param data type
 */
export function getDefaultControlForType (type: WidgetArgDataType): WidgetArgControlType {
    switch (type) {
        case WidgetArgDataType.Boolean:
            return WidgetArgControlType.Checkbox;
        case WidgetArgDataType.Number:
            return WidgetArgControlType.Slider;
        case WidgetArgDataType.String:
            return WidgetArgControlType.Text;
        default:
            return WidgetArgControlType.Text;
    }
}

/**
 * converts the string value to the appropriate type based on
 * the specified widget param type
 * @param value 
 * @param type 
 */
export function getParamValueFromString (value: string, type: WidgetArgDataType) {
    switch (type) {
        case WidgetArgDataType.Number:
            return Number(value);
        case WidgetArgDataType.Boolean:
            return Boolean(value);
        default:
            return value;
    }
}