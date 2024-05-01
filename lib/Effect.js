export default class Effect {
    constructor(text) {
        this.text = text;
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
}