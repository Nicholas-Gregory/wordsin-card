import { Container } from "pixi.js";
import AnimationManager from "./AnimationManager";

export default class MapManager {
    constructor(app, mapRenderer, playerSprite) {
        this.mapRenderer = mapRenderer;
        this.app = app;
        this.playerSprite = playerSprite;
        this.renderer = new Container();
        this.renderer.addChild(this.mapRenderer);
        this.renderer.addChild(this.playerSprite);

        this.app.stage.addChild(this.renderer);

        this
        .initKeyboardEvents()
        .initPlayerSprite()
        .initAnimations();
    }

    initPlayerSprite() {
        this.playerSprite.anchor.set(0.5);
        this.playerSprite.x = this.app.screen.width / 2;
        this.playerSprite.y = this.app.screen.height / 2;

        return this;
    }

    initAnimations() {
        this.animationManager = new AnimationManager(this.app, this.mapRenderer, {
            arrowdowndown: {
                add: 'moveDown'
            },
            arrowupdown: {
                add: 'moveUp'
            },
            arrowleftdown: {
                add: 'moveLeft'
            },
            arrowrightdown: {
                add: 'moveRight'
            },
            arrowdownup: {
                remove: 'moveDown'
            },
            arrowupup: {
                remove: 'moveUp'
            },
            arrowleftup: {
                remove: 'moveLeft'
            },
            arrowrightup: {
                remove: 'moveRight'
            }
        });

        return this;
    }

    initKeyboardEvents() {
        window.addEventListener(`keydown`, event => {
            const { key } = event;

            event.preventDefault();

            if (key === `ArrowDown`) {
                this.mapRenderer.emit('arrowdowndown');
            } else if (key === `ArrowUp`) {
                this.mapRenderer.emit('arrowupdown')
            } else if (key === 'ArrowLeft') {
                this.mapRenderer.emit('arrowleftdown')
            } else if (key === 'ArrowRight') {
                this.mapRenderer.emit('arrowrightdown')
            }
        });

        window.addEventListener('keyup', event => {
            const { key } = event;

            event.preventDefault();

            if (key === `ArrowDown`) {
                this.mapRenderer.emit('arrowdownup');
            } else if (key === `ArrowUp`) {
                this.mapRenderer.emit('arrowupup')
            } else if (key === 'ArrowLeft') {
                this.mapRenderer.emit('arrowleftup')
            } else if (key === 'ArrowRight') {
                this.mapRenderer.emit('arrowrightup')
            }
        });

        return this;
    }
}