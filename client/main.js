import { Application, Container, Graphics } from 'pixi.js';
import TextBox from './lib/containers/TextBox.js';

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

    const text = new TextBox('hellodog hi dog you are a dog', 20, 0xEEEEEE, 0x333333);
    text.x = 10,
    text.y = 10
    app.stage.addChild(text);
})();
