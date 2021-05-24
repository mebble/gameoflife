type State = 'alive' | 'dead';

export default class Cell {
    public x: number;
    public y: number;
    public state: State;

    constructor(x: number, y: number, state: State) {
        this.x = x;
        this.y = y;
        this.state = state;
    }

    isAlive(): boolean {
        return this.state === 'alive';
    }
}
