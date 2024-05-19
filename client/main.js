import { Application, Graphics, Sprite } from 'pixi.js';
import Map from '../lib/Map';
import MapManager from './lib/managers/MapManager';
import GraphicsTileSet from './lib/TileSet';
import HandRenderer from './lib/renderers/HandRenderer';

(async () =>
{
    const app = new Application();

    await app.init({ 
        background: '#1099bb',
        width: 400, height: 180,
        resolution: 4
    });

    document.body.appendChild(app.canvas);

    const tileSet = new GraphicsTileSet([
        new Graphics().rect(0, 0, 6, 6).fill(0x330000), new Graphics().rect(0, 0, 6, 6).fill(0x003300), new Graphics().rect(0, 0, 6, 6).fill(0x000033),
        new Graphics().rect(0, 0, 6, 6).fill(0x660000), new Graphics().rect(0, 0, 6, 6).fill(0x006600), new Graphics().rect(0, 0, 6, 6).fill(0x000066),
        new Graphics().rect(0, 0, 6, 6).fill(0x990000), new Graphics().rect(0, 0, 6, 6).fill(0x009900), new Graphics().rect(0, 0, 6, 6).fill(0x000099)
    ]);

    const tiles = [...new Array(10000)].map(
        tile => ({
            id: Math.floor(Math.random() * tileSet.tileSet.length)
        })
    );

    const playerGraphic = new Graphics()
    .circle(0, 0, 3)
    .fill(0xFFFFFF);

    const map = new Map(100, tiles, [], { x: 10, y: 10 });

    const playerTexture = app.renderer.generateTexture(playerGraphic);
    const playerSprite = new Sprite(playerTexture);

    const mapManager = new MapManager(6, 6, app, map, playerSprite, tileSet, 0.5);

    const cards = [
        {
            effects: [
                {
                    text: 'deal 2 to independent target enemy',
                    numberOfTargets: 1
                }
            ]
        },
        {
            effects: [
                {
                    text: 'heal 4 for independent target ally',
                    numberOfTargets: 1
                }
            ]
        },
        {
            effects: [
                {
                    text: `card's target enemy discards 1 chosen card`,
                    numberOfTargets: 1
                },
                {
                    text: `deal 2 to card's target enemy`,
                    numberOfTargets: 1
                },
                {
                    text: `independent target ally draws 1 card`,
                    numberOfTargets: 1
                }
            ]
        },
        {
            effects: [
                {
                    text: 'deal 2 to independent target enemy',
                    numberOfTargets: 1
                }
            ]
        },
        {
            effects: [
                {
                    text: 'deal 2 to independent target enemy',
                    numberOfTargets: 1
                }
            ]
        }
    ];

    const handRenderer = new HandRenderer(app.screen.width / 2, cards);
    await handRenderer.makeCards();
    handRenderer.y = app.screen.height - handRenderer.getSize().height;
    handRenderer.x = app.screen.width / 2 - handRenderer.getSize().width / 2;

    app.stage.addChild(handRenderer)
;})();
