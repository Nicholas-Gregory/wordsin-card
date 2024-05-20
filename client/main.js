import { Application, Graphics, Sprite } from 'pixi.js';
import Map from '../lib/Map';
import MapManager from './lib/managers/MapManager';
import GraphicsTileSet from './lib/TileSet';
import HandRenderer from './lib/renderers/HandRenderer';
import HandManager from './lib/managers/HandManager';
import DialogueManager from './lib/managers/DialogueManager';
import Encounter from '../lib/Encounter';
import EncounterManager from './lib/managers/EncounterManager';

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

    const dialogue = [
        {
            text: 'hello dog this is dog i am dog'
        },
        {
            text: 'yes dog hi dog i am also dog'
        },
        {
            text: 'dog wwhat do you think dog1 or dog2?',
            choices: [
                {
                    text: 'dog1',
                    index: 3
                },
                {
                    text: 'dog2',
                    index: 4
                }
            ]
        },
        {
            text: 'dog1 ah good choice',
            end: 'goodchoice'
        },
        {
            text: 'dog2 yes interesting',
        },
        {
            text: 'no wait we must fight',
            end: 'fight'
        }
    ]

    const events = [
        {
            dialogue,
            fight: 1,
            goodchoice: 2
        },
        {
            battle: 'batle!'
        },
        {
            end: 'goodchoice'
        }
    ];
    // console.log(encounter.eventsList)

    const encounterManager = new EncounterManager(app, events);
    encounterManager.renderEvent();
;})();
