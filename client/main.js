import { Application, Container, Graphics } from 'pixi.js';
import TextBox from './lib/containers/TextBox.js';
import Target from './lib/containers/Target.js';
import EffectTextBox from './lib/containers/EffectTextBox.js';
import Effect from '../lib/Effect.js';
import EffectText from '../lib/EffectText.js';

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

    const effect = new EffectTextBox(new Effect(new EffectText(`independent target enemy discards 1 independent target card`)));
    await effect.render();
    console.log(effect.children)

    app.stage.addChild(effect);
})();
