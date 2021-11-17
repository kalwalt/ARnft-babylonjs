import { Scene } from "@babylonjs/core/scene";
import { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { Matrix, Vector3 } from "@babylonjs/core/Maths/math";
import { Utils } from "../utils/Utils";
import SceneRendererBJS from "../SceneRendererBJS";

export default class NFTaddBJS {
    private names: Array<string>;
    private scene: Scene;
    private target: EventTarget;
    private uuid: string;

    constructor(uuid: string) {
        this.scene = SceneRendererBJS.getGlobalScene();
        this.target = window || global;
        this.uuid = uuid;
        this.names = [];
    }

    /**
     * The add function will add a mesh to the Renderer root. You need to associate a name of the Entity.
     * @param mesh The mesh to add
     * @param name the name of the Entity associated.
     * @param objVisibility set true or false if the mesh wll stay visible or not after tracking.
     */
     public add(mesh: Mesh, name: string, objVisibility: number) {
        this.target.addEventListener("getNFTData-" + this.uuid + "-" + name, (ev: any) => {
            var msg = ev.detail;
            mesh.position.y = ((msg.height / msg.dpi) * 2.54 * 10) / 2.0;
            mesh.position.x = ((msg.width / msg.dpi) * 2.54 * 10) / 2.0;
        });
        const rootName = "root-" + name;
        const root = new AbstractMesh(rootName, this.scene);
        root.addChild(mesh);
        this.target.addEventListener("getMatrixGL_RH-" + this.uuid + "-" + name, (ev: any) => {
            root.visibility = 1.0
            mesh.visibility = 1.0;
            //root.matrixAutoUpdate = false;
            const interpolatedMatrix = Utils.interpolate(ev.detail.matrixGL_RH);
            const matrix: Matrix = Matrix.FromArray(Utils.getArrayMatrix(interpolatedMatrix));
            let pos = Vector3.TransformCoordinates(new Vector3(0, 0, 0), matrix);
            root.setAbsolutePosition(pos);
        });
        this.target.addEventListener("nftTrackingLost-" + this.uuid + "-" + name, (ev: any) => {
            root.visibility = objVisibility;
            mesh.visibility = objVisibility;
        });
        this.names.push(name);
        //this.entities.push({ name });
    }

}