import { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { IMediaNode } from "./media-node/IMediaNode";
export declare abstract class NFTNodeBJS implements IMediaNode {
    protected world: any;
    private _hasFound;
    private _interpolationFactor;
    private _lastTranslation;
    private _frameDrops;
    private _root;
    private _deltaAccuracy;
    get root(): AbstractMesh;
    get deltaAccuracy(): number;
    set deltaAccuracy(value: number);
    get interpolationFactor(): number;
    set interpolationFactor(value: number);
    private trackedMatrix;
    found(world: any): void;
    update(): void;
    protected getArrayMatrix(value: any): any;
}
