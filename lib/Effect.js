import lists from "./lists.js";

export default class Effect {
    constructor(text, target) {
        this.text = text;
        this.target = target;
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

    divideAmountText() {
        this.target.text.setAmount(Math.floor(this.target.text.getAmount() / this.text.getAmount()));
    }

    changeKeywords() {

    }

    resolveAmountModifier() {
        const action = this.text.getAction();

        if (action === 'set') {
            
        } else if (action === 'add') {
            
        } else if (action === 'subtract') {

        } else if (action === 'multiply') {

        } else if (action === 'divide') {

        }
    }
}