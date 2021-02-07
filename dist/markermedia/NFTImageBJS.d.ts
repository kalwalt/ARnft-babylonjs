import { NFTNodeBJS } from "../NFTRootBJS";
import { Scene } from "@babylonjs/core/scene";
export declare class NFTImageBJS extends NFTNodeBJS {
    constructor();
    addNFTImage(imageUrl: string, width: number, height: number, scene: Scene): void;
}
