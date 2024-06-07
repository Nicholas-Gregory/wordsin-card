import EventSystem from "../../../lib/systems/EventSystem";

const needed = [
    'mapPosition',
    'astarPath'
];
const npcPathfindingMovementSystemCallback = (entity, event, app, map, emitter) => {
    const nextTile = entity.astarPath.shift();

    let walkEvent;

    if (!entity.moving) {
        entity.moving = true;

        if (nextTile) {
            if (nextTile.x === entity.mapPosition.x) {
                if (nextTile.y > entity.mapPosition.y) {
                    walkEvent = 'walksouth';
                } else {
                    walkEvent = 'walknorth';
                }
            } else {
                if (nextTile.x < entity.mapPosition.x) {
                    walkEvent = 'walkwest';
                } else {
                    walkEvent = 'walkeast';
                }
            }

            entity.mapPosition = nextTile;
            emitter.emit(walkEvent, app, map, emitter);
        }
    }
};

export default class NPCPathfindingMovementSystem extends EventSystem {
    constructor(entities) {
        super(needed, ['frozen'], entities, npcPathfindingMovementSystemCallback, ['endmove']);
    }
}