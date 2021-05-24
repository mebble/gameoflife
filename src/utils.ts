export const range = (size: number): number[] => {
    return Array.from({ length: size }).map((_, i) => i);
};
