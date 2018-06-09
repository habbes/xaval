const QUICK_INTRO = 
`// Xaval is a playground for experimenting with computer vision using OpenCV

const { files, imageViewer } = xaval.io;
// To get started, import an image from the bottom-left
// Use \`files.readImage(name)\` to load the imported image into an OpenCV matrix
const img = files.readImage('file1');
// Do some image processing and manipulation using OpenCV
cv.cvtColor(img, img, cv.COLOR_RGBA2GRAY, 0);
// Then, to display an image, use \`imageViewer.show()\`
imageViewer.show(img);

// don't forget to clean up the memory
img.delete();

// When you're ready, click the "Run" button

// To learn more about OpenCV for JS,
// check out the tutorials at
// https://docs.opencv.org/3.4.1/d5/d10/tutorial_js_root.html
`;

export default QUICK_INTRO;
