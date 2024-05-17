export default class Entity {
    constructor(x, y, state, inventory, encounter) {
        this.x = x;
        this.y = y;
        this.state = state;
        this.inventory = inventory;
        this.encounter = encounter;
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

        effect.resolveEntityState();
    }
}