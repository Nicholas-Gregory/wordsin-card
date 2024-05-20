import { Container } from "pixi.js";
import Encounter from "../../../lib/Encounter";
import DialogueManager from "./DialogueManager";

export default class EncounterManager extends Container {
    constructor(app, encounter) {
        super();

        this.app = app;
        this.encounter = encounter;
    }

    renderEvent() {
        const event = this.encounter.getCurrentEvent();

        if (event.type === 'dialogue') {
            const dialogueManager = new DialogueManager(this.app, event.dialogue);
            dialogueManager.on('dialoguedone', event => {
                this.encounter.advance(dialogueManager.endValue);
                this.renderEvent()
            });
            dialogueManager.renderIndex();
        } else if (event.type === 'end') {
            this.emit('encounterdone');
            this.encounter.index = 0;
        } else if (event.type === 'battle') {
            console.log('battle')
        }
    }
}