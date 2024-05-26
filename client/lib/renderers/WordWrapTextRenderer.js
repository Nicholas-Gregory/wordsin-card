import { Text } from "pixi.js";
import Renderer from "./Renderer";

export default class WordWrapTextRenderer extends Renderer {
    constructor(textString, width, textFill, fontSize) {
        super();

        this.textString = textString;
        this.givenWidth = width;
        this.textFill = textFill;
        this.fontSize = fontSize;
    }

    initText() {
        this.renderers.pixiText = new Text({
            text: this.textString,
            style: {
                wordWrap: true,
                wordWrapWidth: this.givenWidth,
                fontFamily: 'Courier New',
                fontSize: this.givenFontSize,
                fill: this.textFill
            }
        });

        return this;
    }
}