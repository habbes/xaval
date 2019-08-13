# Xaval

Interactive web-based playground for computer vision and image processing, useful for experiments and exploration.

[https://xaval.app](https://xaval.io)

## Current Features

- In-browser JS environment where you write your code
- [OpenCV](https://docs.opencv.org/3.4.1/d5/d10/tutorial_js_root.html) is preloaded
- You can import multiple images from your computer
- Image viewer for displaying output with simple API
- Importing images and videos
- Importing and working with arbitrary file blobs
- Custom widgets supporting multiple control types and pipelines that control function parameters in real time
- Easy API for working with video streams from a connected camera or imported video

## Planned Features

In no particular order, here are some of the features planned:

- Support for Tensorflow.js
- Load images/videos from the web
- Background code execution
- Console/Stdout emulator
- Multiple code cells

*This list might change overtime and is not definitive.*

## Development

### Available commands:

- `npm run start`: Launches a local development server on [http://localhost:8080](http://localhost:8080)
- `npm run watch`: Listens for file changes and creates a development build without running the dev server
- `npm run build`: Packages the app for production
- `npm run deploy`: Deploys a production build to Firebase static hosting
