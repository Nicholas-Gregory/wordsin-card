export default class EffectText {
    constructor(text, regexp) {
        this.text = text;
        this.regexp = regexp;

        this.parseText()
    }

    parseText() {
        this.parse = this.text.match(new RegExp(this.regexp, 'd'));

        return this;
    }
}