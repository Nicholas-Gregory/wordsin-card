import { Assets, BitmapText, Container, Sprite, Text } from "pixi.js";
import TextBoxContainer from "./TextBoxContainer.js";

export default class CardContainer extends Container {
    constructor(effects) {
        super();

        effects.forEach(effect => {
            const text = new Text({
                text: effect,
                style: {
                    fontFamily: 'Courier New',
                    fontSize: 4,
                    fill: 0xdddddd,
                    wordWrap: true,
                    wordWrapWidth: 50,
                    align: 'center'
                }
            });

            text.zIndex = 2;
            text.anchor.set(.5, .5)
            text.y = 50;
            text.x = 25;

            const textRect = text.getBounds();
            const box = new TextBoxContainer(textRect.rectangle.width + 4, textRect.rectangle.height + 4);
            box.y = textRect.y - 1;
            box.x = textRect.x - 1;

            box.zIndex = 1

            this.addChild(box);
            this.addChild(text);
        })

        this.load();
    }

    async load() {
        this.texture = await Assets.load(`../../assets/CardBase.png`);

        this.addChild(new Sprite(this.texture));
    }
}