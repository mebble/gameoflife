import type Cell from './Cell';
import { neighbourhood, reconcile, interact, removeDuplicates } from './player';

export default class Generation {
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

    draw(sketch: any, coordMapper: (x: number, y: number) => [number, number]): void {
        sketch.fill('black');
        for (const cell of this.cells) {
            const [x, y] = coordMapper(cell.x, cell.y);
            sketch.rect(x, y, 10, 10);
        }
    }
}
