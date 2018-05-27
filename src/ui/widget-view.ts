
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
    `<b>${model.opts.name}</b>
    <div class="params-container">
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
    return node;
}

function createParamControl (name: string, model: WidgetModel): HTMLElement {
    const input = document.createElement('input');
    input.type = 'range';
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