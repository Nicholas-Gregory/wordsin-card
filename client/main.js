import { Application, Graphics } from 'pixi.js';
import ScrollableBoxRenderer from './lib/renderers/ScrollableBoxRenderer';
import VerticalListRenderer from './lib/renderers/VerticalListRenderer';
import EffectRenderer from './lib/renderers/EffectRenderer';
import TextShadowBoxRenderer from './lib/renderers/TextShadowBoxRenderer';
import ShadowBoxRenderer from './lib/renderers/ShadowBoxRenderer';
import WordWrapTextRenderer from './lib/renderers/WordWrapTextRenderer';
import TileRegionRenderer from './lib/renderers/TileRegionRenderer';

(async () =>
{
    const app = new Application();

    await app.init({ 
        background: '#1099bb',
        width: 400, height: 180,
        resolution: 4
    });

    document.body.appendChild(app.canvas);

    const tiles = new TileRegionRenderer(3, [
        new Graphics()
        .rect(0, 0, 5, 5)
        .fill(0x330000),
        new Graphics()
        .rect(0, 0, 5, 5)
        .fill(0x003300),
        new Graphics()
        .rect(0, 0, 5, 5)
        .fill(0x000033),
        new Graphics()
        .rect(0, 0, 5, 5)
        .fill(0x660000),
        new Graphics()
        .rect(0, 0, 5, 5)
        .fill(0x006600),
        new Graphics()
        .rect(0, 0, 5, 5)
        .fill(0x000066),
        new Graphics()
        .rect(0, 0, 5, 5)
        .fill(0x990000),
        new Graphics()
        .rect(0, 0, 5, 5)
        .fill(0x009900),
        new Graphics()
        .rect(0, 0, 5, 5)
        .fill(0x000099)
    ]);

    app.stage.addChild(tiles);
;})();
