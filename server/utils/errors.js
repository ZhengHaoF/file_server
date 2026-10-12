/**
 * Storage failures are not cache misses. Preserve the cause internally while exposing
 * a stable, non-sensitive code to API clients.
 */
export class DatabaseError extends Error {
    /**
     * @param {string} operation
     * @param {unknown} cause
     */
    constructor(operation, cause) {
        super(`Database operation failed: ${operation}`, { cause });
        this.name = 'DatabaseError';
        this.code = 'DATABASE_UNAVAILABLE';
        this.status = 503;
        this.operation = operation;
    }
}

/**
 * @template T
 * @param {string} operation
 * @param {() => T} action
 * @returns {T}
 */
export function databaseOperation(operation, action) {
    try {
        return action();
    } catch (cause) {
        throw new DatabaseError(operation, cause);
    }
}
