import { Container, Graphics } from "pixi.js";

export default class ShadowBoxRenderer extends Container {
    constructor(width, height, color) {
        super();
        
        this.givenWidth = width;
        this.givenHeight = height;
        this.givenColor = color;

        this
        .makeShadow()
        .makeBox()
    }

    makeShadow() {
        this.shadowGraphics = new Graphics()
        .rect(1, 1, this.givenWidth, this.givenHeight)
        .fill({ color: 0x000000, alpha: 0.5 });

        this.addChild(this.shadowGraphics);

        return this;
    }

    makeBox() {
        this.boxGraphics = new Graphics()
        .rect(0, 0, this.givenWidth, this.givenHeight)
        .fill(this.givenColor);

        this.addChild(this.boxGraphics);

        return this;
    }
}