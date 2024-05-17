export default class Map {
    constructor(width, height, tiles, entities, playerLocation) {
        this.width = width;
        this.height = height;
        this.tiles = tiles;
        this.entities = entities;
        this.playerLocation = playerLocation;
    }

    triggerCollisionEntity() {
        const entity = this.getEntityAt(this.playerLocation.x, this.playerLocation.y);

        if (entity) {
            entity.triggerCollision();
        }
    }

    moveTo(x, y) {
        this.playerLocation.x = x;
        this.playerLocation.y = y;

        this.triggerCollisionEntity();
    }

    moveUp(amount) {
        this.moveTo(this.playerLocation.x, this.playerLocation.y - amount);
    }

    moveDown(amount) {
        this.moveTo(this.playerLocation.x, this.playerLocation.y + amount);
    }

    moveLeft(amount) {
        this.moveTo(this.playerLocation.x - amount, this.playerLocation.y);
    }

    moveRight(amount) {
        this.moveTo(this.playerLocation.x + amount, this.playerLocation.y);
    }

    getTile(x, y) {
        return this.tiles[this.width * x + y];
    }

    getPlayerLocationTile() {
        return this.getTile(this.playerLocation.x, this.playerLocation.y);
    }

    getUpTile() {
        return this.getTile(this.playerLocation.x, this.playerLocation.y - 1);
    }

    getDownTile() {
        return this.getTile(this.playerLocation.x, this.playerLocation.y + 1);
    }

    getLeftTile() {
        return this.getTile(this.playerLocation.x - 1, this.playerLocation.y);
    }

    getRightTile() {
        return this.getTile(this.playerLocation.x + 1, this.playerLocation.y);
    }

    getEntityAt(x, y) {
        return this.entities.find(entity => entity.x === x && entity.y === y);
    }

    interact() {
        const entity = this.getEntityAt(this.playerLocation.x, this.playerLocation.y);

        if (entity) {
            entity.triggerInteraction();
        }
    }

    affectEntity(x, y, effect) {
        const entity = this.getEntityAt(x, y);

        if (entity) {
            entity.affect(effect);
        }
    }
}