export default class Timeline {
    constructor(effectObjects) {
        this.effectObjects = effectObjects;
    }

    resolve(encounter) {
        const results = [];
        const { characters, environment } = encounter;

        for (let i = 0; i < this.effectObjects.length; i++) {
            let effectArray = this.effectObjects[i];
            results.push([]);
            let currentResult = results[i];

            for (let effect of effectArray) {           
                const character = characters
                .find(character => character.id === effect.caster);
                const result = {
                    caster: character.id,
                    target: effect.target,
                    text: effect.text
                }

                Object.assign(result, effect);

                // Apply equipment modifiers
                for (let equipment of character.equipment) {
                    for (let bonus of equipment.bonuses) {
                        if (
                            bonus.text.includes('Offensive Effects') &&
                            result.text.includes('damage')
                        ) {
                            const splitText = result.text.split(' ');
                            const originalDamageAmount = Number(splitText[1]);
                            const bonusAmount = Number(bonus.text
                            .split(' ')
                            .at(-1));

                            result.text = result.text
                            .split(' ')
                            .toSpliced(1, 1, String(originalDamageAmount + bonusAmount))
                            .join(' ');
                        }
                    }
                }

                currentResult.push(result);
            }
        }

        return results;
    }
}