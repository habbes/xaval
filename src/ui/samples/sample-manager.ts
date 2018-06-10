
/**
 * manages list of pre-loaded code samples available to the user
 */
export class SampleManager {
    private _el: HTMLElement;
    private _sampleHandler: SampleHandler;

    constructor (el: HTMLElement) {
        this._el = el;
    }

    /**
     * register handler that will be called
     * when a sample is selected from the menu
     * @param handler 
     */
    onSampleSelected (handler: SampleHandler) {
        this._sampleHandler = handler;
    }

    /**
     * adds all samples in the specified map
     * @param samples mapping of sample names to their source codes
     */
    addSamples (samples: SamplePairs) {
        Object.keys(samples).map(name => {
            const code = samples[name];
            this.addSample(name, code);
        });
    }

    /**
     * add sample code to the list
     * @param name displayed name of the sample
     * @param code source code of the sample
     */
    addSample (name: string, code: string) {
        const item = document.createElement('li');
        item.className = 'nav-sub-item';
        item.textContent = name;
        item.addEventListener('click', () => {
            this._sampleHandler && this._sampleHandler(code);
        });
        this._el.appendChild(item);
    }
}

interface SampleHandler {
    (sample: string): any;
}

interface SamplePairs {
    [name: string]: string;
}