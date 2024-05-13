import { BitmapText, Container, FillGradient, Text } from "pixi.js";
import ShadowBoxRenderer from './ShadowBoxRenderer.js';

export default class DialogueBoxRenderer extends Container {
    constructor(text) {
        super({ eventMode: 'static' });

        this.textString = text;
        this.words = this.textString.split(` `);
        this.wordIndex = 0;
        this.elapsed = 0;

        this
        .makeBox()
        .makeText();
    }

    makeBox() {
        this.box = new ShadowBoxRenderer(397, 70, 0x000080);

        this.addChild(this.box);

        return this;
    }

    makeText() {
        this.text = new Text({
            text: ``,
            style: {
                fontFamily: 'Courier New',
                fontSize: 6,
                wordWrap: true,
                wordWrapWidth: this.box.getSize().width
            }
        });

        this.text.x = 2;
        this.text.y = 2;
        
        this.addChild(this.text);

        return this;
    }

    type(time) {
        this.elapsed += time.deltaTime;

        if (this.wordIndex < this.words.length && this.elapsed / 500 <= 100) {
            this.text.text = `${this.text.text} ${this.words[this.wordIndex]}`;
            this.wordIndex++;
        } else {
            this.emit('dialogueend');
        }
    }

    makeAnimationEvents(app) {
        let elapsed = 0;
        const startCb = time => this.type(time, elapsed);

        this
        .on('dialoguestart', event => app.ticker.add(startCb))
        .on('dialgueend', event => app.ticker.remove(startCb));
    }
}