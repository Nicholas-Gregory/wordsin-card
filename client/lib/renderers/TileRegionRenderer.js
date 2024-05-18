import { Container } from "pixi.js";

export default class TileRegionRenderer extends Container {
    constructor(widthInTiles, tileSpriteArray) {
        super();

        this.widthInTiles = widthInTiles;
        this.tiles = tileSpriteArray;

        this.makeTiles();
    }

    makeTiles() {
        for (let i = 0; i < this.tiles.length; i++) {
            let tile = this.tiles[i];
            let tileSize = tile.getSize();

            tile.x = (i % this.widthInTiles) * tileSize.width;
            tile.y = (Math.floor(i / this.widthInTiles)) * tileSize.height;

            this.addChild(tile);
        }
    }
}