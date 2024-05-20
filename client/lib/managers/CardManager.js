import { Assets, Container, Sprite } from "pixi.js";
import CardRenderer from "../renderers/CardRenderer";

export default class CardManager extends Container {
    constructor(app, card, revealed) {
        super({ eventMode: 'static' });

        this.app = app;
        this.card = card;
        this.revealed = revealed || true;
    }

    async initCardRenderer() {
        this.cardRenderer = new CardRenderer(this.card);

        await this.cardRenderer.makeCardSprite();
        this.cardRenderer.makeEffectTextBox();
    }

    async initCardBack() {
        this.cardBack = Sprite.from(await Assets.load('../../assets/card-base.png'));
    }

    reveal() {
        this.removeChildren();
        this.addChild(this.cardRenderer);
    }

    conceal() {
        this.removeChildren();
        this.addChild(this.cardBack);
    }
}