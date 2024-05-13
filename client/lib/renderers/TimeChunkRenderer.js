import { Container, Graphics } from "pixi.js";
import ShadowBoxRenderer from "./ShadowBoxRenderer";
import { EffectRenderer } from "./EffectRenderer";

export default class TimeChunkRenderer extends Container {
    constructor(time, color, effect) {
        super({ eventMode: 'static' });

        this.time = time;
        this.givenColor = color;
        this.effect = effect;

        this
        .makeBox()
        .makeLight()
        .makeEffectPopup();
    }

    makeBox() {
        this.box = new ShadowBoxRenderer(this.time, 10, this.givenColor);

        this.addChild(this.box);

        return this;
    }

    makeLight() {
        this.light = new Graphics()
        .rect(0, 0, this.box.givenWidth, this.box.givenHeight)
        .fill(0xFFFFFF)

        this.light.alpha = 0;

        this.addChild(this.light);
        // console.log(this.light)

        return this;
    }

    makeEffectPopup() {
        if (this.effect) {
            this.effectRenderer = new EffectRenderer(this.effect.text, this.effect.numberOfTargets);
            this.effectRenderer.alpha = 0;
            this.effectRenderer.x = this.x;
            this.effectRenderer.y = this.getSize().height;

            this.addChild(this.effectRenderer);
        }
    }

    popupEffect(time) {
        if (this.effectRenderer.alpha < 1) {
            this.effectRenderer.alpha += 0.05 * time.deltaTime;
        }
    }

    closeEffect(time) {
        if (this.effectRenderer.alpha > 0) {
            this.effectRenderer.alpha -= 0.05 * time.deltaTime;
        }
    }

    lighten(time) {
        if (this.light.alpha < 0.5) {
            this.light.alpha += 0.025 * time.deltaTime;
        }
    }

    darken(time) {
        if (this.light.alpha > 0) {
            this.light.alpha -= 0.025 * time.deltaTime;
        }
    }
}