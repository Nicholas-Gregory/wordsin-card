import EventSystem from "../../../lib/systems/EventSystem";
import { convertMapCoordinates } from "../utils";

const needed = [
    'renderer'
];

const moveNorth = (entity, time, map, app, emitter) => {
    entity.renderer.setSprite('walkNorth');

    if (entity.position.y < convertMapCoordinates(map, entity.mapPosition).y) {
        entity.position.y -= entity.movementSpeed * 0.1 * time.deltaTime;
    } else {
        entity.moving = null;
        app.ticker.remove(entity.animationCallback);
        entity.renderer.setSprite('facingNorth');
        emitter.emit('endmove', entity, app, map, emitter);
    }
};

const moveEast = (entity, time, map, app, emitter) => {
    entity.renderer.setSprite('walkEast');

    if (entity.position.x < convertMapCoordinates(map, entity.mapPosition).x) {
        entity.position.x += entity.movementSpeed * 0.1 * time.deltaTime;
    } else {
        entity.moving = null;
        app.ticker.remove(entity.animationCallback);
        entity.renderer.setSprite('facingEast');
        emitter.emit('endmove', entity, app, map, emitter);
    }
};

const moveSouth = (entity, time, map, app, emitter) => {
    entity.renderer.setSprite('walkSouth');

    if (entity.position.y < convertMapCoordinates(map, entity.mapPosition).y) {
        entity.position.y += entity.movementSpeed * 0.1 * time.deltaTime;
    } else {
        entity.moving = null;
        app.ticker.remove(entity.animationCallback);
        entity.renderer.setSprite('facingSouth');
        emitter.emit('endmove', entity, app, map, emitter);
    }
};

const moveWest = (entity, time, map, app, emitter) => {
    entity.renderer.setSprite('walkWest');

    if (entity.position.x > convertMapCoordinates(map, entity.mapPosition).x) {
        entity.position.x -= entity.movementSpeed * 0.1 * time.deltaTime;
    } else {
        entity.moving = null;
        app.ticker.remove(entity.animationCallback);
        entity.renderer.setSprite('facingWest');
        emitter.emit('endmove', entity, app, map, emitter);
    }
}

const movementSystemCallback = (entity, app, map, emitter) => {
    const direction = entity.movementDirection;

    if (!entity.moving) {
        entity.moving = true;

        if (direction === 'north') {
            entity.animationCallback = time => moveNorth(entity, time, map, app, emitter);
        } else if (direction === 'east') {
            entity.animationCallback = time => moveEast(entity, time, map, app, emitter);
        } else if (direction === 'south') {
            entity.animationCallback = time => moveSouth(entity, time, map, app, emitter);
        } else if (direction === 'west') {
            entity.animationCallback = time => moveWest(entity, time, map, app, emitter);
        }

        app.ticker.add(entity.animationCallback);
    }
};

export default class MovementSystem extends EventSystem {
    constructor(entities) {
        super(needed, ['isPlayerCharacter'], entities, movementSystemCallback, ['beginmove']);
    }
}