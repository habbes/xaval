
import { template } from 'lodash';
import { WidgetModel } from 'core/widget';


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
    const input = document.createElement('input');
    input.type = 'range';
    input.value = model.state.params[name];
    const paramOpts = model.opts.params[name];
    if ('min' in paramOpts) {
        input.min = String(paramOpts.min);
    }
    if ('max' in paramOpts) {
        input.max = String(paramOpts.max);
    }
    if ('step' in paramOpts) {
        input.step = String(paramOpts.step);
    }
    input.addEventListener('input', (e: Event) => {
        const value = Number(input.value);
        model.setParam(name, value);
    });
    const tpl = 
    `<div class="param-label">${name}</div>
    <div class="param-input-container">
    </div>`;
    const node = document.createElement('div');
    node.className = 'param-control';
    node.innerHTML = tpl;
    node.querySelector('.param-input-container').appendChild(input);
    return node;
} 