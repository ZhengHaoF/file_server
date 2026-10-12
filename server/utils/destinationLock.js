/**
 * Serialize mutations to a destination without retaining completed lock entries.
 * @returns {<T>(destination: string, action: () => Promise<T>) => Promise<T>}
 */
export function createDestinationLock() {
    /** @type {Map<string, Promise<unknown>>} */
    const locks = new Map();
    return async (destination, action) => {
        const previous = locks.get(destination) || Promise.resolve();
        const work = previous.catch(() => {}).then(action);
        locks.set(destination, work);
        try {
            return await work;
        } finally {
            if (locks.get(destination) === work) locks.delete(destination);
        }
    };
}
