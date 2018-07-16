export default
`
const cv: any;
/**
 * encapsulates the Xaval library
 */
declare namespace xaval {
    const widgets: WidgetManager;
}

/**
 * contains objects for accessing and interacting with I/O
 * e.g. files, cameras, etc.
 */
declare namespace xaval.io {
    const files: {
        readImage(name: string): any;
        readVideo(name: string): any;
        getReader(name: string): any;
        rename(oldName: string, newName: string): void;
    }

    const cameras: {
        getDefaultCamera(): any;
        getCamera(constraints: any): any;
    }

    const imageViewer: {
        show(img: any): void;
        next(img: any): void;
    }
}

interface NextObserver<T> {
    next(value: T): any;
}

interface Subscription {
    unsubscribe(): any;
}

interface Observable<T> {
    subscribe(observer: NextObserver<T>): Subscription;
}

interface ImageViewer extends DataSink<any> {
    show (mat: any): void;
}

interface ImageSource {
    read (): any;
}

interface DataSource<T> {
    readonly observable: Observable<T>;
    subscribe (observer: NextObserver<T>): Subscription;
    pipe (dest: DataSink<T>): DataSink<T>;
}

interface DataSink<T> {
    next (value?: T): void;
}

enum WidgetArgDataType {
    Any = 'any',
    Number = 'number',
    String = 'string',
    Boolean = 'boolean'
}

enum WidgetArgControlType {
    Slider = 'slider',
    Checkbox = 'checkbox',
    Select = 'select',
    Text = 'text'
}

interface WidgetOpts {
    name: string;
    params: WidgetParams;
    inputs: WidgetInputs;
    outputs: WidgetOutputs;
    onUpdate(ctx: WidgetModelContext): {[outputName: string]: any};
}

interface WidgetUpdateResult {
    [outputName: string]: any;
}

interface WidgetParams {
    [paramName: string]: WidgetParamOpts;
}

interface WidgetParamOpts {
    type: WidgetArgDataType;
    control: WidgetArgControlType;
    initial?: any;
    min?: number;
    max?: number;
    step?: number;
    options?: {
        [value: string]: string
    }
}

interface WidgetInputs {
    [inputName: string]: WidgetInputOpts;
}

interface WidgetInputOpts {
    type: WidgetArgDataType;
}

interface WidgetOutputs {
    [outputName: string]: WidgetOutputOpts;
}

interface WidgetOutputOpts {
    type: WidgetArgDataType;
}

interface WidgetModelContext {
    inputs: {
        [inputName: string]: any
    },
    params: {
        [paramName: string]: any
    }
}

interface WidgetModel extends DataSource<WidgetUpdateResult> {
    /**
     * template options used to create the widget
     */
    opts: WidgetOpts;
    /**
     * contains current state (inputs and params) of the widget
     */
    state: WidgetModelContext;
    /**
     * maps each input to a data sink
     */
    inputs: {[name: string]: DataSink<any>},
    /**
     * maps each output to a data source
     */
    outputs: {[name: string]: DataSource<any>},
    /**
     * cache of observables for each output
     * @internal
     */
    _outputsObservables: {[name: string]: Observable<any>};
    _paramUpdateHandler?: WidgetParamUpdateHandler;
    /**
     * updates the specified input
     * this updates the widget
     * @param inputName
     * @param value 
     */
    setInput(inputName: string, value: any): void;
    /**
     * updates multiple inputs at a go, then updates
     * the widget
     * @param inputs 
     */
    setInputs(inputs: {[name: string]: any}): void;
    /**
     * gets the current value of the specified input
     * @param inputName
     */
    getInput(inputName: string): any;
    /**
     * updates the specified param,
     * then updates the widget
     * @param paramName 
     * @param value 
     */
    setParam(paramName: string, value: any): void;
    /**
     * updates multiple params at a go,
     * then updates the widget
     * @param params 
     */
    setParams(params: {[name: string]: any}): void;
    /**
     * gets the current value of the specified param
     * @param paramName
     */
    getParam(paramName: string): any;
    /**
     * registers a handler to be called when a param
     * has been updated
     * @param handler
     */
    onParamUpdated (handler: WidgetParamUpdateHandler): any;
    /**
     * updates the widget
     */
    update(): any;
    /**
     * pipes the specified output to a
     * destination data sink,
     * the destination is returned to enable chaining
     * @param name 
     * @param dest 
     */
    pipeOutput(name: string, dest: DataSink<any>): DataSink<any>;
    /**
     * gets the observable corresponding to the specified output,
     * same as widget.outputs[name].observable
     * @param name 
     */
    getOutputObservable(name: string): Observable<any>;
}

interface WidgetTemplateCreateArgs {
    params: { 
        [paramName: string]: { 
            type?: string;
            control?: string;
            initial?: any;
            min?: number;
            max?: number;
            step?: number;
            options?: {
                [value: string]: string
            }
        }
    };
    inputs: string[] | {
        [inputName: string]: {
            type?: string
        }
    };
    outputs: string[] | {
        [outputName: string]: {
            type?: string
        }
    }
    onUpdate (ctx: WidgetModelContext): any;
}

interface WidgetTemplate {
    opts: WidgetOpts;
    create(): WidgetModel;
}

interface WidgetParamUpdateHandler {
    (paramName: string, value: any): any;
}

/**
 * creates and managed widgets and widget templates
 */
interface WidgetManager {
    /**
     * creates and registers a new WidgetTemplate
     * @param templateName name used to identify the registered template
     * @param opts template options
     */
    define (templateName: string, opts: WidgetTemplateCreateArgs): WidgetTemplate;

    /**
     * creates a new widget based on the specified template
     * and adds it to the widget manager then displays it.
     * Returns the the widget
     * @param templateName name of a registered template
     */
    create (templateName: string): WidgetModel;

    /**
     * gets a registered template
     * @param templateName name of the template
     */
    getTemplate (templateName: string): WidgetTemplate;

    /**
     * registers a template
     * @param name
     * @param template 
     */
    setTemplate (name: string, template: WidgetTemplate): void;

    /**
     * gets widget by its id
     * @param widgetId
     */
    get (widgetId: string): WidgetModel|undefined;

    /**
     * adds the widget to the widget manager and displays.
     * Returns the id of the widget
     * @param widget
     * @returns id of the added widget
     */
    add (widget: WidgetModel): string

    /**
     * hides the specified widget
     * @param widgetId
     */
    hide (widgetId: string): string;

    /**
     * displays the specified widget
     * @param widgetId
     */
    show (widgetId: string): void;

    /**
     * removes the specified widget from the widget manager
     * @param widgetId
     */
    remove (widgetId: string): void;

    /**
     * removes all widgets from the widget manager
     */
    removeAll (): void;

    /**
     * shows all widgets in the widget manager
     */
    showAll (): void;

    /**
     * hides all widgets in the widget manager
     */
    hideAll (): void;
}


`;
