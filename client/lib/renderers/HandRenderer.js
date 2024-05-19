import { Container } from "pixi.js";
import CardRenderer from "./CardRenderer";

export default class HandRenderer extends Container {
    constructor(displayWidth, cards) {
        super();

        this.displayWidth = displayWidth;
        this.cards = cards;
    }

    async makeCards() {
        this.cardRenderers = [];

        for (let i = 0; i < this.cards.length; i++) {
            let card = this.cards[i];

            let cardRenderer = new CardRenderer(card);
            await cardRenderer.makeCardSprite();
            cardRenderer.makeEffectTextBox();
            cardRenderer.x = (this.displayWidth / this.cards.length) * i;
            cardRenderer.zIndex = i;

            this.cardRenderers.push(cardRenderer);
            this.addChild(cardRenderer);
        }
    }
}