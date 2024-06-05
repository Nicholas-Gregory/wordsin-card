import EventSystem from "../../../lib/systems/EventSystem";

const playerPathfindingMovementSystemCallback = (event, player, app, map, emitter) => {
    const nextTile = player.astarPath.shift();

    map.moving = false;

    if (nextTile) {
        if (nextTile.x === player.mapPosition.x) {
            if (nextTile.y > player.mapPosition.y) {
                map.movementDirection = 'up';
            } else {
                map.movementDirection = 'down';
            }
        } else {
            if (nextTile.x < player.mapPosition.x) {
                map.movementDirection = 'right';
            } else {
                map.movementDirection = 'left'
            }
        }

        player.mapPosition = nextTile;
        emitter.emit('beginmapmove', map, app, emitter, player);
    }
}

export default class PlayerPathfindingMovementSystem extends EventSystem {
    constructor(entities) {
        super(['isPlayerCharacter'], ['frozen'], entities, playerPathfindingMovementSystemCallback, ['endmapmove']);
    }
}