import App from './app';
import { 
    Editor,
    ImageSource,
    ImageViewer
} from './ui/index';
import './ui/app.css';


export default function init () {
    const editor = new Editor(document.querySelector('#editorContainer'));
    const imageViewer = new ImageViewer(document.querySelector('#imageViewer'));
    const imageSource = new ImageSource(document.querySelector('#imageSource'))

    const app = new App({
        editor,
        imageSource,
        imageViewer
    });

    return app;
}