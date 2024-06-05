import EventSystem from "../../../lib/systems/EventSystem";

const needed = [
    'mapPosition',
    'astarPath'
];
const npcPathfindingMovementSystemCallback = (event, entity, app, map, emitter) => {
    const nextTile = entity.astarPath.shift();

    entity.moving = false;

    if (nextTile) {
        if (nextTile.x === entity.mapPosition.x) {
            if (nextTile.y > entity.mapPosition.y) {
                entity.movementDirection = 'south';
            } else {
                entity.movementDirection = 'north';
            }
        } else {
            if (nextTile.x < entity.mapPosition.x) {
                entity.movementDirection = 'west';
            } else {
                entity.movementDirection = 'east';
            }
        }

        entity.mapPosition = nextTile;
        emitter.emit('beginmove', entity, app, map, emitter);
    }
};

export default class NPCPathfindingMovementSystem extends EventSystem {
    constructor(entities) {
        super(needed, ['frozen'], entities, npcPathfindingMovementSystemCallback, ['endmove']);
    }
}