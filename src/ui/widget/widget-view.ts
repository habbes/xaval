
import { template } from 'lodash';
import { WidgetModel, WidgetArgDataType, WidgetArgControlType } from '@/core/widget';
import { createCheckbox, createSlider, createSelect } from './controls';


export class WidgetView {
    readonly el: HTMLElement;
    readonly model: WidgetModel;
    constructor (model: WidgetModel) {
        this.el = createHtml(model);
        this.model = model;
    }
}

interface WidgetHtmlElement extends HTMLDivElement {
    widget: WidgetModel;
}

function createHtml (model: WidgetModel) {
    const tpl = 
    `<div class="widget-title">${model.opts.name}</div>
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
    const header = <HTMLDivElement>node.querySelector('.widget-title');
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
    let inputContainer: HTMLElement;
    switch (param.control) {
        case WidgetArgControlType.Checkbox:
            inputContainer = createCheckbox(name, model);
            break;
        case WidgetArgControlType.Select:
            inputContainer = createSelect(name, model);
            break;
        case WidgetArgControlType.Slider:
            inputContainer = createSlider(name, model);
            break;
        default:
            inputContainer = createSlider(name, model);
            break;
    }
    inputContainer.classList.add('param-input-container');
    node.appendChild(inputContainer);
    return node;
} 