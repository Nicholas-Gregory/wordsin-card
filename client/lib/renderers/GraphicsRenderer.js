import { Graphics } from "pixi.js";
import { render } from "./helpers";

export default class GraphicsRenderer extends Graphics {
    constructor(parentRenderer, childRenderers, options) {
        super(options);

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