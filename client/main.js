import { AnimatedSprite, Application, Assets, Container, Graphics, Sprite, Spritesheet, Texture } from 'pixi.js';
import SpriteRenderer from './lib/renderers/SpriteRenderer';
import TileMapRenderer from './lib/renderers/TileMapRenderer';

(async () =>
{
    const app = new Application();

    await app.init({ 
        background: '#1099bb',
        width: window.innerWidth / 2, height: window.innerHeight / 2,
        resolution: 2
    });

    document.body.appendChild(app.canvas);

    const sprite = new SpriteRenderer('./assets/spritesheets/char-1.json', 'facingSouth');

    await sprite.initSpritesheet();
    sprite
    .initSprites()
    .init();

    window.addEventListener('keydown', event => {
        const key = event.key;

        event.preventDefault();

        if (key === 'ArrowUp') {
            sprite.setSprite('walkNorth');
        } else if (key === 'ArrowDown') {
            sprite.setSprite('walkSouth');
        } else if (key === 'ArrowRight') {
            sprite.setSprite('walkEast');
        } else if (key === 'ArrowLeft') {
            sprite.setSprite('walkWest');
        }
    });

    window.addEventListener('keyup', event => {
        const key = event.key;

        event.preventDefault();

        if (key === 'ArrowUp') {
            sprite.setSprite('facingNorth');
        } else if (key === 'ArrowDown') {
            sprite.setSprite('facingSouth');
        } else if (key === 'ArrowRight') {
            sprite.setSprite('facingEast');
        } else if (key === 'ArrowLeft') {
            sprite.setSprite('facingWest');
        }
    });

    const map = new TileMapRenderer('./assets/spritesheets/grass-tiles-1.json', 3, [
        'short1', 'short3', 'short2',
        'short3', 'short1', 'short2',
        'short2', 'short2', 'short3'
    ]);
    await map.initTileSet();
    map
    .initTiles()
    .init();

    app.stage.addChild(map, sprite);
;})();
