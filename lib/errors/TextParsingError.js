export default class TextParsingError extends Error {
    constructor(message) {
        super(message);

        this.name = 'TextParsingError';
    }
}