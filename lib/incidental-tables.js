export const singular = {
    character: 'character',
    enemy: 'enemy',
    ally: 'ally',
    object: 'object',
    spell: 'spell',
    effect: 'effect'
}

export const targetClassIncidentalTable = {
    all: {
        character: 'characters',
        enemy: 'enemies',
        ally: 'allies',
        object: 'objects',
        spell: 'spells',
        effect: 'effects'
    },
    independent: singular,
    card: singular
}

export const getTargetClassIncidental = (targetType, targetClass) => targetClassIncidentalTable[targetType][targetClass];