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

    getIndices(property) {
        return this.parse.indices.groups[property];
    }

    getTimeModifierSpan() {
        return this.parse.groups.timeModifierSpan;
    }

    getTimeModifierAmount() {
        return Number(this.parse.groups.timeModifierAmount);
    }

    isRestOfEncounter() {
        return this.parse.groups.timeModifier && !this.parse.groups.timeModifierAmount;
    }

    replaceText(property, newText) {
        const [start, end] = this.getIndices(property);

        this.text = `${this.text.substring(0, start)}${newText}${this.text.substring(end)}`;

        this.parseText()

        return this;
    }
}