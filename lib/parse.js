export const amount = text => text.match(/[0-9]+/)[0];

export const stat = text => text.match(/(agility|speed|swiftness|awareness|wellness|power)/)[1];

export const targetType = text => text.match(/(independent target|card's target)/)[1];

export const targetClass = text => text.match(/(character|enemy|ally|object|spell|effect|offensive effect|defensive effect|utility effect|card)/)[1];

export const sweeperTarget = text => {
    if (/all[^y]/.test(text)) {
        return text.match(/(characters|enemies|allies|objects|spells|effects|offensive effects|defensive effects|utility effects|cards)/);       
    }
};

export const effect = text => {
    try {
        return sweeperTarget(text);
    } catch {
        return {
            effectText: text.match(/(Deal|Apply|Increase|Decrease|Set|Draw|Heal|Increase damage|Decrease damage|Increase heal|Decrease heal|Set damage to|Set heal to|Insert|Change text to|Counter|Destroy|Kill|Discard)/),
            stat: stat(text),
            amount: amount(text)
        };
    }
};

