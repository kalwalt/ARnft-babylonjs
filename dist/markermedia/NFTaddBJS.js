import { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { Matrix, Quaternion, Vector3 } from "@babylonjs/core/Maths/math";
import { Utils } from "../utils/Utils";
import SceneRendererBJS from "../SceneRendererBJS";
export default class NFTaddBJS {
    constructor(uuid) {
        this.scene = SceneRendererBJS.getGlobalScene();
        this.target = window || global;
        this.uuid = uuid;
        this.names = [];
    }
    add(mesh, name, objVisibility) {
        this.target.addEventListener("getNFTData-" + this.uuid + "-" + name, (ev) => {
            var msg = ev.detail;
            mesh.position.y = ((msg.height / msg.dpi) * 2.54 * 10) / 2.0;
            mesh.position.x = ((msg.width / msg.dpi) * 2.54 * 10) / 2.0;
        });
        const rootName = "root-" + name;
        const root = new AbstractMesh(rootName, this.scene);
        root.addChild(mesh);
        this.target.addEventListener("getMatrixGL_RH-" + this.uuid + "-" + name, (ev) => {
            root.visibility = 1.0;
            mesh.visibility = 1.0;
            const interpolatedMatrix = Utils.interpolate(ev.detail.matrixGL_RH);
            const matrix = Matrix.FromArray(Utils.getArrayMatrix(interpolatedMatrix));
            let rotMatrix = matrix.getRotationMatrix();
            let rotation = new Quaternion().fromRotationMatrix(rotMatrix);
            root.rotation = rotation.toEulerAngles();
            let pos = Vector3.TransformCoordinates(new Vector3(0, 0, 0), matrix);
            root.setAbsolutePosition(pos);
        });
        this.target.addEventListener("nftTrackingLost-" + this.uuid + "-" + name, (ev) => {
            root.visibility = objVisibility;
            mesh.visibility = objVisibility;
        });
        this.names.push(name);
    }
}
//# sourceMappingURL=NFTaddBJS.js.map