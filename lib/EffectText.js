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

    getInstruction() {
        return this.parse.groups.instruction.toLowerCase();
    }

    getAmount() {
        return Number(this.parse.groups.amount);
    }

    getWords() {
        return this.parse.groups.words.split(', ');
    }

    getTargetType() {
        return this.parse.groups.targetType;
    }
}