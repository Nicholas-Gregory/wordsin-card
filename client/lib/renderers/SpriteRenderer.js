import { Sprite } from "pixi.js";
import { render } from "./helpers";

export default class SpriteRenderer extends Sprite {
    constructor(parentRenderer, options) {
        super(options);

        this.parentRenderer = parentRenderer;
        this.render = render.bind(this, this.parentRenderer);
    }
}