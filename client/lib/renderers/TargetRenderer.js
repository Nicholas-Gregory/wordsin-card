import { Container, Sprite } from 'pixi.js';
import TextureGetter from '../assets/TextureGetter.js'

export default class TargetRenderer extends Container {
    constructor() {
        super();

        this.textureGetter = new TextureGetter('target.png');
    }

    async makeTarget() {
        this.texture = await this.textureGetter.load();
        this.sprite = new Sprite(this.texture);
        this.sprite.scale = 0.33;

        this.addChild(this.sprite);

        return this;
    }
}