import { Graphics } from "pixi.js";
import Renderer from "./Renderer.js";
import { CARD_HEIGHT, CARD_WIDTH } from "./render-constants.js";

export default class CardRenderer extends Renderer {
    constructor(card) {
        super();
        this.card = card;
        this.rectangle = new Graphics()
        .rect(0, 0, CARD_WIDTH, CARD_HEIGHT)
        .fill(0xffffff);

        this.container.addChild(this.rectangle);
    }
}