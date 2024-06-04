export const convertMapCoordinates = (map, mapPosition) => { 
    const tileWidth = map.renderer.renderers[0].getSize().width;
    const tileHeight = map.renderer.renderers[0].getSize().height;

    return {
        x: tileWidth * mapPosition.x + tileWidth / 2,
        y: tileHeight * mapPosition.y + tileHeight
    };
};