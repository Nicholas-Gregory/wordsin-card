export default class Effect {
    constructor(effect, targetType, targetClass, timeModifier, sweeper, caster, target) {
        this.effect = effect;
        this.targetType = targetType;
        this.targetClass = targetClass;
        this.timeModifier = timeModifier;
        this.sweeper = sweeper;
        this.caster = caster;
        this.target = target;
    }

    getAmount() {
        const split = this.effect.split(' ');
        const firstWord = split[0];

        if (
            firstWord !== 'Apply' &&
            firstWord !== 'Insert' &&
            firstWord !== 'Change to' &&
            firstWord !== 'Counter' &&
            firstWord !== 'Destroy' &&
            firstWord!== 'Kill'
        ) {
            if (firstWord === 'Decrease') {
                return -Number(split.at(-1));
            }

            return Number(split.at(-1));
        }

        return null;
    }

    getWords() {
        const split = this.effect.split(' ');
        const firstWord = split[0];

        if (firstWord === 'Apply') {
            return split
            .slice(1)
            .map(string => (
                string.slice(0, string.at(-1) === ',' ? -1 : undefined)
            ));
        }

        return null;
    }

    getStat() {
        const split = this.effect.split(' ');
        const firstWord = split[0];

        if (
            (
                firstWord === 'Increase' ||
                firstWord === 'Decrease' ||
                firstWord === 'Set'
            ) && (
                split[1] !== 'damage' &&
                split[1] !== 'heal'
            )
        ) {
            return split[1];
        }

        return null;
    }

    getEffects() {
        const split = this.effect.split(' ');
        const firstWord = split[0];

        if (
            firstWord === 'Insert' ||
            firstWord === 'Change'
        ) {
            let inside = false;
            const effects = [];

            for (let token of split) {
                if (
                    token[0] === '"' ||
                    token.at(-1) === ','
                ) {
                    inside = !inside;

                    if (inside) {
                        effects.push([]);
                    }
                }

                if (
                    inside ||
                    token.at(-1) === ','
                ) {
                    effects
                    .at(-1)
                    .push(token);
                }
            }

            return effects.map(effect => (
                effect
                .join(' ')
                .replaceAll('"', '')
                .replaceAll(',', '')
            ));
        }
    }
}