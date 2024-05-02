export default class Effect {
    constructor(text, caster, target, id) {
        this.text = text;
        this.caster = caster;
        this.target = target;
        this.id = id;
    }

    #split() {
        return this.text.split(' ');
    }

    isDamageEffect() {
        return /Deal \d+ damage/.test(this.text);
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

        return null;
    }

    setHealAmount(amount) {
        if (this.isHealEffect()) {
            const split = this.#split();

            split.splice(-1, 1, String(amount));
            this.text = split.join(' ');
        }

        return this;
    }

    isDamageModifier() {
        return this.text.includes("independent target offensive effect's damage");
    }

    getDamageModifier() {
        if (this.isDamageModifier()) {
            const split = this.#split();

            if (split[0] === 'Increase') {
                return Number(split.at(-1))
            } else if (split[0] === 'Decrease') {
                return -Number(split.at(-1))
            }
        }

        return null
    }

    setDamageModifier(amount) {
        if (this.isDamageModifier()) {
            const split = this.#split();

            split.splice(-1, 1, String(amount));
            this.text = split.join(' ');
        }

        return this;
    }
}