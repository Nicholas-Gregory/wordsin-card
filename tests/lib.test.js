import { describe, it } from "node:test";

import Timeline from "../lib/Timeline.js";
import * as assert from "node:assert";
import Effect from "../lib/Effect.js";

describe('Effect tests', () => {
    const effect = new Effect('Deal 1 damage to an independent target');

    it('reports damage', () => {
        assert.strictEqual(effect.getDamage(), 1);
    });

    it('sets damage', () => {
        effect.setDamage(2);

        assert.strictEqual(effect.getDamage(), 2);
    });
});

describe('Timeline tests', () => {
    it('resolves correctly', () => {
        const timeline = new Timeline([
            [
                new Effect('Deal 2 damage to an independent target', 'Mr. Robot', 'Elliot Alderson')
            ], 
            [
                new Effect("Deal 3 damage to the card's target", 'Elliot Alderson', 'Mr.Robot')       
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
                        power: 3
                    } 
                },
                {
                    id: 'Elliot Alderson',
                    equipment: [],
                    stats: {
                        power: 2
                    }
                }
            ]
        }), [
            [
                new Effect('Deal 7 damage to an independent target', 'Mr. Robot', 'Elliot Alderson')
            ],
            [
                new Effect("Deal 5 damage to the card's target", 'Elliot Alderson', 'Mr.Robot')
            ]
        ])
    })
})