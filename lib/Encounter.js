export default class Encounter {
    constructor(events, startingIndex) {
        this.events = events || [];
        this.index = startingIndex || 0;
    }

    advance(result) {
        const currentEvent = this.events[this.index];

        if (result) {
            this.index = currentEvent[result];
        } else {
            this.index++;
        }
    }
}

/* 
[
    dialogue, choice: { 
        choice1: index1,
        choice2: index2
    },
    index1Dialgue,
    index2Battle: {
        win: index3,
        lose: index4
    },
    index3Choice: {
        choice1: index5,
        choice2: index6
    },
    index4LossDialogue: {
        end: true
    }
]
*/