import { Container } from "pixi.js";

export default class EntityManager extends Container {
    constructor(entity, sprite) {
        super();

        this.sprite = sprite;
        this.entity = entity;
    }
}