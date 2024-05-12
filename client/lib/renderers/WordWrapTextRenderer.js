import { Text } from "pixi.js";
import Renderer from "./Renderer";

export default class WordWrapTextRenderer extends Renderer {
    constructor(textString, width, textColor, fontSize) {
        super();

        this.textString = textString;
        this.givenWidth = width;
        this.textColor = textColor;
        this.givenFontSize = fontSize;

        this.makeText();
    }

    makeText() {
        this.pixiText = new Text({
            text: this.textString,
            style: {
                wordWrap: true,
                wordWrapWidth: this.givenWidth,
                fontFamily: 'Courier New',
                fontSize: this.givenFontSize,
                fill: this.textColor
            }
        });

        this.rendererChildren[0] = this.pixiText;

        return this;
    }

    async render() {
        await super.render();
    }
}