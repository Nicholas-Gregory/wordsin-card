import { AnimatedSprite, Application, Assets, Container, Graphics, Sprite, Spritesheet, Texture } from 'pixi.js';
import SpriteRenderer from './lib/renderers/SpriteRenderer';
import Entity from '../lib/Entity';
import RenderSystem from './lib/systems/RenderSystem';
import PathfindingSystem from '../lib/systems/PathfindingSystem';
import Emitter from '../lib/events/Emitter';
import { convertMapCoordinates } from './lib/utils';
import NPCPathfindingMovementSystem from './lib/systems/NPCPathfindingMovementSystem';
import MapPositioningSystem from './lib/systems/MapPositioningSystem';
import Renderer from './lib/renderers/Renderer';
import MapMovementSystem from './lib/systems/MapMovementSystem';
import PlayerPathfindingMovementSystem from './lib/systems/PlayerPathfindingMovementSystem';
import EventSystem from '../lib/systems/EventSystem';
import { faceSouth, moveMapOneTileDown, moveMapOneTileLeft, moveMapOneTileRight, moveMapOneTileUp, moveOneTileEast, moveOneTileNorth, moveOneTileSouth, moveOneTileWest, walkEast, walkNorth, walkSouth, walkWest } from './lib/animation';
import AnimationSystem from './lib/systems/AnimationSystem';
import EffectApplicationSystem from '../lib/systems/EffectApplicationSystem';
import DamageSystem from '../lib/systems/DamageSystem';

