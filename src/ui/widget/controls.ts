import { WidgetModel, getParamValueFromString } from "@/core/widget";

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
    const container = document.createElement('div');
    const valueLabel = document.createElement('span');
    valueLabel.className = 'value-label';
    valueLabel.textContent = input.value;
    input.addEventListener('input', (e: Event) => {
        const value = Number(input.value);
        model.setParam(name, value);
        container.querySelector('.value-label').textContent = String(value);
    });
    container.appendChild(input);
    container.appendChild(valueLabel);
    return container;
}

export function createCheckbox (name: string, model: WidgetModel): HTMLElement {
    const container = document.createElement('div');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = model.state.params[name];
    input.addEventListener('change', (e: Event) => {
        const value = input.checked;
        model.setParam(name, value);
    });
    container.appendChild(input);
    return container;
}

export function createSelect (name: string, model: WidgetModel): HTMLElement {
    const param = model.opts.params[name];
    const { type, options } = param;
    const container = document.createElement('div');
    const select = document.createElement('select');
    const initValue = model.getParam(name);
    console.log('params', param, options);
    Object.keys(options).forEach(optionVal => {
        const label = options[optionVal];
        const option = document.createElement('option');
        option.value = optionVal;
        option.textContent = label;
        if (String(initValue) === optionVal) {
            option.selected = true;
        }
        select.appendChild(option);
    });
    select.addEventListener('change', () => {
        const value = getParamValueFromString(select.value, type);
        model.setParam(name, value);
    });
    container.appendChild(select);
    return container;
}