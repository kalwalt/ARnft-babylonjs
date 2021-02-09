import { NFTNodeBJS } from "../NFTRootBJS";
import { MeshBuilder } from "@babylonjs/core/Meshes"
import { Scene } from "@babylonjs/core/scene";
import { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { Texture } from "@babylonjs/core/Materials/Textures";

export class NFTImageBJS extends NFTNodeBJS {
    public node: AbstractMesh;
    constructor() {
        super()
        //this.node = super.root
    }

    public addNFTImage(imageUrl: string, width: number, height: number, scene: Scene) {
        let plane = MeshBuilder.CreatePlane("imagePlane", { width: width, height: height }, scene);
        const mat = new StandardMaterial("plane", scene);
        mat.diffuseTexture = new Texture(imageUrl, scene);
        plane.material = mat;
        this.node.addChild(plane);
    }
}
