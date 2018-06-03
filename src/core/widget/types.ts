import { DataSink, DataSource } from '@/types';
import { Observable } from 'rxjs';

export enum WidgetArgDataType {
    Any = 'any',
    Number = 'number',
    String = 'string',
}

export enum WidgetArgControlType {
    Slider = 'slider'
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
    opts: WidgetOpts;
    state: WidgetModelContext;
    inputs: {[name: string]: DataSink<any>},
    outputs: {[name: string]: DataSource<any>},
    _outputsObservables: {[name: string]: Observable<any>};
    setInput(inputName: string, value: any): void;
    setInputs(inputs: {[name: string]: any}): void;
    getInput(inputName: string): any;
    setParam(paramName: string, value: any): void;
    setParams(params: {[name: string]: any}): void;
    getParam(paramName: string): any;
    update(): any;
    pipeOutput(name: string, dest: DataSink<any>): DataSink<any>;
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
