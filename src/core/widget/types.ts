import { DataSink, DataSource } from '@/types';

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
    onUpdate(ctx: WidgetModelContext): any;
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

export interface WidgetModelContext {
    inputs: {
        [inputName: string]: any
    },
    params: {
        [paramName: string]: any
    }
}

export interface WidgetModel extends DataSource<any> {
    opts: WidgetOpts;
    state: WidgetModelContext;
    setInput(inputName: string, value: any): void;
    getInput(inputName: string): any;
    setParam(paramName: string, value: any): void;
    getParam(paramName: string): any;
    update(): any;
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
    onUpdate (ctx: WidgetModelContext): any;
}

export interface WidgetTemplate {
    opts: WidgetOpts;
    create(): WidgetModel;
}
