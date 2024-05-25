import { Application, Assets, Graphics, Sprite, Texture } from 'pixi.js';
import ShadowBoxRenderer from './lib/renderers/ShadowBoxRenderer';
import DialogueManager from './lib/managers/DialogueManager';

(async () =>
{
    const app = new Application();

    await app.init({ 
        background: '#1099bb',
        width: window.innerWidth / 2, height: window.innerHeight / 2,
        resolution: 3
    });

    document.body.appendChild(app.canvas);

    const dialogueBox = new DialogueManager(app);
    dialogueBox
    .initBox()
    .init();

    app.stage.addChild(dialogueBox);
;})();
