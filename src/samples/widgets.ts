const WIDGETS = `
const Widget = widgets.define('Widget', {
    params: {
        angle: {
            type: 'number'
        }
    },
    inputs: ['image'],
    onUpdate (ctx) {
        const { inputs: { image }, params: { angle } } = ctx;
        const dst = new cv.Mat();
        const dsize = new cv.Size(image.rows, image.cols);
        const center = new cv.Point(image.cols / 2, image.rows / 2);
        const M = cv.getRotationMatrix2D(center, angle, 1);
        cv.warpAffine(image, dst, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
        M.delete();
        return dst;
    }
});

const widget = Widget.create();
widget.observable.subscribe( output => {
    imviewer.show(output);
    output.delete();
});

widgets.show(widget);

const img = imsource.read();
widget.setInput('image', img);
`;

export default WIDGETS;