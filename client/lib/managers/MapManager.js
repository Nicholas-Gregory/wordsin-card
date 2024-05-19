import { Container } from "pixi.js";
import AnimationManager from "./AnimationManager";
import TileRegionRenderer from "../renderers/TileRegionRenderer";

export default class MapManager extends Container {
    constructor(tileWidth, tileHeight, app, map, playerSprite, tileSet, movementSpeed) {
        super({ eventMode: 'static' });

        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.tileSet = tileSet;
        this.app = app;
        this.map = map;
        this.playerSprite = playerSprite;
        this.movementSpeed = movementSpeed;

        this.app.stage.addChild(this);

        this
        .initKeyboardEvents()
        .initMap()
        .initPlayerSprite()
        .initAnimations();
    }

    initPlayerSprite() {
        this.playerSprite.anchor.set(1);
        this.playerSprite.x = this.app.screen.width / 2;
        this.playerSprite.y = this.app.screen.height / 2;

        this.addChild(this.playerSprite);

        return this;
    }

    initMap() {
        this.mapRenderer = new TileRegionRenderer(this.tileWidth, this.tileHeight, 100, this.map.tiles.map(
            tile => this.tileSet.getNewTileFromId(tile.id)
        ));
        this.mapRenderer.x = (this.app.screen.width / 2) - this.map.playerLocation.x * this.mapRenderer.tileWidth;
        this.mapRenderer.y = (this.app.screen.height / 2) - this.map.playerLocation.y * this.mapRenderer.tileHeight;

        this.addChild(this.mapRenderer);

        return this;
    }

    moveMapUp(time) {
        if (this.mapRenderer.y > (this.app.screen.height / 2) - this.map.playerLocation.y * this.mapRenderer.tileHeight) {
            this.mapRenderer.y -= this.movementSpeed * time.deltaTime;
        } else {
            if (this.moving) {
                this.map.moveDown(1);
            } else {
                this.emit('stopmove');
            }
        }
    }

    moveMapDown(time) {
        if (this.mapRenderer.y < (this.app.screen.height / 2) - this.map.playerLocation.y * this.mapRenderer.tileHeight) {
            this.mapRenderer.y += this.movementSpeed * time.deltaTime;
        } else {
            if (this.moving) {
                this.map.moveUp(1);
            } else {
                this.emit('stopmove');
            }
        }
    }

    moveMapRight(time) {
        if (this.mapRenderer.x < (this.app.screen.width / 2) - this.map.playerLocation.x * this.mapRenderer.tileWidth) {
            this.mapRenderer.x += this.movementSpeed * time.deltaTime;
        } else {
            if (this.moving) {
                this.map.moveLeft(1);
            } else {
                this.emit('stopmove');
            }
        }
    }

    moveMapLeft(time) {
        if (this.mapRenderer.x > (this.app.screen.width / 2) - this.map.playerLocation.x * this.mapRenderer.tileWidth) {
            this.mapRenderer.x -= this.movementSpeed * time.deltaTime;
        } else {
            if (this.moving) {
                this.map.moveRight(1);
            } else {
                this.emit('stopmove');
            }
        }
    }

    initAnimations() {
        this.animationManager = new AnimationManager(this.app, this, {
            stopmove: {
                remove: ['moveMapUp', 'moveMapDown', 'moveMapLeft', 'moveMapRight']
            },
            moveright: {
                add: 'moveMapLeft'
            },
            moveleft: {
                add: 'moveMapRight'
            },
            moveup: {
                add: 'moveMapDown'
            },
            movedown: {
                add: 'moveMapUp'
            }
        });

        return this;
    }

    initKeyboardEvents() {
        window.addEventListener(`keydown`, event => {
            const { key } = event;

            event.preventDefault();

            if (key === `ArrowDown`) {
                if (!this.moving) {
                    this.map.moveDown(1);
                    this.emit('movedown');
                }
            } else if (key === `ArrowUp`) {
                if (!this.moving) {
                    this.map.moveUp(1);
                    this.emit('moveup');
                }
            } else if (key === 'ArrowLeft') {
                if (!this.moving) {
                    this.map.moveLeft(1);
                    this.emit('moveleft');
                }
            } else if (key === 'ArrowRight') {
                if (!this.moving) {
                    this.map.moveRight(1);
                    this.emit('moveright');
                }
            }

            if (key === 'ArrowDown' || key === 'ArrowUp' || key === 'ArrowLeft' || key === 'ArrowRight') {
                this.moving = true;
            }
        });

        window.addEventListener(`keyup`, event => {
            const { key } = event;

            event.preventDefault();

            if (key === 'ArrowDown' || key === 'ArrowUp' || key === 'ArrowLeft' || key === 'ArrowRight') {
                this.moving = false;
            }
        });

        return this;
    }
}