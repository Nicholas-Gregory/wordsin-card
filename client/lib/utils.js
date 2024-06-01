export const convertMapCoordinates = (map, mapPosition) => { 
    const tileWidth = map.renderer.getTileWidth();
    const tileHeight = map.renderer.getTileHeight();

    return {
        x: map.renderer.x + tileWidth * mapPosition.x + tileWidth / 2,
        y: map.renderer.y + tileHeight * mapPosition.y + tileHeight
    };
};