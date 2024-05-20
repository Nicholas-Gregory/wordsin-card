import StateEntity from "./StateEntity.js";

export default class Character extends StateEntity {
    constructor(state, grimoire) {
        super(state);

        this.hand = [];
        this.grimoire = grimoire;
    }

    rollInitiative() {
        return Math.random() * this.state.swiftness;
    }

    drawCards(amount) {
        this.hand.concat(this.grimoire.drawCards(amount));
    }
}