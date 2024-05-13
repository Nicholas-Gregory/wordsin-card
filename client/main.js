import { Application, Graphics } from 'pixi.js';
import { EffectRenderer } from './lib/renderers/EffectRenderer';
import TimeChunkRenderer from './lib/renderers/TimeChunkRenderer';
import TimelineRenderer from './lib/renderers/TimelineRenderer';
import DialogueBoxRenderer from './lib/renderers/DialogueBoxRenderer';
import AnimationManager from './lib/managers/AnimationManager';

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
    
    const dialogueAnimationManager = new AnimationManager(app, dialogue,
        {
            dialoguestart: {
                add: 'type' 
            },
            dialogueend: {
                remove: 'type'
            }
        }
    );

    const timeline = new TimelineRenderer([
        {
            time: 10,
            text: `deal 2 to independent target enemy`,
            numberOfTargets: 1
        },
        {
            time: 20,
            text: `independent target enemy discards 1 independent target card`,
            numberOfTargets: 2
        }
    ]);

    timeline.makeAnimationEvents(app);

    app.stage.addChild(timeline)

    const button = new Graphics({ eventMode: 'static' })
    .rect(10, 10, 20, 20)
    .fill(0xFF0000);

    button.on('click', event => dialogue.emit(`dialoguestart`));

    app.stage.addChild(button)
;})();
