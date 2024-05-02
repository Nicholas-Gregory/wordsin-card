import { describe, it } from "node:test";

import Timeline from "../lib/Timeline.js";
import * as assert from "node:assert";
import Effect from "../lib/Effect.js";

describe('Effect tests', () => {
    const damageEffect = new Effect('Deal 1 damage to an independent target');
    const healEffect = new Effect('Independent target heals for 5');
    const increaseDamageEffect = new Effect("Increase independent target offensive effect's damage by 1");
    const decreaseDamageEffect = new Effect("Decrease independent target offensive effect's damage by 1");

    it('reports damage', () => {
        assert.strictEqual(damageEffect.getDamage(), 1);
    });

    it('sets damage', () => {
        damageEffect.setDamage(2);

        assert.strictEqual(damageEffect.getDamage(), 2);
    });

    it('reports heal amount', () => {
        assert.strictEqual(healEffect.getHealAmount(), 5);
    });

    it('sets heal amount', () => {
        healEffect.setHealAmount(2);

        assert.strictEqual(healEffect.getHealAmount(), 2);
    });

    it('reports damage modifier', () => {
        assert.strictEqual(increaseDamageEffect.getDamageModifier(), 1);
        assert.strictEqual(decreaseDamageEffect.getDamageModifier(), -1);
    });

    it('sets damage modifier', () => {
        increaseDamageEffect.setDamageModifier(2);

        assert.strictEqual(increaseDamageEffect.getDamageModifier(), 2);
    })
});

describe('Timeline tests', () => {
    it('resolves correctly', () => {
        const timeline = new Timeline([
            [
                new Effect('Deal 2 damage to an independent target', 'Mr. Robot', 'Elliot Alderson', 0)
            ], 
            [
                new Effect("Deal 3 damage to the card's target", 'Elliot Alderson', 'Mr.Robot')       
            ],
            [
                new Effect("Increase independent target offensive effect's damage by 3", 'Mr. Robot', 0)
            ],
            [
                new Effect("Increase independent target defensive effect's heal amount by 2", 'Mr. Robot', 1)
            ],
            [
                new Effect("Independent target heals for 5", 'Mr. Robot', 'Mr. Robot', 1)
            ],
            [
                new Effect("Decrease independent target character's awareness by 1", 'Elliot Alderson', 'Mr. Robot')
            ],
            [
                new Effect("Decrease independent target character's power by 1", 'Mr. Robot', 'Elliot Alderson')
            ]
        ]);

        assert.deepStrictEqual(timeline.resolve({
            characters: [
                {
                    id: 'Mr. Robot',
                    equipment: [
                        {
                            bonuses: [
                                {
                                    text: 'Increase all damage in Offensive Effects by 2'
                                }
                            ]
                        }
                    ],
                    stats: {
                        power: 3,
                        wellness: 2,
                        awareness: 2
                    } 
                },
                {
                    id: 'Elliot Alderson',
                    equipment: [],
                    stats: {
                        power: 2,
                        wellness: 1,
                        awareness: 4
                    }
                }
            ]
        }), [
            [
                new Effect('Deal 10 damage to an independent target', 'Mr. Robot', 'Elliot Alderson', 0)
            ],
            [
                new Effect("Deal 5 damage to the card's target", 'Elliot Alderson', 'Mr.Robot')
            ],
            [
                new Effect("Increase independent target offensive effect's damage by 3", 'Mr. Robot', 0)
            ],
            [
                new Effect("Increase independent target defensive effect's heal amount by 2", 'Mr. Robot', 1)
            ],
            [
                new Effect("Independent target heals for 9", 'Mr. Robot', 'Mr. Robot', 1)
            ],
            [
                new Effect("Decrease independent target character's awareness by 5", 'Elliot Alderson', 'Mr. Robot')
            ],
            [
                new Effect("Decrease independent target character's power by -2", 'Mr. Robot', 'Elliot Alderson')
            ]
        ])
    })
})