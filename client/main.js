import { Application, Container, Graphics } from 'pixi.js';
import CardContainer from './lib/containers/CardContainer';
import HandContainer from './lib/containers/HandContainer';

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

    const cards = [
        new CardContainer(['Deal 2 to independent target enemy']),
        new CardContainer([`Heal 4 for independent target ally`]),
        new CardContainer([`You draw 1 card`])
    ];

    const hand = new HandContainer(cards);

    app.stage.addChild(hand);
})();
