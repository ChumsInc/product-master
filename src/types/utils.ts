/**
 * Recursively flattens an object type, concatenating keys with a dot separator.
 */
export type Flatten<T extends object, Prefix extends string = ''> = {
    [K in keyof T]: K extends string
        ? T[K] extends object
            ? T[K] extends Date // Handle specific types that shouldn't be flattened
                ? { [P in `${Prefix}${K}`]: T[K] }
                : Flatten<T[K], `${Prefix}${K}.`>
            : { [P in `${Prefix}${K}`]: T[K] }
        : never
}[keyof T] extends infer U
    ? UnionToIntersection<U>
    : never;

// Helper type to convert a union type to an intersection type
type UnionToIntersection<U> =
    (U extends any ? (k: U) => void : never) extends ((k: infer I) => void)
        ? I
        : never;

