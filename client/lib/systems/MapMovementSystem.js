import EventSystem from "../../../lib/systems/EventSystem";

const moveUp = (map, time, app, emitter, player) => {
    player.renderer.setSprite('walkSouth');

    if (map.position.y > app.screen.height / 2 - player.mapPosition.y * map.renderer.renderers[0].getSize().height - map.renderer.renderers[0].getSize().height) {
        map.position.y -= player.movementSpeed * 0.1 * time.deltaTime;
    } else {
        map.moving = false;
        app.ticker.remove(map.animationCallback);
        emitter.emit('endmapmove', player, app, map, emitter);
        player.renderer.setSprite('facingSouth');
    }
};

const moveDown = (map, time, app, emitter, player) => {
    player.renderer.setSprite('walkNorth');

    if (map.position.y < app.screen.height / 2 - player.mapPosition.y * map.renderer.renderers[0].getSize().height - map.renderer.renderers[0].getSize().height) {
        map.position.y += player.movementSpeed * 0.1 * time.deltaTime;
    } else {
        map.moving = false;
        app.ticker.remove(map.animationCallback);
        emitter.emit('endmapmove', player, app, map, emitter);
        player.renderer.setSprite('facingNorth');
    }
};

const moveRight = (map, time, app, emitter, player) => {
    player.renderer.setSprite('walkWest');

    if (map.position.x < app.screen.width / 2 - player.mapPosition.x * map.renderer.renderers[0].getSize().width - map.renderer.renderers[0].getSize().width / 2) {
        map.position.x += player.movementSpeed * 0.1 * time.deltaTime;
    } else {
        map.moving = false;
        app.ticker.remove(map.animationCallback);
        emitter.emit('endmapmove', player, app, map, emitter);
        player.renderer.setSprite('facingWest');
    }
}

const moveLeft = (map, time, app, emitter, player) => {
    player.renderer.setSprite('walkEast');

    if (map.position.x > app.screen.width / 2 - player.mapPosition.x * map.renderer.renderers[0].getSize().width - map.renderer.renderers[0].getSize().width / 2) {
        map.position.x -= player.movementSpeed * 0.1 * time.deltaTime;
    } else {
        map.moving = false;
        app.ticker.remove(map.animationCallback);
        emitter.emit('endmapmove', player, app, map, emitter);
        player.renderer.setSprite('facingEast');
    }
}

const mapMovementSystemCallback = (map, app, emitter, player) => {
    const direction = map.movementDirection;

    if (!map.moving) {
        map.moving = true;

        if (direction === 'up') {
            map.animationCallback = time => moveUp(map, time, app, emitter, player);
        } else if (direction === 'right') {
            map.animationCallback = time => moveRight(map, time, app, emitter, player);
        } else if (direction === 'down') {
            map.animationCallback = time => moveDown(map, time, app, emitter, player);
        } else if (direction === 'left') {
            map.animationCallback = time => moveLeft(map, time, app, emitter, player);
        }

        app.ticker.add(map.animationCallback);
    }
};

export default class MapMovementSystem extends EventSystem {
    constructor(entities) {
        super(null, null, entities, mapMovementSystemCallback, ['beginmapmove']);
    }
}