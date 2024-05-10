import { Container } from "pixi.js";
import { render } from "./helpers";

export default class Renderer extends Container {
    constructor(parentRenderer) {
        super();

        this.parentRenderer = parentRenderer;
        this.render = render.bind(this, parentRenderer);
    }
}