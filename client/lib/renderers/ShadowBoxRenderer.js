import { Graphics } from "pixi.js";
import Renderer from "./Renderer.js";

export default class ShadowBoxRenderer extends Renderer {
    constructor(width, height, color) {
        super();
        
        this.givenWidth = width;
        this.givenHeight = height;
        this.givenColor = color;
    }

    makeShadow() {
        this.shadowGraphics = new Graphics()
        .rect(1, 1, this.givenWidth, this.givenHeight)
        .fill({ color: 0x000000, alpha: 0.5 });

        this.rendererChildren[0] = this.shadowGraphics;

        return this;
    }

    makeBox() {
        this.boxGraphics = new Graphics()
        .rect(0, 0, this.givenWidth, this.givenHeight)
        .fill(this.givenColor);

        this.rendererChildren[1] = this.boxGraphics;

        return this;
    }

    async render() {
        this
        .makeShadow()
        .makeBox()

        await super.render();
    }
}