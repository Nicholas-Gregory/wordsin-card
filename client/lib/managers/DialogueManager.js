import { Container, Graphics } from "pixi.js";
import DialogueBoxRenderer from "../renderers/DialogueBoxRenderer";
import AnimationManager from "./AnimationManager";
import TextShadowBoxRenderer from "../renderers/TextShadowBoxRenderer";

export default class DialogueManager extends Container {
    constructor(app, dialogue, startingIndex) {
        super({ eventMode: 'static' });

        this.app = app;
        this.dialogue = dialogue;
        this.index = startingIndex || 0;
        this.renderer = new Container();

        app.stage.addChild(this.renderer);
    }

    makeNextButton(dialogueAnimationManager, dialogueBox, dialogue) {
        const boxBounds = dialogueBox.getBounds();

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
            dialogueAnimationManager.cleanup();

            if (dialogue.end) {
                this.endValue = dialogue.end;
                this.renderer.destroy();
                this.emit('dialoguedone');

                return;
            }

            this.index++;
            this.renderIndex();
        })

        this.renderer.addChild(buttonContainer);
    }

    renderIndex() {
        this.renderer.removeChildren();

        const dialogue = this.dialogue[this.index];

        const dialogueBox = new DialogueBoxRenderer(dialogue.text);

        dialogueBox.x = this.app.screen.width / 2 - dialogueBox.getSize().width / 2;
        dialogueBox.y = this.app.screen.height - dialogueBox.getSize().height;

        this.renderer.addChild(dialogueBox);
        
        const dialogueAnimationManager = new AnimationManager(this.app, dialogueBox, {
            dialoguestart: {
                add: 'type'
            },
            dialoguend: {
                remove: 'type'
            }
        });

        if (!dialogue.choices) {
            this.makeNextButton(dialogueAnimationManager, dialogueBox, dialogue);
        } else {
            const choiceButtons = new Container();

            for (let i = 0; i < dialogue.choices.length; i++) {
                let choice = dialogue.choices[i];

                const boxBounds = dialogueBox.getBounds();

                const choiceButtonContainer = new Container({ eventMode: 'static' });
                choiceButtonContainer.addChild(new TextShadowBoxRenderer(choice.text, 20, 0x000099, 0xFFFFFF, 5));
                choiceButtonContainer.x = this.app.screen.width / 2 - choiceButtonContainer.getSize().width / 2;
                choiceButtonContainer.y = boxBounds.top + boxBounds.height / 2 + choiceButtons.getSize().height;
                choiceButtonContainer.on('click', event => {
                    if (dialogue.end) {
                        console.log('here');
                        this.renderer.destroy();
                        this.endValue = dialogue.end;
                        this.emit('dialoguedone');

                        dialogueAnimationManager.cleanup();

                        return;
                    }

                    this.index = choice.index;
                    this.renderIndex();
                });

                choiceButtons.addChild(choiceButtonContainer);
            }

            this.renderer.addChild(choiceButtons);
        }

        dialogueBox.emit('dialoguestart');
    }
}