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

        this.effectTextMethodTable = {
            outerTargeting: this.setOuterTargeting,
            outerTarget: this.setOuterTarget,
            targeting: this.setTargeting,
            target: this.setTarget,
            span: this.setTimeModifierSpan,
            grimoireTargeting: this.setGrimoireTargeting
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

    // #region Effect Amount

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

    // #endregion
    
    // #region Effect Text

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

    // #endregion

    // #region Character Stats

    setState(property) {
        this
        .target
        .setState(
            property, this
            .text
            .getAmount()
        );
    }

    addState(property) {
        this
        .target
        .setState(
            property, this
            .text
            .getAmount() + this
            .target
            .getState(property)
        );
    }

    subtractState(property) {
        this
        .target
        .setState(
            property, this
            .target
            .getState(property) - this
            .text
            .getAmount()
        );
    }

    multiplyState(property) {
        this
        .target
        .setState(
            property, this
            .target
            .getState(property) * this
            .text
            .getAmount()
        );
    }

    divideState(property) {
        this
        .target
        .setState(
            property, Math.floor(this
            .target
            .getState(property) / this
            .text
            .getAmount())
        );
    }

    // #endregion

    resolveEffectAmount() {
        const action = this.text.getAction();

        this.effectAmountMethodTable[action].call(this);

        return this;
    }

    resolveEffectText() {
        const keywords = this.text.getKeywords();
        let keyword = keywords[1];
        
        if (keywords.length === 3) {
            if (keywords[1] === 'grimoire') {
                keyword = 'grimoireTargeting';
            } else if (keywords[2] === 'targeting') {
                keyword = 'outerTargeting';
            } else if (keywords[2] === 'target') {
                keyword = 'outerTarget';
            }
        }

        this.effectTextMethodTable[keyword].call(this);
    }

    resolveCharacterState() {

    }
}