/**
 * A function takes two items and return true if they are equal, false if not
 */
export type ComparerFunction<T> = (a: T, b: T) => boolean;

export class HashSet<T = any> extends Array<T> {
    /**
     * Appends unique items to set, others will not be added
     * @param items new elements to add to the set
     * @returns the length of the array after adding
     */
    s_push(comparer: ComparerFunction<T>, ...items: T[]) {
        const uniqueItems = items.filter(i => !this.find(n => comparer(i, n)));
        this.push(...uniqueItems);

        return this.length;
    }
}