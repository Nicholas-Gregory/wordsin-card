import { Container } from "pixi.js";
import TimeChunkRenderer from "./TimeChunkRenderer";
import AnimationManager from "../managers/AnimationManager";

export default class TimelineRenderer extends Container {
    constructor(effects) {
        super();

        this.effects = effects;
        this.timeChunkRenderers = [];
        this.animationCallbacks = [];
        this.animationManagers = [];

        this.makeTimeChunks();
    }

    makeTimeChunks() {
        let totalTime = 0;

        for (let i = 0; i < this.effects.length; i++) {
            const effect = this.effects[i];

            this.timeChunkRenderers.push(new TimeChunkRenderer(effect.time, 0x6495ED, effect));
            const timeChunk = this.timeChunkRenderers[i];
            
            timeChunk.x = totalTime;

            totalTime += effect.time + 1;

            this.addChild(timeChunk);
        }
    }

    makeAnimationEvents(app) {
        for (let i = 0; i < this.timeChunkRenderers.length; i++) {
            let renderer = this.timeChunkRenderers[i];
            this.animationManagers.push(new AnimationManager(app, renderer, {
                mouseenter: {
                    add: ['lighten', 'popupEffect'],
                    remove: ['darken', 'closeEffect']
                },
                mouseleave: {
                    add: ['darken', 'closeEffect'],
                    remove: ['lighten', 'popupEffect']
                }
            }));
        }
    }
}