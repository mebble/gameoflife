import { readable } from 'svelte/store';

export const getTickStore = (ms: number) => {
    return readable(null, set => {
        let count = 1;

        set(count);

        const intervalId = setInterval(() => {
            count++;
            set(count);
        }, ms);

        return () => clearInterval(intervalId);
    });
};
