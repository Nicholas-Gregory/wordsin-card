import { Container, Sprite } from "pixi.js";
import AnimationManager from "./AnimationManager";
import TileRegionRenderer from "../renderers/TileRegionRenderer";
import EncounterManager from "./EncounterManager";

export default class MapManager extends Container {
    constructor(tileWidth, tileHeight, app, map, playerSprite, tileSet, entityTextures, movementSpeed) {
        super({ eventMode: 'static' });

        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.tileSet = tileSet;
        this.app = app;
        this.map = map;
        this.playerSprite = playerSprite;
        this.entityTextures = entityTextures;
        this.movementSpeed = movementSpeed;
        this.app.stage.addChild(this);

        this
        .initKeyboardEvents()
        .initMap()
        .initEntitySprites()
        .initPlayerSprite()
        .initAnimations()
        .initCollisions();
    }

    initEntitySprites() {
        for (let entity of this.map.entities) {
            let entitySprite = Sprite.from(this.entityTextures[entity.textureId]);

            entitySprite.anchor.set(1);
            entitySprite.x = entity.x * this.tileWidth;
            entitySprite.y = entity.y * this.tileHeight;

            this.mapContainer.addChild(entitySprite);
        }

        return this;
    }

    initCollisions() {
        this.on('stopmove', event => {
            const entity = this.map.collidingEntity;

            if (entity) {
                window.removeEventListener('keydown', this.keyDownCallback);

                const encounterManager = new EncounterManager(this.app, entity.collisionEncounter);
                encounterManager.on('encounterdone', event => {
                    window.addEventListener('keydown', this.keyDownCallback);
                })
                encounterManager.renderEvent();
            }
        });
    }

    initPlayerSprite() {
        this.playerSprite.anchor.set(1);
        this.playerSprite.x = this.app.screen.width / 2;
        this.playerSprite.y = this.app.screen.height / 2;

        this.addChild(this.playerSprite);

        return this;
    }

    initMap() {
        this.mapContainer = new Container();
        this.mapRenderer = new TileRegionRenderer(this.tileWidth, this.tileHeight, 100, this.map.tiles.map(
            tile => this.tileSet.getNewTileFromId(tile.id)
        ));
        this.mapContainer.x = (this.app.screen.width / 2) - this.map.playerLocation.x * this.mapRenderer.tileWidth;
        this.mapContainer.y = (this.app.screen.height / 2) - this.map.playerLocation.y * this.mapRenderer.tileHeight;
        this.mapContainer.addChild(this.mapRenderer);

        this.addChild(this.mapContainer);

        return this;
    }

    moveMapUp(time) {
        if (this.mapContainer.y > (this.app.screen.height / 2) - this.map.playerLocation.y * this.mapRenderer.tileHeight) {
            this.mapContainer.y -= this.movementSpeed * time.deltaTime;
        } else {
            if (this.moving) {
                this.map.moveDown(1);
            } else {
                this.emit('stopmove');
            }
        }
    }

    moveMapDown(time) {
        if (this.mapContainer.y < (this.app.screen.height / 2) - this.map.playerLocation.y * this.mapRenderer.tileHeight) {
            this.mapContainer.y += this.movementSpeed * time.deltaTime;
        } else {
            if (this.moving) {
                this.map.moveUp(1);
            } else {
                this.emit('stopmove');
            }
        }
    }

    moveMapRight(time) {
        if (this.mapContainer.x < (this.app.screen.width / 2) - this.map.playerLocation.x * this.mapRenderer.tileWidth) {
            this.mapContainer.x += this.movementSpeed * time.deltaTime;
        } else {
            if (this.moving) {
                this.map.moveLeft(1);
            } else {
                this.emit('stopmove');
            }
        }
    }

    moveMapLeft(time) {
        if (this.mapContainer.x > (this.app.screen.width / 2) - this.map.playerLocation.x * this.mapRenderer.tileWidth) {
            this.mapContainer.x -= this.movementSpeed * time.deltaTime;
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
        this.keyDownCallback = event => {
            const { key } = event;

            event.preventDefault();

            if (key === `ArrowDown`) {
                if (!this.moving) {
                    this.emit('movedown');
                }
            } else if (key === `ArrowUp`) {
                if (!this.moving) {
                    this.emit('moveup');
                }
            } else if (key === 'ArrowLeft') {
                if (!this.moving) {
                    this.emit('moveleft');
                }
            } else if (key === 'ArrowRight') {
                if (!this.moving) {
                    this.emit('moveright');
                }
            }

            if (key === 'ArrowDown' || key === 'ArrowUp' || key === 'ArrowLeft' || key === 'ArrowRight') {
                this.moving = true;
            }
        }

        window.addEventListener(`keydown`, this.keyDownCallback);

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