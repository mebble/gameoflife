import type Cell from './Cell';
import type { State } from './Cell';
import { neighbourhood, reconcile, interact, removeDuplicates } from './player';

export default class Generation {
    public id: number;
    private cells: Cell[];

    constructor(cells: Cell[], id: number = 1) {
        this.cells = cells;
        this.id = id;
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

        return new Generation(newCells, this.id + 1);
    }

    appendCell(cell: Cell): void {
        this.cells.push(cell);
    }

    draw(sketch: any, coordMapper: (x: number, y: number) => [number, number, number], intermediates: boolean, withStrokes: boolean): void {
        if (withStrokes) {
            sketch.stroke('black');
        } else {
            sketch.noStroke();
        }
        const cells = intermediates
            ? this.cells
            : this.cells.filter(cell => cell.isAlive());
        for (const cell of cells) {
            sketch.fill(intermediates ? this.colourMap(cell.state) : 'black');
            const [x, y, s] = coordMapper(cell.x, cell.y);
            sketch.rect(x, y, s, s);
        }
    }

    private colourMap(cellState: State): string {
        switch(cellState) {
            case 'alive':
                return 'black';
            case 'spawning':
                return '#f67280';
            case 'dying':
                return '#6639a6';
            default:
                return 'white';
        }
    }
}
