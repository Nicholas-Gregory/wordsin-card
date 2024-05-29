import { AnimatedSprite, Application, Assets, Container, Graphics, Sprite, Spritesheet, Texture } from 'pixi.js';
import Entity from '../lib/Entity';
import WordWrapTextRenderer from './lib/renderers/WordWrapTextRenderer';
import ShadowBoxRenderer from './lib/renderers/ShadowBoxRenderer';
import DialogueSystem from './lib/systems/DialogueSystem';
import Emitter from '../lib/events/Emitter';
import RenderSystem from './lib/systems/RenderSystem';


(async () =>
{
    const app = new Application();

    await app.init({ 
        background: '#1099bb',
        width: window.innerWidth / 2, height: window.innerHeight / 2,
        resolution: 3
    });

    document.body.appendChild(app.canvas);

    const spritesheet = await Assets.load('./assets/spritesheets/char-1.json');
    const sprite = new AnimatedSprite(spritesheet.animations.walkNorth);

    sprite.animationSpeed = 0.1;
    sprite.play();

    app.stage.addChild(sprite);
;})();