const getSprite = async () => {
    const sprite = new SpriteRenderer('./assets/spritesheets/char-1.json', 'faceSouth')
    
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
    sprite.eventMode = 'static';

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
        tiles,
        animations: {
            playerwalknorth: {
                add: ['moveDown'],
                remove: ['moveLeft', 'moveUp', 'moveRight']
            },
            playerwalkeast: {
                add: ['moveLeft'],
                remove: ['moveUp', 'moveDown', 'moveRight']
            },
            playerwalksouth: {
                add: ['moveUp'],
                remove: ['moveDown', 'moveLeft', 'moveRight']
            },
            playerwalkwest: {
                add: ['moveRight'],
                remove: ['moveUp', 'moveLeft', 'moveDown']
            },
            endmapmove: {
                add: [],
                remove: ['moveUp', 'moveLeft', 'moveRight', 'moveDown']
            }
        },
        moveDown: time => moveMapOneTileDown(mapEntity, time, app, emitter, playerEntity),
        moveLeft: time => moveMapOneTileLeft(mapEntity, time, app, emitter, playerEntity),
        moveUp: time => moveMapOneTileUp(mapEntity, time, app, emitter, playerEntity),
        moveRight: time => moveMapOneTileRight(mapEntity, time, app, emitter, playerEntity)
    });

    const playerEntity = new Entity({
        renderer: sprite,
        isPlayerCharacter: true,
        mapId: mapEntity.id,
        mapPosition: { x: 4, y: 3 },
        movementSpeed: 5,
        animations: {
            playerwalknorth: {
                add: ['walkNorth'],
                remove: ['walkEast', 'walkSouth', 'walkWest', 'faceSouth']
            },
            playerwalkeast: {
                add: ['walkEast'],
                remove: ['walkNorth', 'walkSouth', 'walkWest', 'faceSouth']
            },
            playerwalksouth: {
                add: ['walkSouth'],
                remove: ['walkNorth', 'walkWest', 'walkEast', 'faceSouth']
            },
            playerwalkwest: {
                add: ['walkWest'],
                remove: ['walkEast', 'walkNorth', 'walkSouth', 'faceSouth']
            },
            endmapmove: {
                add: ['faceSouth'],
                remove: ['walkNorth', 'walkEast', 'walkSouth', 'walkWest']
            }
        },
        walkNorth: time => walkNorth(playerEntity),
        walkEast: time => walkEast(playerEntity),
        walkSouth: time => walkSouth(playerEntity),
        walkWest: time => walkWest(playerEntity),
        faceSouth: time => faceSouth(playerEntity)
    });

    const npcEntity = new Entity({
        renderer: await getSprite(),
        mapId: mapEntity.id,
        mapPosition: { x: 0, y: 0 },
        destination: { x: 5, y: 5 },
        movementSpeed: 5,
        health: { amount: 10 },
        animations: {
            walknorth: {
                add: ['walkNorth', 'moveNorth'],
                remove: ['walkEast', 'moveEast', 'walkSouth', 'moveSouth', 'walkWest', 'moveWest', 'faceSouth']
            },
            walkeast: {
                add: ['walkEast', 'moveEast'],
                remove: ['walkNorth', 'moveNorth', 'walkSouth', 'moveSouth', 'walkWest', 'moveWest', 'faceSouth']
            },
            walksouth: {
                add: ['walkSouth', 'moveSouth'],
                remove: ['walkNorth', 'moveNorth', 'walkEast', 'moveEast', 'walkWest', 'moveWest', 'faceSouth']
            },
            walkwest: {
                add: ['walkWest', 'moveWest'],
                remove: ['walkNorth', 'moveNorth', 'walkEast', 'moveEast', 'walkSouth', 'moveSouth', 'faceSouth']
            },
            endmove: {
                add: ['faceSouth'],
                remove: ['walkNorth', 'moveNorth', 'walkEast', 'moveEast', 'walkSouth', 'moveSouth', 'walkWest', 'moveWest']
            }
        },
        walkNorth: time => walkNorth(npcEntity),
        moveNorth: time => moveOneTileNorth(npcEntity, time, mapEntity, emitter, app),
        walkEast: time => walkEast(npcEntity),
        moveEast: time => moveOneTileEast(npcEntity, time, mapEntity, emitter, app),
        walkSouth: time => walkSouth(npcEntity),
        moveSouth: time => moveOneTileSouth(npcEntity, time, mapEntity, emitter, app),
        walkWest: time => walkWest(npcEntity),
        moveWest: time => moveOneTileWest(npcEntity, time, mapEntity, emitter, app),
        faceSouth: time => faceSouth(npcEntity)
    });

    mapEntity.renderer.addChild(npcEntity.renderer);

    const effects = [];
    const effectApplicationSystem = new EffectApplicationSystem(effects);
    const damageSystem = new DamageSystem([npcEntity, playerEntity]);
    const animationSystem = new AnimationSystem([npcEntity, mapEntity, playerEntity]);
    const renderSystem = new RenderSystem([mapEntity, playerEntity, npcEntity, ...tiles]);
    const pathfindingSystem = new PathfindingSystem([npcEntity, playerEntity]);
    const mapPositioningSystem = new MapPositioningSystem([mapEntity]);
    const mapMovementSystem = new MapMovementSystem([mapEntity]);
    const playerPathfindingMovementSystem = new PlayerPathfindingMovementSystem([playerEntity]);

    sprite.on('click', event => {
        effects.push({
            component: 'deal',
            targetId: npcEntity.id,
            deal: { amount: 5 }
        });

        effectApplicationSystem.process(damageSystem);
    });

    for (let listener of mapMovementSystem.listeners) {
        emitter.subscribe(listener);
    }

    for (let tile of tiles) {
        tile.renderer.on('click', event => {
            emitter.emit('tileclick', app, renderSystem, tile)
            pathfindingSystem.process(renderSystem);
            emitter.emit('beginplayerpathfinding', app, mapEntity, emitter);
        });
    }

    renderSystem.process(app, renderSystem);

    pathfindingSystem.process(renderSystem);

    const npcPathfindingMovementSystem = new NPCPathfindingMovementSystem([npcEntity]);

    for (let listener of animationSystem.listeners) {
        emitter.subscribe(listener);
    }

    for (let listener of playerPathfindingMovementSystem.listeners) {
        emitter.subscribe(listener);
    }

    for (let listener of npcPathfindingMovementSystem.listeners) {
        emitter.subscribe(listener);
    }

    for (let listener of mapPositioningSystem.listeners) {
        emitter.subscribe(listener);
    }

    npcEntity.position = convertMapCoordinates(mapEntity, npcEntity.mapPosition);

    emitter.emit('endmove', app, mapEntity, emitter);

    mapPositioningSystem.process(mapEntity, app, renderSystem);

    app.ticker.add(time => {
        renderSystem.process(app, renderSystem);
        mapPositioningSystem.process(mapEntity, app, renderSystem);
        damageSystem.process();
        console.log(npcEntity.health)
    });
;})();
