export default
`const { widgets, io: { cameras, imageViewer } } = xaval;

// start camera feed
const camera = cameras.getDefault();
camera.start();

// create edge detection widget
widgets.define('EdgeDetection', {
  params: {
    threshold1: {
      type: 'number',
      min: 1,
      max: 500,
      initial: 50
    },
    threshold2: {
      type: 'number',
      min: 1,
      max: 500,
      initial: 100
    },
    apertureSize: {
      type: 'number',
      min: 1,
      max: 20,
      initial: 3
    },
    l2Gradient: {
      type: 'number',
      min: 0,
      max: 1,
      initial: 0
    }
  },
  inputs: ['image'],
  outputs: ['edges'],
  onUpdate (ctx) {
    const { image } = ctx.inputs;
    const { threshold1, threshold2, apertureSize, l2Gradient } = ctx.params;
    const dst = new cv.Mat();
    cv.cvtColor(image, dst, cv.COLOR_RGBA2GRAY, 0);
    cv.Canny(dst, dst, threshold1, threshold2, apertureSize, Boolean(l2Gradient));
    return { edges: dst };
  }
});

const widgetId = widgets.create('EdgeDetection');
const edgeWidget = widgets.get(widgetId);

// feed camera stream to widget and display output
const stream = camera.getStream({ fps: 30 });
stream.pipe(edgeWidget.inputs.image);
edgeWidget.outputs.edges.pipe(imageViewer);
`;