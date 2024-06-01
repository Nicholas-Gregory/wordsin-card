import { AnimatedSprite, Application, Assets, Container, Graphics, Sprite, Spritesheet, Texture } from 'pixi.js';
import SpriteRenderer from './lib/renderers/SpriteRenderer';
import TileMapRenderer from './lib/renderers/TileMapRenderer';
import Entity from '../lib/Entity';
import RenderSystem from './lib/systems/RenderSystem';
import PathfindingSystem from '../lib/systems/PathfindingSystem';
import MovementSystem from './lib/systems/MovementSystem';
import Emitter from '../lib/events/Emitter';
import Listener from '../lib/events/Listener';
import { convertMapCoordinates } from './lib/utils';

const getSprite = async () => {
    const sprite = new SpriteRenderer('./assets/spritesheets/char-1.json', 'facingSouth')
    
    await sprite.initSpritesheet()
    sprite
    .initSprites()
    .init();

    return sprite;
}


(async () =>
{
    const app = new Application();

    await app.init({ 
        background: '#1099bb',
        width: window.innerWidth / 2, height: window.innerHeight / 2,
        resolution: 2
    });

    document.body.appendChild(app.canvas);

    const sprite = await getSprite();

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

    const tileNames = ['short1', 'short2', 'short3', 'longEdge1', 'longEdge2', 'longEdge3', 'longSide1', 'longSide2', 'longSide3', 'longTop1', 'longTop2', 'longTop3'];

    const tiles = [...new Array(100)].map(tile => ({
        weight: Math.random() * 5,
        tileName: tileNames[Math.floor(Math.random() * tileNames.length)]
    }));

    const map = new TileMapRenderer('./assets/spritesheets/grass-tiles-1.json', 10, tiles);
    await map.initTileSet();
    map
    .initTiles()
    .init();

    const mapEntity = new Entity({
        position: { x: 10, y: 10 },
        renderer: map,
        width: 10,
        tiles
    });

    const playerEntity = new Entity({
        renderer: sprite,
        isPlayerCharacter: true
    });

    const npcEntity = new Entity({
        renderer: await getSprite(),
        mapId: mapEntity.id,
        mapPosition: { x: 0, y: 0 },
        destination: { x: 5, y: 5 },
        movementSpeed: 5
    });

    const movementSystem = new MovementSystem([npcEntity]);
    const renderSystem = new RenderSystem([playerEntity, mapEntity, npcEntity]);
    const pathfindingSystem = new PathfindingSystem([npcEntity]);

    renderSystem.process(app, renderSystem);

    pathfindingSystem.process(renderSystem);

    const emitter = new Emitter(movementSystem.listeners);
    emitter.subscribe(new Listener('endmove', () => {
        const nextTile = npcEntity.astarPath.shift();

        npcEntity.moving = false;

        if (nextTile) {
            if (nextTile.x === npcEntity.mapPosition.x) {
                if (nextTile.y > npcEntity.mapPosition.y) {
                    npcEntity.movementDirection = 'south';
                } else {
                    npcEntity.movementDirection = 'north';
                }
            } else {
                if (nextTile.x < npcEntity.mapPosition.x) {
                    npcEntity.movementDirection = 'west';
                } else {
                    npcEntity.movementDirection = 'east';
                }
            }

            npcEntity.mapPosition = nextTile;
            emitter.emit('beginmove', npcEntity, app, mapEntity, emitter, renderSystem);
        }
    }));

    npcEntity.position = convertMapCoordinates(mapEntity, npcEntity.mapPosition);

    emitter.emit('endmove', npcEntity, app, mapEntity, emitter);

    app.ticker.add(time => renderSystem.process(app, renderSystem))
;})();
