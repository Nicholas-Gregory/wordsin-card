export const capitalize = text => `${text.substring(0, 1).toUpperCase()}${text.substring(1)}`;

export const getIncidental = text => text === 'deal' || text === 'apply' ? 'to' : 'for';

export const getTargetIncidental = text => text === 'all' ? '' : (text === 'card' ? "'s target" : ' target');