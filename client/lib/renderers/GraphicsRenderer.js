import { Graphics } from "pixi.js";
import { render } from "./helpers";

export default class GraphicsRenderer extends Graphics {
    constructor(parentRenderer, options) {
        super(options);

        this.parentRenderer = parentRenderer;
        this.render = render.bind(this, parentRenderer);
    }
}