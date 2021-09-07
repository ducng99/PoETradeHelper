/**
 * A function takes two items and return true if they are equal, false if not
 */
export type ComparerFunction<T> = (a: T, b: T) => boolean;

export class HashSet<T> extends Array<T> {
    constructor(...items: T[]) {
        super(...items);
    }

    /**
     * Appends unique items to set, others will not be added
     * @param items new elements to add to the set
     * @returns the length of the array after adding
     */
    s_push(comparer: ComparerFunction<T>, ...items: T[]) {
        const uniqueItems = items.filter(i => this.findIndex(n => !comparer(i, n)) === -1);
        this.push(...uniqueItems);

        return this.length;
    }
}