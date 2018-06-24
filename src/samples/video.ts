export default
`const { files, imageViewer } = xaval.io;

const video = files.readVideo('file1');
const stream = video.getStream({ fps: 30 });
stream.pipe(imageViewer);
video.play();
`;