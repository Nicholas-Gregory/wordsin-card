import { Container, Graphics } from "pixi.js";

export default class TextBoxContainer extends Container {
    constructor(width, height) {
        super();

        const shadow = new Graphics()
        .rect(2, 2, width, height)
        .fill(0x333333);

        const box = new Graphics()
        .rect(0, 0, width, height)
        .fill(0x888888);

        this.addChild(shadow, box);
    }
}