import { AnimatedSprite, Assets, Sprite } from 'pixi.js';
import Renderer from './Renderer.js';

export default class SpriteRenderer extends Renderer {
    constructor(path, defaultSprite, options) {
        super({}, options);

        this.path = path;
        this.sprites = {};
        this.defaultSprite = defaultSprite;
    }

    async initSpritesheet() {
        this.spritesheet = await Assets.load(this.path);
        // Makes scaled sprites not blurry
        this.spritesheet.textureSource.scaleMode = 'nearest';

        return this;
    }

    initSprites() {
        for (let animationName in this.spritesheet.animations) {
            this.sprites[animationName] = new AnimatedSprite(this.spritesheet.animations[animationName]);
            this.sprites[animationName].animationSpeed = 0.1;
        }

        for (let texture in this.spritesheet.textures) {
            this.sprites[texture] = new Sprite(this.spritesheet.textures[texture]);
        }

        return this;
    }

    init() {
        this.renderers.sprite = this.sprites[this.defaultSprite];

        super.init();
    }

    setSprite(name) {
        this.removeChildren();

        this.renderers.sprite = this.sprites[name];
        this.renderers.sprite.play?.();

        super.init();
    }
}