import { Container } from "pixi.js";
import AnimationManager from "./AnimationManager";
import TileRegionRenderer from "../renderers/TileRegionRenderer";

export default class MapManager {
    constructor(tileWidth, tileHeight, app, map, playerSprite, tileSet) {
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.tileSet = tileSet;
        this.app = app;
        this.map = map;
        this.playerSprite = playerSprite;
        this.renderer = new Container();

        this.app.stage.addChild(this.renderer);

        this
        .initKeyboardEvents()
        .initMap()
        .initPlayerSprite();
    }

    initPlayerSprite() {
        this.playerSprite.anchor.set(1);
        this.playerSprite.x = this.app.screen.width / 2;
        this.playerSprite.y = this.app.screen.height / 2;

        this.renderer.addChild(this.playerSprite);

        return this;
    }

    initMap() {
        this.mapRenderer = new TileRegionRenderer(this.tileWidth, this.tileHeight, 100, this.map.tiles.map(
            tile => this.tileSet.getNewTileFromId(tile.id)
        ));
        this.mapRenderer.x = (this.app.screen.width / 2) - this.map.playerLocation.x * this.mapRenderer.tileWidth;
        this.mapRenderer.y = (this.app.screen.height / 2) - this.map.playerLocation.y * this.mapRenderer.tileHeight;

        this.renderer.addChild(this.mapRenderer);

        return this;
    }

    initKeyboardEvents() {
        window.addEventListener(`keydown`, event => {
            const { key } = event;

            event.preventDefault();

            if (key === `ArrowDown`) {
                this.map.moveDown(1);
                this.placeMap();
            } else if (key === `ArrowUp`) {
                this.map.moveUp(1);
                this.placeMap();
            } else if (key === 'ArrowLeft') {
                this.map.moveLeft(1);
                this.placeMap();
            } else if (key === 'ArrowRight') {
                this.map.moveRight(1);
                this.placeMap();
            }
        });

        return this;
    }
}