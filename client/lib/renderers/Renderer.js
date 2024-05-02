import { Container } from "pixi.js";

export default class Renderer {
    constructor() {
        this.container = new Container();
    }

    render(app) {
        app.stage.addChild(this.container);

        return this;
    }

    setX(value) {
        this.container.x = value;

        return this;
    }

    setY(value) {
        this.container.y = value;

        return this;
    }
}