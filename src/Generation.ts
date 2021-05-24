import type Cell from './Cell';
import type { State } from './Cell';
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
            .filter(cell => cell.state !== 'dead');

        return new Generation(newCells);
    }

    appendCell(cell: Cell): void {
        this.cells.push(cell);
    }

    draw(sketch: any, coordMapper: (x: number, y: number) => [number, number]): void {
        // sketch.noStroke();
        for (const cell of this.cells) {
            sketch.fill(this.colourMap(cell.state));
            const [x, y] = coordMapper(cell.x, cell.y);
            sketch.rect(x, y, 10, 10);
        }
    }

    private colourMap(cellState: State): string {
        switch(cellState) {
            case 'alive':
                return 'black';
            case 'dead':
                return 'white';
            case 'spawning':
                return 'rgba(0, 200, 100, 1)';
            case 'dying':
                return 'rgba(255, 0, 0, 0.5)';
            default:
                return 'purple';
        }
    }
}
