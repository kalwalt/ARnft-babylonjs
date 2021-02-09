import { NFTNodeBJS } from "../NFTRootBJS";
import { MeshBuilder } from "@babylonjs/core/Meshes";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { Texture } from "@babylonjs/core/Materials/Textures";
export class NFTImageBJS extends NFTNodeBJS {
    constructor() {
        super();
    }
    addNFTImage(imageUrl, width, height, scene) {
        let plane = MeshBuilder.CreatePlane("imagePlane", { width: width, height: height }, scene);
        const mat = new StandardMaterial("plane", scene);
        mat.diffuseTexture = new Texture(imageUrl, scene);
        plane.material = mat;
        this.node.addChild(plane);
    }
}
//# sourceMappingURL=NFTImageBJS.js.map