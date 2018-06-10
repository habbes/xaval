import { DataSink, DataSource } from '@/types';
import { Observable } from 'rxjs';

export enum WidgetArgDataType {
    Any = 'any',
    Number = 'number',
    String = 'string',
    Boolean = 'boolean'
}

export enum WidgetArgControlType {
    Slider = 'slider',
    Checkbox = 'checkbox'
}

export interface WidgetOpts {
    name: string;
    params: WidgetParams;
    inputs: WidgetInputs;
    outputs: WidgetOutputs;
    onUpdate(ctx: WidgetModelContext): {[outputName: string]: any};
}

export interface WidgetUpdateResult {
    [outputName: string]: any;
}

export interface WidgetParams {
    [paramName: string]: WidgetParamOpts;
}

export interface WidgetParamOpts {
    type: WidgetArgDataType;
    control: WidgetArgControlType;
    initial?: any;
    min?: number;
    max?: number;
    step?: number;
}

export interface WidgetInputs {
    [inputName: string]: WidgetInputOpts;
}

export interface WidgetInputOpts {
    type: WidgetArgDataType;
}

export interface WidgetOutputs {
    [outputName: string]: WidgetOutputOpts;
}

export interface WidgetOutputOpts {
    type: WidgetArgDataType;
}

export interface WidgetModelContext {
    inputs: {
        [inputName: string]: any
    },
    params: {
        [paramName: string]: any
    }
}

export interface WidgetModel extends DataSource<WidgetUpdateResult> {
    /**
     * template options used to create the widget
     */
    opts: WidgetOpts;
    /**
     * contains current state (inputs and params) of the widget
     */
    state: WidgetModelContext;
    /**
     * maps each input to a data sink
     */
    inputs: {[name: string]: DataSink<any>},
    /**
     * maps each output to a data source
     */
    outputs: {[name: string]: DataSource<any>},
    /**
     * cache of observables for each output
     * @internal
     */
    _outputsObservables: {[name: string]: Observable<any>};
    /**
     * updates the specified input
     * this updates the widget
     * @param inputName
     * @param value 
     */
    setInput(inputName: string, value: any): void;
    /**
     * updates multiple inputs at a go, then updates
     * the widget
     * @param inputs 
     */
    setInputs(inputs: {[name: string]: any}): void;
    /**
     * gets the current value of the specified input
     * @param inputName
     */
    getInput(inputName: string): any;
    /**
     * updates the specified param,
     * then updates the widget
     * @param paramName 
     * @param value 
     */
    setParam(paramName: string, value: any): void;
    /**
     * updates multiple params at a go,
     * then updates the widget
     * @param params 
     */
    setParams(params: {[name: string]: any}): void;
    /**
     * gets the current value of the specified param
     * @param paramName
     */
    getParam(paramName: string): any;
    /**
     * updates the widget
     */
    update(): any;
    /**
     * pipes the specified output to a
     * destination data sink,
     * the destination is returned to enable chaining
     * @param name 
     * @param dest 
     */
    pipeOutput(name: string, dest: DataSink<any>): DataSink<any>;
    /**
     * gets the observable corresponding to the specified output,
     * same as ```widget.outputs[name].observable```
     * @param name 
     */
    getOutputObservable(name: string): Observable<any>;
}

export interface WidgetTemplateCreateArgs {
    params: { 
        [paramName: string]: { 
            type?: string;
            control?: string;
            initial?: any;
            min?: number;
            max?: number;
            step?: number;
        }
    };
    inputs: string[] | {
        [inputName: string]: {
            type?: string
        }
    };
    outputs: string[] | {
        [outputName: string]: {
            type?: string
        }
    }
    onUpdate (ctx: WidgetModelContext): any;
}

export interface WidgetTemplate {
    opts: WidgetOpts;
    create(): WidgetModel;
}
