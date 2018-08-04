const WIDGETS =
`// This example demonstrates how to create custom widgets in Xaval
// OpenCV.js Tutorials: https://docs.opencv.org/3.4.1/d5/d10/tutorial_js_root.html

const { widgets, io: { files, imageViewer } } = xaval;

// import an image from the import panel at the bottom right, then load it here
const img = files.readImage('file1');

// define a custom widget template
widgets.define('Rotation', {
  // define parameters for this widget
  params: {
    angle: { type: 'number', min: -180, max: 180, initial: 0 },
    scale: { type: 'number', initial: 1, min: 0, max: 5, step: 0.1 },
    interpolation: { type: 'number', control: 'select', initial: 1,
      options: { 1: 'Linear', 2: 'Cubic', 3: 'Area', 0: 'Nearest' } },
    border: { type: 'number', control: 'select', initial: 0,
      options: { 0: 'Constant', 1: 'Replicate', 2: 'Reflect', 3: 'Wrap', 4: 'Reflect 101' } }
  },
  // define inputs
  inputs: ['image'],
  // define outputs
  outputs: ['image'],
  // define the computation triggered by the widget
  onUpdate (ctx) {
    const { inputs: { image }, params: { angle, scale, interpolation, border } } = ctx;
    const dst = new cv.Mat();
    const dsize = new cv.Size(image.rows, image.cols);
    const center = new cv.Point(image.cols / 2, image.rows / 2);
    const M = cv.getRotationMatrix2D(center, angle, scale);
    cv.warpAffine(image, dst, M, dsize, interpolation, border, new cv.Scalar());
    M.delete();
    return { image: dst };
  }
});

// create a widget instance from the template
const rotation = widgets.create('Rotation');

// attach the widget to the image viewer
rotation.outputs.image.pipe(imageViewer);

// set the loaded image as the widget input
rotation.inputs.image.next(img);

// To learn more about OpenCV for JS,
// check out the tutorials at
// https://docs.opencv.org/3.4.1/d5/d10/tutorial_js_root.html
`;

export default WIDGETS;