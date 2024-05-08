export const getTargetPluralization = target => {
    if (target === 'you') {
        return ` `;
    } else if (target === 'all' || target === 'enem') {
        return `ies`;
    } else {
        return `s`;
    }
}

export const getTargetSingular = target => {
    if (target === 'enem' || target === 'all') {
        return `y`
    } else {
        return ' '; 
    }
}

export const getVerbSingular = verb => verb === `apply` ? 'ies' : 's';