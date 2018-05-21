# Xaval

Interactive web-based playground for computer vision and image processing, useful for experiments and exploration.

[https://xaval.habbes.xyz](https://xaval.habbes.xyz)

## Current Features

- In-browser JS environment where you write your code
- [OpenCV](https://docs.opencv.org/3.4.1/d5/d10/tutorial_js_root.html) is preloaded
- You can import your images
- Simple API for loading input images and displaying out images

## Planned Features

In no particular order, here are some of the features planned:

- Easy-to-setup UI widgets to control function parameters in real-time. They can be chained together to achieve complex transformation pipelines.
- Support for Tensorflow.js
- File library that supports importing multiple files
- Load images/videos from the web
- Video and Webcam support
- Background code execution
- Console/Stdout emulator
- Multiple code cells

*This list might change overtime and is not definitive.*

## Development

### Available commands:

- `npm run start`: Launches a local development server on [http://localhost:8080](http://localhost:8080)
- `npm run watch`: Listens for file changes and creates a development build without running the dev server
- `npm run build`: Packages the app for production
- `nom run deploy`: Deploys a production build to Firebase static hosting