import App from './app';
import { 
    Editor,
    FileLibrary,
    ImageViewer,
    WidgetManager,
    CameraManager,
    SampleManager
} from './ui';
import * as codeSamples from '@/samples';
import './ui/app.css';

export default function init () {
    // allow drag and drop in main container
    const container = <HTMLDivElement>document.querySelector('#main');
    container.ondragover = (ev) => {
        ev.preventDefault();
    };
    container.ondrop = (ev) => {
        ev.preventDefault();
        const elId = ev.dataTransfer.getData('id');
        const el = document.getElementById(elId);
        el.style.left = `${ev.clientX}px`;
        el.style.top = `${ev.clientY}px`;
    };

    const editor = new Editor(document.querySelector('#editorContainer'));
    const imageViewer = new ImageViewer(document.querySelector('#imageViewer'));
    const files = new FileLibrary(document.querySelector('#files'));
    const widgetManager = new WidgetManager(document.querySelector('#main'));
    const cameras = new CameraManager();
    const samples = new SampleManager(document.querySelector('#samplesMenu'));
    samples.addSamples({
        'Quick Intro': codeSamples.QUICK_INTRO,
        'Widgets': codeSamples.WIDGETS,
        'Video': codeSamples.VIDEO,
        'Camera': codeSamples.CAMERA,
        'Edge Detection': codeSamples.EDGE_DETECTION
    });

    const app = new App({
        editor,
        files,
        imageViewer,
        widgetManager,
        cameras,
        samples
    });

    return app;
}