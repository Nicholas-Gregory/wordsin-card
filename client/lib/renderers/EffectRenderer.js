import { Container } from "pixi.js";
import ShadowBoxRenderer from "./ShadowBoxRenderer";
import TargetRenderer from "./TargetRenderer";
import TextShadowBoxRenderer from "./TextShadowBoxRenderer";

export default class EffectRenderer extends Container {
    constructor(effectTextString, numberOfTargets) {
        super();

        this.effectTextString = effectTextString;
        this.numberOfTargets = numberOfTargets;

        this
        .makeTextBox()
        .makeInfoBox()
        .makeTargets()
    }

    makeTextBox() {
        this.effectTextBox = new TextShadowBoxRenderer(this.effectTextString, 40, 0x888888, 0xFFFFFF, 4);
        this.effectTextBox.zIndex = 1;

        this.addChild(this.effectTextBox);

        return this;
    }

    makeInfoBox() {
        const textBounds = this.effectTextBox.getSize();
        this.infoBox = new ShadowBoxRenderer(17, textBounds.height - 1, 0xAAAAAA);
        
        this.infoBox.x = textBounds.width;

        this.addChild(this.infoBox);

        return this;
    }

    async makeTargets() {
        const textBounds = this.effectTextBox.getSize();

        for (let i = 0; i < this.numberOfTargets; i++) {
            const target = new TargetRenderer();
            await target.makeTarget();
            const targetSize = target.getSize();

            target.x = textBounds.width + ((targetSize.width + 1) * i) + 1;
            target.y = textBounds.height - targetSize.height - 2;

            this.addChild(target)
        }

        return this;
    }
}