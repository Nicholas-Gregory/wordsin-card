import EventSystem from "../../../lib/systems/EventSystem";

const playerPathfindingMovementSystemCallback = (player, event, app, map, emitter) => {
    const nextTile = player.astarPath.shift();
    
    if (!map.moving) {
        let walkEvent;
        
        map.moving = true;

        if (nextTile) {
            if (nextTile.x === player.mapPosition.x) {
                if (nextTile.y > player.mapPosition.y) {
                    walkEvent = 'playerwalksouth';
                } else {
                    walkEvent = 'playerwalknorth';
                }
            } else {
                if (nextTile.x < player.mapPosition.x) {
                    walkEvent = 'playerwalkwest';
                } else {
                    walkEvent = 'playerwalkeast';
                }
            }
            player.mapPosition = nextTile;
        
            emitter.emit(walkEvent, app);
            map.previousPosition = { ...map.position };
        } else {
            map.moving = false;
        }
    }
}

export default class PlayerPathfindingMovementSystem extends EventSystem {
    constructor(entities) {
        super(['isPlayerCharacter'], ['frozen'], entities, playerPathfindingMovementSystemCallback, ['endmapmove', 'beginplayerpathfinding']);
    }
}