import { Cell } from "./models";

export type Position = [x: number, y: number];

export const neighbourhood = (x: number, y: number): Position[][] => {
    return [
        [[x - 1, y - 1], [x, y - 1], [x + 1, y - 1]],
        [[x - 1, y    ], [x, y    ], [x + 1, y    ]],
        [[x - 1, y + 1], [x, y + 1], [x + 1, y + 1]]
    ];
};

export const reconcile = (positions: Position[], cells: Cell[]): Cell[] => {
    return positions.map(p => {
        const [x, y] = p;
        const coincided = cells.find(c => c.x === x && c.y === y);
        return coincided
            ? new Cell(x, y, coincided.state)
            : new Cell(x, y, 'dead');
    });
};

export const interact = (cell: Cell, neighbourhood: Cell[]): Cell => {
    const numLiveNeighbours = neighbourhood
        .filter(c => c.isAlive())
        .length;

    if (cell.isAlive()) {
        if (numLiveNeighbours === 2 || numLiveNeighbours === 3) {
            return new Cell(cell.x, cell.y, 'alive');
        }
    } else {
        if (numLiveNeighbours === 3) {
            return new Cell(cell.x, cell.y, 'alive');
        }
    }

    return new Cell(cell.x, cell.y, 'dead');
};
