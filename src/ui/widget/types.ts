import { WidgetModel } from '@/core/widget';

export interface WidgetParamControl {
    /**
     * the html element for the control
     */
    el: HTMLElement;

    /**
     * function that updates the control based
     * on the underlying model param's value.
     * The function is called when the model's param
     * has been updated
     * @param paramName 
     * @param model 
     */
    update (paramName: string, model: WidgetModel): any;
}
