import { AnimatedSprite, Application, Assets, Container, Graphics, Sprite, Spritesheet, Texture } from 'pixi.js';
import SpriteRenderer from './lib/renderers/SpriteRenderer';
import TileMapRenderer from './lib/renderers/TileMapRenderer';
import Entity from '../lib/Entity';
import RenderSystem from './lib/systems/RenderSystem';
import PathfindingSystem from '../lib/systems/PathfindingSystem';

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

    const playerEntity = new Entity({
        position: { x: app.screen.width / 2, y: app.screen.height / 2 },
        renderer: sprite
    });

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

    const mapEntity = new Entity({
        position: { x: 10, y: 10 },
        renderer: map,
        width: 10,
        tiles: [...new Array(100)].map(tile => ({
            weight: Math.random() * 5
        }))
    });

    const renderSystem = new RenderSystem([playerEntity, mapEntity]);

    const pathfindingEntity = new Entity({
        mapPosition: { x: 1, y: 1 },
        mapId: mapEntity.id,
        destination: { x: 5, y: 5 }
    });

    const pathfindingSystem = new PathfindingSystem([pathfindingEntity]);

    pathfindingSystem.process(renderSystem);

    console.log(pathfindingEntity.astarPath);

    app.ticker.add(time => renderSystem.process(app));
;})();
