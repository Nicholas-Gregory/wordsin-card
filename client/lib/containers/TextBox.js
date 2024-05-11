import { Container, Graphics, Text } from "pixi.js";

export default class TextBox extends Container {
    constructor(textString, width, backgroundColor, textColor) {
        super();

        this.textString = textString;
        this.givenWidth = width;
        this.backgroundColor = backgroundColor;
        this.textColor = textColor;

        this.render();
    }

    makeShadow() {
        const textBounds = this.text.getBounds()

        this.shadow = new Graphics()
        .rect(1, 1, this.givenWidth + 1, textBounds.height + 1)
        .fill(0x333333);

        return this;
    }

    makeBox() {
        const textBounds = this.text.getBounds();

        this.box = new Graphics()
        .rect(0, 0, this.givenWidth + 1, textBounds.height + 1)
        .fill(this.backgroundColor);

        return this;
    }

    makeText() {
        this.text = new Text({
            text: this.textString,
            style: {
                wordWrap: true,
                wordWrapWidth: this.givenWidth,
                fontFamily: 'Courier New',
                fontSize: 4,
                fill: this.textColor
            }
        });
        this.text.x = 1;
        this.text.y = 1;

        return this;
    }

    render() {
        this
        .makeText()
        .makeShadow()
        .makeBox()
        .addChild(this.shadow, this.box, this.text);
    }
}