import { describe, it } from 'node:test';
import assert from 'node:assert';
import DialogueSystem from '../lib/systems/DialogueSystem.js';
import Entity from '../lib/Entity.js';

describe('Class: DialogueSystem;', () => {
    it('advances linearly', () => {
        const entity = new Entity({
            index: 0,
            events: ['hello', 'hi']
        });
        const system = new DialogueSystem([entity]);

        system.process();

        assert.strictEqual(entity.index, 1);
    });

    it('advances according to choices', () => {
        const entity = new Entity({
            index: 0,
            events: [
                {
                    text: 'do you like cheese',
                    yes: 1,
                    no: 2
                },
                {
                    text: 'good'
                },
                {
                    text: 'what why not'
                }
            ]
        });
        const system = new DialogueSystem([entity]);

        system.process('yes');

        assert.strictEqual(entity.index, 1);

        entity.index = 0;

        system.process('no');

        assert.strictEqual(entity.index, 2);
    })
})