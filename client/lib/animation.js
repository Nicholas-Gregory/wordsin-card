import { convertMapCoordinates } from "./utils";

export const walkNorth = entity => entity.renderer.setSprite('walkNorth');

export const walkEast = entity => entity.renderer.setSprite('walkEast');

export const walkSouth = entity => entity.renderer.setSprite('walkSouth');

export const walkWest = entity => entity.renderer.setSprite('walkWest');

export const faceNorth = entity => entity.renderer.setSprite('faceNorth');

export const faceEast = entity => entity.renderer.setSprite('faceEast');

export const faceSouth = entity => entity.renderer.setSprite('faceSouth');

export const faceWest = entity => entity.renderer.setSprite('faceWest');

const calculateMovementAmount = (speed, time) => speed * 0.1 * time.deltaTime;

export const moveOneTileNorth = (entity, time, map, emitter, app) => {
    if (entity.position.y < convertMapCoordinates(map, entity.mapPosition).y) {
        entity.position.y -= calculateMovementAmount(entity.movementSpeed, time);
    } else {
        entity.moving = false;
        emitter.emit('endmove', app, map, emitter)
    }
};

export const moveOneTileEast = (entity, time, map, emitter, app) => {
    if (entity.position.x < convertMapCoordinates(map, entity.mapPosition).x) {
        entity.position.x += calculateMovementAmount(entity.movementSpeed, time);
    } else {
        entity.moving = false;
        emitter.emit('endmove', app, map, emitter);
    }
};

export const moveOneTileSouth = (entity, time, map, emitter, app) => {
    if (entity.position.y < convertMapCoordinates(map, entity.mapPosition).y) {
        entity.position.y += calculateMovementAmount(entity.movementSpeed, time);
    } else {
        entity.moving = false;
        emitter.emit('endmove', app, map, emitter);
    }
};

export const moveOneTileWest = (entity, time, map, emitter, app) => {
    if (entity.position.x > convertMapCoordinates(map, entity.mapPosition).x) {
        entity.position.x -= calculateMovementAmount(entity.movementSpeed, time);
    } else {
        entity.moving = false;
        emitter.emit('endmove', app, map, emitter);
    }
}

const getMapTileSize = map => map.renderer.renderers[0].getSize();

export const moveMapOneTileUp = (map, time, app, emitter, player) => {
    if (map.position.y > map.previousPosition.y - getMapTileSize(map).height) {
        map.position.y -= calculateMovementAmount(player.movementSpeed, time);
    } else {
        map.moving = false;
        emitter.emit('endmapmove', app, map, emitter);
    }
};

export const moveMapOneTileDown = (map, time, app, emitter, player) => {
    if (map.position.y < map.previousPosition.y + getMapTileSize(map).height) {
        map.position.y += calculateMovementAmount(player.movementSpeed, time);
    } else {
        map.moving = false;
        emitter.emit('endmapmove', app, map, emitter);
    }
};

export const moveMapOneTileRight = (map, time, app, emitter, player) => {
    if (map.position.x < map.previousPosition.x + getMapTileSize(map).width) {
        map.position.x += calculateMovementAmount(player.movementSpeed, time);
    } else {
        map.moving = false;
        emitter.emit('endmapmove', app, map, emitter);
    }
};

export const moveMapOneTileLeft = (map, time, app, emitter, player) => {
    if (map.position.x > map.previousPosition.x - getMapTileSize(map).width) {
        map.position.x -= calculateMovementAmount(player.movementSpeed, time);
    } else {
        map.moving = false;
        emitter.emit('endmapmove', app, map, emitter);
    }
}