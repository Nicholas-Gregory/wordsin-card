import { Application } from 'pixi.js';
import { EffectRenderer } from './lib/renderers/EffectRenderer';
import TimeChunkRenderer from './lib/renderers/TimeChunkRenderer';
import TimelineRenderer from './lib/renderers/TimelineRenderer';

(async () =>
{
    // Create a PixiJS application.
    const app = new Application();

    // Intialize the application.
    await app.init({ 
        background: '#1099bb',
        width: 400, height: 180,
        resolution: 4
    });

    // Then adding the application's canvas to the DOM body.
    document.body.appendChild(app.canvas);

    const timeline = new TimelineRenderer([
        {
            time: 10,
            text: 'deal 2 to independent target enemy',
            numberOfTargets: 1
        },
        {
            time: 20,
            text: `card's target enemy discards 1 target card`,
            numberOfTargets: 2
        }
    ]);
    timeline.makeAnimationEvents(app);

    app.stage.addChild(timeline);

    // const timeChunk = new TimeChunkRenderer(10, 0x000000, {
    //     text: `deal 1 to independent target enemy`,
    //     numberOfTargets: 1
    // });

    // const lightenCb = time => timeChunk.lighten(time);
    // const darkenCb = time => timeChunk.darken(time);
    // const popupCb = time => timeChunk.popupEffect(time);
    // const closeCb = time => timeChunk.closeEffect(time);

    // timeChunk
    // .on('pointerenter', event => {
    //     app.ticker.add(lightenCb);
    //     app.ticker.remove(darkenCb);

    //     app.ticker.add(popupCb);
    //     app.ticker.remove(closeCb);
    // })
    // .on('pointerleave', event => {
    //     app.ticker.add(darkenCb);
    //     app.ticker.remove(lightenCb);

    //     app.ticker.add(closeCb);
    //     app.ticker.remove(popupCb);
    // });

    // app.stage.addChild(timeChunk);
})();
