import { Container } from "pixi.js";

export default class Renderer extends Container {
    constructor(renderers) {
        super();

        this.renderers = renderers || {};
    }

    init() {
        for (let key in this.renderers) {
            let renderer = this.renderers[key];

            if (renderer.init) renderer.init();
            this.addChild(renderer);
        }

        return this;
    }
}