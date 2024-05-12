import { Container, Text } from "pixi.js";

export default class WordWrapTextRenderer extends Container {
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

        this.addChild(this.pixiText);

        return this;
    }
}