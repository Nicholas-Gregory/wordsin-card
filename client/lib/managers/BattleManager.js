import { Container } from "pixi.js";
import HandManager from './HandManager.js';
import CardManager from "./CardManager.js";

export default class BattleManager extends Container {
    constructor(app, battle) {
        super();

        this.app = app;
        this.battle = battle;
        this.allyHandManagers = [];
        this.enemyHands = [];
        
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
        console.log(proactive)
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
            console.log(hand)
            const handManager = new HandManager(this.app.screen.width / 2, this.app, hand);

            await handManager.initHand();
            handManager.initMouseEvents();

            this.allyHandManagers.push(handManager);
        }
    }

    async makeEnemyHands() {
        for (let enemy of this.battle.enemies) {
            const handContainer = new Container();
            const hand = enemy.hand;
            const handManager = [];
            
            for (let card of hand) {
                const cardManager = new CardManager(this.app, card, false);

                await cardManager.initCardRenderer();
                await cardManager.initCardBack();

                handManager.push(cardManager);
            }

            for (let card of handManager) {
                handContainer.addChild(card.cardBack);
            }

            const handSize = handContainer.getSize();

            handContainer.x = this.app.screen.width / 2 - handSize.width / 2;
            handContainer.y = 2;

            this.enemyHands.push(handContainer);
        }
    }

    showEnemyHand(index) {
        for (let hand of this.enemyHands) {
            this.removeChild(hand);
        }

        this.addChild(this.enemyHands[index]);
    }

    showAllyHand(index) {
        for (let hand of this.allyHandManagers) {
            this.removeChild(hand);
        }

        this.addChild(this.allyHandManagers[index]);
        console.log(this.children)
    }
}