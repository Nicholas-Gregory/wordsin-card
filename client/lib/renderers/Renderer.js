import { Container } from "pixi.js";
import { render } from "./helpers";

export default class Renderer extends Container {
    constructor(parentRenderer, childRenderers) {
        super();

        this.parentRenderer = parentRenderer;
        this.childRenderers = childRenderers || [];
        this.render = render.bind(this, parentRenderer);

        parentRenderer.addChild(this);
    }

    addChild(...childRenderers) {
        super.addChild(...childRenderers);
        this.childRenderers = [...this.childRenderers, ...childRenderers];
    }

    renderAllChildren() {
        this.childRenderers.forEach(renderer => {
            renderer.render()
            renderer.renderAllChildren();
        });
    }
}