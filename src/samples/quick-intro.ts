const QUICK_INTRO = 
`// Xaval is a playground for experimenting with computer vision using OpenCV

// To get started, import an image from the bottom-left
// Use \`imsource.read()\` to load the imported image into an OpenCV matrix
const img = imsource.read();
// Do some image processing and manipulation using OpenCV
cv.cvtColor(img, img, cv.COLOR_RGBA2GRAY, 0);
// Then, to display an image, use \`imviewer.show()\`
imviewer.show(img);

// don't forget to clean up the memory
img.delete();

// When you're ready, click the "Run" button

// To learn more about OpenCV for JS,
// check out the tutorials at
// https://docs.opencv.org/3.4.1/d5/d10/tutorial_js_root.html
`;

export default QUICK_INTRO;
