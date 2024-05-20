export default class Encounter {
    constructor(events, startingIndex, restarts) {
        this.eventsList = events || [];
        this.index = startingIndex || 0;
        this.restarts = restarts;
    }

    getCurrentEvent() {
        const event = this.eventsList[this.index];

        for (let key of Object.keys(event)) {
            if (key === 'dialogue') {
                return {
                    type: 'dialogue',
                    dialogue: event.dialogue
                }
            } else if (key === 'end') {
                return {
                    type: 'end',
                    endValue: event.end
                }
            } else if (key === 'battle') {
                return {
                    type: 'battle'
                }
            }
        }
    }

    advance(result) {
        const currentEvent = this.eventsList[this.index];

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