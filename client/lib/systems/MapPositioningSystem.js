import System from "../../../lib/systems/System";

const mapPositioningSystemCallback = (map, app, playerSystem) => {
    const player = playerSystem.queryEntity({ isPlayerCharacter: true });

    if (player.mapId === map.id) {
        const { x: playerX, y: playerY } = player.mapPosition;

        map.position.x = app.screen.width / 2 - playerX * map.renderer.renderers[0].getSize().width;
        map.position.y = app.screen.height / 2 - playerY * map.renderer.renderers[0].getSize().height;

        for (let i = 0; i < map.tiles.length; i++) {
            const tile = map.tiles[i];
            const tileSize = tile.renderer.getSize();

            tile.position.x = (i % map.width) * tileSize.width;
            tile.position.y = Math.floor(i / map.width) * tileSize.height;
        }
    }
};

export default class MapPositioningSystem extends System {
    constructor(entities) {
        super(null, null, entities, mapPositioningSystemCallback);
    }
}