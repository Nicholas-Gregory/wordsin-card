import { Container, Graphics } from "pixi.js";
import ShadowBoxRenderer from "./ShadowBoxRenderer";

export default class TimeChunkRenderer extends Container {
    constructor(time, color) {
        super({ eventMode: 'static' });

        this.time = time;
        this.givenColor = color;

        this
        .makeBox()
        .makeLight();
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