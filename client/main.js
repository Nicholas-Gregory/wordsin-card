import { Application, Assets, Graphics, Sprite, Texture } from 'pixi.js';


(async () =>
{
    const app = new Application();

    await app.init({ 
        background: '#1099bb',
        width: window.innerWidth / 2, height: window.innerHeight / 2,
        resolution: 3
    });

    document.body.appendChild(app.canvas);

    
;})();
