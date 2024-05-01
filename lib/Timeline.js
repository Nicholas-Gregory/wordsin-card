export default class Timeline {
    constructor(effectObjects) {
        this.effectObjects = effectObjects;
    }

    resolve() {
        const results = [];

        for (let i = 0; i < this.effectObjects.length; i++) {
            let effectArray = this.effectObjects[i];
            results.push([]);
            let currentResult = results[i];

            for (let effect of effectArray) {           
                let { caster, target, text } = effect;
                
                currentResult.push({ caster, target, text })
            }
        }

        return results;
    }
}