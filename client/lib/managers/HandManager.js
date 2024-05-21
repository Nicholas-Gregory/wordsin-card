import { Container } from "pixi.js";
import CardManager from "./CardManager";

export default class HandManager extends Container {
    constructor(displayWidth, app, cards) {
        super();

        this.app = app;
        this.cards = cards;
        this.displayWidth = displayWidth;
    }

    async initHand(startsRevealed) {
        this.cardManagers = [];

        for (let i = 0; i < this.cards.length; i++) {
            let card = this.cards[i];
            let cardManager = new CardManager(this.app, card, startsRevealed);

            await cardManager.initCardRenderer();
            await cardManager.initCardBack();

            if (startsRevealed) {
                cardManager.reveal();
            } else {
                cardManager.conceal();
            }

            cardManager.x = (this.displayWidth / this.cards.length) * i;

            this.cardManagers.push(cardManager);
            this.addChild(cardManager);
        }
    }

    initMouseEvents() {
        for (let i = 0; i < this.cardManagers.length; i++) {
            let card = this.cardManagers[i];

            card.eventMode = 'static';
            card
            .on('mouseenter', event => card.zIndex = this.cardManagers.length)
            .on('mouseleave', event => card.zIndex = i)
        }

        return this;
    }
}