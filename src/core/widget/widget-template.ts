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
    const opts = {
        name,
        params: {},
        inputs: {},
        onUpdate: args.onUpdate
    };
    for (let paramName in args.params) {
        const type = args.params[paramName].type || WidgetArgDataType.String;
        const control = args.params[paramName].control = WidgetArgControlType.Slider;
    }

    return {
        opts,
        create: createWidgetCreateFunction(opts)
    };
};
