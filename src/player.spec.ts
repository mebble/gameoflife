import Cell from './Cell';
import { neighbourhood, reconcile, interact, removeDuplicates, Position } from './player';

describe('neighbourhood', () => {
    it('should return neighbours of an x,y pair and itself', () => {
        const neighbours = neighbourhood(3, 4);

        expect(neighbours).toEqual([
            [2, 3], [3, 3], [4, 3],
            [2, 4], [3, 4], [4, 4],
            [2, 5], [3, 5], [4, 5]
        ]);
    });
});

describe('reconcile', () => {
    it('should return all dead cells when no cells are passed in', () => {
        const positions: Position[] = [
            [0, 0],
            [0, 1],
            [0, 2],
        ];

        const cells = reconcile(positions, []);

        expect(cells).toEqual([
            new Cell(0, 0, 'dead'),
            new Cell(0, 1, 'dead'),
            new Cell(0, 2, 'dead'),
        ]);
    });

    it('should return no cells when no positions are passed in', () => {
        const cells: Cell[] = [
            new Cell(0, 0, 'dead'),
            new Cell(0, 1, 'alive'),
            new Cell(0, 2, 'dead'),
        ];

        const newCells = reconcile([], cells);

        expect(newCells).toEqual([]);
    });


    it('should set the state of the position to the cell that it coincides with', () => {
        const positions: Position[] = [
            [0, 0],
            [0, 1],
            [0, 2],
        ];
        const cells: Cell[] = [
            new Cell(0, 1, 'alive'),
            new Cell(0, 2, 'dead'),
        ];

        const newCells = reconcile(positions, cells);

        expect(newCells).toEqual([
            new Cell(0, 0, 'dead'),
            new Cell(0, 1, 'alive'),
            new Cell(0, 2, 'dead'),
        ]);
    });
});

describe('interact', () => {
    describe('live cell', () => {
        const cell = new Cell(1, 2, 'alive');

        it('return a dying cell when a live cell has no neighbours', () => {
            expect(interact(cell, [])).toEqual(new Cell(1, 2, 'dying'));
        });

        it('return a dying cell when a live cell has fewer than two live neighbours', () => {
            const neighbours = [
                new Cell(0, 1, 'alive'),
                new Cell(0, 2, 'dead'),
                new Cell(0, 3, 'dead'),
            ];

            const newCell = interact(cell, neighbours);

            expect(newCell).toEqual(new Cell(1, 2, 'dying'));
        });

        it('return a live cell when a live cell has two or three live neighbours', () => {
            const neighbours1 = [
                new Cell(0, 1, 'alive'),
                new Cell(0, 2, 'alive'),
                new Cell(0, 3, 'dead'),
            ];
            const neighbours2 = [
                new Cell(0, 1, 'alive'),
                new Cell(0, 2, 'alive'),
                new Cell(0, 3, 'alive'),
                new Cell(0, 4, 'dead'),
            ];

            const newCell1 = interact(cell, neighbours1);
            const newCell2 = interact(cell, neighbours2);

            expect(newCell1).toEqual(new Cell(1, 2, 'alive'));
            expect(newCell2).toEqual(new Cell(1, 2, 'alive'));
        });

        it('return a dying cell when a live cell has more than three live neighbours', () => {
            const neighbours = [
                new Cell(0, 1, 'alive'),
                new Cell(0, 2, 'alive'),
                new Cell(0, 3, 'alive'),
                new Cell(0, 4, 'alive'),
            ];

            const newCell = interact(cell, neighbours);

            expect(newCell).toEqual(new Cell(1, 2, 'dying'));
        });
    });

    describe('dead cell', () => {
        const cell = new Cell(1, 2, 'dead');

        it('return a dead cell when a dead cell has no neighbours', () => {
            expect(interact(cell, [])).toEqual(new Cell(1, 2, 'dead'));
        });

        it('return a spawning cell when a dead cell has exactly than three live neighbours', () => {
            const neighbours = [
                new Cell(0, 1, 'alive'),
                new Cell(0, 2, 'alive'),
                new Cell(0, 3, 'alive'),
            ];

            const newCell = interact(cell, neighbours);

            expect(newCell).toEqual(new Cell(1, 2, 'spawning'));
        });

        it('return a dead cell when a dead cell has less than three live neighbours', () => {
            const neighbours = [
                new Cell(0, 1, 'alive'),
                new Cell(0, 2, 'alive'),
                new Cell(0, 3, 'dead'),
            ];

            const newCell = interact(cell, neighbours);

            expect(newCell).toEqual(new Cell(1, 2, 'dead'));
        });

        it('return a dead cell when a dead cell has more than three live neighbours', () => {
            const neighbours = [
                new Cell(0, 1, 'alive'),
                new Cell(0, 2, 'alive'),
                new Cell(0, 3, 'alive'),
                new Cell(0, 4, 'alive'),
            ];

            const newCell = interact(cell, neighbours);

            expect(newCell).toEqual(new Cell(1, 2, 'dead'));
        });
    });
});

describe('removeDuplicates', () => {
    it('should return the same array if all elements are unique', () => {
        const res = removeDuplicates([
            [2, 3],
            [1, 3],
            [1, 4]
        ])

        expect(res).toEqual([
            [2, 3],
            [1, 3],
            [1, 4]
        ]);
    });

    it('should return only the last of the duplicate elements', () => {
        const res = removeDuplicates([
            [2, 3],
            [1, 3],
            [2, 3],
            [1, 4],
            [2, 3],
        ])

        expect(res).toEqual([
            [1, 3],
            [1, 4],
            [2, 3],
        ]);
    });
});
