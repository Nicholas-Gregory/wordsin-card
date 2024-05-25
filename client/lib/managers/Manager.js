import { Container } from "pixi.js";
import Entity from "../../../lib/Entity";
import Renderer from "../renderers/Renderer";

export default class Manager extends Renderer {
    constructor(app, entity, renderers) {
        super(renderers, { eventMode: 'static' });

        this.app = app;
        this.entity = entity || new Entity();
    }
}