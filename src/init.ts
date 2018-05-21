import App from './app';
import { 
    Editor,
    ImageSource,
    ImageViewer,
    WidgetManager
} from './ui/index';
import './ui/app.css';


export default function init () {
    const editor = new Editor(document.querySelector('#editorContainer'));
    const imageViewer = new ImageViewer(document.querySelector('#imageViewer'));
    const imageSource = new ImageSource(document.querySelector('#imageSource'));
    const widgetManager = new WidgetManager(document.querySelector('#widgetManager'));

    const app = new App({
        editor,
        imageSource,
        imageViewer,
        widgetManager
    });

    return app;
}