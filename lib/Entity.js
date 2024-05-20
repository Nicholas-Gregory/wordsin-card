import StateEntity from "./StateEntity.js";

export default class Entity  extends StateEntity {
    constructor(x, y, state, inventory, collisionEncounter) {
        super(state);

        this.x = x;
        this.y = y;
        this.inventory = inventory;
        this.collisionEncounter = collisionEncounter;
    }

    triggerCollision() {
        
    }

    openInventory() {
        
    }

    startEncounter() {

    }

    triggerInteraction() {
        if (this.inventory) {
            this.openInventory();
        }
        else if (this.encounter) {
            this.startEncounter();
        }
    }

    affect(effect) {
        effect.target = this;

        effect.resolve();
    }
}