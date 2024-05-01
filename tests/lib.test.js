import { describe, it } from "node:test";

import Timeline from "../lib/Timeline.js";
import * as assert from "node:assert";

describe('Timeline tests', () => {
    it('resolves correctly', () => {
        const timeline = new Timeline([
            [
                {
                    caster: 'Mr. Robot',
                    target: 'Elliot Alderson',
                    text: 'Deal 2 damage to an independent target'
                }
            ], [
                {
                    caster: 'Elliot Alderson',
                    target: 'The next Effect',
                    text: "Multiply an Effect's damage by 2"
                },
                {
                    caster: 'Elliot Alderson',
                    target: 'Mr.Robot',
                    text: "Deal 3 damage to the card's target"
                }
            ]
        ]);

        assert.deepStrictEqual(timeline.resolve(), [
            [
                {
                    caster: 'Mr. Robot',
                    target: 'Elliot Alderson',
                    text: 'Deal 2 damage to an independent target'
                }
            ],
            [
                {
                    caster: 'Elliot Alderson',
                    target: 'The next Effect',
                    text: "Multiply an Effect's damage by 2"
                },
                {
                    caster: 'Elliot Alderson',
                    target: 'Mr.Robot',
                    text: "Deal 3 damage to the card's target"
                }
            ]
        ])
    })
})