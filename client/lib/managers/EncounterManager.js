import Encounter from "../../../lib/Encounter";
import DialogueManager from "./DialogueManager";

export default class EncounterManager {
    constructor(app, events, startingIndex) {
        this.app = app;
        this.encounter = new Encounter(events, startingIndex || 0);
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

        } else if (event.type === 'battle') {
            console.log('battle')
        }
    }
}