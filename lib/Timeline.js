import Effect from "./Effect.js";

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
                const result = new Effect(effect.text, effect.caster, effect.target);

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

                            result.setDamage(originalDamageAmount + bonusAmount);
                        }
                    }
                }

                // Apply stat modifiers

                // Power/Offensive
                result.setDamage(result.getDamage() + character.stats.power);

                // Awareness/Utility

                // Wellness/Defensive
                result.setHealAmount(result.getHealAmount() + character.stats.wellness);

                currentResult.push(result);
            }
        }

        // Effects targeting other Effects
        for (let card of results) {
            for (let effect of card) {
                const target = results
                .find(card => card.some(e => e.id === effect.target))
                ?.find(e => e.id === effect.target);

                if (target) {
                    // Damage
                    if (target.isDamageEffect()) {
                        target.setDamage(target.getDamage() + effect.getDamageModifier());
                    }
                }

            }
        }

        return results;
    }
}