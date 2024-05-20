import { Container } from "pixi.js";
import HandRenderer from "../renderers/HandRenderer";

export default class HandManager extends Container {
    constructor(displayWidth, app, cards) {
        super();

        this.app = app;
        this.cards = cards;
        this.displayWidth = displayWidth;
    }

    async initHand() {
        this.handRenderer = new HandRenderer(this.displayWidth, this.cards);
        await this.handRenderer.makeCards();

        const handRendererSize = this.handRenderer.getSize();

        this.handRenderer.y = this.app.screen.height - handRendererSize.height;
        this.handRenderer.x = this.app.screen.width / 2 - handRendererSize.width / 2;

        this.addChild(this.handRenderer);
    }

    initMouseEvents() {
        for (let i = 0; i < this.handRenderer.cardRenderers.length; i++) {
            let card = this.handRenderer.cardRenderers[i];

            card.eventMode = 'static';
            card
            .on('mouseenter', event => card.zIndex = this.handRenderer.cardRenderers.length)
            .on('mouseleave', event => card.zIndex = i)
        }

        return this;
    }
}