import { Container } from "pixi.js";

export default class TileRegionRenderer extends Container {
    constructor(tileWidth, tileHeight, widthInTiles, tileSpriteArray) {
        super();

        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.widthInTiles = widthInTiles;
        this.tiles = tileSpriteArray;

        this.makeTiles();
    }

    makeTiles() {
        for (let i = 0; i < this.tiles.length; i++) {
            let tile = this.tiles[i];
            let tileSize = tile.getSize();

            tile.x = (i % this.widthInTiles) * this.tileWidth;
            tile.y = (Math.floor(i / this.widthInTiles)) * this.tileHeight;
            tile.setSize(this.tileWidth, this.tileHeight);

            this.addChild(tile);
        }
    }
}