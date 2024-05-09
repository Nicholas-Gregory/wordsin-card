export default class Effect {
    constructor(text, target) {
        this.text = text;
        this.target = target;
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
}