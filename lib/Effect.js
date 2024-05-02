export default class Effect {
    constructor(text, caster, target) {
        this.text = text;
        this.caster = caster;
        this.target = target;
    }

    #split() {
        return this.text.split(' ');
    }

    isDamageEffect() {
        return this.text.includes('damage');
    }

    getDamage() {
        if (this.isDamageEffect()) {
            const split = this.#split();

            return Number(split[1]);
        }

        return null;
    }

    setDamage(amount) {
        if (this.isDamageEffect()) {
            const split = this.#split();

            split[1] = String(amount);
            this.text = split.join(' ');
        }

        return this;
    }

    isHealEffect() {
        return this.text.includes('heals');
    }

    getHealAmount() {
        if (this.isHealEffect()) {
            const split = this.#split();

            return Number(split.at(-1));
        }
    }

    setHealAmount(amount) {
        if (this.isHealEffect()) {
            const split = this.#split();

            split.splice(-1, 1, String(amount));
            this.text = split.join(' ');
        }

        return this;
    }
}