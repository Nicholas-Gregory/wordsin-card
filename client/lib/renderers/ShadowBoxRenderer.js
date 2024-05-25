import { Container, Graphics } from "pixi.js";
import Renderer from "./Renderer";

export default class ShadowBoxRenderer extends Renderer {
    constructor(width, height, fill) {
        super();

        this.givenWidth = width;
        this.givenHeight = height;
        this.givenFill = fill;
    }

    initShadow() {
        this.renderers.shadowGraphics = new Graphics()
        .rect(1, 1, this.givenWidth, this.givenHeight)
        .fill({ color: 0x000000, alpha: 0.5})

        return this;
    }

    initBox() {
        this.renderers.boxGraphics = new Graphics()
        .rect(0, 0, this.givenWidth, this.givenHeight)
        .fill(this.givenFill);

        return this;
    }
}