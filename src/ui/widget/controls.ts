import { WidgetModel } from "@/core/widget";

export function createSlider (name: string, model: WidgetModel): HTMLElement {
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
    const valueLabel = document.createElement('span');
    valueLabel.className = 'value-label';
    valueLabel.textContent = input.value;
    input.addEventListener('input', (e: Event) => {
        const value = Number(input.value);
        model.setParam(name, value);
        node.querySelector('.value-label').textContent = String(value);
    });
    const tpl = 
    `<div class="param-label">${name}</div>
    <div class="param-input-container">
    </div>`;
    const node = document.createElement('div');
    node.className = 'param-control';
    node.innerHTML = tpl;
    node.querySelector('.param-input-container').appendChild(input);
    node.querySelector('.param-input-container').appendChild(valueLabel);
    return node;
}

export function createCheckbox (name: string, model: WidgetModel): HTMLElement {
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = model.state.params[name];
    input.addEventListener('change', (e: Event) => {
        const value = input.checked;
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