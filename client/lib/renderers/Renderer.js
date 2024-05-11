import { Container } from 'pixi.js';

export default class Renderer extends Container {
    constructor() {
        super();
    }

    async render() {
        for (let child of this.rendererChildren) {
            if (child.render) await child.render();
            this.addChild(child);
        }
    }
}