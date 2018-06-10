export default
`const { cameras, imageViewer } = xaval.io;

const camera = cameras.getDefault();
const stream = camera.getStream({ fps: 30 });
stream.pipe(imageViewer);
camera.start();

`;