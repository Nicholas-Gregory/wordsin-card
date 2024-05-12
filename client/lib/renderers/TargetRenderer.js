import { Sprite } from 'pixi.js';
import TextureGetter from '../assets/TextureGetter.js'
import Renderer from './Renderer.js';

export default class TargetRenderer extends Renderer {
    constructor() {
        super();

        this.textureGetter = new TextureGetter('target.png');
    }

    async makeTarget() {
        this.texture = await this.textureGetter.load();
        this.sprite = new Sprite(this.texture);
        this.sprite.scale = 0.25;

        this.rendererChildren[0] = this.sprite;

        return this;
    }

    async render() {
        await this.makeTarget();

        await super.render();
    }
}