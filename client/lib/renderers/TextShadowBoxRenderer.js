import { Container } from "pixi.js";
import ShadowBoxRenderer from "./ShadowBoxRenderer";
import WordWrapTextRenderer from "./WordWrapTextRenderer";

export default class TextShadowBoxRenderer extends Container {
    constructor(textString, width, backgroundColor, textColor, fontSize) {
        super();

        this.textString = textString;
        this.givenWidth = width;
        this.backgroundColor = backgroundColor;
        this.textColor = textColor;
        this.givenFontSize = fontSize;

        this
        .makeText()
        .makeBox();
    }

    makeBox() {
        const textSize = this.wordWrapText.getSize();
        this.shadowBox = new ShadowBoxRenderer(this.givenWidth + 1, textSize.height + 1, this.backgroundColor);
        
        this.addChild(this.shadowBox);

        return this;
    }

    makeText() {
        this.wordWrapText = new WordWrapTextRenderer(this.textString, this.givenWidth, this.textColor, this.givenFontSize);

        this.wordWrapText.x = 1;
        this.wordWrapText.y = 1;
        this.wordWrapText.zIndex = 1;

        this.addChild(this.wordWrapText);

        return this;
    }
}