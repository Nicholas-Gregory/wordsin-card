import { Application, Container, Graphics } from 'pixi.js';
import ShadowBoxRenderer from './lib/renderers/ShadowBoxRenderer';

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

    const box = new ShadowBoxRenderer(40, 80, 0x333333);
    await box.render();

    app.stage.addChild(box);
})();
