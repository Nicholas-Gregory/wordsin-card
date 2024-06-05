import EventSystem from "../../../lib/systems/EventSystem";

const mapPositioningSystemCallback = (event, map, app, playerSystem, tile) => {
    const player = playerSystem.queryEntity({ isPlayerCharacter: true });

    if (player.mapId === map.id) {
        const { x: playerX, y: playerY } = player.mapPosition;
        const playerSize = player.renderer.getSize();
        const tileSize = map.renderer.renderers[0].getSize();

        map.position.x = app.screen.width / 2 - playerX * map.renderer.renderers[0].getSize().width - tileSize.width / 2;
        map.position.y = app.screen.height / 2 + - playerY * map.renderer.renderers[0].getSize().height - tileSize.height;

        for (let i = 0; i < map.tiles.length; i++) {
            const tile = map.tiles[i];
            const tileSize = tile.renderer.getSize();

            tile.position.x = (i % map.width) * tileSize.width;
            tile.position.y = Math.floor(i / map.width) * tileSize.height;
        }
    }

    if (tile) {
        const index = map.tiles
        .findIndex(
            t => t.id === tile.id
        );

        player.destination = { x: index % map.width, y: Math.floor(index / map.width)}
        console.log(player.destination)
    }
};

export default class MapPositioningSystem extends EventSystem {
    constructor(entities) {
        super(null, null, entities, mapPositioningSystemCallback, ['tileclick']);
    }
}