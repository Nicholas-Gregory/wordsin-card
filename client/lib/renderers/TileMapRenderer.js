import { Assets, Container, Sprite } from "pixi.js";
import Renderer from "./Renderer";

export default class TileMapRenderer extends Renderer {
    constructor(path, widthInTiles, tiles, options) {
        super([], options);

        this.path = path;
        this.tiles = tiles;
        this.widthInTiles = widthInTiles;
    }

    getTileWidth() {
        return this.renderers[0].getSize().width;
    }

    getTileHeight() {
        return this.renderers[0].getSize().height;
    }

    async initTileSet() {
        this.tileSet = await Assets.load(this.path);
        this.tileSet.textureSource.scaleMode = 'nearest';
    }

    initTiles() {
        for (let i = 0; i < this.tiles.length; i++) {
            const tile = this.tiles[i];
            const sprite = new Sprite(this.tileSet.textures[tile.tileName]);
            const tileSize = sprite.getSize();

            sprite.x = (i % this.widthInTiles) * tileSize.width;
            sprite.y = Math.floor(i / this.widthInTiles) * tileSize.height;

            this.renderers.push(sprite);
        }

        return this;
    }
}