export default class Grimoire {
    constructor(cards) {
        this.cards = cards;
    }

    shuffle() {
        const numCards = this.cards.length;
        const picked = [];
        const result = [];

        while (picked.length < numCards) {
            const number = Math.floor(Math.random() * numCards);

            if (!picked.includes(number)) {
                picked.push(number);

                result.push(this.cards[number]);
            }
        }

        this.cards = result;
    }

    takeCardAt(index) {
        return this.cards.splice(index, 1)[0];
    }

    drawCards(amount) {
        return [...new Array(amount)].map(() => this.takeCardAt(0));
    }
}