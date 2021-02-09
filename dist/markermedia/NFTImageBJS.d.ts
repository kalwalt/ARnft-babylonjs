import { NFTNodeBJS } from "../NFTRootBJS";
import { Scene } from "@babylonjs/core/scene";
import { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
export declare class NFTImageBJS extends NFTNodeBJS {
    private imageRoot;
    constructor(root: AbstractMesh);
    addNFTImage(imageUrl: string, width: number, height: number, scene: Scene): void;
}
