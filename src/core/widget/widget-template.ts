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
    console.log(args);
    const opts: WidgetOpts = {
        name,
        params: {},
        inputs: {},
        onUpdate: args.onUpdate
    };
    for (let paramName in args.params) {
        const rawParams = args.params[paramName];
        const type = <WidgetArgDataType>args.params[paramName].type || WidgetArgDataType.Number;
        const control = args.params[paramName].control = WidgetArgControlType.Slider;
        opts.params[paramName] = {
            type,
            control,
            initial: rawParams.initial,
            min: rawParams.min,
            max: rawParams.max
        };
    }
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

    return {
        opts,
        create: createWidgetCreateFunction(opts)
    };
};
