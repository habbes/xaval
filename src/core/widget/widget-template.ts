import { 
    WidgetOpts,
    WidgetModelContext,
    WidgetArgDataType,
    WidgetArgControlType,
    WidgetTemplate,
    WidgetTemplateCreateArgs
} from './types';
import { createWidgetCreateFunction } from './widget-model';

export function createWidgetTemplate (name: string, args: WidgetTemplateCreateArgs): WidgetTemplate {
    const opts: WidgetOpts = {
        name,
        params: {},
        inputs: {},
        outputs: {},
        onUpdate: args.onUpdate
    };

    // params
    for (let paramName in args.params) {
        const rawParams = args.params[paramName];
        const type = <WidgetArgDataType>args.params[paramName].type || WidgetArgDataType.Number;
        const control = <WidgetArgControlType>args.params[paramName].control || getDefaultControlForType(type);
        opts.params[paramName] = {
            type,
            control,
            initial: rawParams.initial,
            min: rawParams.min,
            max: rawParams.max,
            step: rawParams.step
        };
    }

    // inputs
    if (Array.isArray(args.inputs)) {
        for (let inputName of args.inputs) {
            opts.inputs[inputName] = {
                type: WidgetArgDataType.Any
            }
        }
    }
    else {
       for (let inputName in args.inputs) {
           opts.inputs[inputName] = {
               type: <WidgetArgDataType>args.inputs[inputName].type || WidgetArgDataType.Any
           }
       }
    }

    // outputs
    if (Array.isArray(args.outputs)) {
        for (let outputName of args.outputs) {
            opts.outputs[outputName] = {
                type: WidgetArgDataType.Any
            }
        }
    }
    else {
        for (let outputName in args.outputs) {
            opts.outputs[outputName] = {
                type: <WidgetArgDataType>args.outputs[outputName].type || WidgetArgDataType.Any
            }
        }
    }

    return {
        opts,
        create: createWidgetCreateFunction(opts)
    };
};

function getDefaultControlForType (type: WidgetArgDataType): WidgetArgControlType {
    switch (type) {
        case WidgetArgDataType.Boolean:
            return WidgetArgControlType.Checkbox;
        case WidgetArgDataType.Number:
            return WidgetArgControlType.Slider;
        default:
            return WidgetArgControlType.Slider;
    }
}