import { Camera } from '.';

/**
 * provides access to the camera resource
 */
export class CameraManager {
    private _default: Camera;

    /**
     * gets the default camera
     */
    getDefault () {
        if (!this._default) {
            this._default = new Camera();
        }
        return this._default;
    }

    /**
     * gets camera with specified constraints
     * @param constraints camera constraints
     */
    getWithConstraints (constraints: MediaStreamConstraints) {
        return new Camera(constraints);
    }
}