import {
    WidgetTemplateCreateArgs,
    createWidgetTemplate,
    WidgetTemplate, 
    WidgetModel
} from '@/core/widget';
import { WidgetView } from './widget-view';

const WIDGET_HIDDEN_CLASS = 'hidden';

/**
 * creates and manages widget templates and widgets on screen
 */
export class WidgetManager {
    readonly el: HTMLElement;
    private templates: {[name: string]: WidgetTemplate } = {};
    private widgets: {[widgetId: string]: WidgetView } = {};
    private nextWidgetId = 1;

    /**
     * 
     * @param el container element for the widgets
     */
    constructor (el: HTMLElement) {
        this.el = el;
    }

    /**
     * creates and registers a new WidgetTemplate
     * @param templateName name used to identify the registered template
     * @param opts template options
     */
    public define (templateName: string, opts: WidgetTemplateCreateArgs) {
        const template = createWidgetTemplate(templateName, opts);
        this.templates[templateName] = template;
        return template;
    }

    /**
     * creates a new widget based on the specified template
     * and adds it to the widget manager then displays it.
     * Returns the id of the widget
     * @param templateName name of a registered template
     */
    public create (templateName: string): string {
        const template = this.templates[templateName];
        const widget = template.create();
        return this.add(widget);
    }

    /**
     * gets a registered template
     * @param templateName name of the template
     */
    public getTemplate (templateName: string): WidgetTemplate {
        return this.templates[templateName];
    }

    /**
     * registers a template
     * @param name
     * @param template 
     */
    public setTemplate (name: string, template: WidgetTemplate) {
        this.templates[name] = template;
    }

    /**
     * gets widget by its id
     * @param widgetId
     */
    public get (widgetId: string): WidgetModel|undefined {
        const widget = this.widgets[widgetId];
        return widget && widget.model;
    }

    /**
     * adds the widget to the widget manager and displays.
     * Returns the id of the widget
     * @param widget
     */
    public add (widget: WidgetModel): string {
        const view = new WidgetView(widget);
        const widgetId = `widget${this.nextWidgetId}`;
        view.setId(widgetId);
        this.nextWidgetId += 1;
        this.el.appendChild(view.el);
        this.widgets[widgetId] = view;
        return widgetId;
    }

    /**
     * hides the specified widget
     * @param widgetId
     */
    public hide (widgetId: string) {
        const widget = this.widgets[widgetId];
        if (widget) {
            widget.el.classList.add(WIDGET_HIDDEN_CLASS);
        }
    }

    /**
     * displays the specified widget
     * @param widgetId
     */
    public show (widgetId: string) {
        const widget = this.widgets[widgetId];
        if (widget) {
            widget.el.classList.remove(WIDGET_HIDDEN_CLASS);
        }
    }

    /**
     * removes the specified widget from the widget manager
     * @param widgetId
     */
    public remove (widgetId: string) {
        const widget = this.widgets[widgetId];
        if (widget) {
            this.el.removeChild(widget.el);
            delete this.widgets[widgetId];
        }
    }

    /**
     * removes all widgets from the widget manager
     */
    public removeAll () {
        Object.keys(this.widgets).forEach(widgetId => this.remove(widgetId));
    }

    /**
     * shows all widgets in the widget manager
     */
    public showAll () {
        Object.keys(this.widgets).forEach(widgetId => this.show(widgetId));
    }

    /**
     * hides all widgets in the widget manager
     */
    public hideAll () {
        Object.keys(this.widgets).forEach(widgetId => this.hide(widgetId));
    }
}