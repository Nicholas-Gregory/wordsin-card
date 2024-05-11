import { Container, Graphics } from "pixi.js";

export default class Box extends Container{
    constructor(width, height, color) {
        super();

        this.givenWidth = width;
        this.givenHeight = height;
        this.color = color;

        this.render();
    }

    makeShadow() {
        this.shadow = new Graphics()
        .rect(1, 1, this.givenWidth, this.givenHeight)
        .fill(0x333333);

        return this;
    }

    makeBox() {
        this.box = new Graphics()
        .rect(0, 0, this.givenWidth, this.givenHeight)
        .fill(this.color);

        return this;
    }

    render() {
        this
        .makeShadow()
        .makeBox()
        .addChild(this.shadow, this.box);
    }
}