import { WidgetModel, getParamValueFromString } from "@/core/widget";
import { WidgetParamControl } from './types';

export function createSlider (name: string, model: WidgetModel): WidgetParamControl {
    const input = document.createElement('input');
    input.type = 'range';
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
    input.value = model.getParam(name);

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
    return {
        el: container,
        update (paramName, model) {
            const value = model.getParam(paramName);
            input.value = value;
            valueLabel.textContent = value;
        }
    };
}

export function createCheckbox (name: string, model: WidgetModel): WidgetParamControl {
    const container = document.createElement('div');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = model.getParam(name);
    input.addEventListener('change', (e: Event) => {
        const value = input.checked;
        model.setParam(name, value);
    });
    container.appendChild(input);
    return {
        el: container,
        update (paramName, model) {
            const value = model.getParam(paramName);
            input.value = value;
        }
    };
}

export function createSelect (name: string, model: WidgetModel): WidgetParamControl {
    const param = model.opts.params[name];
    const { type, options } = param;
    const container = document.createElement('div');
    const select = document.createElement('select');
    const initValue = model.getParam(name);
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
    return {
        el: container,
        update (paramName, model) {
            select.value = model.getParam(paramName);
        }
    };
}

export function createText (name: string, model: WidgetModel): WidgetParamControl {
    const container = document.createElement('div');
    const input = document.createElement('input');
    input.type = 'text';
    input.value = model.getParam(name);
    input.addEventListener('change', (e: Event) => {
        const value = input.value;
        model.setParam(name, value);
    });
    container.appendChild(input);
    return {
        el: container,
        update (paramName, model) {
            input.value = model.getParam(paramName);
        }
    };
}