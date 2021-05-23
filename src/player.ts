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
    return positions.map(p => new Cell(p[0], p[1], 'dead'));
};
