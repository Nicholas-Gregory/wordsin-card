import { Container } from "pixi.js";
import Target from "./Target";
import TextBox from "./TextBox";
import Box from "./Box";

export default class EffectTextBox extends Container {
    constructor(effect) {
        super();

        this.effect = effect;
    }

    countOuterTarget() {
        return this.effect.text.getOuterTarget() ? 1 : 0;
    }

    countTarget() {
        return this.effect.text.getTarget() ? 1 : 0;
    }

    countTargets() {
        return this.countOuterTarget() + this.countTarget();
    }

    async render() {
        this.textBox = new TextBox(this.effect.getTextString(), 50, 0x888888, 0xFFFFFF);
        this.addChild(this.textBox);

        const textBoxBounds = this.textBox.getBounds();
        this.infoBox = new Box(20, textBoxBounds.height - 1, 0xEEEEEE);
        this.infoBox.x = this.textBox.getBounds().width;
        this.addChild(this.infoBox);

        for (let i = 0; i < this.countTargets(); i++) {
            const target = new Target();
            await target.render();
            const targetBound = target.children[0].getBounds();

            target.x = textBoxBounds.width + (targetBound.width * i);
            target.y = textBoxBounds.height - targetBound.height - 1;

            this.addChild(target);
        }
    }
}