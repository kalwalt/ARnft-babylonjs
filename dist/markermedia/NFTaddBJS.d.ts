import { Mesh } from "@babylonjs/core/Meshes/mesh";
export default class NFTaddBJS {
    private names;
    private scene;
    private target;
    private uuid;
    constructor(uuid: string);
    add(mesh: Mesh, name: string, objVisibility: number): void;
}
