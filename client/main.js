import { Application, Container, Graphics } from 'pixi.js';
import ShadowBoxRenderer from './lib/renderers/ShadowBoxRenderer';
import TextShadowBoxRenderer from './lib/renderers/TextShadowBoxRenderer';

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

    const textBox = new TextShadowBoxRenderer('hello dog you are a dog', 40, 0x333333, 0xEEEEEE, 4);
    await textBox.render();

    app.stage.addChild(textBox);
})();
