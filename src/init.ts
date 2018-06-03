import App from './app';
import { 
    Editor,
    ImageSource,
    ImageViewer,
    WidgetManager
} from './ui';
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
    const imageSource = new ImageSource(document.querySelector('#imageSource'));
    const widgetManager = new WidgetManager(document.querySelector('#main'));

    const app = new App({
        editor,
        imageSource,
        imageViewer,
        widgetManager
    });

    return app;
}