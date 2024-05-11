import { Container, Sprite } from "pixi.js";
import TextureGetter from "../assets/TextureGetter";

export default class Target extends Container {
    constructor() {
        super();

        this.textureGetter = new TextureGetter('target.png');
    }

    async render() {
        const texture = await this.textureGetter.load()
        const sprite = new Sprite(texture);

        sprite.scale = 0.25;

        this.addChild(sprite);
    }

    handleMouseOver() {

    }

    handleClick() {

    }
}