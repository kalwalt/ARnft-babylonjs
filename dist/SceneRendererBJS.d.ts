import { Camera } from "@babylonjs/core/Cameras/camera";
import { ShadowGenerator } from "@babylonjs/core/Lights/Shadows/shadowGenerator";
import { Scene } from "@babylonjs/core/scene";
import { IShadowLight } from "@babylonjs/core/Lights";
export default class SceneRendererBJS {
    canvas_draw: HTMLCanvasElement;
    private engine;
    private _scene;
    private uuid;
    private static globalScene;
    get scene(): Scene;
    camera: Camera;
    light: IShadowLight;
    shadowGenerator: ShadowGenerator;
    constructor(canvasElement: HTMLCanvasElement, uuid: string, scene?: Scene);
    initialize(): Promise<object>;
    update(): void;
    static getGlobalScene(): Scene;
}
