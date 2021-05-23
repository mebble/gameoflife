import { neighbourhood, reconcile, interact, removeDuplicates } from './player';

type State = 'alive' | 'dead';

export class Cell {
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

export class Generation {
    private cells: Cell[];

    constructor(cells: Cell[]) {
        this.cells = cells;
    }

    play(): Generation {
        const neighbourHoods = this.cells.map(c => neighbourhood(c.x, c.y))
            .reduce((acc, p) => [...acc, ...p], []);
        const playableCells = reconcile(removeDuplicates(neighbourHoods), this.cells);

        const newCells = playableCells
            .map(cell => {
                const cellNeighbourhood = neighbourhood(cell.x, cell.y);
                const neighbours = reconcile(cellNeighbourhood, this.cells).filter(({ x, y }) => x !== cell.x || y !== cell.y);
                return interact(cell, neighbours);
            })
            .filter(cell => cell.isAlive());

        return new Generation(newCells);
    }
}
