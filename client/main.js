import { Application, Graphics } from 'pixi.js';
import { EffectRenderer } from './lib/renderers/EffectRenderer';
import TimeChunkRenderer from './lib/renderers/TimeChunkRenderer';
import TimelineRenderer from './lib/renderers/TimelineRenderer';
import DialogueBoxRenderer from './lib/renderers/DialogueBoxRenderer';
import AnimationManager from './lib/managers/AnimationManager';
import ScrollableBox from './lib/renderers/ScrollableBoxRenderer';

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

    const scroll = new ScrollableBox(100, 150, 0x000055, [
        new Graphics()
        .rect(1, 1, 10, 10)
        .fill(0xFFFFFF),
        new Graphics()
        .rect(20, 20, 20, 20)
        .fill(0xFFFFFF),
        new Graphics()
        .rect(20, 150, 20, 20)
        .fill(0xffffff)
    ]);

    app.stage.addChild(scroll);
;})();
