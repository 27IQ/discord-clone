export class CacheException extends Error {
    constructor(message: string, public field?: string) {
        super(message);
        this.name = 'CacheException';

        Object.setPrototypeOf(this, CacheException.prototype);
    }
}
