import Entity from "../../../lib/Entity";
import ShadowBoxRenderer from "../renderers/ShadowBoxRenderer";
import Manager from "./Manager";

const index = state => {

};

export default class DialogueManager extends Manager {
    constructor(app, dialogue) {
        const entity = new Entity({ index: 0 }, { index });

        super(app, entity);

        this.dialogue = dialogue;
    }

    initBox() {
        const box = new ShadowBoxRenderer(400, 100, 0x0000AA);

        box
        .initShadow()
        .initBox();

        this.renderers.box = box;

        return this;
    }
}