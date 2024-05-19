import { Container, Graphics } from "pixi.js";
import DialogueBoxRenderer from "../renderers/DialogueBoxRenderer";
import AnimationManager from "./AnimationManager";

export default class DialogueManager {
    constructor(app, dialogue, startingIndex) {
        this.app = app;
        this.dialogue = dialogue;
        this.index = startingIndex || 0;
    }

    renderIndex() {
        const dialogueBox = new DialogueBoxRenderer(this.dialogue[this.index].text);

        dialogueBox.x = this.app.screen.width / 2 - dialogueBox.getSize().width / 2;
        dialogueBox.y = this.app.screen.height - dialogueBox.getSize().height;

        const boxBounds = dialogueBox.getBounds();
        
        const dialogueAnimationManager = new AnimationManager(this.app, dialogueBox, {
            dialoguestart: {
                add: 'type'
            },
            dialoguend: {
                remove: 'type'
            }
        });

        const buttonContainer = new Container({ eventMode: 'static' });

        const button = new Graphics()
        .moveTo(0, 0)
        .lineTo(0, 19)
        .lineTo(17, 10)
        .lineTo(0, 0)
        .stroke(0x000055)
        .fill(0x000099);

        buttonContainer.addChild(button);

        const buttonSize = button.getSize();

        buttonContainer.x = boxBounds.right - buttonSize.width - 2;
        buttonContainer.y = boxBounds.bottom - buttonSize.height - 2;
        buttonContainer.on('click', event => {
            this.index++;
            this.renderIndex();
        })

        this.app.stage.addChild(dialogueBox);
        this.app.stage.addChild(buttonContainer);

        dialogueBox.emit('dialoguestart');
    }
}