import { Camera } from "@babylonjs/core/Cameras/camera";
import { ShadowGenerator } from "@babylonjs/core/Lights/Shadows/shadowGenerator";
import { Scene } from "@babylonjs/core/scene";
import { IShadowLight } from "@babylonjs/core/Lights";
export declare class SceneRendererBJS {
    canvas_draw: HTMLCanvasElement;
    private engine;
    private _scene;
    get scene(): Scene;
    camera: Camera;
    light: IShadowLight;
    shadowGenerator: ShadowGenerator;
    constructor(canvasElement: HTMLCanvasElement, scene?: Scene);
    initialize(): Promise<boolean>;
    update(): void;
}
