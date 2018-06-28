
import { WidgetModel, WidgetArgDataType, WidgetArgControlType } from '@/core/widget';
import { WidgetParamControl } from './types';
import { createCheckbox, createSlider, createSelect, createText } from './controls';


export class WidgetView {
    readonly el: HTMLElement;
    readonly model: WidgetModel;

    constructor (model: WidgetModel) {
        this.el = createHtml(model);
        this.model = model;
    }

    setId (id: string) {
        this.el.id = id;
        this.el.querySelector('.widget-id').textContent = `#${id}`;
    }
}

interface WidgetHtmlElement extends HTMLDivElement {
    widget: WidgetModel;
}

function createHtml (model: WidgetModel) {
    const tpl = 
    `<div class="widget-header">
        <span class="widget-title">${model.opts.name}</span>
        <span class="widget-id"></span>
    </div>
    <div class="widget-content">
        <div class="params-container">
        </div>
    </div>`;
    let node: WidgetHtmlElement = <WidgetHtmlElement>document.createElement('div');
    node.className = 'widget';
    node.innerHTML = tpl;
    // TODO: is it necessary to create a node.widget reference?
    node.widget = model;
    const params = model.opts.params;
    const paramContainer = node.querySelector('.params-container');
    for (let paramName in params) {
        const control = createParamControl(paramName, model);
        paramContainer.appendChild(control);
    }
    const header = <HTMLDivElement>node.querySelector('.widget-header');
    header.draggable = true;
    header.ondragstart = (ev) => {
        ev.dataTransfer.setData('id', node.id);
        ev.dataTransfer.dropEffect = 'move';
    };
    return node;
}

function createParamControl (name: string, model: WidgetModel): HTMLElement {
    const param = model.opts.params[name];
    const node = document.createElement('div');
    node.className = 'param-control';
    node.innerHTML = `<div class="param-label">${name}</div>`;
    let control: WidgetParamControl;
    switch (param.control) {
        case WidgetArgControlType.Checkbox:
            control = createCheckbox(name, model);
            break;
        case WidgetArgControlType.Select:
            control = createSelect(name, model);
            break;
        case WidgetArgControlType.Slider:
            control = createSlider(name, model);
            break;
        case WidgetArgControlType.Text:
            control = createText(name, model);
            break;
        default:
            control = createText(name, model);
            break;
    }
    control.el.classList.add('param-input-container');
    node.appendChild(control.el);
    return node;
} 