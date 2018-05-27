import {
    WidgetTemplateCreateArgs,
    createWidgetTemplate,
    WidgetTemplate, 
    WidgetModel
} from '@/core/widget';
import { WidgetView } from './widget-view';

export class WidgetManager {
    readonly el: HTMLElement;
    private templates: {[name: string]: WidgetTemplate } = {};
    private widgets: WidgetView[] = [];
    private nextWidgetId = 1;

    constructor (el: HTMLElement) {
        this.el = el;
    }

    public define (templateName: string, opts: WidgetTemplateCreateArgs) {
        const template = createWidgetTemplate(templateName, opts);
        this.templates[templateName] = template;
        return template;
    }

    public create (templateName: string) {
        const template = this.templates[templateName];
        return template.create();
    }

    public show(widget: WidgetModel) {
        const view = new WidgetView(widget);
        view.el.id = `widget${this.nextWidgetId}`;
        this.nextWidgetId += 1;
        this.el.appendChild(view.el);
        this.widgets.push(view);
    }
}