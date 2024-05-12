import { Application } from 'pixi.js';
import { EffectRenderer } from './lib/renderers/EffectRenderer';
import TimeChunkRenderer from './lib/renderers/TimeChunkRenderer';

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

    const timeChunk = new TimeChunkRenderer(10, 0x000000, app);

    const lightenCb = time => timeChunk.lighten(time);
    const darkenCb = time => timeChunk.darken(time);

    timeChunk
    .on('pointerenter', event => {
        app.ticker.add(lightenCb);
        app.ticker.remove(darkenCb);
    })
    .on('pointerleave', event => {
        app.ticker.add(darkenCb);
        app.ticker.remove(lightenCb);
    });

    app.stage.addChild(timeChunk);
})();
