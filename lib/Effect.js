export default class Effect {
    constructor(text, target) {
        this.text = text;
        this.target = target;

        this.effectAmountMethodTable = {
            set: this.setEffectAmount,
            add: this.addEffectAmount,
            subtract: this.subtractEffectAmount,
            multiply: this.multiplyEffectAmount,
            divide: this.divideEffectAmount
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
        this
        .target
        .text
        .setAmount(
            this
            .text
            .getAmount()
        );
    }

    addEffectAmount() {
        this
        .target
        .text
        .setAmount(
            this
            .text
            .getAmount() + this
            .target
            .text
            .getAmount()
        );
    }

    subtractEffectAmount() {
        this
        .target
        .text
        .setAmount(
            this
            .target
            .text
            .getAmount() - this
            .text
            .getAmount()
        );
    }

    multiplyEffectAmount() {
        this
        .target
        .text
        .setAmount(
            this
            .target
            .text
            .getAmount() * this
            .text
            .getAmount()
        );
    }

    divideEffectAmount() {
        this
        .target
        .text
        .setAmount(
            Math
            .floor(
                this
                .target
                .text
                .getAmount() / this
                .text
                .getAmount()
            )
        );
    }

    setOuterTargeting() {
        this
        .target
        .text
        .setOuterTargeting(
            this
            .text
            .getChangedValue()
        );
    }

    setOuterTarget() {
        this
        .target
        .text
        .setOuterTarget(
            this
            .text
            .getChangedValue()
        );
    }

    setTargeting() {
        this
        .target
        .text
        .setTargeting(
            this
            .text
            .getChangedValue()
        );
    }

    setTarget() {
        this
        .target
        .text
        .setTarget(
            this
            .text
            .getChangedValue()
        );
    }

    setTimeModifierAmount() {
        this
        .target
        .text
        .setTimeModifierAmount(
            this
            .text
            .getAmount()
        );
    }

    setTimeModifierSpan() {
        this
        .target
        .text
        .setTimeModifierSpan(
            this
            .text
            .getChangedValue()
        );
    }

    setGrimoireTargeting() {
        this
        .target
        .text
        .setGrimoireTargeting(
            this
            .text
            .getChangedValue()
        );
    }

    resolveEffectAmount() {
        const action = this.text.getAction();

        this.effectAmountMethodTable[action].call(this);

        return this;
    }
}