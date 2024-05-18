import { Application, Graphics } from 'pixi.js';
import ScrollableBoxRenderer from './lib/renderers/ScrollableBoxRenderer';
import VerticalListRenderer from './lib/renderers/VerticalListRenderer';
import EffectRenderer from './lib/renderers/EffectRenderer';
import TextShadowBoxRenderer from './lib/renderers/TextShadowBoxRenderer';
import ShadowBoxRenderer from './lib/renderers/ShadowBoxRenderer';
import WordWrapTextRenderer from './lib/renderers/WordWrapTextRenderer';

(async () =>
{
    const app = new Application();

    await app.init({ 
        background: '#1099bb',
        width: 400, height: 180,
        resolution: 4
    });

    document.body.appendChild(app.canvas);

    const scroll = new ScrollableBoxRenderer(100, 100, 0x0000DD, [
        new VerticalListRenderer(2, [
            new EffectRenderer(`deal 2 to independent target enemy`, 1),
            // new EffectRenderer(`you draw 2 cards`, 0),
            // new EffectRenderer(`heal 4 for independent target ally`),
            // new EffectRenderer(`destroy all objects`, 0),
            new EffectRenderer(`change heal to deal for independent target effect`, 1),
            new EffectRenderer(`independent target enemy discards 1 independent target card`, 2),
            new EffectRenderer(`card's target character shuffles 1 card into independent target grimoire`, 2),
            new EffectRenderer(`card's target character shuffles 1 card into independent target grimoire`, 2),
            new EffectRenderer(`card's target character shuffles 1 card into independent target grimoire`, 2),
            new EffectRenderer(`card's target character shuffles 1 card into independent target grimoire`, 2),
            new EffectRenderer(`card's target character shuffles 1 card into independent target grimoire`, 2),
            new EffectRenderer(`card's target character shuffles 1 card into independent target grimoire`, 2)
        ])
    ]);

    app.stage.addChild(scroll);
;})();
