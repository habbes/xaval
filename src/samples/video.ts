export default
`const { files, imageViewer } = xaval.io;

// import video file in the file library

// read imported video
const video = files.readVideo('file1');

// get video stream and attach it to the image viewer
const stream = video.getStream({ fps: 30 });
stream.pipe(imageViewer);

// enable the following line if you want the video to loop
// video.looping = true

// play the video
video.play();
`;