export default
`const { cameras, imageViewer } = xaval.io;

// get the default camera from the browser
const camera = cameras.getDefault();

// create a 30 fps stream of the video from the camera
const stream = camera.getStream({ fps: 30 });
stream.pipe(imageViewer);

// request for access and start camera feed
camera.start();

// when you're done, you can stop the camera and dispose of resources
// camera.stop();
`;