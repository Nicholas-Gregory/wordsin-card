import { Application, Container, Graphics } from 'pixi.js';
import ShadowBoxRenderer from './lib/renderers/ShadowBoxRenderer';
import TextShadowBoxRenderer from './lib/renderers/TextShadowBoxRenderer';
import TargetRenderer from './lib/renderers/TargetRenderer';
import { EffectRenderer } from './lib/renderers/EffectRenderer';

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

    const singleTargetEffect = new EffectRenderer('deal 2 to independent target enemy', 1);
    const doubleTargetEffect = new EffectRenderer(`independent target enemy discards 1 independent target card`, 2);

    const singleSize = singleTargetEffect.getSize();
    doubleTargetEffect.y = singleSize.height + 1;

    app.stage.addChild(singleTargetEffect, doubleTargetEffect);
})();
