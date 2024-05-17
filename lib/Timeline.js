export default class Timeline {
    constructor(effectGroups) {
        this.effectGroups = effectGroups;
        this.effectsInOrder = [];
    }

    addEffectGroup(effectGroup) {
        this.effectGroups.push(effectGroup);
    }

    getEffectStartingTime(groupIndex, effectIndex) {
        let time = 0;

        // Loop through effect groups, adding up the reaction time
        // of each group, then the effect times for the effect in question's
        // group
        for (let i = 0; i <= groupIndex; i++) {
            time += this.effectGroups[i][0].time;

            if (i === groupIndex) {
                for (let j = 1; j < effectIndex; j++) {
                    const effect = this.effectGroups[groupIndex][j];

                    time += effect.time;
                }
            }
        }

        return time;
    }

    initEffectsInOrder() {
        
    }

    resolve() {

    }
}