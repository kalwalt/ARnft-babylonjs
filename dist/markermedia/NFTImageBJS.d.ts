import { NFTNodeBJS } from "../NFTRootBJS";
import { Scene } from "@babylonjs/core/scene";
import { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
export declare class NFTImageBJS extends NFTNodeBJS {
    node: AbstractMesh;
    constructor();
    addNFTImage(imageUrl: string, width: number, height: number, scene: Scene): void;
}
