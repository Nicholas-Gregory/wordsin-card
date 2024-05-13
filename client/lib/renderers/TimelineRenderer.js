import { Container } from "pixi.js";
import TimeChunkRenderer from "./TimeChunkRenderer";

export default class TimelineRenderer extends Container {
    constructor(effects) {
        super();

        this.effects = effects;
        this.timeChunkRenderers = [];
        this.animationCallbacks = [];

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

            const lightenCb = time => renderer.lighten(time);
            const darkenCb = time => renderer.darken(time);
            const popupCb = time => renderer.popupEffect(time);
            const closeCb = time => renderer.closeEffect(time);

            renderer
            .on('mouseenter', event => {
                app.ticker.remove(darkenCb);
                app.ticker.remove(closeCb);

                app.ticker.add(lightenCb);
                app.ticker.add(popupCb);
            })
            .on('mouseleave', event => {
                app.ticker.remove(lightenCb);
                app.ticker.remove(popupCb);

                app.ticker.add(darkenCb);
                app.ticker.add(closeCb);
            });
        }
    }
}