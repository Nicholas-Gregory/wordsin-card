import { BitmapText } from "pixi.js";

export default class TextRenderer extends BitmapText {
    constructor(parentRenderer, options) {
        super(options);

        this.parentRenderer = parentRenderer;
        this.render = render.bind(this, this.parentRenderer);
    }
}