export default class TextGenerationError extends Error {
    constructor(message) {
        super(message);

        this.name = 'TextGenerationError';
    }
}