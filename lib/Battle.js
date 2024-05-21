export default class Battle {
    constructor(allies, enemies, startingHandAmount) {
        this.allies = allies;
        this.enemies = enemies;
        this.proactiveOrder = [];
        this.startingHandAmount = startingHandAmount;
    }

    rollInitiative() {
        const rolls = [];

        for (let i = 0; i < this.allies.length; i++) {
            let ally = this.allies[i];

            rolls.push({
                roll: ally.rollInitiative(),
                character: { ally: i }
            });
        }

        for (let i = 0; i < this.enemies.length; i++) {
            let enemy = this.enemies[i];

            rolls.push({
                roll: enemy.rollInitiative(),
                character: { enemy: i }
            });
        }

        const sortedRolls = rolls.sort((a, b) => b.roll - a.roll);

        for (let i = 0; i < sortedRolls.length; i++) {
            this.proactiveOrder.push(sortedRolls[i].character);
        }
    }

    characterDrawsCards(enemiesOrAllies, index, amount) {
        this[enemiesOrAllies][index].drawCards(amount);
    }

    startBattle() {
        this.turnIndex = 0;
        this.rollInitiative();

        for (let ally of this.allies) {
            ally.grimoire.shuffle();
            ally.hand = ally.grimoire.drawCards(this.startingHandAmount);
        }

        for (let enemy of this.enemies) {
            enemy.grimoire.shuffle();
            enemy.hand = enemy.grimoire.drawCards(this.startingHandAmount);
        }
    }

    getProactiveCharacter() {
        return this.proactiveOrder[this.turnIndex];
    }

    advanceProactive() {
        this.turnIndex++;

        if (this.turnIndex >= this.proactiveOrder.length) {
            this.turnIndex = 0;
        }
    }
}