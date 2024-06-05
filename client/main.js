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
import MapMovementSystem from './lib/systems/MapMovementSystem';
import PlayerPathfindingMovementSystem from './lib/systems/PlayerPathfindingMovementSystem';

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

    const emitter = new Emitter();

    const tileNames = ['short1', 'short2', 'short3', 'longEdge1', 'longEdge2', 'longEdge3', 'longSide1', 'longSide2', 'longSide3', 'longTop1', 'longTop2', 'longTop3'];

    const tiles = [...new Array(100)].map(tile => new Entity({
        weight: Math.random() * 5,
        tileName: tileNames[Math.floor(Math.random() * tileNames.length)],
        position: {}
    }));

    for (let tile of tiles) {
        tile.renderer = new SpriteRenderer('./assets/spritesheets/grass-tiles-1.json', tile.tileName, { eventMode: 'static' });
        await tile.renderer.initSpritesheet();
        tile.renderer
        .initSprites()
        .init();
    }

    const mapRenderer = new Renderer(tiles.map(tile => tile.renderer));
    mapRenderer.init();

    const mapEntity = new Entity({
        position: {},
        renderer: mapRenderer,
        width: 10,
        tiles
    });

    const playerEntity = new Entity({
        renderer: sprite,
        isPlayerCharacter: true,
        mapId: mapEntity.id,
        mapPosition: { x: 4, y: 3 },
        movementSpeed: 5
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
    const pathfindingSystem = new PathfindingSystem([npcEntity, playerEntity]);
    const mapPositioningSystem = new MapPositioningSystem([mapEntity]);
    const mapMovementSystem = new MapMovementSystem([mapEntity]);
    const playerPathfindingMovementSystem = new PlayerPathfindingMovementSystem([playerEntity]);

    for (let listener of playerPathfindingMovementSystem.listeners) {
        emitter.subscribe(listener);
    }

    for (let listener of mapMovementSystem.listeners) {
        emitter.subscribe(listener);
    }

    for (let tile of tiles) {
        tile.renderer.on('click', event => {
            emitter.emit('tileclick', mapEntity, app, renderSystem, tile)
            pathfindingSystem.process(renderSystem);
            emitter.emit('endmapmove', playerEntity, app, mapEntity, emitter);
        });
    }

    renderSystem.process(app, renderSystem);

    pathfindingSystem.process(renderSystem);

    const npcPathfindingMovementSystem = new NPCPathfindingMovementSystem([npcEntity]);

    for (let listener of movementSystem.listeners) {
        emitter.subscribe(listener);
    }

    for (let listener of npcPathfindingMovementSystem.listeners) {
        emitter.subscribe(listener);
    }

    for (let listener of mapPositioningSystem.listeners) {
        emitter.subscribe(listener);
    }

    npcEntity.position = convertMapCoordinates(mapEntity, npcEntity.mapPosition);

    emitter.emit('endmove', npcEntity, app, mapEntity, emitter);

    mapPositioningSystem.process(mapEntity, app, renderSystem);

    app.ticker.add(time => {
        renderSystem.process(app, renderSystem);
        
    });
;})();
