import { Container } from "pixi.js";
import HandManager from './HandManager.js';

export default class BattleManager extends Container {
    constructor(app, battle) {
        super();

        this.app = app;
        this.battle = battle;
        this.allyHandManagers = [];
        this.enemyHandManagers = [];
        
        this.app.stage.addChild(this);
    }

    async startBattle() {
        this.battle.startBattle();
        await this.makeAllyHands();
        await this.makeEnemyHands();
        this.showProactiveHand();
    }

    showProactiveHand() {
        const proactive = this.battle.getProactiveCharacter();
        const enemyOrAlly = Object.keys(proactive)[0];
        
        if (enemyOrAlly === 'ally') {
            this.showAllyHand(proactive.ally);
        } else {
            this.showEnemyHand(proactive.enemy);
        }
    }

    advanceProactive() {
        this.battle.advanceProactive();
        this.showProactiveHand();
    }

    async makeAllyHands() {
        for (let ally of this.battle.allies) {
            const hand = ally.hand;
            
            const handManager = new HandManager(this.app.screen.width / 2, this.app, hand);

            await handManager.initHand(true);
            handManager.initMouseEvents();
            handManager.y = this.app.screen.height - handManager.getSize().height - 2;

            this.allyHandManagers.push(handManager);
        }
    }

    async makeEnemyHands() {
        for (let enemy of this.battle.enemies) {
            const handManager = new HandManager(this.app.screen.width / 2, this.app, enemy.hand);

            await handManager.initHand(false);
            handManager.initMouseEvents();
            handManager.y = 2;

            this.enemyHandManagers.push(handManager);
        }
    }

    showEnemyHand(index) {
        for (let hand of this.enemyHandManagers) {
            this.removeChild(hand);
        }

        this.addChild(this.enemyHandManagers[index]);
    }

    showAllyHand(index) {
        for (let hand of this.allyHandManagers) {
            this.removeChild(hand);
        }

        this.addChild(this.allyHandManagers[index]);
    }
}