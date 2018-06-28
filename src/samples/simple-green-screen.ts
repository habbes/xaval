export default 
`const { widgets, io: { imageViewer, files, cameras } } = xaval;

const green = files.readVideo('green');
const greenStream = green.getStream({ fps: 30 });
const camera = cameras.getDefault();
const cameraStream = camera.getStream({ fps: 30 });

widgets.define('Blend', {
  params: {
    minG: {
      type: 'number',
      min: 0,
      max: 255,
      initial: 200
    },
    maxR: {
      type: 'number',
      min: 0,
      max: 255,
      initial: 50
    },
    maxB: {
      type: 'number',
      min: 0,
      max: 255,
      initial: 50
    }
  },
  inputs: ['green', 'target'],
  outputs: ['res'],
  onUpdate(ctx) {
    const { green, target } = ctx.inputs;
    const { minG, maxR, maxB } = ctx.params;
    const res = new cv.Mat(target.rows, target.cols, target.type());
    cv.resize(green, res, res.size());
    for (let row=0; row < res.rows; row++) {
      for (let col=0; col < res.cols; col++) {
        const [r, g, b] = res.ucharPtr(row, col);
        const tp = target.ucharPtr(row, col);
        if (r < maxR && b < maxB && g > minG) {
          res.data.set(tp, row * res.cols * res.channels() + col * res.channels());
        }
      }
    }
    return { res };
  }
});

const widget = widgets.create('Blend');
widget.outputs.res.pipe(imageViewer);
greenStream.pipe(widget.inputs.green);
cameraStream.pipe(widget.inputs.target);
camera.start();
green.looping = true;
green.play();
`;

