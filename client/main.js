import { Application, Assets, Graphics, Sprite, Texture } from 'pixi.js';
import ShadowBoxRenderer from './lib/renderers/ShadowBoxRenderer';

(async () =>
{
    const app = new Application();

    await app.init({ 
        background: '#1099bb',
        width: window.innerWidth / 2, height: window.innerHeight / 2,
        resolution: 2
    });

    document.body.appendChild(app.canvas);

    const shadowBox = new ShadowBoxRenderer(100, 100, 0x00AA00);

    shadowBox
    .initShadow()
    .initBox()
    .init();

    app.stage.addChild(shadowBox);
;})();
