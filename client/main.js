import { Application, Container, Graphics } from 'pixi.js';
import Renderer from './lib/renderers/Renderer.js';
import GraphicsRenderer from './lib/renderers/GraphicsRenderer.js';

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

    const renderer = new Renderer(app.stage);
    const squares = new Renderer(renderer);

    const smallSquare = new GraphicsRenderer(squares)
    .rect(10, 10, 10, 10)
    .fill(0xffffff);
    const largeSquare = new GraphicsRenderer(squares)
    .rect(100, 100, 100, 100)
    .fill(0xffffff);

    renderer.renderAllChildren();
})();
