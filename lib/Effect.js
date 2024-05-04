export default class Effect {
    constructor(text, caster, target) {
        this.text = text;
        this.caster = caster;
        this.target = target;

        this.parseText();
    }

    parseText() {
        // Parse effect
        if (/^(Insert|Change text to)/.test(this.text)) {
            this.effect = this.text.match(/(Insert|Change text to) ("[A-Za-z0-9" ]+"(, )?)+/)[0];
        } else if (/^(Counter|Destroy|Kill)/.test(this.text)) {
            this.effect = this.text.match(/(Counter|Destroy|Kill)/)[0];
        } else if (/^Apply/.test(this.text)) {
            this.effect = this.text.match(/^(Apply [a-zA-Z, ]+) to/)[1];
        } else if (/(wellness|awareness|agility|swiftness|speed|power) [0-9]+/.test(this.text)) {
            this.effect = this.text.match(/^([A-Za-z]+ [a-z]+ [0-9]+)/)[1];
        } else {
            this.effect = this.text.match(/^[a-zA-Z ]+[0-9]+/)[0];
        }

        let restOfText = this.text.split(this.effect)[1];

        if (/all[^y]/.test(restOfText)) {
            // Sweeper target
            this.sweeperTarget = restOfText.match(/[A-Za-z ]+(characters|enemies|allies|objects|spells|offensive effects|defensive effects|utility effects)/)[1];

            return;
        }

        // Parse target type
        this.targetType = restOfText.match(/[a-z ]+(independent target|card's target)/)[1];

        // Parse target class
        this.targetClass = this.text.match(/[a-zA-Z0-9 ,"]+(independent target|card's target) ([a-z ]+)/)[2];
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