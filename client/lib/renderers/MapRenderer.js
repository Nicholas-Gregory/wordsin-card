import { Container } from "pixi.js";

export default class MapRenderer extends Container {
    constructor(tileRenderer, movementSpeed) {
        super({ eventMode: 'static' });

        this.tileRenderer = tileRenderer;
        this.movementSpeed = movementSpeed;
        this.moving = false;

        this.addChild(tileRenderer);
    }

    moveUp(time) {
        this.tileRenderer.y += this.movementSpeed * time.deltaTime;
    }

    moveDown(time) {
        this.tileRenderer.y -= this.movementSpeed * time.deltaTime;
    }

    moveLeft(time) {
        this.tileRenderer.x += this.movementSpeed * time.deltaTime;
    }

    moveRight(time) {
        this.tileRenderer.x -= this.movementSpeed * time.deltaTime;
    }
}