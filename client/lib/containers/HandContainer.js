import { BitmapText, Container } from "pixi.js";

export default class HandContainer extends Container {
    constructor(cards) {
        super();

        cards.forEach((card, index) => {
            card.x = index * 45;
            card.scale = .8;

            this.addChild(card)
        });
    }
}