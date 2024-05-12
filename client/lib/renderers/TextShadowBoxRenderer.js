import Renderer from "./Renderer";
import ShadowBoxRenderer from "./ShadowBoxRenderer";
import WordWrapTextRenderer from "./WordWrapTextRenderer";

export default class TextShadowBoxRenderer extends Renderer {
    constructor(textString, width, backgroundColor, textColor, fontSize) {
        super();

        this.textString = textString;
        this.givenWidth = width;
        this.backgroundColor = backgroundColor;
        this.textColor = textColor;
        this.givenFontSize = fontSize;
    }

    makeBox() {
        const textBounds = this.wordWrapText.pixiText.getBounds();

        this.shadowBox = new ShadowBoxRenderer(this.givenWidth + 1, textBounds.height + 1, this.backgroundColor);
        
        this.rendererChildren[0] = this.shadowBox;

        return this;
    }

    makeText() {
        this.wordWrapText = new WordWrapTextRenderer(this.textString, this.givenWidth, this.textColor, this.givenFontSize);

        this.wordWrapText.x = 1;
        this.wordWrapText.y = 1;

        this.rendererChildren[1] = this.wordWrapText;

        return this;
    }

    async render() {
        this
        .makeText()
        .makeBox();

        await super.render();
    }
}