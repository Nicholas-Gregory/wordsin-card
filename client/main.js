import { Application, Assets, Container, Graphics, Sprite, Texture } from 'pixi.js';
import Entity from '../lib/Entity';
import WordWrapTextRenderer from './lib/renderers/WordWrapTextRenderer';
import ShadowBoxRenderer from './lib/renderers/ShadowBoxRenderer';
import DialogueManager from './lib/managers/DialogueManager';
import Emitter from '../lib/events/Emitter';


(async () =>
{
    const app = new Application();

    await app.init({ 
        background: '#1099bb',
        width: window.innerWidth / 2, height: window.innerHeight / 2,
        resolution: 3
    });

    document.body.appendChild(app.canvas);

    const shadowBox = new ShadowBoxRenderer(100, 100, 0x333333);
    
    shadowBox.initShadow();
    shadowBox.initBox();
    shadowBox.init();

    const dialogue = new Entity({
        index: 0,
        wordIndex: 0,
        renderer: new Container(),
        wordWrapTextRenderers: [
            new WordWrapTextRenderer('did you know that dogs are cats?', 100, 0xFFFFFF, 6).initText().init(),
            new WordWrapTextRenderer(`it's true!`, 100, 0xFFFFFF, 6).initText().init()
        ],
        shadowBoxRenderer: shadowBox,
        events: [
            {
                text: 'did you know that dogs are cats?'
            }, 
            {
                text: `it's true!`
            }
        ],
        nextButton: new Graphics({ eventMode: 'static' })
        .moveTo(0, 0)
        .lineTo(0, 19)
        .lineTo(17, 10)
        .lineTo(0, 0)
        .stroke(0x000055)
        .fill(0x000099)
    });
    const manager = new DialogueManager([dialogue]);
    const emitter = new Emitter(manager.listeners);

    dialogue.nextButton.y = 20;
    dialogue.nextButton.on('click', event => emitter.emit('nextbuttonclick', dialogue, null, app));

    app.stage.addChild(dialogue.renderer);

    manager.process(undefined, app);
;})();
