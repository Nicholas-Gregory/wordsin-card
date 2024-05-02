import Renderer from "./Renderer.js"
import { CARD_WIDTH } from "./render-constants.js";

export default class HandRenderer extends Renderer {
    constructor(cards) {
        super();

        for (let i = 0; i < cards.length; i++) {
            let card = cards[i];

            card
            .setX(i * (CARD_WIDTH + 10) + 10);

            this.container.addChild(card.container);
        }
    }
}