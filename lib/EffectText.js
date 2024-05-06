export default class EffectText {
    constructor(text, regexp) {
        this.text = text;

        this.parseText(regexp)
    }

    parseText(regexp) {
        this.parse = this.text.match(new RegExp(regexp, 'd'));
    }
}