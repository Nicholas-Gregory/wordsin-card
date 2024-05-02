import { Application } from 'pixi.js';
import HandRenderer from './lib/renderers/HandRenderer';
import CardRenderer from './lib/renderers/CardRenderer';
import { CARD_HEIGHT } from './lib/renderers/render-constants';

(async () =>
{
    // Create a PixiJS application.
    const app = new Application();

    // Intialize the application.
    await app.init({ 
        background: '#1099bb',
        width: 800, height: 600
    });

    // Then adding the application's canvas to the DOM body.
    document.body.appendChild(app.canvas);

    const hand = new HandRenderer([
        new CardRenderer(),
        new CardRenderer(),
        new CardRenderer()
    ]);

    hand
    .setY(app.screen.height - CARD_HEIGHT - 10)
    .render(app);
})();
