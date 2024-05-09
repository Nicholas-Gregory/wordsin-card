import lists from "./lists.js";

export default class Effect {
    constructor(text, target) {
        this.text = text;
        this.target = target;

        this.methodTable = {
            change: this.changeKeywords,
            set: this.setEffectAmount,
            add: this.addEffectAmount,
            subtract: this.subtractEffectAmount,
            multiply: this.multiplyEffectAmount
        };
    }

    matchKeywords() {
        const keywords = this.text
        .getKeywords()
        .slice(1);
        const targetKeywords = this
        .target
        .text
        .getKeywords();

        return keywords.reduce((truth, keyword, index) => (
              truth ? keyword === targetKeywords[index] : false
        ), true);
    }

    setEffectAmount() {
        this.target.text.setAmount(this.text.getAmount());
    }

    addEffectAmount() {
        this.target.text.setAmount(this.text.getAmount() + this.target.text.getAmount());
    }

    subtractEffectAmount() {
        this.target.text.setAmount(this.target.text.getAmount() - this.text.getAmount());
    }

    multiplyEffectAmount() {
        this.target.text.setAmount(this.target.text.getAmount() * this.text.getAmount());
    }

    divideAmountText() {
        this.target.text.setAmount(Math.floor(this.target.text.getAmount() / this.text.getAmount()));
    }

    changeKeywords() {
        this.target.text.setKeywords(
            this
            .text
            .getChangedValue()
            .split(' ')
        );
    }

    resolve() {
        const action = this.text.getAction();

        this.methodTable[action].call(this);

        return this;
    }
}