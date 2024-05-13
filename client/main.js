import { Application } from 'pixi.js';
import { EffectRenderer } from './lib/renderers/EffectRenderer';
import TimeChunkRenderer from './lib/renderers/TimeChunkRenderer';
import TimelineRenderer from './lib/renderers/TimelineRenderer';
import DialogueBoxRenderer from './lib/renderers/DialogueBoxRenderer';

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

    const dialogue = new DialogueBoxRenderer('hello this is dog ;yes dog you are dog yes i am dog hello i am dog what is dog');
    dialogue.x = 1;
    dialogue.y = app.screen.height - dialogue.getSize().height - 1;

    app.stage.addChild(dialogue);
    dialogue.makeAnimationEvents(app);
    dialogue.emit(`dialoguestart`)
;})();
