import { Container } from "pixi.js";

export default class BattleManager extends Container {
    constructor(app, battle) {
        super();

        this.app = app;
        this.battle = battle;
        this.allyHandManagers = [];
    }

    makeAllyHands() {
        for (let ally of this.battle.allies) {
            
        }
    }
}