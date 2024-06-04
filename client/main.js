import { AnimatedSprite, Application, Assets, Container, Graphics, Sprite, Spritesheet, Texture } from 'pixi.js';
import SpriteRenderer from './lib/renderers/SpriteRenderer';
import Entity from '../lib/Entity';
import RenderSystem from './lib/systems/RenderSystem';
import PathfindingSystem from '../lib/systems/PathfindingSystem';
import MovementSystem from './lib/systems/MovementSystem';
import Emitter from '../lib/events/Emitter';
import { convertMapCoordinates } from './lib/utils';
import NPCPathfindingMovementSystem from './lib/systems/NPCPathfindingMovementSystem';
import MapPositioningSystem from './lib/systems/MapPositioningSystem';
import Renderer from './lib/renderers/Renderer';

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

    const tiles = [...new Array(100)].map(tile => new Entity({
        weight: Math.random() * 5,
        tileName: tileNames[Math.floor(Math.random() * tileNames.length)],
        position: {}
    }));

    for (let tile of tiles) {
        tile.renderer = new SpriteRenderer('./assets/spritesheets/grass-tiles-1.json', tile.tileName);
        await tile.renderer.initSpritesheet();
        tile.renderer
        .initSprites()
        .init();
    }

    const mapRenderer = new Renderer(tiles.map(tile => tile.renderer));
    mapRenderer.init();

    const mapEntity = new Entity({
        position: { x: 10, y: 10 },
        renderer: mapRenderer,
        width: 10,
        tiles
    });

    const playerEntity = new Entity({
        renderer: sprite,
        isPlayerCharacter: true,
        mapId: mapEntity.id,
        mapPosition: { x: 4, y: 3 }
    });

    const npcEntity = new Entity({
        renderer: await getSprite(),
        mapId: mapEntity.id,
        mapPosition: { x: 0, y: 0 },
        destination: { x: 5, y: 5 },
        movementSpeed: 5
    });

    mapEntity.renderer.addChild(npcEntity.renderer);

    const movementSystem = new MovementSystem([npcEntity]);
    const renderSystem = new RenderSystem([mapEntity, playerEntity, npcEntity, ...tiles]);
    const pathfindingSystem = new PathfindingSystem([npcEntity]);
    const mapPositioningSystem = new MapPositioningSystem([mapEntity]);

    renderSystem.process(app, renderSystem);

    pathfindingSystem.process(renderSystem);

    const npcPathfindingMovementSystem = new NPCPathfindingMovementSystem([npcEntity]);

    const emitter = new Emitter([...movementSystem.listeners, ...npcPathfindingMovementSystem.listeners]);

    npcEntity.position = convertMapCoordinates(mapEntity, npcEntity.mapPosition);

    emitter.emit('endmove', npcEntity, app, mapEntity, emitter);

    app.ticker.add(time => {
        renderSystem.process(app, renderSystem);
        mapPositioningSystem.process(app, renderSystem);
    });
;})();
