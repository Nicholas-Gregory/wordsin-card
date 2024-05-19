import { Assets, Container, Sprite } from "pixi.js";
import VerticalListRenderer from './VerticalListRenderer.js';
import EffectRenderer from './EffectRenderer.js';
import ScrollableBoxRenderer from "./ScrollableBoxRenderer.js";
import ShadowBoxRenderer from "./ShadowBoxRenderer.js";

export default class CardRenderer extends Container {
    constructor(card) {
        super();

        this.card = card;
    }

    async makeCardSprite() {
        this.cardTexture = await Assets.load('../../assets/card-base.png');
        this.cardSprite = Sprite.from(this.cardTexture);
        this.cardSprite.setSize(70);

        this.addChild(this.cardSprite);

        return this;
    }

    makeEffectTextBox() {
        const cardSize = this.cardSprite.getSize();

        this.effectsList = new VerticalListRenderer(2, this.card.effects.map(
            effect => (
                new EffectRenderer(effect.text, effect.numberOfTargets)
            )
        ));

        if (this.effectsList.getSize().height > cardSize.height / 2) {
            this.box = new ScrollableBoxRenderer(cardSize.width - 2, cardSize.height / 2, 0x111111, [this.effectsList]);
            this.box.x = 1;
            this.box.y = cardSize.height / 2 - 2;
        } else {
            const shadowBox = new ShadowBoxRenderer(cardSize.width - 6, cardSize.height / 2, 0x111111);
            shadowBox.x = 2;
            shadowBox.y = this.cardSprite.getSize().height / 2 - 3;

            this.effectsList.y = cardSize.height / 2 - 2;
            this.effectsList.x = 3;

            this.box = new Container();
            this.box.addChild(shadowBox);
            this.box.addChild(this.effectsList);
        }

        this.addChild(this.box);

        return this;
    }
}