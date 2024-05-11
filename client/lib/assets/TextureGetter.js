import { Assets } from "pixi.js";

const assetsPath = `../../assets/`;

export default class TextureGetter {
    constructor(assetFileName) {
        this.fileName = assetFileName;
    }

    async load() {
        return await Assets.load(`${assetsPath}${this.fileName}`);
    }
}