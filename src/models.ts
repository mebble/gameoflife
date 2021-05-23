type Position = [x: number, y: number];
type State = 'alive' | 'dead';

export class Cell {
    private x: number;
    private y: number;
    private state: State;

    constructor(x: number, y: number, state: State) {
        this.x = x;
        this.y = y;
        this.state = state;
    }

    isAlive(): boolean {
        return this.state === 'alive';
    }
}
