import { Application, Graphics, Sprite } from 'pixi.js';
import ScrollableBoxRenderer from './lib/renderers/ScrollableBoxRenderer';
import VerticalListRenderer from './lib/renderers/VerticalListRenderer';
import EffectRenderer from './lib/renderers/EffectRenderer';
import TextShadowBoxRenderer from './lib/renderers/TextShadowBoxRenderer';
import ShadowBoxRenderer from './lib/renderers/ShadowBoxRenderer';
import WordWrapTextRenderer from './lib/renderers/WordWrapTextRenderer';
import TileRegionRenderer from './lib/renderers/TileRegionRenderer';
import Map from '../lib/Map';
import MapManager from './lib/managers/MapManager';
import MapRenderer from './lib/renderers/MapRenderer';

(async () =>
{
    const app = new Application();

    await app.init({ 
        background: '#1099bb',
        width: 400, height: 180,
        resolution: 4
    });

    document.body.appendChild(app.canvas);

    const colors = [
        0x330000, 0x003300, 0x000033,
        0x660000, 0x006600, 0x000066,
        0x990000, 0x009900, 0x000099
    ]

    const tiles = [...new Array(10000)].map(
        tile => new Graphics()
        .rect(0, 0, 6, 6)
        .fill(colors[Math.floor(Math.random() * colors.length)])
    );

    const playerGraphic = new Graphics()
    .circle(0, 0, 3)
    .fill(0xFFFFFF);

    const playerTexture = app.renderer.generateTexture(playerGraphic);
    const playerSprite = new Sprite(playerTexture);

    const mapRenderer = new MapRenderer(new TileRegionRenderer(100, tiles), 2);

    const mapManager = new MapManager(app, mapRenderer, playerSprite);
;})();
