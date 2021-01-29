import { Matrix, Quaternion, Vector3 } from "@babylonjs/core/Maths/math";
export class NFTNodeBJS {
    constructor() {
        this._hasFound = false;
        this._interpolationFactor = 15;
        this._frameDrops = 0;
        this._deltaAccuracy = 10;
        this.trackedMatrix = {
            delta: [
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0
            ],
            interpolated: [
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0
            ]
        };
    }
    get deltaAccuracy() {
        return this._deltaAccuracy;
    }
    set deltaAccuracy(value) {
        this._deltaAccuracy = value;
    }
    get interpolationFactor() {
        return this._interpolationFactor;
    }
    set interpolationFactor(value) {
        this._interpolationFactor = value;
    }
    found(world) {
        this.world = world;
    }
    update() {
        if (!this.world) {
            this._hasFound = false;
            this._frameDrops = 0;
            this._root.setEnabled(false);
        }
        else {
            let worldMatrix = Matrix.FromArray(this.getArrayMatrix(this.world));
            if (!this._hasFound) {
                this._root.setEnabled(true);
                for (var i = 0; i < 16; i++) {
                    this.trackedMatrix.interpolated[i] = this.world[i];
                }
                this._hasFound = true;
                this._lastTranslation = worldMatrix.getTranslation();
            }
            else {
                let _currentTranslation = worldMatrix.getTranslation();
                if (Math.abs(Vector3.Distance(_currentTranslation, this._lastTranslation)) > this._deltaAccuracy) {
                    this._frameDrops += 1;
                    if (this._frameDrops > 3) {
                        this._lastTranslation = _currentTranslation;
                    }
                    return;
                }
                this._frameDrops = 0;
                this._lastTranslation = _currentTranslation;
                for (var i = 0; i < 16; i++) {
                    this.trackedMatrix.delta[i] = this.world[i] - this.trackedMatrix.interpolated[i];
                    this.trackedMatrix.interpolated[i] = this.trackedMatrix.interpolated[i] + (this.trackedMatrix.delta[i] / this._interpolationFactor);
                }
            }
            let matrix = Matrix.FromArray(this.getArrayMatrix(this.trackedMatrix.interpolated));
            let rotMatrix = matrix.getRotationMatrix();
            let rotation = new Quaternion().fromRotationMatrix(rotMatrix);
            this._root.rotation = rotation.toEulerAngles();
            let pos = Vector3.TransformCoordinates(new Vector3(0, 0, 0), matrix);
            this._root.setAbsolutePosition(pos);
        }
    }
    getArrayMatrix(value) {
        var array = [];
        for (var key in value) {
            array[key] = value[key];
        }
        return array;
    }
}
//# sourceMappingURL=NFTRootBJS.js.map