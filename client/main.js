import { Application, Graphics } from 'pixi.js';
import { EffectRenderer } from './lib/renderers/EffectRenderer';
import TimeChunkRenderer from './lib/renderers/TimeChunkRenderer';
import TimelineRenderer from './lib/renderers/TimelineRenderer';
import DialogueBoxRenderer from './lib/renderers/DialogueBoxRenderer';
import AnimationManager from './lib/managers/AnimationManager';
import ScrollableBox from './lib/renderers/ScrollableBoxRenderer';
import VerticalListRenderer from './lib/renderers/VerticalListRenderer';

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

    const list = new VerticalListRenderer(2, [
        new Graphics()
        .rect(0, 0, 50, 20)
        .fill(0xFFFFFF),
        new Graphics()
        .rect(0, 0, 60, 20)
        .fill(0xFFFFFF),
        new Graphics()
        .rect(0, 0, 30, 20)
        .fill(0xFFFFFF)
    ]);

    app.stage.addChild(list);
;})();
